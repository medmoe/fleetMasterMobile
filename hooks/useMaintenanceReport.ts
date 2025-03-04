import {useCallback, useReducer, useState} from "react";
import {MaintenanceReportType, MaintenanceReportWithStringsType} from "@/types/maintenance";
import {getMaintenanceReportDatesInitialState, getMaintenanceReportFormInitialState, maintenanceReportInitialState} from "@/hooks/initialStates";
import {VehicleType} from "@/types/types";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {router} from "expo-router";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Alert} from "react-native";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";
import {DateData} from "react-native-calendars";

// View state reducer
type ViewState = {
    showSelectedReports: boolean;
    showMaintenanceReport: boolean;
    showServiceProviderEventForm: boolean;
    showPartPurchaseEventForm: boolean;
};

type ViewAction =
    | { type: 'SHOW_SELECTED_REPORTS' }
    | { type: 'SHOW_MAINTENANCE_REPORT' }
    | { type: 'SHOW_SERVICE_PROVIDER_FORM' }
    | { type: 'SHOW_PART_PURCHASE_FORM' }
    | { type: 'RESET' };

const viewReducer = (state: ViewState, action: ViewAction): ViewState => {
    const resetState = {
        showSelectedReports: false,
        showMaintenanceReport: false,
        showServiceProviderEventForm: false,
        showPartPurchaseEventForm: false,
    };

    switch (action.type) {
        case 'SHOW_SELECTED_REPORTS':
            return {...resetState, showSelectedReports: true};
        case 'SHOW_MAINTENANCE_REPORT':
            return {...resetState, showMaintenanceReport: true};
        case 'SHOW_SERVICE_PROVIDER_FORM':
            return {...resetState, showServiceProviderEventForm: true};
        case 'SHOW_PART_PURCHASE_FORM':
            return {...resetState, showPartPurchaseEventForm: true};
        case 'RESET':
            return resetState;
        default:
            return state;
    }
};

export const useMaintenanceReport = (vehicle: VehicleType) => {
    // Data state
    const [maintenanceReportFormData, setMaintenanceReportFormData] = useState<MaintenanceReportType>(getMaintenanceReportFormInitialState(vehicle))
    const [maintenanceReportDates, setMaintenanceReportDates] = useState(getMaintenanceReportDatesInitialState())
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
    const [maintenanceReport, setMaintenanceReport] = useState(maintenanceReportInitialState)
    const [activeFilter, setActiveFilter] = useState(0)
    const [isMaintenanceReportPutRequest, setIsMaintenanceReportPutRequest] = useState(false)
    // Calendar state
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [currentDate, setCurrentDate] = useState(`${year}-${month}-01`);

    // Data state
    const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReportWithStringsType[]>([]);
    const [selectedReports, setSelectedReports] = useState<[MaintenanceReportWithStringsType, boolean][]>([]);
    const [maintenanceReportToEdit, setMaintenanceReportToEdit] = useState<MaintenanceReportWithStringsType | undefined>();

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [displayLoadingIndicator, setDisplayLoadingIndicator] = useState(false);
    const [errorState, setErrorState] = useState({
        isErrorModalVisible: false,
        errorMessage: "",
    });
    // View state managed with reducer
    const [view, dispatch] = useReducer(viewReducer, {
        showSelectedReports: false,
        showMaintenanceReport: false,
        showServiceProviderEventForm: false,
        showPartPurchaseEventForm: false,
    });

    const setView = {
        showSelectedReports: () => dispatch({type: 'SHOW_SELECTED_REPORTS'}),
        showMaintenanceReport: () => dispatch({type: 'SHOW_MAINTENANCE_REPORT'}),
        showServiceProviderEventForm: () => dispatch({type: 'SHOW_SERVICE_PROVIDER_FORM'}),
        showPartPurchaseEventForm: () => dispatch({type: 'SHOW_PART_PURCHASE_FORM'}),
        reset: () => dispatch({type: 'RESET'}),
    };

    // Error handling
    const showError = (message: string) => {
        setErrorState({
            isErrorModalVisible: true,
            errorMessage: message,
        });
    };

    const handleDismissError = () => {
        setErrorState({
            isErrorModalVisible: false,
            errorMessage: "",
        });
    };
    const searchingFilterLabels: string[] = ["7D", "2W", "4W", "3M", "1Y"]


    // Data fetching
    const fetchMaintenanceReportOverview = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${API}maintenance/overview/`, {withCredentials: true});
            setMaintenanceReport(response.data);
        } catch (error: any) {
            if (error.response.status === 401) {
                router.replace("/");
            } else {
                setErrorState({isErrorModalVisible: true, errorMessage: "Error fetching maintenance overview !"})
            }
        }
        setIsLoading(false)
    }, [])

    const handleFilterRangeChange = (label: string) => {
        const idx = searchingFilterLabels.indexOf(label);
        setActiveFilter(idx);
    }

    // Maintenance report handlers
    const handleStartingRecordingMaintenance = () => {
        setShowMaintenanceForm(true);
        setIsMaintenanceReportPutRequest(false);
    }
    const handleCancelingRecordingMaintenance = () => {
        router.replace('/fleet');
    }
    const handleDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setMaintenanceReportDates(prevState => ({
            ...prevState,
            [name]: date
        }))
    }
    const handleMaintenanceReportFormChange = (name: string, value: string) => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleValidatingMaintenanceReportData = (formattedMaintenanceReportFormData: MaintenanceReportWithStringsType) => {
        const {vehicle, start_date, end_date, mileage, service_provider_events} = formattedMaintenanceReportFormData
        if (!vehicle) {
            Alert.alert("Error", "You must select a vehicle!")
            return false
        }
        if (!start_date) {
            Alert.alert("Error", "You must select a start date!")
            return false
        }
        if (!end_date) {
            Alert.alert("Error", "You must select a end date!")
            return false
        }
        if (new Date(end_date) < new Date(start_date)) {
            Alert.alert("Error", "End date must be greater than start date!");
            return false;
        }
        if (!isPositiveInteger(mileage)) {
            Alert.alert("Error", "You must select a valid mileage!")
            return false
        }
        if (service_provider_events.length === 0 && !isMaintenanceReportPutRequest) {
            Alert.alert("Error", "You must create a service provider event")
            return false
        }
        return true;
    }
    const handleFormattingMaintenanceReportFormData = (): MaintenanceReportWithStringsType => {
        return {
            ...maintenanceReportFormData,
            start_date: getLocalDateString(maintenanceReportDates.start_date),
            end_date: getLocalDateString(maintenanceReportDates.end_date),
            part_purchase_events: maintenanceReportFormData.part_purchase_events.map((partPurchaseEvent) => {
                if (!partPurchaseEvent.part.id || !partPurchaseEvent.provider.id) {
                    throw new Error("Either Part or Provider are not given!")
                }
                return {
                    ...partPurchaseEvent,
                    part: partPurchaseEvent.part.id,
                    provider: partPurchaseEvent.provider.id
                }
            }),
            service_provider_events: maintenanceReportFormData.service_provider_events.map((serviceProviderEvent) => {
                if (!serviceProviderEvent.service_provider.id) {
                    throw new Error("Service Provider is not given!")
                }
                return {
                    ...serviceProviderEvent,
                    service_provider: serviceProviderEvent.service_provider.id
                }
            })
        }
    }
    const handleMaintenanceReportCancellation = () => {
        setShowMaintenanceForm(false);
    }
    const handleMaintenanceReportSubmission = async () => {
        setIsLoading(true)
        try {
            const formattedMaintenanceReportFormData = handleFormattingMaintenanceReportFormData();
            if (!handleValidatingMaintenanceReportData(formattedMaintenanceReportFormData)) {
                return
            }
            const url = isMaintenanceReportPutRequest ? `${API}maintenance/reports/${maintenanceReportFormData.id}/` : `${API}maintenance/reports/`
            const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
            const response = await axios.post(url, formattedMaintenanceReportFormData, options)
            setShowMaintenanceForm(false)
            if (!isMaintenanceReportPutRequest) {
                setMaintenanceReports([...maintenanceReports, response.data])
            } else {
                setMaintenanceReports(maintenanceReports.map((report) => {
                    if (report.id === response.data.id) {
                        return response.data
                    }
                    return report
                }))
                router.replace('/details/maintenance-reports-details');
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                router.replace("/");
            } else {
                setErrorState({isErrorModalVisible: true, errorMessage: "Error saving maintenance report !"})
            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleShowingMaintenanceReports = () => {
        router.replace('/details/maintenance-reports-details');
    }
    const handleErrorNotificationDismissal = () => {

    }
    // Data fetching
    const fetchMaintenanceReports = useCallback(async () => {
        setDisplayLoadingIndicator(true);
        try {
            const url = `${API}maintenance/reports/?vehicle_id=${vehicle.id}&year=${year}&month=${month}`;
            const options = {headers: {'Content-Type': "application/json"}, withCredentials: true};
            const response = await axios.get(url, options);
            setMaintenanceReports(response.data.results);
        } catch (error: any) {
            if (error.response?.status === 401) {
                router.replace("/");
            } else {
                showError("Could not fetch maintenance reports!");
                console.log(error.response?.data || error);
            }
        } finally {
            setDisplayLoadingIndicator(false);
        }
    }, [year, month]);

    // Calendar handlers
    const onMonthChange = (monthData: DateData) => {
        setMonth(monthData.month.toString());
        setYear(monthData.year.toString());
    };

    const onDayPressed = (date: DateData) => {
        setView.showSelectedReports();
        setSelectedReports(getReports(date.dateString));
    };

    // Helper to find reports for a date using binary search
    const getReports = (date: string): [MaintenanceReportWithStringsType, boolean][] => {
        let left = 0;
        let right = maintenanceReports.length - 1;
        let anyMatchIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midDate = maintenanceReports[mid].start_date;
            const comparison = date.localeCompare(midDate);

            if (comparison === 0) {
                anyMatchIndex = mid;
                break;
            } else if (comparison < 0) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (anyMatchIndex === -1) {
            return [];
        }

        let start = anyMatchIndex;
        while (start >= 0 && maintenanceReports[start].start_date === date) {
            start--;
        }

        let end = anyMatchIndex;
        while (end < maintenanceReports.length && maintenanceReports[end].start_date === date) {
            end++;
        }

        return maintenanceReports.slice(start + 1, end).map(report => [report, false]);
    };

    // Report handlers
    const handleMaintenanceReportViewCancellation = () => {
        setView.reset();
        setCurrentDate(`${year}-${month}-01`);
    };

    const handleCollapse = (id?: string) => {
        setSelectedReports(selectedReports.map(([report, expanded]) =>
            [report, id && report.id === id ? !expanded : expanded]
        ));
    };

    const handleMaintenanceReportEdition = (id?: string) => {
        setView.showMaintenanceReport();
        const reportToEdit = selectedReports.find(([report]) => report.id === id);
        if (reportToEdit) {
            setMaintenanceReportToEdit(reportToEdit[0]);
        }
    };

    const handleMaintenanceReportDeletion = (id?: string) => {
        Alert.alert(
            "Delete report",
            "Are you sure you want to delete this report? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            const url = `${API}maintenance/reports/${id}/`;
                            const options = {headers: {"Content-Type": "application/json"}, withCredentials: true};
                            await axios.delete(url, options);
                            setMaintenanceReports(maintenanceReports.filter(report => report.id !== id));
                            setView.reset();
                        } catch (error: any) {
                            if (error.response?.status === 401) {
                                router.replace("/");
                            } else {
                                showError("Error deleting report!");
                                console.error("Error deleting report:", error);
                            }
                        } finally {
                            setIsLoading(false);
                        }
                    }
                }
            ],
            {cancelable: true}
        );
    };

    const handleLeavingMaintenanceReportsCalendar = () => {
        router.replace("/maintenance/maintenance-report");
    };
    return {
        // State
        activeFilter,
        currentDate,
        displayLoadingIndicator,
        errorState,
        isLoading,
        isMaintenanceReportPutRequest,
        maintenanceReport,
        maintenanceReportDates,
        maintenanceReportFormData,
        maintenanceReportToEdit,
        maintenanceReports,
        searchingFilterLabels,
        selectedReports,
        showMaintenanceForm,
        view,

        //methods
        fetchMaintenanceReportOverview,
        fetchMaintenanceReports,
        handleCancelingRecordingMaintenance,
        handleCollapse,
        handleDateChange,
        handleDismissError,
        handleErrorNotificationDismissal,
        handleFilterRangeChange,
        handleLeavingMaintenanceReportsCalendar,
        handleMaintenanceReportCancellation,
        handleMaintenanceReportDeletion,
        handleMaintenanceReportEdition,
        handleMaintenanceReportFormChange,
        handleMaintenanceReportSubmission,
        handleMaintenanceReportViewCancellation,
        handleShowingMaintenanceReports,
        handleStartingRecordingMaintenance,
        onDayPressed,
        onMonthChange,
        setErrorState,
        setIsLoading,
        setMaintenanceReportFormData,
        setMaintenanceReports,
        setSelectedReports,
    }
}
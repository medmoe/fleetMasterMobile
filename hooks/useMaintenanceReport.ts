import {useCallback, useState} from "react";
import {MaintenanceReportType, MaintenanceReportWithStringsType} from "@/types/maintenance";
import {getMaintenanceReportDatesInitialState, getMaintenanceReportFormInitialState, maintenanceReportInitialState} from "@/hooks/initialStates";
import {VehicleType} from "@/types/types";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {router} from "expo-router";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Alert} from "react-native";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";

export const useMaintenanceReport = (vehicle: VehicleType, maintenanceReports: MaintenanceReportWithStringsType[], setMaintenanceReports: (maintenanceReports: MaintenanceReportWithStringsType[]) => void) => {
    // Data state
    const [maintenanceReportFormData, setMaintenanceReportFormData] = useState<MaintenanceReportType>(getMaintenanceReportFormInitialState(vehicle))
    const [maintenanceReportDates, setMaintenanceReportDates] = useState(getMaintenanceReportDatesInitialState())
    const [isLoading, setIsLoading] = useState(false)
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
    const [maintenanceReport, setMaintenanceReport] = useState(maintenanceReportInitialState)
    const [activeFilter, setActiveFilter] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isMaintenanceReportPutRequest, setIsMaintenanceReportPutRequest] = useState(false)
    const searchingFilterLabels: string[] = ["7D", "2W", "4W", "3M", "1Y"]

    // Data fetching
    const fetchMaintenanceReport = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${API}maintenance/overview/`, {withCredentials: true});
            setMaintenanceReport(response.data);
        } catch (error: any) {
            if (error.response.status === 401) {
                router.replace("/");
            } else {
                setIsVisible(true);
                setErrorMessage("Error fetching maintenance overview !");
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
                setIsVisible(true);
                setErrorMessage("Error saving maintenance report!");
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
    return {
        // State
        maintenanceReport,
        maintenanceReportDates,
        maintenanceReportFormData,
        showMaintenanceForm,
        activeFilter,
        isVisible,
        errorMessage,
        isMaintenanceReportPutRequest,
        isLoading,
        searchingFilterLabels,

        //methods
        fetchMaintenanceReport,
        handleFilterRangeChange,
        handleStartingRecordingMaintenance,
        handleCancelingRecordingMaintenance,
        handleDateChange,
        handleMaintenanceReportFormChange,
        handleMaintenanceReportSubmission,
        handleShowingMaintenanceReports,
        handleErrorNotificationDismissal,
        handleMaintenanceReportCancellation,
        setMaintenanceReportFormData,
    }
}
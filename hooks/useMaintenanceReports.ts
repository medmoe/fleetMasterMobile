import { useState, useCallback, useReducer } from "react";
import { DateData } from "react-native-calendars";
import { Alert } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { API } from "@/constants/endpoints";
import { MaintenanceReportWithStringsType } from "@/types/maintenance";

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
      return { ...resetState, showSelectedReports: true };
    case 'SHOW_MAINTENANCE_REPORT':
      return { ...resetState, showMaintenanceReport: true };
    case 'SHOW_SERVICE_PROVIDER_FORM':
      return { ...resetState, showServiceProviderEventForm: true };
    case 'SHOW_PART_PURCHASE_FORM':
      return { ...resetState, showPartPurchaseEventForm: true };
    case 'RESET':
      return resetState;
    default:
      return state;
  }
};

export const useMaintenanceReports = (vehicleId: string) => {
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
    showSelectedReports: () => dispatch({ type: 'SHOW_SELECTED_REPORTS' }),
    showMaintenanceReport: () => dispatch({ type: 'SHOW_MAINTENANCE_REPORT' }),
    showServiceProviderEventForm: () => dispatch({ type: 'SHOW_SERVICE_PROVIDER_FORM' }),
    showPartPurchaseEventForm: () => dispatch({ type: 'SHOW_PART_PURCHASE_FORM' }),
    reset: () => dispatch({ type: 'RESET' }),
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

  // Data fetching
  const fetchMaintenanceReports = useCallback(async () => {
    setDisplayLoadingIndicator(true);
    try {
      const url = `${API}maintenance/reports/?vehicle_id=${vehicleId}&year=${year}&month=${month}`;
      const options = { headers: { 'Content-Type': "application/json" }, withCredentials: true };
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
  }, [vehicleId, year, month]);

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
              const options = { headers: {"Content-Type": "application/json"}, withCredentials: true };
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
      { cancelable: true }
    );
  };

  const handleLeavingMaintenanceReportsCalendar = () => {
    router.replace("/maintenance/maintenance-report");
  };

  return {
    // State
    maintenanceReports,
    selectedReports,
    currentDate,
    isLoading,
    displayLoadingIndicator,
    errorState,
    month,
    year,
    view,
    maintenanceReportToEdit,

    // Methods
    handleDismissError,
    fetchMaintenanceReports,
    onMonthChange,
    onDayPressed,
    handleMaintenanceReportViewCancellation,
    handleCollapse,
    handleMaintenanceReportEdition,
    handleMaintenanceReportDeletion,
    handleLeavingMaintenanceReportsCalendar,
    setView
  };
};

// // Other hooks (similarly structured)
// export const useServiceProviderEvent = (maintenanceReports, selectedReports, setView) => {
//   // State and handlers for service provider events
//   // ...implementation similar to above
// };
//
// export const usePartPurchaseEvent = (maintenanceReports, selectedReports, setView) => {
//   // State and handlers for part purchase events
//   // ...implementation similar to above
// };
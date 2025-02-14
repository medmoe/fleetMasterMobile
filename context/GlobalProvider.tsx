import React, {createContext, ReactNode, useContext, useState} from "react";
import {DriverType, ResponseDataType, VehicleType} from "@/types/types";
import {driverStatus} from "@/constants/forms/driver";
import {vehicleStatus, vehicleTypes} from "@/constants/forms/vehicle";
import {MaintenanceReportWithStringsType, PartProviderType, PartType, ServiceProviderType} from "@/types/maintenance";

export type GeneralDataType = { parts: PartType[], part_providers: PartProviderType[], service_providers: ServiceProviderType[] }

type GlobalProviderProps = {
    children: ReactNode
}

interface ContextProps {
    responseData: ResponseDataType
    setResponseData: (data: ResponseDataType) => void
    isPostRequest: boolean
    setIsPostRequest: (isPostRequest: boolean) => void
    vehicle: VehicleType
    setVehicle: (vehicle: VehicleType) => void
    generalData: GeneralDataType
    setGeneralData: (generalData: GeneralDataType) => void
    maintenanceReports: MaintenanceReportWithStringsType[]
    setMaintenanceReports: (maintenanceReports: MaintenanceReportWithStringsType[]) => void
}

export const currentVehicleInitialState: VehicleType = {
    year: "2000",
    status: vehicleStatus.active,
    type: vehicleTypes[0].value,
    mileage: "0",
    capacity: "0",
}

export const currentDriverInitialState: DriverType = {
    first_name: "",
    last_name: "",
    phone_number: "",
    employment_status: driverStatus.active
}
export const responseDataInitialState: ResponseDataType = {
    user: {
        username: "",
        email: "",
    }
}
export const generalDataInitialState: GeneralDataType = {
    parts: [],
    part_providers: [],
    service_providers: [],
}

export const maintenanceReportsInitialState: MaintenanceReportWithStringsType[] = []

const GlobalContext = createContext<ContextProps>({
    setResponseData: () => {
    },
    responseData: responseDataInitialState,
    setIsPostRequest: () => {
    },
    isPostRequest: true,
    setVehicle: () => {
    },
    vehicle: currentVehicleInitialState,
    setGeneralData: () => {
    },
    generalData: generalDataInitialState,
    setMaintenanceReports: () => {
    },
    maintenanceReports: maintenanceReportsInitialState,
})

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [responseData, setResponseData] = useState<ResponseDataType>(responseDataInitialState);
    const [isPostRequest, setIsPostRequest] = useState(true);
    const [vehicle, setVehicle] = useState<VehicleType>(currentVehicleInitialState)
    const [generalData, setGeneralData] = useState<GeneralDataType>(generalDataInitialState)
    const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReportWithStringsType[]>(maintenanceReportsInitialState)
    return (
        <GlobalContext.Provider
            value={{
                responseData,
                setResponseData,
                isPostRequest,
                setIsPostRequest,
                vehicle,
                setVehicle,
                generalData,
                setGeneralData,
                maintenanceReports,
                setMaintenanceReports,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

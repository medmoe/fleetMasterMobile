import React, {createContext, ReactNode, useContext, useState} from "react";
import {DriverType, ResponseDataType, VehicleType} from "@/types/types";
import {driverStatus} from "@/constants/forms/driver";
import {vehicleStatus, vehicleTypes} from "@/constants/forms/vehicle";
import {PartProviderType, PartType} from "@/types/maintenance";

type GlobalProviderProps = {
    children: ReactNode
}

interface ContextProps {
    responseData: ResponseDataType
    setResponseData: (data: ResponseDataType) => void
    isPostRequest: boolean
    setIsPostRequest: (isPostRequest: boolean) => void
    currentItem: DriverType | VehicleType
    setCurrentItem: (item: DriverType | VehicleType) => void
    partProviders: PartProviderType[]
    setPartProviders: (partProviders: PartProviderType[]) => void
    parts: PartType[]
    setParts: (parts: PartType[]) => void
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

const GlobalContext = createContext<ContextProps>({
    setResponseData: () => {
    },
    responseData: responseDataInitialState,
    setIsPostRequest: () => {
    },
    isPostRequest: true,
    setCurrentItem: () => {
    },
    currentItem: currentVehicleInitialState,
    setPartProviders: () => {
    },
    partProviders: [],
    setParts: () => {},
    parts: []
})

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [responseData, setResponseData] = useState<ResponseDataType>(responseDataInitialState);
    const [isPostRequest, setIsPostRequest] = useState(true);
    const [currentItem, setCurrentItem] = useState<VehicleType | DriverType>(currentVehicleInitialState)
    const [partProviders, setPartProviders] = useState<PartProviderType[]>([])
    const [parts, setParts] = useState<PartType[]>([])
    return (
        <GlobalContext.Provider
            value={{
                responseData,
                setResponseData,
                setIsPostRequest,
                isPostRequest,
                setCurrentItem,
                currentItem,
                setPartProviders,
                partProviders,
                setParts,
                parts,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

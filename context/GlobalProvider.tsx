import React, {createContext, ReactNode, useContext, useState} from "react";
import {DriverType, ResponseDataType} from "@/types/types";
import {driverStatus} from "@/constants/forms/driver";

type GlobalProviderProps = {
    children: ReactNode
}

interface ContextProps {
    responseData: ResponseDataType,
    setResponseData: (data: ResponseDataType) => void
    currentDriver: DriverType
    setCurrentDriver: (driver: DriverType) => void
    isPostRequest: boolean
    setIsPostRequest: (isPostRequest: boolean) => void
}

const GlobalContext = createContext<ContextProps>({
    setResponseData: () => {
    },
    responseData: {
        user: {
            username: "",
            email: "",
        }
    },
    setCurrentDriver: (driver: DriverType) => {
    },
    currentDriver: {
        first_name: "",
        last_name: "",
        phone_number: "",
        employment_status: driverStatus.active
    },
    setIsPostRequest: () => {},
    isPostRequest: true
})

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [responseData, setResponseData] = useState<ResponseDataType>({
        user: {
            username: "",
            email: "",
        }
    })
    const [currentDriver, setCurrentDriver] = useState<DriverType>({
        first_name: "",
        last_name: "",
        phone_number: "",
        employment_status: driverStatus.active,
    });
    const [isPostRequest, setIsPostRequest] = useState(true)
    return (
        <GlobalContext.Provider
            value={{
                responseData,
                setResponseData,
                currentDriver,
                setCurrentDriver,
                setIsPostRequest,
                isPostRequest
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

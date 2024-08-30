import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {ResponseDataType} from "@/types/types";

type GlobalProviderProps = {
    children: ReactNode
}

interface ContextProps {
    responseData: ResponseDataType,
    setResponseData: (data: ResponseDataType) => void
}

const GlobalContext = createContext<ContextProps>({
    setResponseData: () => {},
    responseData: {
        user: {
            username: "",
            email: "",
        }
    }
})

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [responseData, setResponseData] = useState<ResponseDataType>({
        user: {
            username: "",
            email: "",
        }
    })
    return (
        <GlobalContext.Provider
            value={{
                responseData,
                setResponseData,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

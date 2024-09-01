import {TEXT_ERROR, TEXT_SUCCESS, TEXT_WARNING} from "@/constants/constants";
import {PickerItemType} from "@/types/types";


export const vehicleStatusMapping: { [key: string]: [string, string] } = {
    "ACTIVE": [TEXT_SUCCESS, "Active"],
    "IN_MAINTENANCE": [TEXT_WARNING, "In maintenance"],
    "OUT_OF_SERVICE": [TEXT_ERROR, "Out of service"],
}
export const vehicleTypes: PickerItemType[] =
    [
        {label: "Car", value: "CAR"}, {label: "Truck", value: "TRUCK"}, {label: "Motorcycle", value: "MOTORCYCLE"}, {label: "Van", value: "VAN"}
    ]

export const vehicleStatuses: PickerItemType[] =
    [
        {label: "Active", value: "ACTIVE"}, {label: "In maintenance", value: "IN_MAINTENANCE"}, {label: "Out of service", value: "OUT_OF_SERVICE"}
    ]

export const fuelTypes: PickerItemType[] =
    [
        {label: "Regular", value: "REGULAR"}, {label: "Diesel", value: "DIESEL"}, {label: "Electricity", value: "ELECTRICITY"}
    ]

import {DriverType, VehicleType} from "@/types/types";

export const isPositiveInteger = (str: string): boolean => {
    if (!str) {
        return false
    }
    const pattern = new RegExp('^[0-9]\\d*$')
    return pattern.test(str)
}

export const getVehicleName = (vehicles: VehicleType[] | undefined, driver: DriverType): string => {
    if (vehicles) {
        const vehicle = vehicles.find((vehicle: VehicleType) => vehicle.id === driver.vehicle);
        if (vehicle) {
            return `${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim()
        }
    }
    return "Vehicle data not found";
}

export const getLocalDateString = (date?: Date): string => {
    return date?.toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"}) || "";
}



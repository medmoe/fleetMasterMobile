import {DriverType, VehicleType} from "@/types/types";

export function zip<T>(...arrays: T[][]): T[][] {
    const length = Math.min(...arrays.map(arr => arr.length));
    const result: T[][] = [];

    for (let i = 0; i < length; i++) {
        result.push(arrays.map(arr => arr[i]));
    }

    return result;
}


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
        if (vehicle){
            return `${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim()
        }
    }
    return "Vehicle data not found";
}

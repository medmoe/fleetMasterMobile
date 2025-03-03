import {DriverType, VehicleType} from "@/types/types";
import {ImageSourcePropType} from "react-native";
import {MaintenanceOverviewType, MaintenanceSummaryType} from "@/types/maintenance";
import {icons} from "@/constants/icons";

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
        if (vehicle) {
            return `${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim()
        }
    }
    return "Vehicle data not found";
}

export const getLocalDateString = (date?: Date): string => {
    return date?.toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"}) || "";
}

const formatValue = (num: number): string => {
    if (num >= 1000) {
        return `$${(num / 1000).toFixed(1)}k`;
    }
    return `$${num.toFixed(1)}`;
}
const formatPercentage = (value: number): string => {
    return `${value.toFixed(0)}%`;
}
export const getMaintenanceStatData = (maintenanceReport: MaintenanceOverviewType): [string, string, string, string, ImageSourcePropType][] => {
    return Object.keys(maintenanceReport.previous_report || {}).map((key): any => {
        const label = key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        const previousValue = maintenanceReport.previous_report[key as keyof MaintenanceSummaryType];
        const currentValue = maintenanceReport.current_report[key as keyof MaintenanceSummaryType];
        const currentValueNum = parseFloat(currentValue || "0");
        const previousValueNum = parseFloat(previousValue || "0");
        let percentageChange;
        if (previousValueNum === 0) {
            percentageChange = currentValueNum === 0 ? percentageChange = 0 : 100;
        } else {
            percentageChange = ((currentValueNum - previousValueNum) / previousValueNum) * 100;
        }
        const color = percentageChange > 0 ? "#e93c0c" : "#57b269";
        const icon = percentageChange > 0 ? icons.up : icons.down;
        let formattedValue;
        const keys: string[] = ["total_maintenance_cost", "preventive_cost", "curative_cost", "total_service_cost", "mechanic", "electrician", "cleaning"]
        if (keys.includes(key)) {
            formattedValue = formatValue(currentValueNum);
        } else {
            formattedValue = currentValueNum;
        }
        const formattedPercentage = formatPercentage(percentageChange);
        return [label, formattedValue, formattedPercentage, color, icon];
    })
}

export const transformMaintenanceStatData = (maintenanceStatData: [string, string, string, string, ImageSourcePropType][]) => {
    let result = []
    for (let i = 0; i < maintenanceStatData.length; i += 2) {
        result.push([maintenanceStatData[i], maintenanceStatData[i + 1]])
    }
    return result;
}

const TEXT_SUCCESS = "text-success";
const TEXT_WARNING = "text-warning";
const TEXT_ERROR = "text-error";

export const vehicleStatus = {
    active: "ACTIVE",
    in_maintenance: "IN_MAINTENANCE",
    out_of_service: "OUT_OF_SERVICE",
}

export const driverStatus = {
    active: "ACTIVE",
    inactive: "INACTIVE",
    on_leave: "ON_LEAVE",
}

type StatusMappingType = {[key: string]: [string, string]};

export const vehicleStatusMapping: StatusMappingType = {
    "ACTIVE": [TEXT_SUCCESS, "Active"],
    "IN_MAINTENANCE": [TEXT_WARNING, "In maintenance"],
    "OUT_OF_SERVICE": [TEXT_ERROR, "Out of service"],
}
export const driverStatusMapping: StatusMappingType = {
    "ACTIVE": [TEXT_SUCCESS, "Active"],
    "INACTIVE": [TEXT_WARNING, "Inactive"],
    "ON_LEAVE": [TEXT_ERROR, "On leave"],
}
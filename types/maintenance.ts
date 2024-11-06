export interface PartProviderType {
    id?: string
    name: string
    phone_number: string
    address: string
}

export interface PartPurchaseEventType {
    id?: string
    part: string
    provider: string
    purchase_date: string
    cost: string
}

export interface PartType {
    id?: number
    name: string
    description: string
}

export interface ServiceProviderType {
    id?: string
    name: string
    service_type: "MECHANIC" | "ELECTRICIAN" | "CLEANING"
    phone_number: string
    address: string
}

export interface MaintenanceReportType {
    id?: string
    vehicle: string
    service_provider: string
    parts: string[]
    maintenance_type: "PREVENTIVE" | "CURATIVE"
    start_date: string
    end_date: string
    cost: string
    mileage: string
    description: string
}

export type OverviewType = {
    previous_report : MaintenanceOverviewType,
    current_report : MaintenanceOverviewType,
}

export interface MaintenanceOverviewType {
    total_maintenance?: string
    total_maintenance_cost?: string
    preventive?: string
    preventive_cost?: string
    curative?: string
    curative_cost?: string
    total_service_cost?: string
    mechanic?: string
    electrician?: string
    cleaning?: string
}
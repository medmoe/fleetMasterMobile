export interface PartProviderType {
    id?: string
    name: string
    phone_number: string
    address: string
}

export interface DetailedPartPurchaseEventType extends PartPurchaseEventType {
    part_details: PartType
    provider_details: PartProviderType
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
    maintenance_type: "PREVENTIVE" | "CURATIVE"
    start_date: string
    end_date: string
    mileage: string
    description: string
    part_purchase_events: PartPurchaseEventType[]
    service_provider_events: ServiceProviderEventType[]
    vehicle_events: VehicleEventType[]
}

export interface PartPurchaseEventType {
    id?: string
    part: PartType
    provider: PartProviderType
    purchase_date: string
    cost: string
}

export interface ServiceProviderEventType {
    id?: string
    service_provider: ServiceProviderType
    service_date: string
    cost: string
    description: string
}

export interface VehicleEventType {
    vehicle: string
}

export type MaintenanceOverviewType = {
    previous_report: MaintenanceSummaryType,
    current_report: MaintenanceSummaryType,
}

export interface MaintenanceSummaryType {
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
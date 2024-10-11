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
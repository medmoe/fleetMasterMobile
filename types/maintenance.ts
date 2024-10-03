export interface PartProviderType {
    id: number
    name: string
    phone_number: string
    address: string
}

export interface PartPurchaseEventType {
    id?: string
    part: string
    provider: string
    purchase_date: string
    cost : string
}

export interface PartType {
    id: number
    name: string
    description: string
}
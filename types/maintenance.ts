export interface PartProviderType {
    id: number
    name: string
    phone_number: string
    address: string
}

export interface PartPurchaseFormDataType {
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
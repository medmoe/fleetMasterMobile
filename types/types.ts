export interface DriverType {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    licence_number: string
    licence_expiry_date: string
    date_of_birth: string
    address: string
    city: string
    state: string
    zip_code: string
    country: string
    hire_date: string
    employment_status: string
    emergency_contact_name: string
    emergency_contact_phone: string
    notes: string
}

export interface VehicleType {
    registration_number?: string
    make?: string
    model?: string
    year?: string
    vin?: string
    color?: string
    type: string
    status: string
    mileage?: string
    fuel_type?: string
    capacity?: string
    insurance_policy_number?: string
    notes?: string
    purchase_date?: string
    last_service_date?: string
    next_service_due?: string
    insurance_expiry_date?: string
    license_expiry_date?: string
}

export interface UserType {
    id?: number
    username: string
    first_name?: string
    last_name?: string
    email: string
}

export interface ResponseDataType {
    user: UserType
    phone?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zip_code?: string
    drivers?: DriverType[]
    vehicles?: VehicleType[]
}
import type { Control, FieldErrors } from 'react-hook-form'

export type BusinessEntityFields = {
    businessEntityType: string
}

export type BusinessDetailFields = {
    id:number;
    businessName: string; // Business name
    // registrationNo: string; // Business registration number
    // ntn: string; // NTN/STRN/PRA number
    // workingDays: number; // Number of working days
    // commencementDate: string; // Commencement date in ISO format
    name: string;
    district: string; // District name
    tehsil: string; // Tehsil name
    postalAddress: string; // Full postal address
    // postalCode: string; // Postal code (5 digits)
    // latitude: number; // Latitude (-90 to 90)
    // longitude: number; // Longitude (-180 to 180)
    // mobileOperator: string; // Mobile operator (e.g., Mobilink, Telenor)
    mobileNumber: string; // Mobile number in the format 0399-9999999
    // email: string; // Valid email address
    // website?: string; // Optional website URL
}

export type BusinessDetailIndividualFields = {
    id:number;
    name: string;
    ntn: string;
    district: string;
    tehsil: string;
    city: string;
    address: string;
    postalCode: string;
    email: string;
    latitude?: number;
    longitude?: number;
    mobileOperator: string;
    mobileNumber: string;
}

export type BusinessEntityFormSchema = BusinessEntityFields & BusinessDetailFields & BusinessDetailIndividualFields

export type FormSectionBaseProps = {
    control: Control<BusinessEntityFormSchema>
    errors: FieldErrors<BusinessEntityFormSchema>
}

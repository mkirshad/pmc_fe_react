import type { Control, FieldErrors } from 'react-hook-form'

export type ApplicantDetailFields = {
    firstName: string
    lastName: string
    applicantDesignation: string
    gender: string
    cnic: string
    email: string
    mobileOperator: string
    phoneNumber: string
    id:number
}

export type ApplicantDetailFormSchema = ApplicantDetailFields

export type FormSectionBaseProps = {
    control: Control<ApplicantDetailFormSchema>
    errors: FieldErrors<ApplicantDetailFormSchema>
}

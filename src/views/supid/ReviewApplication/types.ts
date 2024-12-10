import type { Control, FieldErrors } from 'react-hook-form'

export type ReviewFields = {
    remarks: string;       // List of products and installed capacity
    assignedGroup: 'APPLICANT' | 'LSO' | 'LSM' | 'LSM2' | 'DO' | 'TL' | 'MO' | 'Download License';         // Types and quantities of waste generated
}

export type ReviewFieldsFormSchema = ReviewFields

export type FormSectionBaseProps = {
    control: Control<ReviewFieldsFormSchema>
    errors: FieldErrors<ReviewFieldsFormSchema>
}

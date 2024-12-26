import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import BusinessEntitySection from './BusinessEntitySection'
import BusinessDetailSection from './BusinessDetailSection'
import BusinessDetailIndividualSection from './BusinessDetailIndividualSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { BusinessEntityFormSchema } from './types'
import useFormStore from '../../../store/supid/supidStore'

type CustomerFormProps = {
    onFormSubmit: (values: BusinessEntityFormSchema) => void
    defaultValues?: BusinessEntityFormSchema
    newCustomer?: boolean
    readOnly?: boolean; // Add this prop
    readOnlyDistrict?: boolean;
} & CommonProps

const validationSchema: ZodType<BusinessEntityFormSchema> = z.object({
    businessEntityType: z.string().min(1, { message: 'Business Entity Type is required' }),
})

// Define validation schema for BusinessDetailFields
const validationSchemaBusinessDetail = z.object({
    businessEntityType: z.string().min(1, { message: 'Business Entity Type is required' }),
    businessName: z
        .string()
        .min(1, { message: 'Business Name is required' })
        .max(100, { message: 'Business Name cannot exceed 100 characters' }),
    registrationNo: z
        .string()
        .min(1, { message: 'Business Registration Number is required' })
        .max(50, { message: 'Business Registration Number cannot exceed 50 characters' }).optional(),
    // ntn: z
    //     .string()
    //     .min(1, { message: 'NTN/STRN/PRA Number is required' })
    //     .regex(/^\d{7,15}$/, { message: 'NTN/STRN/PRA Number must be a valid number with 7-15 digits' }),
    workingDays: z
        .number()
        .min(1, { message: 'Working Days must be at least 1' })
        .max(365, { message: 'Working Days cannot exceed 365' }).optional(),
    commencementDate: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            { message: 'Commencement Date must be a valid date' }
        ).optional(),
    district: z
        .number()
        .min(1, { message: 'District is required' }).optional(),
    tehsil: z
        .number()
        .min(1, { message: 'Tehsil is required' }).optional(),
    postalAddress: z
        .string()
        .min(1, { message: 'Postal Address is required' })
        .max(200, { message: 'Postal Address cannot exceed 200 characters' }).optional(),
    postalCode: z
        .string()
        .regex(/^\d{5}$/, { message: 'Postal Code must be a valid 5-digit number' }).optional(),
    // latitude: z
    //     .number()
    //     .min(-90, { message: 'Latitude must be between -90 and 90' })
    //     .max(90, { message: 'Latitude must be between -90 and 90' }).optional(),
    // longitude: z
    //     .number()
    //     .min(-180, { message: 'Longitude must be between -180 and 180' })
    //     .max(180, { message: 'Longitude must be between -180 and 180' }).optional(),
    // mobileOperator: z
    //     .string()
    //     // .min(1, { message: 'Mobile Operator is required' }).optional()
    //     ,
    // mobileNumber: z
    //     .string()
    //     .regex(/^3\d{2}\d{7}$/, { message: 'Mobile number must be in the format 3999999999' })
    //     .refine((val) => val.length === 10, { message: 'Mobile number must be complete and in the format 3999999999' }), // Ensure exact length
    // email: z
    //     .string()
    //     .email({ message: 'Invalid Email Address' }),
    website: z
        .string()
        .url({ message: 'Website Address must be a valid URL' })
        .optional(),
});

// Validation Schema for BusinessDetailFields
const validationSchemabusinessDetailIndividual = z.object({
    businessEntityType: z
        .string()
        .min(1, { message: 'Business Entity Type is required' })
        // .default("Individual"), // Set the default value here
        ,
    name: z.string().min(1, { message: "Name is required" }),
    // ntn: z.string().regex(/^\d{7}$/, { message: "NTN/STRN/PRA No must be a valid 7-digit number" }),
    district: z.number().min(1, { message: "District selection is required" }),
    tehsil: z.number().min(1, { message: "Tehsil selection is required" }),
    city: z.string().optional(),
    postalAddress: z.string().min(1, { message: "Postal Address is required" }),
    // postalCode: z.string().regex(/^\d{5}$/, { message: "Postal Code must be a valid 5-digit number" }).optional(),
    // email: z
    //   .string()
    //   .email({ message: "Invalid email address" })
    //   .min(1, { message: "Email is required" }),
    // latitude: z.coerce
    //   .number()
    //   .min(-90, { message: "Latitude must be between -90 and 90" })
    //   .max(90, { message: "Latitude must be between -90 and 90" }).optional(),
    // longitude: z.coerce
    //   .number()
    //   .min(-180, { message: "Longitude must be between -180 and 180" })
    //   .max(180, { message: "Longitude must be between -180 and 180" }).optional(),
    // mobileOperator: z.string()
    // .min(1, { message: "Mobile Operator is required" }).optional()
    
    // mobileNumber: z
    //   .string()
    //   .regex(/^3\d{2}\d{7}$/, { message: 'Mobile number must be in the format 3999999999' })
    //     .refine((val) => val.length === 10, { message: 'Mobile number must be complete and in the format 3999999999' }), // Ensure exact length
  });

const BusinessEntityForm = (props: CustomerFormProps) => {
   // Destructure all needed state and actions from the Zustand store

// Destructure the desired state slices and functions
const {
    applicantDetail,
    updateApplicantDetail,
    resetApplicantDetail,
    businessDetail,
    updateBusinessDetail,
    resetBusinessDetail,
    businessDetailIndividual,
    updateBusinessDetailIndividual,
    resetBusinessDetailIndividual,
    businessEntity,
    updateBusinessEntity,
    resetBusinessEntity,
    resetAll,
    completedSections,
    getValuesFromStateBusinessEntity,
    markSectionAsCompleted,
} = useFormStore();

    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
        readOnly,
        readOnlyDistrict,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<BusinessEntityFormSchema>({
        defaultValues: {
            ...{
                banAccount: false,
                accountVerified: true,
            },
            ...defaultValues,
        },
        resolver: zodResolver( completedSections.includes('businessDetail')?validationSchemaBusinessDetail : completedSections.includes('businessDetailIndividual')? validationSchemabusinessDetailIndividual : validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        console.log('its in useEffect')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: BusinessEntityFormSchema) => {
        console.log('its here k1')
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        {/* <BusinessEntitySection control={control} errors={errors} /> */}
                        {/* {completedSections.includes('businessDetail') && <BusinessDetailSection control={control} errors={errors} />} */}
                         <BusinessDetailIndividualSection control={control} errors={errors} readOnly={readOnly} readOnlyDistrict = {readOnlyDistrict}></BusinessDetailIndividualSection>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default BusinessEntityForm

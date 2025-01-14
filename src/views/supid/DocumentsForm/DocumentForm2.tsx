import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import LicenseDetailSection from './DocumentSection2'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { LicenseDetailFormSchema } from './types'
import useFormStore from '../../../store/supid/supidStore'

type CustomerFormProps = {
    onFormSubmit: (values: LicenseDetailFormSchema) => void
    defaultValues?: LicenseDetailFormSchema
    newCustomer?: boolean
    readOnly?: boolean; // Add this prop
} & CommonProps


const validationSchema: ZodType<LicenseDetailFormSchema> = 
 z.object({
  existingFileId: z.string().optional(),
  flow_diagram: z
      .instanceof(File, { message: 'Document is required.' }).optional() // Ensure the value is a File instance
      .refine(
          (file) => !file || file.size <= 10 * 1024 * 1024, // Check file size
          { message: 'File must be smaller than 10 MB.' }
      )
       // Make the field mandatory
      
})
// .refine(
//   (data) => {
//     console.log(data.existingFileId)
//     // If there's no existing file ID, then flow_diagram is required
//     if ((data.existingFileId === 'false' || data.existingFileId === '') && !data.flow_diagram) {
//         return false;
//     }
//     return true;
// },
// {
//     message: "A new file or an existing file is required.",
//     // You can attach the error to either field. Here we attach it to "flow_diagram."
//     path: ["flow_diagram"],
// }
// )
;

// Base License Detail Fields
 const validationLicenseDetailFieldsSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
  });
  
  // Consumer License Detail Fields
 const validationLicenseDetailFieldsConsumerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
    productsCapacity: z.string().min(1, { message: 'Products Capacity is required' }),
    wasteGenerated: z.string().min(1, { message: 'Waste Generated is required' }),
    plasticWasteAcquired: z.string().min(1, { message: 'Plastic Waste Acquired is required' }),
  });
  
  // Collector License Detail Fields
 const validationLicenseDetailFieldsCollectorSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
    collectorName: z.string().min(1, { message: 'Collector Name is required' }),
    collectorCapacity: z.coerce.number().positive({ message: 'Collector Capacity must be a positive number' }),
  });
  
  const validationLicenseDetailFieldsProducerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    registration_required_for: z
      .array(z.string())
      .min(1, { message: 'At least one registration type is required.' }),
      registration_required_for_other: z
      .array(z.string()),
    single_use_plastic_items: z.array(z.string()).optional(),
    total_capacity_value: z
      .string()
      .min(1, { message: 'Total Capacity Value is required.' })
      .refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
        message: 'Total Capacity Value must be a positive number.',
      }).optional(),
    total_capacity_unit: z.string().min(1, { message: 'Total Capacity Unit is required.' }).optional(),
    registration_number: z.string().min(1, { message: 'Registration Number is required.' }).optional(),
    registration_date: z.string().min(1, { message: 'Registration Date is required.' }).optional(),
    date_of_setting_up: z.string().min(1, { message: 'Date of Setting Up is required.' }).optional(),
    date_of_commencement_of_production: z
      .string()
      .min(1, { message: 'Date of Commencement of Production is required.' }).optional(),
    flow_diagram: z
      .union([z.instanceof(File), z.null(), z.undefined()])
      .optional()
      .refine(file => {
        if (file === null || file === undefined) return true; // Skip validation if null or undefined
        return file.size <= 10 * 1024 * 1024; // Check file size
      }, {
        message: 'Flow Diagram must be a file smaller than 10 MB.',
      }).optional(),
    is_compliance_with_rules: z.boolean().optional(),
    valid_consent_permit: z.boolean().optional(),
    consent_permit: z
      .union([z.instanceof(File), z.null(), z.undefined()])
      .optional()
      .refine(file => {
        if (file === null || file === undefined) return true;
        return file.size <= 10 * 1024 * 1024;
      }, {
        message: 'Consent Permit must be a file smaller than 10 MB.',
      }).optional(),
    total_waste_generated_value: z
      .string()
      .min(1, { message: 'Total Waste Generated Value is required.' })
      .refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
        message: 'Total Waste Generated Value must be a positive number.',
      }).optional(),
    total_waste_generated_unit: z.string().min(1, { message: 'Total Waste Generated Unit is required.' }).optional(),
    is_waste_storage_capacity: z.boolean().optional(),
    is_waste_disposal_provision: z.boolean().optional(),
    personnel_or_consumers_list: z
      .union([z.instanceof(File), z.null(), z.undefined()])
      .optional()
      .refine(file => {
        if (file === null || file === undefined) return true;
        return file.size <= 10 * 1024 * 1024;
      }, {
        message: 'Personnel or Consumers List must be a file smaller than 10 MB.',
      }).optional(),
    action_plan: z
      .union([z.instanceof(File), z.null(), z.undefined()])
      .optional()
      .refine(file => {
        if (file === null || file === undefined) return true;
        return file.size <= 10 * 1024 * 1024;
      }, {
        message: 'Action Plan must be a file smaller than 10 MB.',
      }).optional(),
    // applicant: z.string().min(1, { message: 'Applicant is required.' }),
    products_list: z.array(z.string()).optional(),
    by_products_list: z.array(z.string()).optional()
  });
  
  
  // Recycler License Detail Fields
 const validationLicenseDetailFieldsRecyclerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
    registrationNumber: z.string().min(1, { message: 'Registration Number is required' }),
    totalCapacity: z.coerce.number().positive({ message: 'Total Capacity must be a positive number' }),
    complianceStatus: z.enum(['compliant', 'non_compliant'], {
      errorMap: () => ({ message: 'Compliance Status is required' }),
    }),
  });

const DocumentForm = (props: CustomerFormProps) => {
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
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        register,
        control
    } = useForm<LicenseDetailFormSchema>({
        defaultValues: {
            ...{
                banAccount: false,
                accountVerified: true,
            },
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        console.log('its in useEffect')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: LicenseDetailFormSchema) => {
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
                        <LicenseDetailSection control={control} errors={errors} register={register} readOnly={readOnly}/>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default DocumentForm

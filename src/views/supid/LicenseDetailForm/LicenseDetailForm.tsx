import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import LicenseDetailSection from './LicenseDetailSection'
import LicenseDetailCollectorSection from './LicenseDetailCollectorSection'
import LicenseDetailConsumerSection from './LicenseDetailConsumerSection'
import LicenseDetailProducerSection from './LicenseDetailProducerSection'
import LicenseDetailRecyclerSection from './LicenseDetailRecyclerSection'
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
} & CommonProps

const validationSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
})

// Base License Detail Fields
 const validationLicenseDetailFieldsSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: 'License Type is required' }),
  });
  
  // Consumer License Detail Fields
  const validationLicenseDetailFieldsConsumerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    registration_required_for: z
        .array(z.string())
        .min(1, { message: 'At least one registration type is required.' }),
    registration_required_for_other: z.array(z.string()).optional(),
    plain_plastic_Sheets_for_food_wrapping: z.array(z.string()).optional(),
    packaging_items: z.array(z.string()).optional(),
    consumption: z.string().optional(),

    provision_waste_disposal_bins: z.enum(['Yes', 'No'], {
        errorMap: () => ({ message: 'Please specify provision of waste disposal bins.' }),
    }).optional(),
    no_of_waste_disposable_bins: z
        .string()
        .optional()
,

    segregated_plastics_handed_over_to_registered_recyclers: z.enum(['Yes', 'No'], {
        errorMap: () => ({
            message: 'Please specify if segregated plastics are handed over to recyclers or collectors.',
        })
    }).optional(),
  registration_required_for_other_other_text: z.string().optional()
  });

  // Collector License Detail Fields
  const validationLicenseDetailFieldsCollectorSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.string().min(1, { message: "License Type is required" }),
  
    // Validation for registration_required_for
    registration_required_for: z
      .array(z.string())
      .min(1, { message: "At least one category of Single Use Plastics must be selected" }),
  
    // Validation for registration_required_for_other
    registration_required_for_other: z.array(z.string()).optional(),
  
    // Validation for selectedCategories
    selectedCategoriesCollector: z
      .array(
        z.object({
          category: z.string().optional(),
          address: z.string().optional(),
        })
      )
      .optional(),
  
    // Validation for collection capacity
    total_capacity_value_collector: z
      .coerce.number()
      .positive({ message: "Collection (Kg per day) must be a positive number" }),
  
    // Validation for number of vehicles
    number_of_vehicles: z
      .coerce.number()
      .positive({ message: "Number of vehicles must be a positive number" })
      .optional(),
  
    // Validation for number of persons
    number_of_persons: z
      .coerce.number()
      .positive({ message: "Number of persons must be a positive number" })
      .optional(),
    registration_required_for_other_other_text: z.string().optional()
  });
  
  const validationLicenseDetailFieldsProducerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    registration_required_for: z
      .array(z.string())
      .min(1, { message: 'At least one registration type is required.' }),
      registration_required_for_other: z
      .array(z.string()),
    plain_plastic_Sheets_for_food_wrapping: z.array(z.string()),
    PackagingItems: z.array(z.string()).optional(),
    single_use_plastic_items: z.array(z.string()).optional(),
    total_capacity_value: z
      .string()
      .refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
        message: 'Total Capacity Value must be a positive number.',
      }).optional(),
    number_of_machines: z.string().min(1, { message: 'Number of Machines are required.' }),
    total_capacity_unit: z.string().optional(),
    registration_number: z.string().optional(),
    registration_date: z.string().optional(),
    date_of_setting_up: z.string().optional(),
    date_of_commencement_of_production: z
      .string().optional(),    
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
      .optional(),
    // total_waste_generated_unit: z.string().min(1, { message: 'Total Waste Generated Unit is required.' }).optional(),
    has_waste_storage_capacity: z.string().min(1, { message: 'Waste Storage Capacity is required' }),
    waste_disposal_provision: z.string().min(1, { message: 'Waste Disposal Provision is required' }),


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
    by_products_list: z.array(z.string()).optional(),
    registration_required_for_other_other_text: z.string().optional()
  });
  
  
  // Recycler License Detail Fields
  const validationLicenseDetailFieldsRecyclerSchema: ZodType<LicenseDetailFormSchema> = z.object({
    licenseType: z.enum(['Producer', 'Consumer', 'Recycler', 'Collector'], {
        errorMap: () => ({ message: 'License Type is required' }),
    }),
    selectedCategories: z
        .array(
            z.object({
                category: z.string().min(1, { message: 'Category is required' }),
                wasteCollection: z.string().min(1, { message: 'Waste Collection is required' }),
                wasteDisposal: z.string().min(1, { message: 'Waste Disposal is required' }),
            })
        )
        .min(1, { message: 'At least one category must be selected' }),
    plastic_waste_acquired_through: z
        .array(z.string())
        .min(1, { message: 'At least one method of waste acquisition must be selected' }),
    has_adequate_pollution_control_systems: z.enum(['Yes', 'No'], {
        errorMap: () => ({ message: 'Please specify whether pollution control systems are adequate' }),
    }),
    pollution_control_details: z.string().optional()
  });

const LicenseDetailForm = (props: CustomerFormProps) => {
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
console.log(completedSections)
    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm<LicenseDetailFormSchema>({
        defaultValues: {
            ...{
                banAccount: false,
                accountVerified: true,
            },
            ...defaultValues,
        },
        resolver: zodResolver( completedSections.includes('licenseDetailProducer')?validationLicenseDetailFieldsProducerSchema : completedSections.includes('licenseDetailConsumer')? validationLicenseDetailFieldsConsumerSchema: completedSections.includes('licenseDetailCollector')? validationLicenseDetailFieldsCollectorSchema: completedSections.includes('licenseDetailRecycler')? validationLicenseDetailFieldsRecyclerSchema : validationSchema),
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
                        <LicenseDetailSection control={control} errors={errors} />
                        {completedSections.includes('licenseDetailProducer') &&  <LicenseDetailProducerSection control={control} errors={errors} />}
                        {completedSections.includes('licenseDetailConsumer') && <LicenseDetailConsumerSection control={control} errors={errors} />}
                        {completedSections.includes('licenseDetailRecycler') &&   <LicenseDetailRecyclerSection control={control} errors={errors} />}
                        {completedSections.includes('licenseDetailCollector') &&   <LicenseDetailCollectorSection control={control} errors={errors} />}
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default LicenseDetailForm

import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import LicenseDetailSection from './DocumentSection'
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
  flow_diagram: z
      .instanceof(File) // Ensure the value is a File instance
      .refine(
          (file) => file.size <= 10 * 1024 * 1024, // Check file size
          { message: 'File must be smaller than 10 MB.' }
      )
       // Make the field mandatory
      .refine(
          (file) => !!file, // Ensure the file is provided
          { message: 'File is required.' }
      ),
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
                        <LicenseDetailSection control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default DocumentForm

import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import ApplicantDetailSection from './ApplicantDetailSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ApplicantDetailFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: ApplicantDetailFormSchema) => void
    defaultValues?: ApplicantDetailFormSchema
    newCustomer?: boolean
    readOnly?: boolean; // Add this prop
} & CommonProps

const validationSchema: ZodType<ApplicantDetailFormSchema> = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    email: z
        .string()
        // .email({ message: 'Invalid email' }) // Ensure valid email format
        .optional(), // Make the field optional
    phoneNumber: z
        .string()
        .regex(/^3\d{2}\d{7}$/, { message: 'Mobile number must be in the format 3999999999' })
        .refine((val) => val.length === 10, { message: 'Mobile number must be complete and in the format 3999999999' }), // Ensure exact length
    // mobileOperator: z
        // .string()
        // .min(1, { message: 'Mobile Operator is required' }),
    cnic: z
        .string()
        .regex(/^\d{5}-\d{7}-\d{1}$/, { message: 'CNIC must be in the format 99999-9999999-9' })
        .refine((val) => val.length === 15, { message: 'CNIC must be complete and in the format 99999-9999999-9' }), // Ensure exact length
    gender: z.string().min(1, { message: 'Gender is required' }),
    applicantDesignation:z.string()
})

const ApplicantDetailForm = (props: CustomerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
        readOnly
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<ApplicantDetailFormSchema>({
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

    const onSubmit = (values: ApplicantDetailFormSchema) => {
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
                        <ApplicantDetailSection control={control} errors={errors} readOnly={readOnly} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ApplicantDetailForm

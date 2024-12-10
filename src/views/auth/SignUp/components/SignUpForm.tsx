import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { useSessionUser, useToken } from '@/store/authStore'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    setMessage?: (message: string) => void
}

type SignUpFormSchema = {
    username: string
    password: string
    email: string
    confirmPassword: string
}

const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        email: z.string({ required_error: 'Please enter your email' }),
        // userName: z.string({ required_error: 'Please enter your name' }),
        password: z.string({ required_error: 'Password Required' }),
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password not match',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, setMessage } = props
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser((state)=> state.setSessionSignedIn)
    const { token, setToken } = useToken()
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { signUp, signIn } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { userName, password, email } = values

        if (!disableSubmit) {
            setSubmitting(true)
            const result = await signUp({ username:email, password:password, email:'' })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }else{
                setSessionSignedIn(false)
                setToken('')
                const result2 = await signIn({ username:email, password:password })
                if (result2?.status === 'failed') {
                    setMessage?.(result.message)
                }else{
                    
                    setUser({"email":email, "userName":email.split('@')[0]})
                }
            }

            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)}>
                {/* <FormItem
                    label="User name"
                    invalid={Boolean(errors.userName)}
                    errorMessage={errors.userName?.message}
                >
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="User Name"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}
                <FormItem
                    label="Username"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Username"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Confirm Password"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm

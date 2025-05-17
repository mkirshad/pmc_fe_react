import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import { useSessionUser, useToken } from '@/store/authStore'
import AxiosBase from '../../../../services/axios/AxiosBase';

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    email: string
    password: string
    captcha_input: string
    captcha_token: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .min(1, { message: 'Please enter your email' }),

    password: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
    
    captcha_input: z
        .string({ required_error: 'Please enter the CAPTCHA' })
        .min(1, { message: 'Please enter the CAPTCHA' }),

    captcha_token: z
        .string({ required_error: 'CAPTCHA token missing' })
        .min(1, { message: 'CAPTCHA token missing' }),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [captchaImage, setCaptchaImage] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')


    const setUser = useSessionUser((state) => state.setUser)
    const { disableSubmit = false, className, setMessage, passwordHint } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const loadCaptcha = async () => {
        try {
            if (navigator.onLine) {
                const response = await AxiosBase.get('/accounts/generate-captcha/')
                const data = response.data
                setCaptchaImage(data.captcha_image)
                setCaptchaToken(data.captcha_token)
            } else {
                throw new Error('Application is offline. Cannot load CAPTCHA.')
            }
        } catch (error) {
            console.error('Error loading CAPTCHA:', error)
            setCaptchaImage('')
            setCaptchaToken('')
        }
    }
    
    useEffect(() => {
        loadCaptcha()
    }, [])

    const { signIn } = useAuth()

    const onSignIn = async (values: SignInFormSchema) => {
        
        const { email, password, captcha_input, captcha_token } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await signIn({ username: email, password: password, captcha_input : captcha_input, captcha_token : captcha_token })

            
            if (result?.status === 'failed') {
                if (result.message.includes('CAPTCHA')) {
                    setMessage?.('Incorrect CAPTCHA, please try again.')
                    await loadCaptcha()
                } else if (result.message.includes('400')) {
                    setMessage?.('Invalid Credentials!')
                } else {
                    setMessage?.('Technical Error! Please try again or email at fdm@epd.punjab.gov.pk')
                }                
                // setMessage?.(result.message)
            }else{
                setUser({"email":email, "userName":email.split('@')[0]})
            }
        }

        setSubmitting(false)
        
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignIn)}>
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
                    className={classNames(
                        passwordHint && 'mb-0',
                        errors.password?.message && 'mb-8',
                    )}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Enter Captcha">
                    <div className="flex items-center gap-2 mb-2">
                        <img
                            src={captchaImage}
                            alt="captcha"
                            className="h-16 w-auto rounded border shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={loadCaptcha}
                            className="text-blue-600 hover:text-blue-800"
                            title="Refresh CAPTCHA"
                        >
                            🔁
                        </button>
                    </div>
                    <Controller
                        name="captcha_input"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Enter CAPTCHA text"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                    <input type="hidden" value={captchaToken} {...register('captcha_token')} />
                </FormItem>
                {passwordHint}
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm

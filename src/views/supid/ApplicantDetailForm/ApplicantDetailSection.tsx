import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import InputMask from 'react-input-mask'; 

type OverviewSectionProps = FormSectionBaseProps

type Options = {
    label: string
    value: string
}[]


const genderList: Options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Rather not to say', value: 'Rather not to say' },
]

const mobileOperatorList : Options = [
            { value: 'Mobilink', label: 'Mobilink',},
            { value: 'Telenor', label: 'Telenor', },
            { value: 'Ufone', label: 'Ufone', },
            { value: 'Warid', label: 'Warid',},
        ]


const ApplicantDetailSection = ({ control, errors }: OverviewSectionProps) => {

    return (
        <Card>
            <h4 className="mb-6">Applicant Detail</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Name*"
                    invalid={Boolean(errors.firstName)}
                    errorMessage={errors.firstName?.message}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Designation"
                    invalid={Boolean(errors.applicantDesignation)}
                    errorMessage={errors.applicantDesignation?.message}
                >
                    <Controller
                        name="applicantDesignation"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Designation"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                
            <FormItem
                label="Gender*"
                invalid={Boolean(errors.gender)}
                errorMessage={errors.gender?.message}
                >
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={genderList}
                            value={genderList.filter(
                                (gender) => gender.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>


                <FormItem
                    label="CNIC*"
                    invalid={Boolean(errors.cnic)}
                    errorMessage={errors.cnic?.message}
                >
                    <Controller
                        name="cnic"
                        control={control}
                        render={({ field }) => (
                            <InputMask
                            mask="99999-9999999-9" // CNIC mask
                            placeholder="99999-9999999-9"
                            value={field.value} // Bind value to form state                            
                            onChange={(e) => field.onChange(e.target.value)} // Update form state on change
                            >
                               {(inputProps) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="CNIC"
                                        {...inputProps} // Pass InputMask props here
                                    />
                                )}
                            </InputMask>
                        )}
                        
                    />
                </FormItem>
                <FormItem
                    label="Email (Optional)"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

            <FormItem
                    label="Mobile Number*"
                    className="w-full"
                    invalid={
                        Boolean(errors.phoneNumber) || Boolean(errors.mobileOperator)
                    }
                    errorMessage={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <InputMask
                                mask="3999999999" // Apply mobile number mask
                                placeholder="3999999999"
                                value={field.value} // Bind value to form state                            
                                onChange={(e) => field.onChange(e.target.value)} // Update form state on change    
                            >
                            {(inputProps) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Mobile Number"
                                        {...inputProps} // Pass InputMask props here
                                    />
                                )}
                            </InputMask>
                        )}
                    />
                </FormItem>
                
            </div>

        </Card>
    )
}

export default ApplicantDetailSection

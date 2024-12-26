import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import React, { useEffect, useState } from 'react';
import AxiosBase from '../../../services/axios/AxiosBase' 
import InputMask from 'react-input-mask'; 
import useFormStore from '../../../store/supid/supidStore'

type BusinessDetailSectionIndividualProps = FormSectionBaseProps & {
    readOnly?: boolean; // Add this prop
};

// const mobileOperators = [
//     { value: 'Mobilink', label: 'Mobilink' },
//     { value: 'Telenor', label: 'Telenor' },
//     { value: 'Ufone', label: 'Ufone' },
//     { value: 'Warid', label: 'Warid' },
// ];
const entityTypes = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company', label: 'Company / Corporation / Partnership' },
];

const BusinessDetailSectionIndividual = ({ control, errors, readOnly = false }: BusinessDetailSectionIndividualProps) => {
    const [districts, setDistricts] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const {
        updateBusinessEntity,
        businessEntity, // If you need to access the current businessEntity state
        completedSections,
        businessDetailIndividual,
        markSectionAsCompleted,
    } = useFormStore();

    // Fetch districts on component mount
    useEffect(() => {
        markSectionAsCompleted('businessDetailIndividual', true)
        const response = AxiosBase.get(`/pmc/districts/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            const districtOptions = [
                { value: 0, label: 'Please select district' }, // Add this as the first option
                ...response.data.map((district) => ({
                    value: district.district_id,
                    label: district.district_name,
                })),
            ];
                 setDistricts(districtOptions);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });

        const response2 = AxiosBase.get(`/pmc/tehsils?district_id=${businessDetailIndividual.district||0}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                    const tehsilOptions = response.data.map(tehsil => ({
                        value: tehsil.tehsil_id,
                        label: tehsil.tehsil_name,
                    }));
                     setTehsils(tehsilOptions);
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
            
    }, []);

    // Fetch tehsils when a district is selected
    useEffect(() => {
        if (selectedDistrict) {
            const response = AxiosBase.get(`/pmc/tehsils/?district_id=${selectedDistrict}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                    const tehsilOptions = response.data.map(tehsil => ({
                        value: tehsil.tehsil_id,
                        label: tehsil.tehsil_name,
                    }));
                    setTehsils(tehsilOptions);
                })
                .catch(error => {
                    console.error('Error fetching tehsils:', error);
                });
        }
    }, [selectedDistrict]);
console.log(districts)
    return (
        <Card>
            <h4 className="mb-6">Business Detail</h4>
            <div className="grid md:grid-cols-2 gap-4">
                
            <FormItem
                    label="Business Entity Type*"
                    invalid={Boolean(errors.businessEntityType)}
                    errorMessage={errors.businessEntityType?.message}
                >
                    <Controller
                        name="businessEntityType"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                {entityTypes.map((option) => (
                                    <label key={option.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={option.value}
                                            checked={field.value === option.value  }
                                            disabled={readOnly}
                                            onChange={() => {
                                                field.onChange(option.value); // Update form state
                                                updateBusinessEntity({ businessEntityType: option.value }); // Update Zustand state
                                                markSectionAsCompleted('businessEntity', true)
                                                // if(option.value === 'Individual'){
                                                //     markSectionAsCompleted('businessDetail', false)
                                                //     markSectionAsCompleted('businessDetailIndividual', true)
                                                // }else if(option.value === 'Company'){
                                                //     markSectionAsCompleted('businessDetailIndividual', false)
                                                //     markSectionAsCompleted('businessDetail', true)
                                                // }
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    />
                </FormItem>

                {/* Name and NTN */}
                <FormItem
                    label="Name of business*"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Name"
                                readOnly={readOnly}
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {/* <FormItem
                    label="NTN/STRN/PRA No Individual"
                    invalid={Boolean(errors.ntn)}
                    errorMessage={errors.ntn?.message}
                >
                    <Controller
                        name="ntn"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="NTN/STRN/PRA No"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}

{/* District Selection */}
                <FormItem
                    label="District*"
                    invalid={Boolean(errors.district)}
                    errorMessage={errors.district?.message}
                >
                    <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={districts}
                                placeholder="Select District"
                                value={districts.find((option) => option.value === field.value)}
                                isDisabled={readOnly}
                                onChange={(option) => {
                                    field.onChange(option?.value);
                                    setSelectedDistrict(option?.value); // Update selected district
                                }}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Tehsil*"
                    invalid={Boolean(errors.tehsil)}
                    errorMessage={errors.tehsil?.message}
                >
                    <Controller
                        name="tehsil"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={tehsils}
                                placeholder="Select Tehsil"
                                value={tehsils.find(option => option.value === field.value)}
                                isDisabled={readOnly}
                                onChange={(option) => field.onChange(option?.value)}
                            />
                        )}
                    />
                </FormItem>

                {/* City and Postal Address */}
                <FormItem
                    label="City/Town/Village"
                    invalid={Boolean(errors.city)}
                    errorMessage={errors.city?.message}
                >
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="City/Town/Village"
                                readOnly={readOnly}
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Address*"
                    invalid={Boolean(errors.postalAddress)}
                    errorMessage={errors.postalAddress?.message}
                >
                    <Controller
                        name="postalAddress"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Postal Address"
                                readOnly={readOnly}
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {/* Postal Code and Email
                <FormItem
                    label="Postal Code"
                    invalid={Boolean(errors.postalCode)}
                    errorMessage={errors.postalCode?.message}
                >
                    <Controller
                        name="postalCode"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Postal Code"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}

                {/* <FormItem
                    label="Email"
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
                </FormItem> */}

                {/* Latitude and Longitude */}
                {/* <FormItem
                    label="Location Latitude"
                    invalid={Boolean(errors.latitude)}
                    errorMessage={errors.latitude?.message}
                >
                    <Controller
                        name="latitude"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder="Location Latitude"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Location Longitude"
                    invalid={Boolean(errors.longitude)}
                    errorMessage={errors.longitude?.message}
                >
                    <Controller
                        name="longitude"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder="Location Longitude"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}

                {/* Mobile Operator and Mobile Number */}
                {/* <FormItem
                    label="Mobile Operator"
                    invalid={Boolean(errors.mobileOperator)}
                    errorMessage={errors.mobileOperator?.message}
                >
                    <Controller
                        name="mobileOperator"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={mobileOperators}
                                placeholder="Select Mobile Operator"
                                value={mobileOperators.find(option => option.value === field.value)}
                                onChange={(option) => field.onChange(option?.value)}
                            />
                        )}
                    />
                </FormItem> */}

                {/* <FormItem
                    label="Mobile Number*"
                    invalid={Boolean(errors.mobileNumber)}
                    errorMessage={errors.mobileNumber?.message}
                >
                    
                    <Controller
                        name="mobileNumber"
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
                </FormItem> */}
            </div>
        </Card>
    );
};

export default BusinessDetailSectionIndividual;

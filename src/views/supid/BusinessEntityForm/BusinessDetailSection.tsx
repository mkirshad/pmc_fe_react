import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import InputMask from 'react-input-mask'; 
import React, { useEffect, useState } from 'react';
import AxiosBase from '../../../services/axios/AxiosBase'

type BusinessDetailSectionProps = FormSectionBaseProps;


const registrationTypes = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company / Corporation / Partnership', label: 'Company / Corporation / Partnership' },
];



// const mobileOperators = [
//     { value: 'Mobilink', label: 'Mobilink' },
//     { value: 'Telenor', label: 'Telenor' },
//     { value: 'Ufone', label: 'Ufone' },
//     { value: 'Warid', label: 'Warid' },
// ];

const BusinessDetailSection = ({ control, errors }: BusinessDetailSectionProps) => {
    const [entityType, setEntityType] = useState('');
    
    const [districts, setDistricts] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const response = AxiosBase.get(`/pmc/districts/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
                const districtOptions = response.data.map(district => ({
                    value: district.district_id,
                    label: district.district_name,
                }));
                 setDistricts(districtOptions);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });

        const response2 = AxiosBase.get(`/pmc/tehsils/`, {
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

    return (
        <Card>
            <h4 className="mb-6">Company / Corporation / Partnership Detail</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Business Name and Registration Type */}
                <FormItem
                    label="Business Name"
                    invalid={Boolean(errors.businessName)}
                    errorMessage={errors.businessName?.message}
                >
                    <Controller
                        name="businessName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Business Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                

                {/* Registration No and NTN */}
                {/* <FormItem
                    label="Business Registration No"
                    invalid={Boolean(errors.registrationNo)}
                    errorMessage={errors.registrationNo?.message}
                >
                    <Controller
                        name="registrationNo"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Business Registration No"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}

                {/* <FormItem
                    label="NTN STRN PRA No Company"
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

                {/* Working Days and Commencement Date */}
                {/* <FormItem
                    label="Working Days"
                    invalid={Boolean(errors.workingDays)}
                    errorMessage={errors.workingDays?.message}
                >
                    <Controller
                        name="workingDays"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder="Working Days"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Commencement Date"
                    invalid={Boolean(errors.commencementDate)}
                    errorMessage={errors.commencementDate?.message}
                >
                    <Controller
                        name="commencementDate"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                autoComplete="off"
                                placeholder="Commencement Date"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}

                {/* District and Tehsil */}
                <FormItem
                    label="District"
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
                                onChange={(option) => {
                                    field.onChange(option?.value);
                                    setSelectedDistrict(option?.value); // Update selected district
                                }}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Tehsil"
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
                                onChange={(option) => field.onChange(option?.value)}
                            />
                        )}
                    />
                </FormItem>

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
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {/* Postal Address and Postal Code */}
                <FormItem
                    label="Postal Address"
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
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {/* <FormItem
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
                    label="Mobile Number"
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

                {/* Email and Website Address */}
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

                {/* <FormItem
                    label="Website Address"
                    invalid={Boolean(errors.website)}
                    errorMessage={errors.website?.message}
                >
                    <Controller
                        name="website"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Website Address"
                                {...field}
                            />
                        )}
                    />
                </FormItem> */}
            </div>
        </Card>
    );
};

export default BusinessDetailSection;

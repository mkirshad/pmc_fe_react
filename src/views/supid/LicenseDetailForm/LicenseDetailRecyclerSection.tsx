import React from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { FormItem } from '@/components/ui/Form';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { Divider } from '@mui/material';
import Radio from '@/components/ui/Radio'
import type { FormSectionBaseProps } from './types';

type BusinessDetailSectionIndividualProps = FormSectionBaseProps & {
    readOnly?: boolean; // Add this prop
};

const categories = [
    { value: 'Carry bags', label: 'Carry Bags' },
    { value: 'Packaging except food', label: 'Packaging' },
    { value: 'Plastic Utensils', label: 'Plastic Utensils (Box, Bottle, Bin, Bowl, Tray etc.)' },
    { value: 'Plastic Pipes & Fittings', label: 'Plastic Pipes (Flexible, Rigid, etc.) & Fittings' },
    { value: 'PET Bottles', label: 'PET Bottles' },
    { value: 'Plastic Furniture', label: 'Plastic Furniture (Chair, Table etc.)' },
    { value: 'Plastic Sheet', label: 'Plastic Sheets & Films' },
    { value: 'Others', label: 'Others' },
];




const LicenseDetailRecyclerSection = ({ control, errors, readOnly = false }: BusinessDetailSectionIndividualProps) => {
    const { fields, append, remove } = useFieldArray<{
        category: string;
        wasteCollection: number;
        wasteDisposal: number;
    }>({
        control : control || {},
        name: 'selectedCategories',
    });

    const handleCheckboxChange = (checked: boolean, category: string) => {
        if (checked) {
            append({ category, address: '' });
        } else {
            const index = fields.findIndex((field) => field.category === category);
            if (index !== -1) remove(index);
        }
    };


    const has_adequate_pollution_control_systems = useWatch({
        control,
        name: 'has_adequate_pollution_control_systems',
        defaultValue: 'No', // Ensure it's an array
    });

    return (
        <Card>
            <h4 className="mb-6">Detail - Recycler</h4>
            <div className="w-full">
            <FormItem
                label="Source of Disposal*"
                invalid={Boolean(errors.selectedCategoriesCollector)}
                errorMessage={errors.selectedCategoriesCollector?.message}
                className="w-full" // Ensure FormItem spans full width
            >
                {categories.map((category) => (
                    <div
                        key={category.value}
                        className="flex items-center gap-4 mb-5 w-full" // Full-width category container
                    >
                        <Checkbox
                            value={category.value}
                            checked={fields.some((field) => field.category === category.value)}
                            readOnly={readOnly}
                            onChange={(e: boolean) => handleCheckboxChange(e, category.value)}
                            className="flex-grow w-1/2" // Checkbox grows to fill available space
                        >
                            {category.label}
                        </Checkbox>
                        {fields.some((field) => field.category === category.value) && (
                            <div className="flex gap-2 w-full">
                                <div className="flex flex-col w-full">
                                    <label className="text-sm text-gray-700">
                                        Address
                                    </label>
                                    <Controller
                                        name={`selectedCategoriesCollector.${fields.findIndex(
                                            (field) => field.category === category.value
                                        )}.address`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="Enter address"
                                                readOnly={readOnly}
                                                {...field}
                                                className="w-full" // Full-width input
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </FormItem>

                </div>

            <div className="mb-4">
                <Divider textAlign="left" />
            </div>
            <div className="grid md:grid-cols-1 gap-4">
            <FormItem
                    label="Plastic waste acquired through"
                    invalid={Boolean(errors.registration_required_for_other)}
                    errorMessage={errors.registration_required_for_other?.message}
                    >
                    <Controller
                        name="plastic_waste_acquired_through"
                        control={control}
                        render={({ field }) => (
                        <Checkbox.Group
                            value={field.value || []} // Ensure the value is an array
                            onChange={(selectedValues) => field.onChange(selectedValues)}
                            className="flex  gap-2"
                        >
                            <Checkbox value="Collector" readOnly={readOnly}>Collector</Checkbox>
                            <Checkbox value="Auction" readOnly={readOnly}>Auction</Checkbox>
                            <Checkbox value="Contract" readOnly={readOnly}>Contract</Checkbox>
                            <Checkbox value="Import" readOnly={readOnly}>Import</Checkbox>
                       
                        </Checkbox.Group>
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                        label="Has adequate pollution control systems or equipment to meet the standards of emission or effluent?*"
                        invalid={Boolean(errors.has_adequate_pollution_control_systems)}
                        errorMessage={errors.has_adequate_pollution_control_systems?.message}
                    >
                        <Controller
                            name="has_adequate_pollution_control_systems"
                            control={control}
                            // rules={{ required: 'Waste storage capacity is required' }}
                            render={({ field }) => (
                                <div className="flex gap-4">
                                    <Radio
                                        {...field}
                                        checked={field.value === 'Yes'}
                                        value="Yes"
                                        readOnly={readOnly}
                                        onChange={() => field.onChange('Yes')}
                                    >
                                        Yes
                                    </Radio>
                                    <Radio
                                        {...field}
                                        checked={field.value === 'No'}
                                        value="No"
                                        readOnly={readOnly}
                                        onChange={() => field.onChange('No')}
                                    >
                                        No
                                    </Radio>
                                </div>
                            )}
                        />
                    </FormItem>

                
                {has_adequate_pollution_control_systems === 'Yes' &&
                    <FormItem
                        label="Details"
                        invalid={Boolean(errors.pollution_control_details)}
                        errorMessage={errors.pollution_control_details?.message}
                    >
                        <Controller
                            name="pollution_control_details"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Details"
                                    readOnly={readOnly}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                    </FormItem>
                }
                </div>

        </Card>
    );
};

export default LicenseDetailRecyclerSection;

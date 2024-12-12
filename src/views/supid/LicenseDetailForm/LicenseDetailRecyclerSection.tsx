import React from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { FormItem } from '@/components/ui/Form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Divider } from '@mui/material';
import Radio from '@/components/ui/Radio'

type BusinessDetailSectionIndividualProps = {
    control: any;
    errors: any;
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

const LicenseDetailRecyclerSection = ({ control, errors }: BusinessDetailSectionIndividualProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'selectedCategories',
    });

    const handleCheckboxChange = (checked: boolean, category: string) => {
        if (checked) {
            append({ category, wasteGeneration: '', wasteCollection: '' });
        } else {
            const index = fields.findIndex((field) => field.category === category);
            if (index !== -1) remove(index);
        }
    };

    return (
        <Card>
            <h4 className="mb-6">Detail - Recycler</h4>
            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="Categories of Plastics"
                    invalid={Boolean(errors.selectedCategories)}
                    errorMessage={errors.selectedCategories?.message}
                >
                    {categories.map((category) => (
                        <div
                            key={category.value}
                            className="flex items-center gap-4 mb-5" // Added mb-5 for spacing
                        >
                            <Checkbox
                                value={category.value}
                                checked={fields.some((field) => field.category === category.value)}
                                onChange={(e: boolean) => handleCheckboxChange(e, category.value)}
                                className="flex-grow" // Checkbox takes more space
                            >
                                {category.label}
                            </Checkbox>
                            {fields.some((field) => field.category === category.value) && (
                                <div className="flex gap-2 w-full">
                                    <Controller
                                        name={`selectedCategories.${fields.findIndex(
                                            (field) => field.category === category.value
                                        )}.wasteGeneration`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Waste Generation Kg per day"
                                                {...field}
                                                className="w-1/4" // Reduced width for input
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`selectedCategories.${fields.findIndex(
                                            (field) => field.category === category.value
                                        )}.wasteCollection`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Waste Collection Kg per"
                                                {...field}
                                                className="w-1/4" // Reduced width for input
                                            />
                                        )}
                                    />
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
                    label="Categories for Other Plastics"
                    invalid={Boolean(errors.registration_required_for_other)}
                    errorMessage={errors.registration_required_for_other?.message}
                    >
                    <Controller
                        name="registration_required_for_other"
                        control={control}
                        render={({ field }) => (
                        <Checkbox.Group
                            value={field.value || []} // Ensure the value is an array
                            onChange={(selectedValues) => field.onChange(selectedValues)}
                            className="flex  gap-2"
                        >
                            <Checkbox value="Sale">Sale</Checkbox>
                            <Checkbox value="Auction">Auction</Checkbox>
                            <Checkbox value="Contract">Contract</Checkbox>
                            <Checkbox value="Import">Import</Checkbox>
                       
                        </Checkbox.Group>
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                        label="Has adequate pollution control systems or equipment to meet the standards of emission or effluent?*"
                        invalid={Boolean(errors.has_waste_storage_capacity)}
                        errorMessage={errors.has_waste_storage_capacity?.message}
                    >
                        <Controller
                            name="has_waste_storage_capacity"
                            control={control}
                            rules={{ required: 'Waste storage capacity is required' }}
                            render={({ field }) => (
                                <div className="flex gap-4">
                                    <Radio
                                        {...field}
                                        checked={field.value === 'Yes'}
                                        value="Yes"
                                        onChange={() => field.onChange('Yes')}
                                    >
                                        Available
                                    </Radio>
                                    <Radio
                                        {...field}
                                        checked={field.value === 'No'}
                                        value="No"
                                        onChange={() => field.onChange('No')}
                                    >
                                        Not Available
                                    </Radio>
                                </div>
                            )}
                        />
                    </FormItem>

                

                <FormItem
                    label="Details"
                    invalid={Boolean(errors.date_of_setting_up)}
                    errorMessage={errors.date_of_setting_up?.message}
                >
                    <Controller
                        name="details"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Details"
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </FormItem>
                </div>

        </Card>
    );
};

export default LicenseDetailRecyclerSection;

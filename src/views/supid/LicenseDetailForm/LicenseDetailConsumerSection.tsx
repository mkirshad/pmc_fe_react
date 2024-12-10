import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import { useState } from 'react';

type BusinessDetailSectionProps = FormSectionBaseProps;


const registrationTypes = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company / Corporation / Partnership', label: 'Company / Corporation / Partnership' },
];

const districts = [
    { value: 'Gujranwala', label: 'Gujranwala' },
    { value: 'Lahore', label: 'Lahore' },
    // Add other options as necessary
];

const tehsils = [
    { value: 'Aroop Town', label: 'Aroop Town' },
    // Add other options as necessary
];

const mobileOperators = [
    { value: 'Mobilink', label: 'Mobilink' },
    { value: 'Telenor', label: 'Telenor' },
    { value: 'Ufone', label: 'Ufone' },
    { value: 'Warid', label: 'Warid' },
];

const LicenseDetailConsumerSection = ({ control, errors }: BusinessDetailSectionProps) => {
    
    return (
        <Card>
            <h4 className="mb-6">Detail - Consumer</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Business Name and Registration Type */}
                <FormItem
                label="Products and Capacity"
                invalid={Boolean(errors.productsCapacity)}
                errorMessage={errors.productsCapacity?.message}
            >
                <Controller
                    name="productsCapacity"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            placeholder="List of Products and Installed Capacity"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Waste Generated"
                invalid={Boolean(errors.wasteGenerated)}
                errorMessage={errors.wasteGenerated?.message}
            >
                <Controller
                    name="wasteGenerated"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            placeholder="Waste generated in processing (types and quantities)"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Plastic Waste Acquired"
                invalid={Boolean(errors.plasticWasteAcquired)}
                errorMessage={errors.plasticWasteAcquired?.message}
            >
                <Controller
                    name="plasticWasteAcquired"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            placeholder="Plastic Waste Acquired"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            </div>
        </Card>
    );
};

export default LicenseDetailConsumerSection;

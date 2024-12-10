import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';

type BusinessDetailSectionIndividualProps = FormSectionBaseProps;

const districts = [
    { value: 'Gujranwala', label: 'Gujranwala' },
    { value: 'Lahore', label: 'Lahore' },
    // Add more options as necessary
];

const tehsils = [
    { value: 'Aroop Town', label: 'Aroop Town' },
    // Add more options as necessary
];

const mobileOperators = [
    { value: 'Mobilink', label: 'Mobilink' },
    { value: 'Telenor', label: 'Telenor' },
    { value: 'Ufone', label: 'Ufone' },
    { value: 'Warid', label: 'Warid' },
];

const LicenseDetailRecyclerSection = ({ control, errors }: BusinessDetailSectionIndividualProps) => {
    return (
        <Card>
            <h4 className="mb-6">Detail - Recycler</h4>
            <div className="grid md:grid-cols-2 gap-4">
                
                {/* Name and NTN */}
                <FormItem
                label="Registration Number"
                invalid={Boolean(errors.registrationNumber)}
                errorMessage={errors.registrationNumber?.message}
            >
                <Controller
                    name="registrationNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            placeholder="Registration Number"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Total Capacity"
                invalid={Boolean(errors.totalCapacity)}
                errorMessage={errors.totalCapacity?.message}
            >
                <Controller
                    name="totalCapacity"
                    control={control}
                    render={({ field }) => (
                        <NumericInput
                            placeholder="Total Capacity in Tons"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Compliance Status"
                invalid={Boolean(errors.complianceStatus)}
                errorMessage={errors.complianceStatus?.message}
            >
                <Controller
                    name="complianceStatus"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Select Compliance Status"
                            options={[
                                { value: 'compliant', label: 'Compliant' },
                                { value: 'non_compliant', label: 'Non-Compliant' },
                            ]}
                            {...field}
                        />
                    )}
                />
            </FormItem>
            </div>
        </Card>
    );
};

export default LicenseDetailRecyclerSection;

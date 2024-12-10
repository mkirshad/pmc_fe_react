import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';

type LicenseDetailSectionProps = FormSectionBaseProps;

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

const LicenseDetailCollectorSection = ({ control, errors }: LicenseDetailSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Detail - Collector</h4>
            <div className="grid md:grid-cols-2 gap-4">
                
                <FormItem
                    label="Collector Name"
                    invalid={Boolean(errors.collectorName)}
                    errorMessage={errors.collectorName?.message}
                >
                    <Controller
                        name="collectorName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Collector Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Collector Capacity"
                    invalid={Boolean(errors.collectorCapacity)}
                    errorMessage={errors.collectorCapacity?.message}
                >
                    <Controller
                        name="collectorCapacity"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                placeholder="Capacity in Tons"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    );
};

export default LicenseDetailCollectorSection;

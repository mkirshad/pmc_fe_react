import Card from '@/components/ui/Card';
import { FormItem } from '@/components/ui/Form';
import { Controller } from 'react-hook-form';
// import { useState } from 'react';
import type { FormSectionBaseProps } from './types';
import useFormStore from '../../../store/supid/supidStore'

type BusinessDetailSectionProps = FormSectionBaseProps;

const licenseTypes = [
    { value: 'Producer', label: 'Producer' },
    { value: 'Consumer', label: 'Stockist/Distributor/Retailer/Supplier' },
    { value: 'Collector', label: 'Collector' },    
    { value: 'Recycler', label: 'Recycler' },
];

const LicenseDetailSection = ({ control, errors }: BusinessDetailSectionProps) => {
    // const [entityType, setEntityType] = useState('');
    const {
        updateLicenseDetail,
        markSectionAsCompleted,
    } = useFormStore();

    return (
        <Card>
            <h4 className="mb-6">License Type</h4>
            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="License Type"
                    invalid={Boolean(errors.licenseType)}
                    errorMessage={errors.licenseType?.message}
                >
                    <Controller
                        name="licenseType"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-row gap-4"> {/* Changed flex-col to flex-row */}
                                {licenseTypes.map((option) => (
                                    <label key={option.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={option.value}
                                            checked={field.value === option.value}
                                            onChange={() => {
                                                field.onChange(option.value); // Update form state
                                                updateLicenseDetail({ licenseType: option.value }); // Update Zustand state
                                                markSectionAsCompleted('licenseDetail', true)
                                                if (option.value === 'Producer') {
                                                    markSectionAsCompleted('licenseDetailProducer', true)
                                                    markSectionAsCompleted('licenseDetailConsumer', false)
                                                    markSectionAsCompleted('licenseDetailCollector', false)
                                                    markSectionAsCompleted('licenseDetailRecycler', false)
                                                } else if (option.value === 'Consumer') {
                                                    markSectionAsCompleted('licenseDetailProducer', false)
                                                    markSectionAsCompleted('licenseDetailConsumer', true)
                                                    markSectionAsCompleted('licenseDetailCollector', false)
                                                    markSectionAsCompleted('licenseDetailRecycler', false)
                                                } if (option.value === 'Collector') {
                                                    markSectionAsCompleted('licenseDetailProducer', false)
                                                    markSectionAsCompleted('licenseDetailConsumer', false)
                                                    markSectionAsCompleted('licenseDetailCollector', true)
                                                    markSectionAsCompleted('licenseDetailRecycler', false)
                                                } if (option.value === 'Recycler') {
                                                    markSectionAsCompleted('licenseDetailProducer', false)
                                                    markSectionAsCompleted('licenseDetailConsumer', false)
                                                    markSectionAsCompleted('licenseDetailCollector', false)
                                                    markSectionAsCompleted('licenseDetailRecycler', true)
                                                }
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    />

                </FormItem>
            </div>
        </Card>
    );
};

export default LicenseDetailSection;
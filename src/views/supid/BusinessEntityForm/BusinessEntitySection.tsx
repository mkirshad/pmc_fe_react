import Card from '@/components/ui/Card';
import { FormItem } from '@/components/ui/Form';
import { Controller } from 'react-hook-form';
// import { useState } from 'react';
import type { FormSectionBaseProps } from './types';
import useFormStore from '../../../store/supid/supidStore'

type BusinessDetailSectionProps = FormSectionBaseProps & {
    readOnly?: boolean; // Add this prop
};;

const entityTypes = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company', label: 'Company / Corporation / Partnership' },
];

const BusinessDetailSection = ({ control, errors, readOnly = false }: BusinessDetailSectionProps) => {
    // const [entityType, setEntityType] = useState('');
    const {
        updateBusinessEntity,
        businessEntity, // If you need to access the current businessEntity state
        completedSections,
        markSectionAsCompleted,
    } = useFormStore();

    console.log('businessEntityType',businessEntity.businessEntityType)
    return (
        <Card>
            <h4 className="mb-6">Business Entity Type</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Business Entity Type"
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
                                                if(option.value === 'Individual'){
                                                    markSectionAsCompleted('businessDetail', false)
                                                    markSectionAsCompleted('businessDetailIndividual', true)
                                                }else if(option.value === 'Company'){
                                                    markSectionAsCompleted('businessDetailIndividual', false)
                                                    markSectionAsCompleted('businessDetail', true)
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

export default BusinessDetailSection;
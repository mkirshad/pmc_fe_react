import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller, useFieldArray, useWatch  } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import Checkbox from '@/components/ui/Checkbox'
import { Divider } from '@mui/material';
import { useEffect } from 'react'

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

const categories = [
    { value: 'Recycler', label: 'Recycler' },
    { value: 'Landfill Site', label: 'Landfill Site' },
    { value: 'Incinerators', label: 'Incinerators' },

];



const LicenseDetailCollectorSection = ({ control, errors }: LicenseDetailSectionProps) => {

    const { fields, append, remove } = useFieldArray({
        control: control || {}, // Provide a fallback if control is undefined
        name: 'selectedCategories',
    });

    // useEffect(() => {
    //     if (control?.defaultValuesRef?.current?.selectedCategories) {
    //         replace(control.defaultValuesRef.current.selectedCategories);
    //     }
    // }, [control, replace]);

    const handleCheckboxChange = (checked: boolean, category: string) => {
        if (checked) {
            append({ category, wasteGeneration: '', wasteCollection: '' });
        } else {
            const index = fields.findIndex((field) => field.category === category);
            if (index !== -1) remove(index);
        }
    };

    const registration_required_for_other = useWatch({
        control,
        name: 'registration_required_for_other',
        defaultValue: [], // Ensure it's an array
    });
    
    return (
        <Card>
            <h4 className="mb-6">Detail - Collector</h4>
            <div className="grid md:grid-cols-2 gap-4">
            

            <FormItem
                    label="Categories of Single Use Plastics*"
                    invalid={Boolean(errors.registration_required_for)}
                    errorMessage={errors.registration_required_for?.message}
                    >
                    <Controller
                        name="registration_required_for"
                        control={control}
                        render={({ field }) => (
                        <Checkbox.Group
                            value={field.value || []} // Ensure the value is an array
                            onChange={(selectedValues) => field.onChange(selectedValues)}
                            className="flex flex-col gap-2"
                        >
                            <Checkbox value="Carry bags">Carry Bags (having thickness not less than 75 micron and not less than 12 x 16 inch in size)</Checkbox>
                            <Checkbox value="Packaging except food">Packaging (Multilayered and others) except food and pharmaceutical products</Checkbox>
                            <Checkbox value="Hospital Products">Hospital Products & Waste Disposal Bags (Non-Risk) (having thickness not less than 75 micron)</Checkbox>
                        </Checkbox.Group>
                        )}
                    />
                </FormItem>

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
                        className="flex flex-col gap-2"
                    >
                        <Checkbox value="Plastic Utensils">Plastic Utensils (Box, Bottle, Bin, Bowel, Tray etc.)</Checkbox>
                        <Checkbox value="Plastic Pipes & Fittings">Plastic Pipes (Flexible, Rigid, etc.) & Fittings</Checkbox>
                        <Checkbox value="PET Bottles">PET Bottles</Checkbox>
                        <Checkbox value="Plastic Furniture">Plastic Furnitures (Chair, Table etc.)</Checkbox>
                        <Checkbox value="Plastic Sheet">Plastic Sheets & Films</Checkbox>
                        <Checkbox value="Others">Others</Checkbox>
                    
                        {registration_required_for_other.includes('Others')&& (

                            
                            <Controller
                            name="registration_required_for_other_other_text"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter other categories"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                            />
                            )}
                    </Checkbox.Group>
                    )}
                />
            </FormItem>
        </div>
            <div className="mb-4">
                <Divider textAlign="left">
                </Divider>
            </div>


            

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                        label="Collection (Kg per day)*"
                        invalid={Boolean(errors.total_capacity_value_collector)}
                        errorMessage={errors.total_capacity_value_collector?.message}
                    >
                        <Controller
                            name="total_capacity_value_collector"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter Collection in numbers"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                </FormItem>

                <FormItem
                        label="No. of vehicles for Collection"
                        invalid={Boolean(errors.total_capacity_value)}
                        errorMessage={errors.total_capacity_value?.message}
                    >
                        <Controller
                            name="number_of_vehicles"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter No. of vehicles in numbers"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                </FormItem>


                <FormItem
                        label="No. of persons for Collection"
                        invalid={Boolean(errors.total_capacity_value)}
                        errorMessage={errors.total_capacity_value?.message}
                    >
                        <Controller
                            name="number_of_persons"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter No. of persons for Collection in numbers"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                </FormItem>
            </div>
       
            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="Source of Disposal"
                    invalid={Boolean(errors.selectedCategoriesCollector)}
                    errorMessage={errors.selectedCategoriesCollector?.message}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"> {/* Flex container for horizontal stacking */}
                        {categories.map((category) => (
                            <div
                                key={category.value}
                                className="flex items-center gap-4" // Individual category container
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        value={category.value}
                                        checked={fields.some((field) => field.category === category.value)}
                                        onChange={(e: boolean) => handleCheckboxChange(e, category.value)}
                                        className="flex-shrink-0" // Ensures checkbox doesn’t grow unnecessarily
                                    >
                                        {category.label}
                                    </Checkbox>
                                    {fields.some((field) => field.category === category.value) && (
                                        <Controller
                                            name={`selectedCategoriesCollector.${fields.findIndex(
                                                (field) => field.category === category.value
                                            )}.address`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Address"
                                                    {...field}
                                                    className="flex-1 min-w-0" // Ensures proper alignment
                                                />
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>


                </FormItem>
            </div>

        </Card>
    );
};

export default LicenseDetailCollectorSection;

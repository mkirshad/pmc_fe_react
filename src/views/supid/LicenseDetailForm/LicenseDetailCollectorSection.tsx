import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller, useFieldArray  } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import Checkbox from '@/components/ui/Checkbox'
import { Divider } from '@mui/material';

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
                            <Checkbox value="Carry bags">Carry Bags (having thickness 75 micron and not less than 12 x 16inch in size)</Checkbox>
                            <Checkbox value="Packaging except food">Packaging (Multilayered and others) except food and pharmaceutical products</Checkbox>
                            <Checkbox value="Hospital Products">Hospital Products & Waste Disposal Bags (Non-Risk)</Checkbox>
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
                    
                    </Checkbox.Group>
                    )}
                />
            </FormItem>
        </div>
            <div className="mb-4">
                <Divider textAlign="left">
                </Divider>
            </div>


            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="Source of Disposal"
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
                                                placeholder="Address"
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

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                        label="Collection (Kg per day)*"
                        invalid={Boolean(errors.total_capacity_value)}
                        errorMessage={errors.total_capacity_value?.message}
                    >
                        <Controller
                            name="total_capacity_value"
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
                            name="total_capacity_value"
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
                            name="total_capacity_value"
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
        {/* <div className="grid md:grid-cols-2 gap-4">

            <FormItem
                    label="Collection (Kg per Day)*"
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
                    label="Collection Methods*"
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
                             className="flex  gap-2 mt-2"
                        >
                            <Checkbox value="Vehicles">Vehicles</Checkbox>
                            <Checkbox value="Persons">Persons</Checkbox>
                       
                        </Checkbox.Group>
                        )}
                    />
                </FormItem>

            </div> */}
        </Card>
    );
};

export default LicenseDetailCollectorSection;

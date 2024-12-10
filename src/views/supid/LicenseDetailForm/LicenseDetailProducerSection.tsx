import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller, useWatch } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable'
import Checkbox from '@/components/ui/Checkbox'
import type { SyntheticEvent } from 'react'
import { Autocomplete, TextField, Chip, Hidden, List } from '@mui/material';
import Group from '@/components/ui/Checkbox/Group';
import Radio from '@/components/ui/Radio'
import { Divider } from '@mui/material';

type BusinessDetailSectionProps = FormSectionBaseProps;

let colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

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

const LicenseDetailProducerSection = ({ control, errors }: BusinessDetailSectionProps) => {
    const [entityType, setEntityType] = useState('');

    const [checkboxList, setCheckboxList] = useState<(string)[]>([

    ])

    const [unitOptions, setUnitOptions] = useState(['Kg Per Day', 'Liters Per Day', 'Tons Per Month']);
    const [selectedUnit, setSelectedUnit] = useState('');

    const [wasteUnitOptions, setWasteUnitOptions] = useState(['Kg Per Day', 'Liters Per Day', 'Tons Per Month']);
    const [selectedWasteUnit, setSelectedWasteUnit] = useState('');

    const [productOptions, setProductOptions] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [byProductOptions, setByProductOptions] = useState(['By-product X', 'By-product Y']);
    const [selectedByProducts, setSelectedByProducts] = useState([]);

    const handleProductsChange = (event, newValue) => {
        setSelectedProducts(newValue);
        const newOptions = newValue.filter(option => !productOptions.includes(option));
        if (newOptions.length > 0) {
            setProductOptions(prev => [...prev, ...newOptions]);
        }
    };

    const handleByProductsChange = (event, newValue) => {
        setSelectedByProducts(newValue);
        const newOptions = newValue.filter(option => !byProductOptions.includes(option));
        if (newOptions.length > 0) {
            setByProductOptions(prev => [...prev, ...newOptions]);
        }
    };

    // Watch the value of 'registration_required_for'
    const registrationRequiredFor = useWatch({
        control,
        name: 'registration_required_for',
        defaultValue: [], // Ensure it's an array
    });

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChangeSP = (event, newValue) => {
    setSelectedOptions(newValue);

    // Add new options to the list
    const newOptions = newValue.filter(
      (option) => !options.includes(option)
    );
    if (newOptions.length > 0) {
      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }

  };
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-'); // Convert yyyy-MM-dd to dd/MM/yyyy
    return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/'); // Convert dd/MM/yyyy to yyyy-MM-dd
    return `${year}-${month}-${day}`;
};



    return (
        <Card>
            <h4 className="mb-6">Detail - Producer</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Business Name and Registration Type */}
                
                <FormItem
                    label="Registration Required For"
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
                {/* </div>
                <div className="grid md:grid-cols-3 gap-4"> */}

                    {/* Check Boxes in case of  Single-use Plastics: Plain sheets for food wrapping, any other */}
                {registrationRequiredFor.includes('Packaging except food')? (
                    <div>
                    <FormItem
                        label="Additional Options for Packaging"
                        invalid={Boolean(errors.plain_plastic_Sheets_for_food_wrapping)}
                        errorMessage={errors.plain_plastic_Sheets_for_food_wrapping?.message}
                    >
                        <Controller
                            name="plain_plastic_Sheets_for_food_wrapping"
                            control={control}
                            render={({ field }) => (
                                <Checkbox.Group
                                    value={field.value || []}
                                    onChange={(selectedValues) => field.onChange(selectedValues)}
                                >
                                    <Checkbox value="Plain Plastic Sheets for food wrapping">Plain Plastic Sheets for food wrapping</Checkbox>
                                    <Checkbox value="Other">Any Others</Checkbox>
                                </Checkbox.Group>
                            )}
                        />
                    </FormItem>
                    <div></div>
                    <FormItem
                        label="Add List +"
                        invalid={Boolean(errors.PackagingItems)}
                        errorMessage={errors.PackagingItems?.message}
                        >
                        <Controller
                            name="PackagingItems"
                            control={control}
                            render={({ field }) => (
                            <Autocomplete
                                multiple
                                freeSolo
                                options={options}
                                value={selectedOptions}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue);
                                    handleChangeSP(event, newValue);
                                }}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Options"
                                    placeholder="Add or select options"
                                    />
                                )}
                                />
                            )}
                        />  
                    </FormItem>
                    </div>

                ): null
            }
            </div>

                <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Number of Machines*"
                    invalid={Boolean(errors.number_of_machines)}
                    errorMessage={errors.number_of_machines?.message}
                >
                    <Controller
                        name="number_of_machines"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Radio
                                    {...field}
                                    value="5"
                                    checked={field.value === "5"}
                                    onChange={() => field.onChange("5")}
                                >
                                    Upto 5 machines
                                </Radio>
                                <Radio
                                    {...field}
                                    value="10"
                                    checked={field.value === "10"}
                                    onChange={() => field.onChange("10")}
                                >
                                    From 6 to 10 machines
                                </Radio>
                                <Radio
                                    {...field}
                                    value="11"
                                    checked={field.value === "11"}
                                    onChange={() => field.onChange("11")}
                                >
                                    More than 10 machines
                                </Radio>
                            </div>
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Production Capacity (Kg per day)*"
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
                                placeholder="Enter Production Capacity in numbers"
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </FormItem>

                {/* Date of Setting Up */}
                <FormItem
                    label="Date of Business Setting Up"
                    invalid={Boolean(errors.date_of_setting_up)}
                    errorMessage={errors.date_of_setting_up?.message}
                >
                    <Controller
                        name="date_of_setting_up"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                value={field.value ? parseDate(formatDate(field.value)) : ''}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="DD/MM/YYYY"
                            />
                        )}
                    />
                </FormItem>


                {/* Total Waste Generated Value */}
                <FormItem
                    label="Waste Generated (Kg per day)"
                    invalid={Boolean(errors.total_waste_generated_value)}
                    errorMessage={errors.total_waste_generated_value?.message}
                >
                    <Controller
                        name="total_waste_generated_value"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                placeholder="Enter Waste Generated in numbers"
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </FormItem>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
        

                <FormItem
                    label="Waste Storage Capacity"
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
                                    checked={field.value === 'Available'}
                                    value="Available"
                                    onChange={() => field.onChange('Available')}
                                >
                                    Available
                                </Radio>
                                <Radio
                                    {...field}
                                    checked={field.value === 'Not Available'}
                                    value="Not Available"
                                    onChange={() => field.onChange('Not Available')}
                                >
                                    Not Available
                                </Radio>
                            </div>
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Waste Disposal Provision"
                    invalid={Boolean(errors.waste_disposal_provision)}
                    errorMessage={errors.waste_disposal_provision?.message}
                >
                    <Controller
                        name="waste_disposal_provision"
                        control={control}
                        rules={{ required: 'Waste storage capacity is required' }}
                        render={({ field }) => (
                            <div className="flex gap-4">
                                <Radio
                                    {...field}
                                    checked={field.value === 'Available'}
                                    value="Available"
                                    onChange={() => field.onChange('Available')}
                                >
                                    Available
                                </Radio>
                                <Radio
                                    {...field}
                                    checked={field.value === 'Not Available'}
                                    value="Not Available"
                                    onChange={() => field.onChange('Not Available')}
                                >
                                    Not Available
                                </Radio>
                            </div>
                        )}
                    />
                </FormItem>
               </div>
{/* 
 <div className="mb-4">
    <Divider textAlign="left" >
        <b>In Case of Renewal</b>
    </Divider>
</div>

    <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Registration Number "
                    invalid={Boolean(errors.registration_number)}
                    errorMessage={errors.registration_number?.message}
                >
                    <Controller
                        name="registration_number"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Enter Registration Number"
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Registration Date"
                    invalid={Boolean(errors.registration_date)}
                    errorMessage={errors.registration_date?.message}
                >
                    <Controller
                        name="registration_date"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                value={field.value ? parseDate(formatDate(field.value)) : ''}
                                onChange={(e) => field.onChange(e.target.value)}
                                placeholder="DD/MM/YYYY"
                            />
                        )}
                    />
                </FormItem>
                
            </div> */}
        </Card>
    );
};

export default LicenseDetailProducerSection;

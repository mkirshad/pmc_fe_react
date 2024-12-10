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

    const [productOptions, setProductOptions] = useState(['Product A', 'Product B', 'Product C']);
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
            <h4 className="mb-6">Document</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Business Name and Registration Type */}


                <FormItem
                    label="CNIC / Utiility Bills / Passport / Driving License (Any document indicating name & address)*"
                    invalid={Boolean(errors.flow_diagram)}
                    errorMessage={errors.flow_diagram?.message}
                >
                    <Controller
                        name="flow_diagram"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg" // Allow only specific file types
                                onChange={(e) => field.onChange(e.target.files[0] || null)} // Correctly set the file without using 'value'
                            />
                        )}
                    />
                </FormItem>

                
                
            </div>
        </Card>
    );
};

export default LicenseDetailProducerSection;

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import type { FormSectionBaseProps } from './types';
import { useState } from 'react';
import { Divider } from '@mui/material';
import Checkbox from '@/components/ui/Checkbox'
import { Autocomplete, TextField, Chip, Hidden, List } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
import Radio from '@/components/ui/Radio'

type BusinessDetailSectionProps = FormSectionBaseProps & {
    readOnly?: boolean; // Add this prop
};;


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

const LicenseDetailConsumerSection = ({ control, errors, readOnly = false }: BusinessDetailSectionProps) => {
    
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

        // Watch the value of 'registration_required_for'
        const registrationRequiredFor = useWatch({
            control,
            name: 'registration_required_for',
            defaultValue: [], // Ensure it's an array
        });
        
        const registration_required_for_other = useWatch({
            control,
            name: 'registration_required_for_other',
            defaultValue: [], // Ensure it's an array
        });

        const w_waste_disposal_provision = useWatch({
            control,
            name: 'provisionwaste_disposal_provision',
            defaultValue: '', // Ensure it's an array
        });

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

        console.log('w_waste_disposal_provision', w_waste_disposal_provision)
    return (
        <Card>
            <h4 className="mb-6">Detail - Stockist/Distributor/Supplier</h4>
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
                            <Checkbox value="Carry bags" readOnly={readOnly}>Carry Bags (having thickness not less than 75 micron and not less than 12 x 16 inch in size)</Checkbox>
                            <Checkbox value="Packaging except food" readOnly={readOnly}>Packaging (Multilayered and others) except food and pharmaceutical products</Checkbox>
                            <Checkbox value="Hospital Products" readOnly={readOnly}>Hospital Products & Waste Disposal Bags (Non-Risk) (having thickness not less than 75 micron)</Checkbox>
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
                            <Checkbox value="Plastic Utensils" readOnly={readOnly}>Plastic Utensils (Box, Bottle, Bin, Bowel, Tray etc.)</Checkbox>
                            <Checkbox value="Plastic Pipes & Fittings" readOnly={readOnly}>Plastic Pipes (Flexible, Rigid, etc.) & Fittings</Checkbox>
                            <Checkbox value="PET Bottles" readOnly={readOnly}>PET Bottles</Checkbox>
                            <Checkbox value="Plastic Furniture" readOnly={readOnly}>Plastic Furnitures (Chair, Table etc.)</Checkbox>
                            <Checkbox value="Plastic Sheet" readOnly={readOnly}>Plastic Sheets & Films</Checkbox>
                            <Checkbox value="Others" readOnly={readOnly}>Others</Checkbox>

                            {registration_required_for_other.includes('Others')&& (

                                
                                <Controller
                                name="registration_required_for_other_other_text"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter other categories"
                                        readOnly={readOnly}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                                />
                                )}
                       
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
                                    <Checkbox value="Plain Plastic Sheets for food wrapping" readOnly={readOnly}>Plain Plastic Sheets for food wrapping</Checkbox>
                                    <Checkbox value="Other" readOnly={readOnly}>Any Others</Checkbox>
                                </Checkbox.Group>
                            )}
                        />
                    </FormItem>
                    <div></div>
                    <FormItem
                        label="Add List + (If desired item is not in the list, then type and press enter to add)"
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
                                readOnly={readOnly}
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
            <div className="mb-4">
                <Divider textAlign="left">
                </Divider>
            </div>


            <div className="grid md:grid-cols-2 gap-4">
                
                <FormItem
                    label="Sale*"
                    invalid={Boolean(errors.consumption)}
                    errorMessage={errors.consumption?.message}
                >
                    <Controller
                        name="consumption"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="number"
                                placeholder="Sale (Kg per day)"
                                readOnly={readOnly}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                        label="Provision of Waste Disposal Bins*"
                        invalid={Boolean(errors.provisionwaste_disposal_provision)}
                        errorMessage={errors.provisionwaste_disposal_provision?.message}
                    >
                    <Controller
                        name="provisionwaste_disposal_provision"
                        control={control}
                        // rules={{ required: 'Waste storage capacity is required' }}
                        render={({ field }) => (
                            <div className="flex gap-4">
                                <Radio
                                    {...field}
                                    checked={field.value === 'Yes'}
                                    value="Yes"
                                    readOnly={readOnly}
                                    onChange={() => field.onChange('Yes')}
                                >
                                    Yes
                                </Radio>
                                <Radio
                                    {...field}
                                    checked={field.value === 'No'}
                                    value="No"
                                    readOnly={readOnly}
                                    onChange={() => field.onChange('No')}
                                >
                                    No
                                </Radio>
                            </div>
                        )}
                    />
                </FormItem>

                {w_waste_disposal_provision === "Yes" &&
                <FormItem
                    label="No. of Waste Disposibal Bins"
                    invalid={Boolean(errors.no_of_waste_disposible_bins)}
                    errorMessage={errors.no_of_waste_disposible_bins?.message}
                >
                    <Controller
                        name="no_of_waste_disposible_bins"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="number"
                                placeholder="No. of Waste Disposibal Bins"
                                readOnly={readOnly}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                }


                <FormItem
                        label="Whether Segregated Plastics are being handed over to registered Re-Cyclers or Collectors?*"
                        invalid={Boolean(errors.waste_disposal_provision)}
                        errorMessage={errors.waste_disposal_provision?.message}
                    >
                    <Controller
                        name="segregated_plastics_handed_over_to_registered_re_cyclers"
                        control={control}
                        // rules={{ required: 'Waste storage capacity is required' }}
                        render={({ field }) => (
                            <div className="flex gap-4">
                                <Radio
                                    {...field}
                                    checked={field.value === 'Yes'}
                                    value="Yes"
                                    readOnly={readOnly}
                                    onChange={() => field.onChange('Yes')}
                                >
                                    Yes
                                </Radio>
                                <Radio
                                    {...field}
                                    checked={field.value === 'No'}
                                    value="No"
                                    readOnly={readOnly}
                                    onChange={() => field.onChange('No')}
                                >
                                    No
                                </Radio>
                            </div>
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    );
};

export default LicenseDetailConsumerSection;

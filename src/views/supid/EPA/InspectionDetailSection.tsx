import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import { Controller, useWatch, useForm } from 'react-hook-form';
import Checkbox from '@/components/ui/Checkbox';
import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Hidden, List } from '@mui/material';
import OpenLayersLocationPicker from "./OpenLayersLocationPicker";
import NumericInput from '@/components/shared/NumericInput';
import AxiosBase from '../../../services/axios/AxiosBase' 

type InspectionDetailSectionProps = {
    control: any;
    errors: any;
    readOnly?: boolean;
};

const businessTypeList = [
    { label: 'Producer', value: 'Producer' },
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Recycler', value: 'Recycler' },
    { label: 'Collector', value: 'Collector' },
];

const violationTypeList = [
    { label: 'Plastic shopping bags less than 75 microns', value: 'Plastic shopping bags less than 75 microns' },
    { label: 'Other Single Use Plastics', value: 'Other Single Use Plastics' },
];

const actionTakenList = [
    { label: 'Notice issued', value: 'Notice issued' },
    { label: 'Confiscation', value: 'Confiscation' },
    { label: 'Sealing', value: 'Sealing' },
    { label: 'FIR', value: 'FIR' },
    { label: 'Complaint before Environmental Magistrate', value: 'Complaint before Environmental Magistrate' },
];

const InspectionDetailSection = ({ control, errors, readOnly = false, defaultValues }: InspectionDetailSectionProps) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { setValue, getValues, trigger } = useForm();
    const [trackingNumber, setTrackingNumber] = useState('');

    // Watch the value of 'registration_required_for'
    const watchViolationFound = useWatch({
        control,
        name: 'violationFound',
        defaultValue: [], // Ensure it's an array
    });

    const watchViolationType = useWatch({
        control,
        name: 'violationType',
        defaultValue: [], // Ensure it's an array
    });

    const watchActionTaken = useWatch({ control, name: 'actionTaken', defaultValue: [] });
    
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
    // Track confiscation values
    const plasticBagsConfiscation = useWatch({ control, name: 'plasticBagsConfiscation', defaultValue: 0 });
    const otherPlasticsConfiscation = useWatch({ control, name: 'confiscation_otherPlastics', defaultValue: {} });

    // Track total confiscation in state
    const [totalConfiscation, setTotalConfiscation] = useState(0);

    // Calculate Total Confiscation whenever values change
    useEffect(() => {
        if (watchActionTaken.includes('Confiscation')) {
            let total = 0;

            // Plastic bags confiscation
            total += parseFloat(plasticBagsConfiscation) || 0;

            // Sum other plastic items
            Object.values(otherPlasticsConfiscation).forEach((value) => {
                total += parseFloat(value) || 0;
            });

            // Update state and form
            setTotalConfiscation(total);
            setValue("totalConfiscation", total);
        }
    }, [plasticBagsConfiscation, otherPlasticsConfiscation, watchActionTaken, setValue]);

    useEffect(() => {
        AxiosBase.get('/pmc/inspection-report/all_other_single_use_plastics/')
            .then(response => {
                console.log("API Response:", response.data); // Log entire API response
                setOptions(response.data.single_use_plastic_items || []); // Ensure it's always an array
            })
            .catch(error => {
                console.error("Error fetching available options:", error);
            });
    }, []);
    

    useEffect(() => {
        if (defaultValues?.OtherSingleUseItems) {
            setSelectedOptions(defaultValues.OtherSingleUseItems);
        }
    }, [defaultValues?.OtherSingleUseItems]);

    
    const [selectedLocation, setSelectedLocation] = useState({
        lat: null,
        lng: null,
        district: "",
      });
    
    const handleLocationSelect = (locationData) => {
    console.log("Selected Location:", locationData);
    setSelectedLocation(locationData); // Store the selected location
    console.log(selectedLocation)
    };

     // This method is reused from your Banner for backspace handling
     const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            setTrackingNumber(formatTrackingNumber(trackingNumber, true));
        }
    };

    // This method is reused from your Banner for auto-formatting
    const formatTrackingNumber = (value, isBackspace) => {
        // Remove any invalid characters for each segment
        let rawValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only alphanumeric characters

        // Split the rawValue into segments
        let segment1 = rawValue.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, ''); 
        let segment2 = rawValue.slice(3, 6).toUpperCase().replace(/[^A-Z]/g, '');
        let segment3 = rawValue.slice(6).replace(/[^0-9]/g, '');

        // If backspace is detected, allow the deletion without auto-adding new dashes
        if (isBackspace) {
            return [segment1, segment2, segment3].filter(Boolean).join('-');
        }

        // Auto-format: Add dashes dynamically
        let formattedValue = '';
        if (segment1) formattedValue += segment1 + (segment1.length === 3 ? '-' : '');
        if (segment2) formattedValue += segment2 + (segment2.length === 3 ? '-' : '');
        if (segment3) formattedValue += segment3;

        return formattedValue;
    };
    
    return (
        <Card>
            <h4 className="mb-6">Inspection Report</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Name of Business*" invalid={Boolean(errors.businessName)} errorMessage={errors.businessName?.message}>
                    <Controller
                        name="businessName"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" placeholder="Business Name" readOnly={readOnly} {...field} />
                        )}
                    />
                </FormItem>
                
                <FormItem label="Type of Business*" invalid={Boolean(errors.businessType)} errorMessage={errors.businessType?.message}>
                    <Controller
                        name="businessType"
                        control={control}
                        render={({ field }) => (
                            <Select options={businessTypeList} isDisabled={readOnly} value={businessTypeList.find(opt => opt.value === field.value)} onChange={option => field.onChange(option?.value)} />
                        )}
                    />
                </FormItem>

                 {/* Tracking Number Input */}
                 <FormItem label="Plastic Application / License Number" invalid={Boolean(errors.businessType)} errorMessage={errors.businessType?.message}>
                    <Controller
                        name="licenseNumber"
                        control={control}
                        render={({ field }) => (
                    <Input
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(formatTrackingNumber(e.target.value, false))}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g., LHR-PRO-001"
                        title="Tracking Number (e.g., LHR-PRO-001)"
                    />
                )}
                />
            </FormItem>

            </div>

            <FormItem label="Violation Found">
                <Controller
                    key={"a1"}
                    name="violationFound"
                    control={control}
                    render={({ field }) => (
                        <Checkbox.Group
                            value={field.value || []} // Ensure the value is an array
                            onChange={(selectedValues) => field.onChange(selectedValues)}
                            className="flex flex-col gap-2 mb-2 ml-2"
                        >
                            <Checkbox {...field} value={"Yes"} >
                                Yes
                            </Checkbox>
                        </Checkbox.Group>
                    )}
                />
            </FormItem>

            {watchViolationFound.includes('Yes') && (
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem label="Type of Violation Found*">
                        {violationTypeList.map(violation => (
                            <Controller
                                key={violation.value}
                                name="violationType"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox.Group
                                        value={field.value || []} // Ensure the value is an array
                                        onChange={(selectedValues) => field.onChange(selectedValues)}
                                        className="flex flex-col gap-2 mb-2 ml-2"
                                    >
                                        <Checkbox {...field} value={violation.value} >
                                            {violation.label}
                                        </Checkbox>
                                    </Checkbox.Group>
                                )}
                            />
                        ))}
                        {watchViolationType.includes('Other Single Use Plastics') && 
                        <FormItem
                        label="Add List + (If desired item is not in the list, then type and press enter to add)"
                        invalid={Boolean(errors.PackagingItems)}
                        errorMessage={errors.PackagingItems?.message}
                        className='ml-2 mt-4'
                        >
                        <Controller
                            name="OtherSingleUseItems"
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
                                    label="Other Single Use Plastics"
                                    placeholder="Add or select Single Use Plastics"
                                    />
                                )}
                                />
                            )}
                        />  
                    </FormItem>}
                    </FormItem>

                    

                    <FormItem label="Action Taken*">
                        {actionTakenList.map(action => (
                            <Controller
                                key={action.value}
                                name="actionTaken"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox.Group
                                        value={field.value || []} // Ensure the value is an array
                                        onChange={(selectedValues) => field.onChange(selectedValues)}
                                        className="flex flex-col gap-2 mb-2 ml-2"
                                    >
                                        <Checkbox {...field} value={action.value} >
                                            {action.label}
                                        </Checkbox>
                                    </Checkbox.Group>
                                )}
                            />
                        ))}


                            {watchActionTaken.includes('Confiscation') && (
                                <div>
                                    <h4 className="mt-4">Confiscation Details</h4>
                                    {watchViolationType.includes('Plastic shopping bags less than 75 microns') && (
                                        <FormItem label="Plastic shopping bags Confiscation (KG)"
                                        invalid={Boolean(errors.plasticBagsConfiscation)}
                                        errorMessage={errors.plasticBagsConfiscation?.message}
                                        >
                                            <Controller
                                                name="plasticBagsConfiscation"
                                                control={control}
                                                render={({ field }) => (
                                                    <NumericInput  placeholder="Enter KG" {...field} />
                                                )}
                                            />
                                        </FormItem>
                                    )}
                                    
                                    {watchViolationType.includes('Other Single Use Plastics') &&
                                        selectedOptions.map((item, index) => (
                                            <FormItem key={index} label={`${item} Confiscation (KG)`}>
                                                <Controller
                                                    name={`confiscation_otherPlastics.${item}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input type="number" placeholder="Enter KG" {...field} />
                                                    )}
                                                />
                                            </FormItem>
                                        ))}

                                <FormItem label="Total Confiscation (KG)">
                                    <Controller
                                        name="totalConfiscation"
                                        control={control}
                                        render={({ field }) => {
                                            useEffect(() => {
                                                field.onChange(totalConfiscation); // ✅ Update form state when totalConfiscation changes
                                            }, [totalConfiscation]); // Dependency ensures re-run on change

                                            return (
                                                <Input
                                                    type="number"
                                                    placeholder="Auto-calculated"
                                                    readOnly
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </FormItem>
                                </div>
                            )}

                    </FormItem>
                </div>
            )}

            <div style={{ padding: "20px" }}>
                <h1>Select Location</h1>
                <OpenLayersLocationPicker onLocationSelect={handleLocationSelect} />

                {/* Display Selected Location */}
                {selectedLocation.lat && selectedLocation.lng && (
                    
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}  >
                    <h3>Selected Location Details:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                    
                    <FormItem label="Latitude">
                        <Controller
                            name="latitude"
                            control={control}
                            render={({ field }) => {
                                useEffect(() => {
                                    field.onChange(selectedLocation.lat); // ✅ Update form state when selectedLocation.lat changes
                                }, [selectedLocation.lat]); // Reactively updates

                                return (
                                    <Input
                                        type="number"
                                        placeholder="Auto-calculated"
                                        readOnly
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </FormItem>

                    <FormItem label="Longitude">
                        <Controller
                            name="longitude"
                            control={control}
                            render={({ field }) => {
                                useEffect(() => {
                                    field.onChange(selectedLocation.lng); // ✅ Update form state when selectedLocation.lng changes
                                }, [selectedLocation.lng]); 

                                return (
                                    <Input
                                        type="number"
                                        placeholder="Auto-calculated"
                                        readOnly
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </FormItem>

                    <FormItem label="District">
                        <Controller
                            name="district"
                            control={control}
                            render={({ field }) => {
                                useEffect(() => {
                                    field.onChange(selectedLocation.district); // ✅ Update form state when selectedLocation.district changes
                                }, [selectedLocation.district]);

                                return (
                                    <Input
                                        type="text"
                                        placeholder="Auto-calculated"
                                        readOnly
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </FormItem>

                    </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default InspectionDetailSection;

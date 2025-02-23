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
import { Button } from "@/components/ui/Button";
import { useSessionUser } from '@/store/authStore';

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
    { label: 'Retailer', value: 'Retailer' } // ✅ New Category Added
];


const violationTypeList = [
    { label: 'Plastic shopping/carry bags (having thickness less than 75 micron or less than 12 x 16 inch in size)', value: 'Plastic shopping/carry bags (having thickness less than 75 micron)' },
    { label: 'Other Single Use Plastics', value: 'Other Single Use Plastics' },
];

const actionTakenList = [
    { label: 'Notice issued', value: 'Notice issued' },
    { label: 'Confiscation', value: 'Confiscation' },
    { label: 'Sealing', value: 'Sealing' },
    { label: 'FIR', value: 'FIR' },
    { label: 'Complaint before Environmental Magistrate', value: 'Complaint before Environmental Magistrate' },
    { label: 'Fine Imposed', value: 'Fine Imposed' },
    { label: 'De Sealed', value: 'De Sealed' },
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
    
    const watchFineRecoveryStatus = useWatch({
        control,
        name: 'fineRecoveryStatus',
        defaultValue: [], // Ensure it's an array
    });

    const watchFineAmount = useWatch({ control, name: "fineAmount", defaultValue: 0 });

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
    
            // ✅ Check if Plastic Bags are selected before adding to total
            if (watchViolationType.includes('Plastic shopping/carry bags (having thickness less than 75 micron)')) {
                total += parseFloat(plasticBagsConfiscation) || 0;
            }
    
            // ✅ Only sum confiscated amounts for selected options in "Other Single Use Plastics"
            selectedOptions.forEach((item) => {
                if (otherPlasticsConfiscation[item]) {
                    total += parseFloat(otherPlasticsConfiscation[item]) || 0;
                }
            });
    
            // Update state and form
            setTotalConfiscation(total);
            setValue("totalConfiscation", total);
        }
    }, [plasticBagsConfiscation, otherPlasticsConfiscation, watchActionTaken, setValue, selectedOptions, watchViolationType]);
    

    
    useEffect(() => {
        AxiosBase.get('/pmc/inspection-report/all_other_single_use_plastics/')
            .then(response => {
                // console.log("API Response:", response.data); // Log entire API response
                setOptions(response.data.single_use_plastic_items || []); // Ensure it's always an array
            })
            .catch(error => {
                console.error("Error fetching available options:", error);
            });
    }, []);
    


    useEffect(() => {
        if (defaultValues?.fineRecoveryBreakup) {
            // Mark existing entries as non-editable
            const loadedEntries = defaultValues.fineRecoveryBreakup.map(entry => ({
                ...entry,
                isNew: false, // Existing records should be read-only
            }));
            setRecoveryEntries(loadedEntries);
        }
    }, [defaultValues?.fineRecoveryBreakup]);
    
   // ✅ Watches Fine Amount
   const fineAmount = useWatch({ control, name: "fineAmount", defaultValue: 0 });

   // ✅ Watches Recovery Amount
   const recoveryAmount = useWatch({ control, name: "recoveryAmount", defaultValue: 0 });

   // ✅ Watches Fine Recovery Breakup JSON field
   const fineRecoveryBreakup = useWatch({ control, name: "fineRecoveryBreakup", defaultValue: [] });

   const [recoveryEntries, setRecoveryEntries] = useState(fineRecoveryBreakup || []);
   const [totalRecovery, setTotalRecovery] = useState(0);

   useEffect(() => {
    console.log("Updating total recovery"); // Debugging log
    console.log("recoveryEntries", recoveryEntries);
    const total = recoveryEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
    setTotalRecovery(total);
    
    // ✅ Store `recoveryEntries` inside the form state
    // setValue("fineRecoveryBreakup", recoveryEntries, { shouldValidate: true, shouldDirty: true });
    console.log("fineReoceryBreakup is setup")
    // setValue("recoveryAmount", total, { shouldValidate: true, shouldDirty: true });
    }, [recoveryEntries, setValue]); // ✅ Make sure `recoveryEntries` is in dependency array



   // ✅ Handles adding a new recovery entry
   const addRecoveryEntry = () => {
        if (totalRecovery < fineAmount) {
            setRecoveryEntries([...recoveryEntries, { date: "", amount: 0, isNew: true }]);
        }
    };

   
   // ✅ Handles updating a recovery entry
   const updateRecoveryEntry = (index, key, value) => {
    console.log('recovery amount updated:')
    console.log(index, key, value)
    setRecoveryEntries(prevEntries => {
        const updatedEntries = prevEntries.map((entry, i) => 
            i === index ? { ...entry, [key]: key === "amount" ? (parseFloat(value) || 0) : value } : entry
        );

        console.log("🔹 Updated Recovery Entries:", updatedEntries);
        return updatedEntries;
    });
};


    useEffect(() => {
        console.log("Updated recovery entries:", recoveryEntries);
        console.log("Calculated Total Recovery:", totalRecovery);
    }, [recoveryEntries, totalRecovery]);


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
    // console.log("Selected Location:", locationData);
    setSelectedLocation(locationData); // Store the selected location
    // console.log(selectedLocation)
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

    console.log('fineRecoveryBreakup:', defaultValues?.fineRecoveryBreakup)
    
    console.log('readOnly', readOnly)
    const district_id = useSessionUser((state) => state.user.district_id) || null
    const district_name = useSessionUser((state) => state.user.district_name) || ''
    console.log('district_name:', district_name)
    return (
        <Card>
            <h4 className="mb-6">Inspection Report - {district_name}</h4>
            
            <div className="grid md:grid-cols-2 gap-4">

                <FormItem label="Inspection Date*" invalid={Boolean(errors.inspectionDate)} errorMessage={errors.inspectionDate?.message}>
                    <Controller
                        name="inspectionDate"
                        control={control}
                        render={({ field }) => (
                            <Input type="date" {...field} readOnly={readOnly}/>
                        )}
                    />
                </FormItem>

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
                            <Select options={businessTypeList} value={businessTypeList.find(opt => opt.value === field.value)} isDisabled={readOnly} onChange={option => field.onChange(option?.value)} />
                        )}
                    />
                </FormItem>

                <FormItem label="Plastic Application / License Number" invalid={Boolean(errors.licenseNumber)} errorMessage={errors.licenseNumber?.message}>
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
                            readOnly={readOnly}
                        />
                    )}
                    />
                </FormItem>
            </div>

                <FormItem label="Violation Found" invalid={Boolean(errors.violationFound)} errorMessage={errors.violationFound?.message}>
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
                                <Checkbox {...field} value={"Yes"}  disabled={readOnly}>
                                    Yes
                                </Checkbox>
                            </Checkbox.Group>
                        )}
                    />
                </FormItem>

            {watchViolationFound.includes('Yes') && (
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem label="Type of Violation Found*"  invalid={Boolean(errors.violationType)} errorMessage={errors.violationType?.message}>
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
                                        <Checkbox {...field} value={violation.value} disabled={readOnly} >
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

                    <FormItem label="Action Taken*" invalid={Boolean(errors.actionTaken)} errorMessage={errors.actionTaken?.message}>
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
                                        <Checkbox {...field} value={action.value} 
                                         disabled={readOnly && action.value !== "De Sealed"} // ✅ Disable all except "De Sealed"
                                        >
                                            {action.label}
                                        </Checkbox>
                                    </Checkbox.Group>
                                )}
                            />
                        ))}

                    </FormItem>

                    {watchActionTaken.includes('Confiscation') && (
                                watchViolationType.includes('Plastic shopping/carry bags (having thickness less than 75 micron)') && (
                                        <FormItem label="Plastic shopping/carry bags (having thickness less than 75 micron) (KG)"
                                        invalid={Boolean(errors.plasticBagsConfiscation)}
                                        errorMessage={errors.plasticBagsConfiscation?.message}
                                        >
                                            <Controller
                                                name="plasticBagsConfiscation"
                                                control={control}
                                                render={({ field }) => (
                                                    <NumericInput  placeholder="Enter KG" {...field} readOnly={readOnly}/>
                                                )}
                                            />
                                        </FormItem>
                                    )
                    )}

                    {watchActionTaken.includes('Confiscation') && (            
                                (watchViolationType.includes('Other Single Use Plastics') &&
                                    selectedOptions.map((item, index) => (
                                        <FormItem key={index} label={`${item} Confiscation (KG)`}>
                                            <Controller
                                                name={`confiscation_otherPlastics.${item}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input type="number" placeholder="Enter KG" {...field} readOnly={readOnly}/>
                                                )}
                                            />
                                        </FormItem>
                                    ))
                                )
                    )}
                    
                    {watchActionTaken.includes('Confiscation') && (
                        <FormItem label="Total Confiscation (KG)"
                            invalid={Boolean(errors.totalConfiscation)}
                            errorMessage={errors.totalConfiscation?.message}
                        >
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
                    )}

                        
                {(watchActionTaken.includes('Fine Imposed'))&&
                        (
                <>
                    <FormItem label="Fine Amount (PKR)"
                     invalid={Boolean(errors.fineAmount)}
                     errorMessage={errors.fineAmount?.message}
                    >
                        <Controller
                            name="fineAmount"
                            control={control}
                            render={({ field }) => (
                                <NumericInput placeholder="Enter Fine Amount" {...field} readOnly={readOnly}/>
                            )}
                        />
                    </FormItem>

                    <FormItem label="Fine Recovery Status"
                     invalid={Boolean(errors.fineRecoveryStatus)}
                     errorMessage={errors.fineRecoveryStatus?.message}
                    >
                        <Controller
                            name="fineRecoveryStatus"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={[
                                        { label: 'Pending', value: 'Pending' },
                                        { label: 'Partial', value: 'Partial' },
                                        { label: 'Recovered', value: 'Recovered' },
                                    ]}
                                    
                                    value={{ label: field.value, value: field.value }}
                                    onChange={(option) => field.onChange(option?.value)}
                                    isDisabled={readOnly && field.value === 'Recovered'}
                                />
                            )}
                        />
                    </FormItem>
               

                {watchFineRecoveryStatus !== 'Pending' && (
                    <>
                    {/* <FormItem label="Fine Recovery Date"
                      invalid={Boolean(errors.fineRecoveryDate)}
                      errorMessage={errors.fineRecoveryDate?.message}
                    >
                        <Controller
                            name="fineRecoveryDate"
                            control={control}
                            render={({ field }) => (
                                <Input type="date" {...field} readOnly={readOnly && field.value === 'Recovered' && field.value !== null}/>
                            )}
                        />
                    </FormItem> */}
                    
                <FormItem label="Total Recovery Amount (PKR)"
                    invalid={Boolean(errors.recoveryAmount)}
                    errorMessage={errors.recoveryAmount?.message}
                    >
                    <Controller
                        name="recoveryAmount"
                        control={control}
                        render={({ field }) => {
                            useEffect(() => {
                                field.onChange((totalRecovery)); // ✅ Update form state when totalConfiscation changes
                            }, [(totalRecovery)]); // Dependency ensures re-run on change

                            return (
                                <NumericInput
                                    placeholder="Auto-calculated"
                                    readOnly
                                    {...field}
                                />
                            );
                        }}
                    />
                </FormItem>







            {/* ✅ Fine Recovery Breakup Entries */}
            {recoveryEntries.map((entry, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4">
                    <FormItem label="Recovery Date"
                     invalid={Boolean(errors.fineRecoveryBreakup)}
                     errorMessage={errors.fineAmount?.fineRecoveryBreakup}
                    >
                        <Input
                            type="date"
                            value={entry.date}
                            onChange={(e) => updateRecoveryEntry(index, "date", e.target.value)}
                            readOnly={!entry.isNew} // ❌ Only allow editing for new entries
                        />
                    </FormItem>

                    <FormItem label="Recovery Amount (PKR)"
                    invalid={Boolean(errors.fineRecoveryBreakup)}
                    errorMessage={errors.fineAmount?.fineRecoveryBreakup}
                    >
                        <NumericInput
                            value={entry.amount}
                            onChange={(e) => updateRecoveryEntry(index, "amount", e.target.value)}
                            readOnly={!entry.isNew} // ❌ Only allow editing for new entries
                        />
                    </FormItem>
                </div>
            ))}

            {/* ✅ Add New Recovery Button (Disabled if fully recovered) */}
            <Button type='button' onClick={addRecoveryEntry} disabled={totalRecovery >= fineAmount } className='mt-7'>
                + Add Recovery
            </Button>





                    </>
                )}
                </>
                )}
                {(watchActionTaken.includes('De Sealed')) &&
                    (
                    <>
                    <FormItem label="De Sealed Date"
                    invalid={Boolean(errors.deSealedDate)}
                    errorMessage={errors.deSealedDate?.message}
                    >
                        <Controller
                            name="deSealedDate"
                            control={control}
                            render={({ field }) => (
                                <Input type="date" {...field} readOnly={readOnly && field.value !== null && field.value !== ''}/>
                            )}
                        />
                    </FormItem>
                    
                    <FormItem
                        label="De Seal - Affidavit"
                        invalid={Boolean(errors.affidavit)}
                        errorMessage={errors.affidavit?.message}
                    >
                        <Controller
                            name="affidavit"
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
                    
                    </>
                    )
                }
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

                    <Controller
                        name="fineRecoveryBreakup"
                        control={control}
                        render={({ field }) => {
                            useEffect(() => {
                                field.onChange((recoveryEntries)); // ✅ Update form state when totalConfiscation changes
                            }, [(recoveryEntries)]); // Dependency ensures re-run on change

                            return (
                                <Input
                                    type="hidden"
                                    placeholder="Auto-calculated"
                                    readOnly
                                    {...field}
                                />
                            );
                        }}
/>
                    

                    {/* <FormItem label="District">
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
                    </FormItem> */}

                    </div>
                </div>
                )}
            </div>
        </Card>
    );
};

export default InspectionDetailSection;

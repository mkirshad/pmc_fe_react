import { useState, useEffect } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {ApplicantDetailForm} from '../ApplicantDetailForm'
import {BusinessEntityForm, BusinessEntityFormSchema} from '../BusinessEntityForm'
import {BusinessEntityFields, BusinessDetailFields, BusinessDetailIndividualFields} from '../BusinessEntityForm/types'
import {LicenseDetailForm, LicenseDetailFormSchema} from '../LicenseDetailForm'
import {DocumentForm, DocumentForm2} from '../DocumentsForm'
import ReviewAndSavePage from '../ReviewAndSavePage/ReviewAndSavePage'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { ApplicantDetailFormSchema } from '../ApplicantDetailForm'
import Steps from '@/components/ui/Steps';
import { BiArrowBack, BiArrowToRight, BiSave, BiStreetView } from 'react-icons/bi'
import { BsBack } from 'react-icons/bs'
import useFormStore from '../../../store/supid/supidStore'
import { LicenseDetailFields, LicenseDetailFieldsConsumer, LicenseDetailFieldsCollector, LicenseDetailFieldsProducer, LicenseDetailFieldsRecycler } from '../LicenseDetailForm/types'
import AxiosBase from '../../../services/axios/AxiosBase' 
import { useParams } from 'react-router-dom';

const CustomerEdit = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
console.log('id is:', id)
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [goBackConfirmationOpen, setGoBackConfirmationOpen] =
        useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const [thankYouPopupOpen, setThankYouPopupOpen] = useState(false); // New state for Thank You popup
    const [thankYouPopupMessage, setThankYouPopupMessage] = useState(''); // Holds the dynamic message
    const [thankYouPopupType, setTankYouPopupType ] = useState("success");

    const onChange = (nextStep: number) => {
        

        
        // if (nextStep === 4){
        //     setStep(6)
        //     return
        // }
        // if (nextStep === 5){
        //     setStep(2)
        //     return
        // }

        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 6) {
            setStep(6)
        } else {
            setStep(nextStep)
        }
    }
    
    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)


    // Destructure the desired state slices and functions
const {
    applicantDetail,
    updateApplicantDetail,
    resetApplicantDetail,
    businessDetail,
    updateBusinessDetail,
    resetBusinessDetail,
    businessDetailIndividual,
    updateBusinessDetailIndividual,
    resetBusinessDetailIndividual,
    businessEntity,
    updateBusinessEntity,
    resetBusinessEntity,
    resetAll,
    completedSections,
    getValuesFromStateBusinessEntity,
    getValuesFromLicenseDetail,
    updateLicenseDetail,
    updateLicenseDetailCollector,
    updateLicenseDetailConsumer,
    updateLicenseDetailProducer,
    updateLicenseDetailRecycler,
    resetLicenseDetail,
    resetLicenseDetailProducer,
    resetLicenseDetailConsumer,
    resetLicenseDetailCollector,
    resetLicenseDetailRecycler,
} = useFormStore();
    const isReadOnly = applicantDetail.applicationStatus !== 'Created';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosBase.get(`/pmc/ping/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                navigate('/error');
            }
    }
    fetchData()

        if (id && id !== '0') {
            loadData(id);
        }else{
            resetApplicantDetail();
            resetBusinessDetail();
            resetBusinessDetailIndividual();
            resetBusinessEntity();
            resetLicenseDetail();
            resetLicenseDetailProducer();
            resetLicenseDetailConsumer();
            resetLicenseDetailRecycler();
            resetLicenseDetailCollector();
            setStep(0)
        }
    }, [id]);
    // get application data

    const loadData = (id) =>{
        const response = AxiosBase.get(`/pmc/applicant-detail/${id}/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log('Data:', response.data);
            const data_applicantDetail = {
                firstName:response.data.first_name,
                lastName:response.data.last_name,
                applicantDesignation:response.data.applicant_designation,
                gender:response.data.gender,
                cnic:response.data.cnic,
                email:response.data.email,
                // mobileOperator:response.data.mobile_operator,
                phoneNumber:response.data.mobile_no,
                id:response.data.id,
                has_identity_document:response.data.has_identity_document,
                has_fee_challan:response.data.has_fee_challan,
                applicationStatus:response.data.application_status
            }
             updateApplicantDetail(data_applicantDetail);

             
            if (response.data.businessprofile) {
                if(response.data.businessprofile.entity_type === 'Company'){
                    const dataBusinessProfile = {
                        applicant: response.data.id,
                        businessName: response.data.businessprofile.business_name,
                        //ntn: response.data.businessprofile.ntn_strn_pra_no_company,
                        // email: response.data.businessprofile.email,
                        district:response.data.businessprofile.district,
                        tehsil:response.data.businessprofile.tehsil,
                        city:response.data.businessprofile.city_town_village,
                        postalAddress:response.data.businessprofile.postal_address,
                        mobileNumber:response.data.businessprofile.mobile_no,
                        
                        id:response.data.businessprofile.id,
                    };
                    updateBusinessDetail(dataBusinessProfile);
                }
                if('Individual' === 'Individual'){
                    const dataBusinessProfile = {
                        applicant: response.data.id,
                        name: response.data.businessprofile.name,
                        //ntn: response.data.businessprofile.ntn_strn_pra_no_individual,
                        // email: response.data.businessprofile.email,
                        district:response.data.businessprofile.district,
                        tehsil:response.data.businessprofile.tehsil,
                        city:response.data.businessprofile.city_town_village,
                        postalAddress:response.data.businessprofile.postal_address,
                        mobileNumber:response.data.businessprofile.mobile_no,

                        id:response.data.businessprofile.id,
                    };
                    updateBusinessDetailIndividual(dataBusinessProfile);
                }
                    updateBusinessEntity({businessEntityType: 'Individual'//response.data.businessprofile.entity_type

                    });
            }

            // Handle Producer Data
            updateLicenseDetail({licenseType: response.data.registration_for})
            if (response.data.producer && response.data.registration_for === 'Producer') {
                const dataProducer = {
                    tracking_number: response.data.producer.tracking_number || '',
                    registration_required_for: (response.data.producer.registration_required_for || []),
                    registration_required_for_other: (response.data.producer.registration_required_for_other || []),
                    registration_required_for_other_other_text: (response.data.producer.registration_required_for_other_other_text || ''),
                    plain_plastic_Sheets_for_food_wrapping: (response.data.producer.plain_plastic_sheets_for_food_wrapping || []),
                    PackagingItems: (response.data.producer.packaging_items || []),
                    number_of_machines: response.data.producer.number_of_machines || '',
                    total_capacity_value: response.data.producer.total_capacity_value?.toString() || '',
                    date_of_setting_up: response.data.producer.date_of_setting_up || '',
                    total_waste_generated_value: response.data.producer.total_waste_generated_value?.toString() || '',
                    has_waste_storage_capacity: response.data.producer.has_waste_storage_capacity || '',
                    waste_disposal_provision: response.data.producer.waste_disposal_provision || '',
                    applicant: response.data.producer.applicant || '',
                };
            
                updateLicenseDetailProducer(dataProducer);
            }


            // Handle Consumer Data
            if (response.data.consumer && response.data.registration_for === 'Consumer') {
                const dataConsumer = {
                    registration_required_for: response.data.consumer.registration_required_for || [],
                    registration_required_for_other: response.data.consumer.registration_required_for_other || [],
                    registration_required_for_other_other_text: response.data.consumer.registration_required_for_other_other_text || '',
                    plain_plastic_Sheets_for_food_wrapping: response.data.consumer.plain_plastic_sheets_for_food_wrapping || [],
                    PackagingItems: response.data.consumer.packaging_items || [],
                    consumption: response.data.consumer.consumption || '',
                    provision_waste_disposal_bins: response.data.consumer.provision_waste_disposal_bins || 'No',
                    no_of_waste_disposible_bins: response.data.consumer.no_of_waste_disposable_bins || '',
                    segregated_plastics_handed_over_to_registered_recyclers:
                        response.data.consumer.segregated_plastics_handed_over_to_registered_recyclers || 'No',
                    applicant: response.data.consumer.applicant || '',
                };
                updateLicenseDetailConsumer(dataConsumer);
            }

            // Handle Recycler Data
            if (response.data.recycler && response.data.registration_for === 'Recycler') {
                const dataRecycler = {
                    selectedCategories: response.data.recycler.selected_categories || [],
                    plastic_waste_acquired_through: response.data.recycler.plastic_waste_acquired_through || [],
                    has_adequate_pollution_control_systems:
                        response.data.recycler.has_adequate_pollution_control_systems || 'No',
                    pollution_control_details: response.data.recycler.pollution_control_details || '',
                    applicant: response.data.recycler.applicant || '',
                    registration_required_for_other_other_text: (response.data.recycler.registration_required_for_other_other_text || ''),
                };
                updateLicenseDetailRecycler(dataRecycler);
            }

            // Handle Collector Data
            if (response.data.collector && response.data.registration_for === 'Collector') {
                const dataCollector = {
                    registration_required_for: response.data.collector.registration_required_for || [],
                    registration_required_for_other: response.data.collector.registration_required_for_other || [],
                    registration_required_for_other_other_text: response.data.collector.registration_required_for_other_other_text || '',
                    selectedCategoriesCollector: response.data.collector.selected_categories || [],
                    total_capacity_value_collector: response.data.collector.total_capacity_value || '',
                    number_of_vehicles: response.data.collector.number_of_vehicles || '',
                    number_of_persons: response.data.collector.number_of_persons || '',
                    applicant: response.data.collector.applicant || '',
                };
                updateLicenseDetailCollector(dataCollector);
            }
             
             if(response.data.application_status === 'Fee Challan'){
                setStep(4)
             }

            // Handle the response data
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle the error
        });;
    }

    const handleApplicantDetailFormSubmit = async (values: ApplicantDetailFormSchema) => {


    console.log('Submitted values', values)
    // updateApplicantDetail(values)
    setIsSubmiting(true)

    // Create FormData object
    const formData = new FormData();
    
    // Add non-file fields
    formData.append('first_name', (values.firstName));
    formData.append('last_name', (values.lastName));
    formData.append('applicant_designation', values.applicantDesignation);
    formData.append('gender', values.gender);
    formData.append('cnic', values.cnic);
    formData.append('email', values.email);
    // formData.append('mobile_operator', values.mobileOperator);
    formData.append('mobile_no', values.phoneNumber);
    // formData.append('tracking_number', JSON.stringify('ABCD1'));

    if (applicantDetail.id > 0 && applicantDetail.id !== 0) {
        try {
            const response = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Post successful:', response.data);
            const id = response.data.id;

            // Add the ID to the values object
            const updatedValues = { ...values, id };

            // Call updateApplicantDetail with updated values
            updateApplicantDetail(updatedValues);

            setIsSubmiting(false);
            onNext();
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
            setIsSubmiting(false);
        }
            onNext()
        }
    
    else{
        try {
            const response = await AxiosBase.post('/pmc/applicant-detail/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Post successful:', response.data);
            const resp_id = response.data.id;
            // const tracking_number = `LHR-PRO-${resp_id.toString().padStart(3, '0')}`;

            // Add the ID to the values object
            const updatedValues = { ...values, 'id':resp_id, 'applicationStatus':'Created' };
            console.log('updatedValues:', updatedValues)
            updateApplicantDetail(updatedValues);
            // console.log('applicant state:', applicantDetail)

            // formData.append('tracking_number', tracking_number);
            // formData.append('registration_for', 'Producer');

            // Call updateApplicantDetail with updated values
            // Update Tracking ID
            // try {
            //     const response = await AxiosBase.put(`/pmc/applicant-detail/${resp_id}/`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });
    
            //     console.log('Post successful:', response.data);
            //     const id = response.data.id;
    
            //     // Add the ID to the values object
            //     const updatedValues = { ...values, id };
    
            //     // Call updateApplicantDetail with updated values
            //     updateApplicantDetail(updatedValues);
    
            //     setIsSubmiting(false);
            //     onNext();
            // } catch (error) {
            //     console.error('Error in POST request:', error.response || error.message);
            //     setIsSubmiting(false);
            // }

            setIsSubmiting(false);
            onNext();
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
            setIsSubmiting(false);
        }
    }
            onNext()
        
    }

    const handleBusinessEntityFormSubmit = async (values: BusinessEntityFormSchema) => {
        const formData = new FormData();
    
        // Add non-file fields
        formData.append('entity_type', (values.businessEntityType));
        formData.append('applicant', applicantDetail.id.toString());

        console.log('Submitted values', values)
        console.log('updated business entity1:', businessEntity)
            updateBusinessEntity(values as BusinessEntityFields)
        console.log('updated business entity2:', businessEntity)
        if (completedSections.includes('businessDetail')){
            updateBusinessDetail(values as BusinessDetailFields)
            formData.append('business_name', (values.businessName));

            formData.append('district', (values.district));
            formData.append('tehsil', (values.tehsil));
            formData.append('city_town_village', (values.city));
            formData.append('postal_address', (values.postalAddress));
            formData.append('mobile_no', (values.mobileNumber));

            // formData.append('ntn_strn_pra_no_company', (values.ntn));
            // formData.append('email', (values.email));
        }
        if (completedSections.includes('businessDetailIndividual')){
            updateBusinessDetailIndividual(values as BusinessDetailIndividualFields)
            formData.append('name', (values.name));

            formData.append('district', (values.district));
            formData.append('tehsil', (values.tehsil));
            formData.append('city_town_village', (values.city));
            formData.append('postal_address', (values.postalAddress));
            // formData.append('mobile_no', (values.mobileNumber));

            // formData.append('ntn_strn_pra_no_individual', (values.ntn));
            // formData.append('email', (values.email));
        }

        setIsSubmiting(true)

        if(businessDetail.id > 0 || businessDetailIndividual.id > 0){
            const id = businessDetail.id || businessDetailIndividual.id
            try {
                const response = await AxiosBase.patch(`/pmc/business-profiles/${id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Put successful:', response.data);

                setIsSubmiting(false);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
                setIsSubmiting(false);
            }
        }
        else{
            try {
                const response = await AxiosBase.post('/pmc/business-profiles/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Post successful:', response.data);

                setIsSubmiting(false);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
                setIsSubmiting(false);
            }
        }
        setIsSubmiting(false)
        onNext()
    }

    const handleLicenseDetailFormSubmit = async (values: LicenseDetailFormSchema) => {
        console.log('Submitted values LicenseDetail:', values);
        onNext(); // Move to the next step
    
        try {

            // Update corresponding sections based on completed sections
            if (completedSections.includes('licenseDetailProducer')) {
                const formData = new FormData();

                // Add fields corresponding to the Django model
                formData.append('tracking_number', values.tracking_number || '');
            
                console.log('number_of_machines:', values.number_of_machines)
                formData.append('registration_required_for', JSON.stringify(values.registration_required_for || []));
                formData.append('registration_required_for_other', JSON.stringify(values.registration_required_for_other || []));
                formData.append('plain_plastic_sheets_for_food_wrapping', JSON.stringify(values.plain_plastic_Sheets_for_food_wrapping || []));
                formData.append('packaging_items', JSON.stringify(values.PackagingItems || []));
            
                // Add string fields for number_of_machines and total_capacity_value
                formData.append('number_of_machines', values.number_of_machines || '');
                formData.append('total_capacity_value', values.total_capacity_value || '');
            
                // Add date field
                formData.append('date_of_setting_up', values.date_of_setting_up || '');
            
                // Add waste management fields
                formData.append('total_waste_generated_value', values.total_waste_generated_value || '');
                formData.append('has_waste_storage_capacity', values.has_waste_storage_capacity || '');
                formData.append('waste_disposal_provision', values.waste_disposal_provision || '');

                formData.append('registration_required_for_other_other_text', values.registration_required_for_other_other_text || '');

            
                // Applicant field (assumed to be provided)
                formData.append('applicant', applicantDetail.id.toString());
                try {
                    const response = await AxiosBase.post('/pmc/producers/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
            
                    console.log('Post successful:', response.data);
                } catch (error) {
                    console.error('Error in POST request:', error.response || error.message);
                    setIsSubmiting(false);
                }
                updateLicenseDetailProducer(values as LicenseDetailFieldsProducer);



                // Set Applicatn level detail
                const formData2 = new FormData();
                formData2.append('registration_for', 'Producer');
                formData2.append('applicant', applicantDetail.id.toString());
                // formData2.append('tracking_number', `LHR-PRO-${applicantDetail.id.toString().padStart(3, '0')}`);
                // Call updateApplicantDetail with updated values
                // Update Tracking ID
                
                    const response2 = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData2, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    console.log('Post successful:', response2.data);
        
                    // Add the ID to the values object
                    const updatedValues = { 'registration_for': 'Producer' };
        
                    // Call updateApplicantDetail with updated values
                    updateApplicantDetail(updatedValues);
            }
            if (completedSections.includes('licenseDetailConsumer')) {
                    console.log('values:', values)
                    const formData = new FormData();
        
                    formData.append(
                        'registration_required_for',
                        JSON.stringify(values.registration_required_for || [])
                    );
                    formData.append(
                        'registration_required_for_other',
                        JSON.stringify(values.registration_required_for_other || [])
                    );
                    formData.append(
                        'plain_plastic_sheets_for_food_wrapping',
                        JSON.stringify(values.plain_plastic_Sheets_for_food_wrapping || [])
                    );
                    formData.append('packaging_items', JSON.stringify(values.PackagingItems || []));
                    formData.append('consumption', (values.consumption || '').toString());
                    formData.append(
                        'provision_waste_disposal_bins',
                        values.provision_waste_disposal_bins || 'No'
                    );
                    if (values.no_of_waste_disposible_bins) {
                        formData.append('no_of_waste_disposable_bins', values.no_of_waste_disposible_bins.toString());
                    }
                    formData.append(
                        'segregated_plastics_handed_over_to_registered_recyclers',
                        values.segregated_plastics_handed_over_to_registered_recyclers || 'No'
                    );
                    formData.append('applicant', applicantDetail.id.toString());
                    
                    formData.append('registration_required_for_other_other_text', values.registration_required_for_other_other_text || '');

                    const response = await AxiosBase.post('/pmc/consumers/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    console.log('Consumer POST successful:', response.data);
                
                    // Set Applicatn level detail
                    const formData2 = new FormData();
                    formData2.append('registration_for', 'Consumer');
                    formData2.append('applicant', applicantDetail.id.toString());
                    // formData2.append('tracking_number', `LHR-CON-${applicantDetail.id.toString().padStart(3, '0')}`);
                    // Call updateApplicantDetail with updated values
                    // Update Tracking ID
                   
                        const response2 = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData2, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
            
                        console.log('Post successful:', response2.data);
            
                        // Add the ID to the values object
                        const updatedValues = { 'registration_for': 'Consumer' };
            
                        // Call updateApplicantDetail with updated values
                        updateApplicantDetail(updatedValues);


                updateLicenseDetailConsumer(values as LicenseDetailFieldsConsumer);
            }
            if (completedSections.includes('licenseDetailCollector')) {
                console.log('values:', values);
                const formData = new FormData();
            
                // Add single-use plastics categories
                formData.append(
                    'registration_required_for',
                    JSON.stringify(values.registration_required_for || [])
                );
            
                // Add other plastics categories
                formData.append(
                    'registration_required_for_other',
                    JSON.stringify(values.registration_required_for_other || [])
                );
            
                // Add selected categories with their details
                formData.append(
                    'selected_categories',
                    JSON.stringify(values.selectedCategoriesCollector || [])
                );
            
                // Add collection details
                formData.append('total_capacity_value', (values.total_capacity_value_collector || '').toString());
                formData.append('number_of_vehicles', (values.number_of_vehicles || '').toString());
                formData.append('number_of_persons', (values.number_of_persons || '').toString());
            
                // Add applicant details
                formData.append('applicant', applicantDetail.id.toString());
                formData.append('registration_required_for_other_other_text', values.registration_required_for_other_other_text || '');
                try {
                    // Post to Collector API
                    const response = await AxiosBase.post('/pmc/collectors/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
            
                    console.log('Collector POST successful:', response.data);
            
                    // Update Applicant Details
                    const formData2 = new FormData();
                    formData2.append('registration_for', 'Collector');
                    // formData2.append('tracking_number', `LHR-COL-${applicantDetail.id.toString().padStart(3, '0')}`);
                    formData2.append('applicant', applicantDetail.id.toString());
            
                    const response2 = await AxiosBase.patch(
                        `/pmc/applicant-detail/${applicantDetail.id}/`,
                        formData2,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
            
                    console.log('Applicant Detail Update successful:', response2.data);
            
                    // Update local store or state with updated values
                    const updatedValues = { registration_for: 'Collector' };
                    updateApplicantDetail(updatedValues);
            
                    // Update state or local storage with the collector details
                    updateLicenseDetailCollector(values as LicenseDetailFieldsCollector);
                } catch (error) {
                    console.error('Error posting Collector details:', error.response || error.message);
                }
            }
            console.log('completedSections', completedSections)
            if (completedSections.includes('licenseDetailRecycler')) {
                const formData = new FormData();
    
                // Add selected categories
                formData.append(
                    'selected_categories',
                    JSON.stringify(values.selectedCategories || [])
                );
    
                // Add plastic waste acquisition methods
                formData.append(
                    'plastic_waste_acquired_through',
                    JSON.stringify(values.plastic_waste_acquired_through || [])
                );
    
                // Add pollution control system details
                formData.append(
                    'has_adequate_pollution_control_systems',
                    values.has_adequate_pollution_control_systems || 'No'
                );
    
                if (values.has_adequate_pollution_control_systems === 'Yes') {
                    formData.append(
                        'pollution_control_details',
                        values.pollution_control_details || ''
                    );
                }
    
                // Add applicant ID
                formData.append('applicant', applicantDetail.id.toString());
                formData.append('registration_required_for_other_other_text', values.registration_required_for_other_other_text || '');

                try {
                    const response = await AxiosBase.post('/pmc/recyclers/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
    
                    console.log('Post successful:', response.data);
                } catch (error) {
                    console.error('Error in POST request:', error.response || error.message);
                    setIsSubmiting(false);
                }
                updateLicenseDetailRecycler(values as LicenseDetailFieldsRecycler);

                // Set Applicatn level detail
                const formData2 = new FormData();
                formData2.append('registration_for', 'Recycler');
                // formData2.append('tracking_number', `LHR-REC-${applicantDetail.id.toString().padStart(3, '0')}`);
                formData2.append('applicant', applicantDetail.id.toString());

                // Call updateApplicantDetail with updated values
                // Update Tracking ID
               
                    const response2 = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData2, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    console.log('Post successful:', response2.data);
        
                    // Add the ID to the values object
                    const updatedValues = { 'registration_for': 'Consumer' };
        
                    // Call updateApplicantDetail with updated values
                    updateApplicantDetail(updatedValues);
            }
    
            setIsSubmiting(false);
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
            setIsSubmiting(false);
        }
    };
    

    const handleDocumentFormSubmit = async (values: LicenseDetailFormSchema) => {
        console.log('Submitted values LicenseDetail:', values);

        const formData = new FormData();

        // Append fields to FormData
        if (!applicantDetail.has_identity_document && values.flow_diagram) {
            formData.append('document', values.flow_diagram);
        
            formData.append('document_description',  'Identity Document');
            formData.append('applicant',  applicantDetail.id.toString());

            try {
                const response = await AxiosBase.post('/pmc/applicant-documents/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Post successful:', response.data);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
            }
            onNext();
        } else if(applicantDetail.has_identity_document){
            onNext();
        }

        // onNext(); // Move to the next step
    
        // try {

        //     // Update corresponding sections based on completed sections
        //     if (completedSections.includes('licenseDetailProducer')) {
        //         const formData = new FormData();

        //         // Add fields corresponding to the Django model
        //         formData.append('tracking_number', values.tracking_number || '');
            
        //         console.log('number_of_machines:', values.number_of_machines)
        //         formData.append('registration_required_for', JSON.stringify(values.registration_required_for || []));
        //         formData.append('plain_plastic_sheets_for_food_wrapping', JSON.stringify(values.plain_plastic_Sheets_for_food_wrapping || []));
        //         formData.append('packaging_items', JSON.stringify(values.PackagingItems || []));
            
        //         // Add string fields for number_of_machines and total_capacity_value
        //         formData.append('number_of_machines', values.number_of_machines || '');
        //         formData.append('total_capacity_value', values.total_capacity_value || '');
            
        //         // Add date field
        //         formData.append('date_of_setting_up', values.date_of_setting_up || '');
            
        //         // Add waste management fields
        //         formData.append('total_waste_generated_value', values.total_waste_generated_value || '');
        //         formData.append('has_waste_storage_capacity', values.has_waste_storage_capacity || '');
        //         formData.append('waste_disposal_provision', values.waste_disposal_provision || '');

            
        //         // Applicant field (assumed to be provided)
        //         formData.append('applicant', applicantDetail.id.toString());
        //         try {
        //             const response = await AxiosBase.post('/pmc/producers/', formData, {
        //                 headers: {
        //                     'Content-Type': 'multipart/form-data',
        //                 },
        //             });
            
        //             console.log('Post successful:', response.data);
        //         } catch (error) {
        //             console.error('Error in POST request:', error.response || error.message);
        //             setIsSubmiting(false);
        //         }
        //         updateLicenseDetailProducer(values as LicenseDetailFieldsProducer);
        //     }
        //     if (completedSections.includes('licenseDetailConsumer')) {
        //         updateLicenseDetailConsumer(values as LicenseDetailFieldsConsumer);
        //     }
        //     if (completedSections.includes('licenseDetailCollector')) {
        //         updateLicenseDetailCollector(values as LicenseDetailFieldsCollector);
        //     }
        //     if (completedSections.includes('licenseDetailRecycler')) {
        //         updateLicenseDetailRecycler(values as LicenseDetailFieldsRecycler);
        //     }
    
        //     setIsSubmiting(false);
        // } catch (error) {
        //     console.error('Error in POST request:', error.response || error.message);
        //     setIsSubmiting(false);
        // }
    };

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">Customer discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/customers/customer-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleGoBack = () => {
        setGoBackConfirmationOpen(true)
    }
    
    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
        setGoBackConfirmationOpen(false)
    }

    const handleConfirmGoBack = () => {
        setGoBackConfirmationOpen(false)
        onPrevious()
    }

    const submitApplication = async (values: LicenseDetailFormSchema) =>{
        setIsSubmiting(true);
        // Step 1: Verify Challan
        const verifyChallanFormData = new FormData();
        verifyChallanFormData.append('chalan_image', values.flow_diagram); // Assuming 'flow_diagram' is the challan image
        verifyChallanFormData.append('ApplicantId', applicantDetail.id.toString()); // Assuming 'flow_diagram' is the challan image

        try {
            const verifyResponse = await AxiosBase.post('/pmc/verify-chalan/', verifyChallanFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (verifyResponse.data.status !== 'verified') {
                console.error('Challan verification failed:', verifyResponse.data.message);
                setThankYouPopupOpen(true); // Show popup for failure
                setThankYouPopupMessage(
                    verifyResponse.data.message || 'Challan verification failed. Please try again.'
                );
                setTankYouPopupType("danger")
                
                setIsSubmiting(false);
                return; // Exit the function if verification fails
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Challan verification error:', error.response.data);
                        // Show popup for error
                setThankYouPopupOpen(true);
                setThankYouPopupMessage(error.response.data.message || 'Invalid Challan. Please try again.');
                setTankYouPopupType("danger")
            } else {
                console.error('Unexpected error during challan verification:', error);
                setThankYouPopupOpen(true);
                setThankYouPopupMessage('An unexpected error occurred during challan verification. Please try again.');
                setTankYouPopupType("danger")
            }
            setIsSubmiting(false);
            return; // Exit the function if verification fails
        }

        const formData = new FormData();

        // Append fields to FormData
        formData.append('document', values.flow_diagram);
    
        formData.append('document_description',  'Fee Challan');
        formData.append('applicant',  applicantDetail.id.toString());

        try {
            const response = await AxiosBase.post('/pmc/applicant-documents/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post successful:', response.data);
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
        }


        
        const formData2 = new FormData();
        // Add non-file fields
        formData2.append('application_status', 'Submitted');

        const response2 = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData2, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        updateApplicantDetail({applicationStatus: "Submitted"})


            
        // Download Fee Challan            
        const response = await AxiosBase.get(`/pmc/receipt-pdf?ApplicantId=${applicantDetail.id}`, {
            responseType: 'blob', // Important to get the data as a Blob
        });        
        // Create a blob URL for the downloaded file
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        // Set filename for the downloaded file
        link.setAttribute('download', `Recipt.pdf`);
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
        setIsSubmiting(false);
        setThankYouPopupOpen(true); 
        setThankYouPopupMessage("Application is submitted successfully!")
        setTankYouPopupType("success")
        // const formData = new FormData();
    
        // // Add non-file fields
        // formData.append('first_name', (applicantDetail.firstName));
        // formData.append('last_name', (applicantDetail.lastName));
        // formData.append('applicant_designation', applicantDetail.applicantDesignation);
        // formData.append('gender', applicantDetail.gender);
        // formData.append('cnic', applicantDetail.cnic);
        // formData.append('email', applicantDetail.email);
        // // formData.append('mobile_operator', applicantDetail.mobileOperator);
        // formData.append('mobile_no', applicantDetail.phoneNumber);
        // formData.append('application_status', ('Submitted'));
        // formData.append('assigned_group', ('LSO'));

        // if (applicantDetail.id > 0) {
        //     try {
        //         const response = await AxiosBase.put(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         });
        //         setIsSubmiting(false);
        //         navigate('/home');
        //     } catch (error) {
        //         console.error('Error in POST request:', error.response || error.message);
        //         setIsSubmiting(false);
        //     }
        //         onNext()
        //     }

        //     const formData2 = new FormData();
        //     formData2.append('applicant', applicantDetail.id.toString())
        //     formData2.append('assigned_group', 'LSO')
        //     formData2.append('remarks', '')
        //     await AxiosBase.post(`/pmc/application-assignment/`, formData2, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
    }



const BusinessEntityFormData = getValuesFromStateBusinessEntity()
const LicenseDetailFormData = getValuesFromLicenseDetail()
        const closeThankYouPopup = () => {
            setThankYouPopupOpen(false);
            if (applicantDetail.applicationStatus === 'Submitted'){
                navigate("/home"); // Redirect to home after closing the popup
            }
        };
    return (
        <>

<Steps current={step} className='mb-5'>
            <Steps.Item title="Applicant Detail" />
            <Steps.Item title="Business Detail" />
            <Steps.Item title="License Detail" />
            <Steps.Item title="Documents" />
            <Steps.Item title="Payment & Submission of Application" />
            {/* <Steps.Item title="Review & Submit" /> */}
        </Steps>
          {step === 0 && <ApplicantDetailForm
                newCustomer
                defaultValues={applicantDetail}
                onFormSubmit={handleApplicantDetailFormSubmit}
                readOnly={isReadOnly}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                icon={<BiArrowBack />}
                                className="ltr:mr-3 rtl:ml-3"
                                variant="solid"
                                type="button"
                                loading={isSubmiting}
                                disabled={ step === 0? true : false}
                                onClick={applicantDetail.applicationStatus === 'Created' ? handleGoBack : onPrevious}
                            >
                                Back
                            </Button>

                            <Button
                                icon={applicantDetail.applicationStatus === 'Created' ?<BiSave /> : <BiArrowToRight/> }
                                variant="solid"
                                type={applicantDetail.applicationStatus === 'Created' ? 'submit' : 'button'}
                                loading={isSubmiting}
                                onClick={applicantDetail.applicationStatus === 'Created' ? null : onNext}
                            >
                                {applicantDetail.applicationStatus === 'Created' ? 'Save & Next' : 'View & Next'}
                                
                            </Button>
                        </div>
                    </div>
                </Container>
            </ApplicantDetailForm>
}
{step === 1 && <BusinessEntityForm
                newCustomer
                defaultValues={BusinessEntityFormData}
                onFormSubmit={handleBusinessEntityFormSubmit}
                readOnly={isReadOnly}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                icon={<BiArrowBack />}
                                className="ltr:mr-3 rtl:ml-3"
                                variant="solid"
                                type="button"
                                loading={isSubmiting}
                                disabled={ step === 0? true : false}
                                onClick={applicantDetail.applicationStatus === 'Created' ? handleGoBack : onPrevious}
                            >
                                Back
                            </Button>

                            <Button
                                icon={applicantDetail.applicationStatus === 'Created' ?<BiSave /> : <BiArrowToRight/> }
                                variant="solid"
                                type={applicantDetail.applicationStatus === 'Created' ? 'submit' : 'button'}
                                loading={isSubmiting}
                                onClick={applicantDetail.applicationStatus === 'Created' ? null : onNext}
                            >
                                {applicantDetail.applicationStatus === 'Created' ? 'Save & Next' : 'View & Next'}
                                
                            </Button>
                        </div>
                    </div>
                </Container>
            </BusinessEntityForm>
}
{step === 2 && <LicenseDetailForm
                newCustomer
                defaultValues={LicenseDetailFormData}
                onFormSubmit={handleLicenseDetailFormSubmit}
                readOnly={isReadOnly}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                icon={<BiArrowBack />}
                                className="ltr:mr-3 rtl:ml-3"
                                variant="solid"
                                type="button"
                                loading={isSubmiting}
                                disabled={ step === 0? true : false}
                                onClick={applicantDetail.applicationStatus === 'Created' ? handleGoBack : onPrevious}
                            >
                                Back
                            </Button>

                            <Button
                                icon={applicantDetail.applicationStatus === 'Created' ?<BiSave /> : <BiArrowToRight/> }
                                variant="solid"
                                type={applicantDetail.applicationStatus === 'Created' ? 'submit' : 'button'}
                                loading={isSubmiting}
                                onClick={applicantDetail.applicationStatus === 'Created' ? null : onNext}
                            >
                                {applicantDetail.applicationStatus === 'Created' ? 'Save & Next' : 'View & Next'}
                                
                            </Button>
                        </div>
                    </div>
                </Container>
            </LicenseDetailForm>
}
{step === 3 && <DocumentForm
                newCustomer
                defaultValues={LicenseDetailFormData}
                onFormSubmit={handleDocumentFormSubmit}
                readOnly={isReadOnly}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                icon={<BiArrowBack />}
                                className="ltr:mr-3 rtl:ml-3"
                                variant="solid"
                                type="button"
                                loading={isSubmiting}
                                disabled={ step === 0? true : false}
                                onClick={applicantDetail.applicationStatus === 'Created' ? handleGoBack : onPrevious}
                            >
                                Back
                            </Button>

                            <Button
                                icon={applicantDetail.applicationStatus === 'Created' ?<BiSave /> : <BiArrowToRight/> }
                                variant="solid"
                                type={applicantDetail.applicationStatus === 'Created' ? 'submit' : 'button'}
                                loading={isSubmiting}
                                onClick={applicantDetail.applicationStatus === 'Created' ? null : onNext}
                            >
                                {applicantDetail.applicationStatus === 'Created' ? 'Save & Next' : 'View & Next'}
                                
                            </Button>
                        </div>
                    </div>
                </Container>
            </DocumentForm>
}
{step === 4 && <DocumentForm2
                newCustomer
                defaultValues={LicenseDetailFormData}
                onFormSubmit={submitApplication}
                readOnly={applicantDetail.applicationStatus === 'Submitted'}
            >
                <Container>
                        <div className="flex items-center justify-between px-8">
                            <span></span>
                            <div className="flex items-center">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        "border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent"
                                    }
                                    icon={<TbTrash />}
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </Button>
                                <Button
                                    icon={<BsBack />}
                                    className="ltr:mr-3 rtl:ml-3"
                                    variant="solid"
                                    type="button"
                                    loading={isSubmiting}
                                    disabled={step === 0}
                                    onClick={handleGoBack}
                                >
                                    Back
                                </Button>

                                <Button
                                    icon={<BiSave />}
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmiting}
                                    disabled={applicantDetail.applicationStatus === 'Submitted'}
                                >
                                    Submit Application
                                </Button>
                            </div>
                        </div>
                    </Container>
            </DocumentForm2>
}
{step === 6 &&  <ReviewAndSavePage
                onFormSubmit={submitApplication}
                >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                icon={<BsBack />}
                                className="ltr:mr-3 rtl:ml-3"
                                variant="solid"
                                type="button"
                                loading={isSubmiting}
                                disabled={ step === 0? true : false}
                                onClick={handleGoBack}
                            >
                                Back
                            </Button>

                            <Button
                                icon={<BiSave />}
                                variant="solid"
                                type="button"
                                // onClick={submitApplication}
                                loading={isSubmiting}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Container>
    </ReviewAndSavePage>}

        {/* Thank You Popup */}
        <ConfirmDialog
            isOpen={thankYouPopupOpen}
            type={thankYouPopupType}
            title="Notification"
            onClose={closeThankYouPopup}
            onRequestClose={closeThankYouPopup}
            onConfirm={closeThankYouPopup}
            onCancel={closeThankYouPopup}
        >
            <p>{thankYouPopupMessage}</p>
        </ConfirmDialog>

            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this?
                </p>
            </ConfirmDialog>

            <ConfirmDialog
                isOpen={goBackConfirmationOpen}
                type="danger"
                title="Go Back"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmGoBack}
            >
                <p>
                    There are unsaved changes on this step, Are you sure you want to go back step?
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CustomerEdit

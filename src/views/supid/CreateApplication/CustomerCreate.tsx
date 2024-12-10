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
import { BiSave } from 'react-icons/bi'
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


    useEffect(() => {
        if (id && id !== '0') {
            loadData(id);
        }else{
            resetApplicantDetail();
            resetBusinessDetail();
            resetBusinessDetailIndividual();
            resetBusinessEntity();
            resetLicenseDetail();
            resetLicenseDetailProducer();
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
                id:response.data.id
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

            updateLicenseDetail({licenseType: response.data.registration_for})
            if (response.data.producer && response.data.registration_for === 'Producer') {
                const dataProducer = {
                    tracking_number: response.data.producer.tracking_number || '',
                    registration_required_for: (response.data.producer.registration_required_for || []),
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
    // formData.append('last_name', (values.lastName));
    formData.append('applicant_designation', values.applicantDesignation);
    formData.append('gender', values.gender);
    formData.append('cnic', values.cnic);
    formData.append('email', values.email);
    // formData.append('mobile_operator', values.mobileOperator);
    formData.append('mobile_no', values.phoneNumber);
    // formData.append('tracking_number', JSON.stringify('ABCD1'));

    if (applicantDetail.id > 0 && applicantDetail.id !== 0) {
        try {
            const response = await AxiosBase.put(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
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
            const tracking_number = `LHR-PRO-${resp_id.toString().padStart(3, '0')}`;

            // Add the ID to the values object
            const updatedValues = { ...values, 'id':resp_id };
            console.log('updatedValues:', updatedValues)
            updateApplicantDetail(updatedValues);
            console.log('applicant state:', applicantDetail)

            formData.append('tracking_number', tracking_number);
            formData.append('registration_for', 'Producer');

            // Call updateApplicantDetail with updated values
            // Update Tracking ID
            try {
                const response = await AxiosBase.put(`/pmc/applicant-detail/${resp_id}/`, formData, {
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
                const response = await AxiosBase.put(`/pmc/business-profiles/${id}/`, formData, {
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
            }
            if (completedSections.includes('licenseDetailConsumer')) {
                updateLicenseDetailConsumer(values as LicenseDetailFieldsConsumer);
            }
            if (completedSections.includes('licenseDetailCollector')) {
                updateLicenseDetailCollector(values as LicenseDetailFieldsCollector);
            }
            if (completedSections.includes('licenseDetailRecycler')) {
                updateLicenseDetailRecycler(values as LicenseDetailFieldsRecycler);
            }
    
            setIsSubmiting(false);
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
            setIsSubmiting(false);
        }
    };
    

    const handleDocumentFormSubmit = async (values: LicenseDetailFormSchema) => {
        console.log('Submitted values LicenseDetail:', values);
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

    const submitApplication = async () =>{
        setThankYouPopupOpen(true); 
        // const formData = new FormData();
    
        // // Add non-file fields
        // formData.append('first_name', (applicantDetail.firstName));
        // // formData.append('last_name', (applicantDetail.lastName));
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
} = useFormStore();

const BusinessEntityFormData = getValuesFromStateBusinessEntity()
const LicenseDetailFormData = getValuesFromLicenseDetail()
        const closeThankYouPopup = () => {
            setThankYouPopupOpen(false);
            navigate("/home"); // Redirect to home after closing the popup
        };
    return (
        <>

<Steps current={step} className='mb-5'>
            <Steps.Item title="Applicant Detail" />
            <Steps.Item title="Business Detail" />
            <Steps.Item title="License Detail" />
            <Steps.Item title="Documents" />
            <Steps.Item title="Payment & Submit Application" />
            {/* <Steps.Item title="Review & Submit" /> */}
        </Steps>
          {step === 0 && <ApplicantDetailForm
                newCustomer
                defaultValues={applicantDetail}
                onFormSubmit={handleApplicantDetailFormSubmit}
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
                                type="submit"
                                loading={isSubmiting}
                            >
                                Save & Next
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
                                type="submit"
                                loading={isSubmiting}
                            >
                                Save & Next
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
                                type="submit"
                                loading={isSubmiting}
                            >
                                Save & Next
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
                                type="submit"
                                loading={isSubmiting}
                                onClick={()=>{onNext()}}
                            >
                                Save & Next
                            </Button>
                        </div>
                    </div>
                </Container>
            </DocumentForm>
}
{step === 4 && <DocumentForm2
                newCustomer
                defaultValues={LicenseDetailFormData}
                onFormSubmit={handleLicenseDetailFormSubmit}
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
                                    type="button"
                                    onClick={submitApplication}
                                    loading={isSubmiting}
                                >
                                    Submit Application
                                </Button>
                            </div>
                        </div>
                    </Container>
            </DocumentForm2>
}
{step === 6 &&  <ReviewAndSavePage>
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
                                onClick={submitApplication}
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
                        type="success"
                        title="Thank You!"
                        onClose={closeThankYouPopup}
                        onRequestClose={closeThankYouPopup}
                        onConfirm={closeThankYouPopup}
            >
                <p>Your application has been successfully submitted.</p>
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

import { useState, useEffect } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {ApplicantDetailForm} from '../ApplicantDetailForm'
import {BusinessEntityForm, BusinessEntityFormSchema} from '../BusinessEntityForm'
import {BusinessEntityFields, BusinessDetailFields, BusinessDetailIndividualFields} from '../BusinessEntityForm/types'
import {LicenseDetailForm, LicenseDetailFormSchema} from '../LicenseDetailForm'
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
import ReviewAndSavePage from './ReviewApplication'

const CustomerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [goBackConfirmationOpen, setGoBackConfirmationOpen] =
        useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const onChange = (nextStep: number) => {
        if (nextStep === 3){
            setStep(6)
            return
        }
        if (nextStep === 5){
            setStep(2)
            return
        }

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
        console.log('its here1')
        if (id) {
            loadData(id);
        }else{
            resetApplicantDetail();
            resetBusinessDetail();
            resetBusinessDetailIndividual();
            resetBusinessEntity();
            
        }
    }, [id]);
    // get application data

    // Function to format JSON into an HTML string
    const formatJsonToJsx = (data) => {
        return (
          <div>
            <h3>Application Assignments</h3>
            {data.map((item) => (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                <div><strong>Assigned Group:</strong> {item.assigned_group}</div>
                <div><strong>Remarks:</strong> {item.remarks || "No remarks"}</div>
                <div>
                  <strong>Updated Date/Time:</strong>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        );
      };

    const loadData = (id) =>{
        const response = AxiosBase.get(`/pmc/applicant-detail/${id}/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            //console.log('Data:', response.data);
            const data_applicantDetail = {
                firstName:response.data.first_name,
                lastName:response.data.last_name,
                applicantDesignation:response.data.applicant_designation,
                gender:response.data.gender,
                cnic:response.data.cnic,
                email:response.data.email,
                mobileOperator:response.data.mobile_operator,
                phoneNumber:response.data.mobile_no,
                id:response.data.id,
                assignedGroup:response.data.assigned_group,
                applicationassignment:formatJsonToJsx((response.data.applicationassignment))
            }
             updateApplicantDetail(data_applicantDetail);

             
            if (response.data.businessprofile) {
                if(response.data.businessprofile.entity_type === 'Company'){
                    const dataBusinessProfile = {
                        applicant: response.data.id,
                        businessName: response.data.businessprofile.business_name,
                        ntn: response.data.businessprofile.ntn_strn_pra_no_company,
                        email: response.data.businessprofile.email,
                        id:response.data.businessprofile.id,
                    };
                    updateBusinessDetail(dataBusinessProfile);
                }
                if(response.data.businessprofile.entity_type === 'Individual'){
                    const dataBusinessProfile = {
                        applicant: response.data.id,
                        name: response.data.businessprofile.name,
                        ntn: response.data.businessprofile.ntn_strn_pra_no_individual,
                        email: response.data.businessprofile.email,
                        id:response.data.businessprofile.id,
                    };
                    updateBusinessDetailIndividual(dataBusinessProfile);
                }
                    updateBusinessEntity({businessEntityType:response.data.businessprofile.entity_type});
            }

            updateLicenseDetail({licenseType: response.data.registration_for})
            if (response.data.producer && response.data.registration_for === 'Producer') {

                const registration_required_for = [];
                    if (response.data.producer.is_carry_bags) {
                        registration_required_for.push('Carry bags');
                    }
                    if (response.data.producer.is_single_use_plastics) {
                        registration_required_for.push('Single-use Plastics');
                    }
                    if (response.data.producer.is_plastic_packing) {
                        registration_required_for.push('Plastic Packing');
                    }

                const dataProducer = {
                        applicant: response.data.producer.id,
                        is_carry_bags: response.data.producer.is_carry_bags,
                        is_single_use_plastics: response.data.producer.is_single_use_plastics,
                        is_plastic_packing: response.data.producer.is_plastic_packing,
                        registration_required_for,
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

    if (applicantDetail.id > 0) {
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
            const id = response.data.id;
            const tracking_number = `LHR-PRO-${id.toString().padStart(3, '0')}`;

            // Add the ID to the values object
            const updatedValues = { ...values, id };
            formData.append('tracking_number', tracking_number);

            // Call updateApplicantDetail with updated values
            // Update Tracking ID
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
            formData.append('ntn_strn_pra_no_company', (values.ntn));
            formData.append('email', (values.email));
        }
        if (completedSections.includes('businessDetailIndividual')){
            updateBusinessDetailIndividual(values as BusinessDetailIndividualFields)
            formData.append('name', (values.name));
            formData.append('ntn_strn_pra_no_individual', (values.ntn));
            formData.append('email', (values.email));
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
        console.log('Submitted values LicenseDetail', values);
        onNext();
        // setIsSubmiting(true);
    
        // Create FormData object
        const formData = new FormData();
        console.log('registration_required_for', values.registration_required_for)
    
        // formData.append('registration_required_for', JSON.stringify(values.registration_required_for))
        formData.append('is_carry_bags', values.registration_required_for.includes('Carry bags').toString());
        formData.append('is_single_use_plastics', values.registration_required_for.includes('Single-use Plastics').toString());
        formData.append('is_plastic_packing', values.registration_required_for.includes('Plastic Packing').toString());
        // Add non-file fields
        // formData.append('registration_required_for', JSON.stringify(values.registration_required_for));
        // formData.append('single_use_plastic_items', JSON.stringify(values.single_use_plastic_items || []));
        // formData.append('total_capacity_value', values.total_capacity_value);
        // formData.append('total_capacity_unit', values.total_capacity_unit);
        // formData.append('registration_number', values.registration_number);
        // formData.append('registration_date', values.registration_date);
        // formData.append('date_of_setting_up', values.date_of_setting_up);
        // formData.append('date_of_commencement_of_production', values.date_of_commencement_of_production);
        // formData.append('is_compliance_with_rules', values.is_compliance_with_rules.toString());
        // formData.append('valid_consent_permit', values.valid_consent_permit.toString());
        // formData.append('total_waste_generated_value', values.total_waste_generated_value);
        // formData.append('total_waste_generated_unit', values.total_waste_generated_unit);
        // formData.append('is_waste_storage_capacity', values.is_waste_storage_capacity.toString());
        // formData.append('is_waste_disposal_provision', values.is_waste_disposal_provision.toString());
        // formData.append('products_list', JSON.stringify(values.products_list || []));
        // formData.append('by_products_list', JSON.stringify(values.by_products_list || []));
        formData.append('applicant', applicantDetail.id.toString());
    
        // Add file fields
        // if (values.flow_diagram) {
        //     formData.append('flow_diagram', values.flow_diagram);
        // }
        // if (values.personnel_or_consumers_list) {
        //     formData.append('personnel_or_consumers_list', values.personnel_or_consumers_list);
        // }
        // if (values.action_plan) {
        //     formData.append('action_plan', values.action_plan);
        // }
    
        try {
            const response = await AxiosBase.post('/pmc/producers/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Post successful:', response.data);
    
            // Call update functions
            updateLicenseDetail(values as LicenseDetailFields);
            if (completedSections.includes('licenseDetailConsumer')) {
                updateLicenseDetailCollector(values as LicenseDetailFieldsCollector);
            }
            if (completedSections.includes('licenseDetailProducer')) {
                updateLicenseDetailProducer(values as LicenseDetailFieldsProducer);
            }
            if (completedSections.includes('licenseDetailCollector')) {
                updateLicenseDetailCollector(values as LicenseDetailFieldsCollector);
            }
            if (completedSections.includes('licenseDetailRecycler')) {
                updateLicenseDetailRecycler(values as LicenseDetailFieldsRecycler);
            }
    
            // Simulate delay and move to next step
            //await sleep(800);
            setIsSubmiting(false);
            
        } catch (error) {
            console.error('Error in POST request:', error.response || error.message);
            setIsSubmiting(false);
        }


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
        if(applicantDetail.assignedGroup2 !== '' ){
            // Add non-file fields
            const formData = new FormData();
            formData.append('assigned_group', (applicantDetail.assignedGroup2));

            if (applicantDetail.id > 0) {
                try {
                    const response = await AxiosBase.put(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    setIsSubmiting(false);
                    navigate('/home');
                } catch (error) {
                    console.error('Error in POST request:', error.response || error.message);
                    setIsSubmiting(false);
                }
                    onNext()
                }

                const formData2 = new FormData();
                formData2.append('applicant', applicantDetail.id.toString())
                formData2.append('assigned_group', (applicantDetail.assignedGroup2));
                formData2.append('remarks', applicantDetail.remarks);
                console.log(applicantDetail.remarks)
                await AxiosBase.post(`/pmc/application-assignment/`, formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        }
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
// APPLICANT > LSO > LSM > DO > LSM2 > TL > DEO > Download License
const groups = [
    'APPLICANT',
    'LSO',
    'LSM',
    'DO',
    'LSM2',
    'TL',
    'DEO',
    'Download License'
    ]

const groupList = fnGroupList(applicantDetail.assignedGroup)
console.log('groupList', groupList)


function fnGroupList(group) {
    const index = groups.indexOf(group);
    if (index === -1) {
        // throw new Error(`Group "${group}" not found in the list.`);
    }
    
    // Get the desired range (one before, the group itself, one after)
    const selectedGroups = groups.slice(Math.max(0, index - 1), index + 2);
    
    // Transform into value-label pairs
    return selectedGroups.map(item => ({ value: item, label: item }));
    }

    return (
        <>

 <ReviewAndSavePage
 groupList= {groupList}
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
                                onClick={submitApplication}
                                loading={isSubmiting}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Container>
    </ReviewAndSavePage>

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

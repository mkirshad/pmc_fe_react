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
    const [movementDirection, setMovementDirection] = useState<'forward' | 'backward' | null>(null)

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
            <h5>Application Assignments</h5>
            {data.map((item, index) => (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                {/* <div style={{ fontWeight: "bold", }}>
                    {index + 1})
                </div> */}
                <div><strong>{index + 1}) Assigned By:</strong> {item.created_by} ({item.created_by_group})</div>
                <div><strong>Assigned Group:</strong> {item.assigned_group}</div>
                <div><strong>Remarks:</strong> {item.remarks || "No remarks"}</div>
                <div>
                  <strong>Updated Date/Time:</strong>{" "}
                  {new Date(item.created_at).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    })}
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
            console.log('Data:', response.data);
            const data_applicantDetail = {
                trackingNumber:response.data.tracking_number,
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
                applicationStatus:response.data.application_status,
                assignedGroup:response.data.assigned_group,
                applicationassignment:formatJsonToJsx((response.data.applicationassignment)),
                applicationdocument:response.data.applicationdocument,
                field_responses:response.data.field_responses,
                manual_fields: response.data.manual_fields,
                psid_tracking: response.data.psid_tracking,
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
                        district:response.data.businessprofile.district_name,
                        tehsil:response.data.businessprofile.tehsil_name,
                        city:response.data.businessprofile.city_town_village,
                        postalAddress:response.data.businessprofile.postal_address,
                        mobileNumber:response.data.businessprofile.mobile_no,

                        id:response.data.businessprofile.id,
                    };
                    updateBusinessDetailIndividual(dataBusinessProfile);
                }
                    updateBusinessEntity({businessEntityType: response.data.businessprofile.entity_type//response.data.businessprofile.entity_type

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
                    totalFeeAmount: response.data.applicantfees
                                    ? response.data.applicantfees.reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                                    : 0,
                    verifiedFeeAmount: response.data.applicantfees
                        ? response.data.applicantfees
                            .filter((fee) => fee.is_settled)
                            .reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                        : 0,
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
                    totalFeeAmount: response.data.applicantfees
                    ? response.data.applicantfees.reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                    : 0,
                    verifiedFeeAmount: response.data.applicantfees
                        ? response.data.applicantfees
                            .filter((fee) => fee.is_settled)
                            .reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                        : 0,
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
                    totalFeeAmount: response.data.applicantfees
                    ? response.data.applicantfees.reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                    : 0,
                    verifiedFeeAmount: response.data.applicantfees
                        ? response.data.applicantfees
                            .filter((fee) => fee.is_settled)
                            .reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                        : 0,
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
                    totalFeeAmount: response.data.applicantfees
                    ? response.data.applicantfees.reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                    : 0,
                    verifiedFeeAmount: response.data.applicantfees
                        ? response.data.applicantfees
                            .filter((fee) => fee.is_settled)
                            .reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
                        : 0,
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
    // formData.append('last_name', (values.lastName));
    formData.append('applicant_designation', values.applicantDesignation);
    formData.append('gender', values.gender);
    formData.append('cnic', values.cnic);
    formData.append('email', values.email);
    // formData.append('mobile_operator', values.mobileOperator);
    formData.append('mobile_no', values.phoneNumber);
    // formData.append('tracking_number', JSON.stringify('ABCD1'));
    formData.append('id', applicantDetail.id.toString())
    if (applicantDetail.id > 0) {
        try {
            const response = await AxiosBase.post(`/pmc/applicant-detail/`, formData, {
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
            formData.append('id', applicantDetail.id.toString());
            // Call updateApplicantDetail with updated values
            // Update Tracking ID
            try {
                const response = await AxiosBase.post(`/pmc/applicant-detail/`, formData, {
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
            formData.append('id', id.toString())
            try {
                const response = await AxiosBase.post(`/pmc/business-profiles/`, formData, {
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

    const handleSubmitResponses = async () => {
        if(!applicantDetail.readOnly){       
            // console.log('fieldResponses', applicantDetail.fieldResponses)
            console.log('readOnly', applicantDetail.readOnly)
            const payload = Object.entries(applicantDetail.fieldResponses).map(([key, value]) => ({
            field_key: key,
            response: value.response,
            comment: value.comment,
            applicant: applicantDetail.id, // Use the applicant ID
            }));
        
            try {
            const response = await AxiosBase.post("/pmc/field-responses/", payload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Responses submitted:", response.data);
            } catch (error) {
            console.error("Error submitting responses:", error);
            navigate('/error');
            }
        }
      };
    
      const handleSubmitManualFields = async () => {
        // Retrieve manualFields from applicantDetail (or from your local state)
        const { manualFields } = applicantDetail;
      
        // Prepare form data
        const formData = new FormData();
        formData.append("applicant", applicantDetail.id);
      
      // Example fields — update/add/remove these as per your model
        formData.append("latitude", (manualFields.latitude ? parseFloat(manualFields.latitude).toFixed(6) : ""));
        formData.append("longitude", (manualFields.longitude ? parseFloat(manualFields.longitude).toFixed(6) : ""));      
        formData.append("list_of_products", manualFields.list_of_products || "");
        formData.append("list_of_by_products", manualFields.list_of_by_products || "");
        formData.append("raw_material_imported", manualFields.raw_material_imported || "");
        formData.append("seller_name_if_raw_material_bought", manualFields.seller_name_if_raw_material_bought || "");
        formData.append("self_import_details", manualFields.self_import_details || "");
        formData.append("raw_material_utilized", manualFields.raw_material_utilized || "");
        formData.append("compliance_thickness_75", manualFields.compliance_thickness_75 || "");
        formData.append("valid_consent_permit_building_bylaws", manualFields.valid_consent_permit_building_bylaws || "");
        formData.append("stockist_distributor_list", manualFields.stockist_distributor_list || "");
        formData.append("procurement_per_day", manualFields.procurement_per_day || "");
        formData.append("no_of_workers", manualFields.no_of_workers || "");
        formData.append("labor_dept_registration_status", manualFields.labor_dept_registration_status || "");
        formData.append("occupational_safety_and_health_facilities", manualFields.occupational_safety_and_health_facilities || "");
        formData.append("adverse_environmental_impacts", manualFields.adverse_environmental_impacts || "");
      
        // File fields (append only if present)
        if (manualFields.consent_permit_file) {
        
        const formData2 =  new FormData();
        formData2.append('document', manualFields.consent_permit_file);
    
        formData2.append('document_description',  'Consent Permit');
        formData2.append('applicant',  applicantDetail.id.toString());

            try {
                const response = await AxiosBase.post('/pmc/applicant-documents/', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Post successful:', response.data);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
                navigate('/error');
            }
        }
        if (manualFields.pictorial_evidence_file) {

            const formData2 =  new FormData();
            formData2.append('document', manualFields.pictorial_evidence_file);

            formData2.append('document_description',  'Pictorial Evidence');
            formData2.append('applicant',  applicantDetail.id.toString());

            try {
                const response = await AxiosBase.post('/pmc/applicant-documents/', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Post successful:', response.data);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
                navigate('/error');
            }
        }
        if (manualFields.flow_diagram_file) {
          
            const formData2 =  new FormData();
            formData2.append('document', manualFields.flow_diagram_file);
        
            formData2.append('document_description',  'Flow Diagram');
            formData2.append('applicant',  applicantDetail.id.toString());

            try {
                const response = await AxiosBase.post('/pmc/applicant-documents/', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Post successful:', response.data);
            } catch (error) {
                console.error('Error in POST request:', error.response || error.message);
                navigate('/error');
            }
        }
        if (manualFields.action_plan_file) {
          const formData2 =  new FormData();
          formData2.append('document', manualFields.action_plan_file);
      
          formData2.append('document_description',  'Action Plan');
          formData2.append('applicant',  applicantDetail.id.toString());

          try {
              const response = await AxiosBase.post('/pmc/applicant-documents/', formData2, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });

              console.log('Post successful:', response.data);
          } catch (error) {
              console.error('Error in POST request:', error.response || error.message);
              navigate('/error');
          }

        }
      
        // Now decide whether to POST or PATCH
        if (!manualFields.id) {
          // CREATE (POST)
          try {
            const response = await AxiosBase.post("/pmc/manual-fields/", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("POST success:", response.data);
            alert("Data is saved!")
            // Update local/manualFields state with newly created ID
            // updateManualFields({ id: response.data.id });
          } catch (error) {
            console.error("Error POSTing manual fields:", error);
            navigate('/error');
          }
        } else {
            // UPDATE (PATCH)
            try {
                const response = await AxiosBase.patch(
                `/pmc/manual-fields/${manualFields.id}/`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
                );
                alert("Data is saved!")
                console.log("PATCH success:", response.data);
            } catch (error) {
                console.error("Error PATCHing manual fields:", error);
                navigate('/error');
            }
        }
      };

    const submitApplication = async () =>{
        // console.log(formData)
        setIsSubmiting(true)
        if(applicantDetail.assignedGroup2 !== '' && applicantDetail.assignedGroup2 !== undefined ){
            // Add non-file fields
            // const formData = new FormData();
            // formData.append('assigned_group', (applicantDetail.assignedGroup2));
            // formData.append('id', applicantDetail.id.toString())
            // if (applicantDetail.id > 0) {
            //     try {
            //         const response = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data',
            //             },
            //         });
            //         // setIsSubmiting(false);
            //         navigate('/home');
            //     } catch (error) {
            //         console.error('Error in POST request:', error.response || error.message);
            //         // setIsSubmiting(false);
            //     }
            //         // onNext()
            //     }

                try
                {
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
                    navigate('/home');
                } catch(error){
                    const errorDetails = {
                        status: error.response?.status,
                        data: error.response?.data,
                        message: error.message,
                    };
    
                    navigate('/error', { state: { error: errorDetails } });
                }
        }

        handleSubmitResponses()
        handleSubmitManualFields()
        setIsSubmiting(false)
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
    'DG',
    'Download License'
    ]

const groupList = fnGroupList(applicantDetail.assignedGroup)
console.log('assignedGroup:',applicantDetail.assignedGroup)
console.log('groupList', groupList)


function fnGroupList(group) {
    console.log(group)
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
 setMovementDirection={setMovementDirection}
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
                                disabled={!movementDirection} // disabled unless forward/backward is selected
                            >
                            {
                                (movementDirection === 'forward' && groupList[2]?.label === 'Download License')? 'License has been issued' :
                                movementDirection === 'forward'
                                ? `Forward to "${groupList[2]?.label || 'Next Stage'}"`
                                : movementDirection === 'backward'
                                    ? `Backward to "${groupList[0]?.label || 'Previous Stage'}"`
                                    : 'Select any of above options'
                            }
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

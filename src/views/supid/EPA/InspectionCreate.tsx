import { useState, useEffect } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import InspectionForm from './InspectionForm'
import {BusinessEntityForm, BusinessEntityFormSchema} from '../BusinessEntityForm'
import {BusinessEntityFields, BusinessDetailFields, BusinessDetailIndividualFields} from '../BusinessEntityForm/types'
import {LicenseDetailForm, LicenseDetailFormSchema} from '../LicenseDetailForm'
import {DocumentForm, DocumentForm2} from '../DocumentsForm'
import ReviewAndSavePage from '../ReviewAndSavePage/ReviewAndSavePage'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useLocation,useNavigate } from 'react-router-dom'
import type { ApplicantDetailFormSchema } from '../ApplicantDetailForm'
import Steps from '@/components/ui/Steps';
import { BiArrowBack, BiArrowToRight, BiSave, BiStreetView } from 'react-icons/bi'
import { BsBack } from 'react-icons/bs'
import useFormStore from '../../../store/supid/supidStore'
import { LicenseDetailFields, LicenseDetailFieldsConsumer, LicenseDetailFieldsCollector, LicenseDetailFieldsProducer, LicenseDetailFieldsRecycler } from '../LicenseDetailForm/types'
import AxiosBase from '../../../services/axios/AxiosBase' 
import { useParams } from 'react-router-dom';


const CustomerEdit = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [goBackConfirmationOpen, setGoBackConfirmationOpen] =
        useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const [thankYouPopupOpen, setThankYouPopupOpen] = useState(false); // New state for Thank You popup
    const [thankYouPopupMessage, setThankYouPopupMessage] = useState(''); // Holds the dynamic message
    const [thankYouPopupType, setTankYouPopupType ] = useState("success");
    const [inspectionData, setInspectionData] = useState(null);

        // const inspectionData = 
        //     {
        //         "id": 6,
        //         "business_name": "Bio Creative Labs",
        //         "business_type": "Producer",
        //         "license_number": null,
        //         "violation_found": [
        //             "Yes"
        //         ],
        //         "violation_type": [
        //             "Plastic shopping bags less than 75 microns",
        //             "Other Single Use Plastics"
        //         ],
        //         "action_taken": [
        //             "Notice issued",
        //             "Confiscation",
        //             "Sealing"
        //         ],
        //         "plastic_bags_confiscation": 12,
        //         "confiscation_other_plastics": {
        //             "test": 23
        //         },
        //         "total_confiscation": 35,
        //         "other_single_use_items": [
        //             "test"
        //         ],
        //         "latitude": 31.4514695,
        //         "longitude": 74.253135,
        //         "district": "Lahore",
        //         "created_at": "2025-02-08T07:20:30.253706+05:00"
        //     };
            
    // useEffect(() => {
    //     if (inspectionData) {
    //         reset(inspectionData); // Reset form with fetched data
    //     }
    // }, [inspectionData, reset]);

    const [loading, setLoading] = useState(false);
    // console.log('inspectionData', inspectionData)
     // Extract ID from query parameters
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // This will fetch the ID from ?id=6

    useEffect(() => {
        console.log('id', id);
        console.log('Fetching inspection data...');
        
        if (id) {
            setLoading(true);
            AxiosBase.get(`/pmc/inspection-report/${id}/`)
                .then(response => {
                    const data = response.data;
    
                    // 🛠️ Transform API response to match form schema
                    const formattedData = {
                        businessName: data.business_name,
                        businessType: data.business_type,
                        licenseNumber: data.license_number || "", // Ensure it doesn't break optional fields
                        violationFound: data.violation_found || [],
                        violationType: data.violation_type || [],
                        actionTaken: data.action_taken || [],
                        plasticBagsConfiscation: data.plastic_bags_confiscation || 0,
                        confiscation_otherPlastics: data.confiscation_other_plastics || {}, 
                        totalConfiscation: data.total_confiscation || 0,
                        OtherSingleUseItems: data.other_single_use_items || [],
                        latitude: data.latitude ?? null,  // Ensure it can be nullable
                        longitude: data.longitude ?? null,
                        district: data.district || "",
                    };
    
                    console.log('Formatted Inspection Data:', formattedData);
    
                    setInspectionData(formattedData); // Set transformed data
                })
                .catch(error => {
                    console.error("Error fetching inspection data:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);
    
    // get application data

    const handleInspectionReportSubmit = async (values: InspectionReportSchema) => {
        console.log('inspectionData', inspectionData)
        setIsSubmiting(true);
    
        // Create FormData object
        const formData = new FormData();
    
        // Add form fields
        formData.append("business_name", values.businessName);
        formData.append("business_type", values.businessType);
        
        if (values.licenseNumber) formData.append("license_number", values.licenseNumber);
    
        if (values.violationFound) formData.append("violation_found", JSON.stringify(values.violationFound));
        if (values.violationType) formData.append("violation_type", JSON.stringify(values.violationType));
        if (values.actionTaken) formData.append("action_taken", JSON.stringify(values.actionTaken));
    
        if (values.plasticBagsConfiscation) {
            formData.append("plastic_bags_confiscation", values.plasticBagsConfiscation.toString());
        }
        
        if (values.confiscation_otherPlastics) {
            formData.append("confiscation_other_plastics", JSON.stringify(values.confiscation_otherPlastics));
        }
    
        if (values.totalConfiscation) {
            formData.append("total_confiscation", values.totalConfiscation.toString());
        }
    
        if (values.OtherSingleUseItems) {
            formData.append("other_single_use_items", JSON.stringify(values.OtherSingleUseItems));
        }
    
        formData.append("latitude", values.latitude?.toString() || "");
        formData.append("longitude", values.longitude?.toString() || "");
        formData.append("district", values.district || "");

        try {
            let response;
    
            if (id) {
                response = await AxiosBase.patch(`/pmc/inspection-report/${id}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await AxiosBase.post("/pmc/inspection-report/", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
            }
    
            console.log("Post successful:", response.data);

            setIsSubmiting(false);
            navigate("/auth/EPAOperations/AllInspections");
            // onNext();
        } catch (error) {
            console.error("Error in POST request:", error.response || error.message);
            setIsSubmiting(false);
    
            const errorDetails = {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            };
    
            navigate("/error", { state: { error: errorDetails } });
        }
    };
    

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">Customer discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/auth/EPAOperations/AllInspections')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    
    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
        setGoBackConfirmationOpen(false)
    }

    const handleConfirmGoBack = () => {
        setGoBackConfirmationOpen(false)
    }
    
    const closeThankYouPopup = () => {
        setThankYouPopupOpen(false);
    };

    return (
        <>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                <InspectionForm
                    newCustomer
                    defaultValues={inspectionData}
                    onFormSubmit={handleInspectionReportSubmit}
                    readOnly={false}
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
                                    icon={<BiSave />}
                                    variant="solid"
                                    type={'submit'}
                                    loading={isSubmiting}
                                >
                                    {'Save'}
                                    
                                </Button>
                            </div>
                        </div>
                    </Container>
                </InspectionForm>


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
        </>
    )
}

export default CustomerEdit

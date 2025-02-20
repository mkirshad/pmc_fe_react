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

                        // ✅ Newly Added Fields
                        inspectionDate: data.inspection_date || "",  // Ensure date is correctly formatted
                        fineAmount: data.fine_amount || 0,
                        fineRecoveryStatus: data.fine_recovery_status || "Pending",
                        fineRecoveryDate: data.fine_recovery_date || "",
                        recoveryAmount: data.recovery_amount || 0,
                        deSealedDate: data.de_sealed_date || "",

                        // ✅ Handle File for Affidavit (Ensure file handling is done properly)
                        // affidavit: data.affidavit ? `${process.env.REACT_APP_API_URL}${data.affidavit}` : null,
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


        // ✅ New Fields Added
        if (values.inspectionDate) formData.append("inspection_date", values.inspectionDate);
        if (values.fineAmount) formData.append("fine_amount", values.fineAmount.toString());
        if (values.fineRecoveryStatus) formData.append("fine_recovery_status", values.fineRecoveryStatus);
        if (values.fineRecoveryDate) formData.append("fine_recovery_date", values.fineRecoveryDate);
        if (values.recoveryAmount) formData.append("recovery_amount", values.recoveryAmount.toString());
        if (values.deSealedDate) formData.append("de_sealed_date", values.deSealedDate);

        // ✅ Affidavit (File Upload)
        if (values.affidavit) {
            formData.append("affidavit", values.affidavit);
        }

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
            console.error("❌ Error in POST request:", error);

            setIsSubmiting(false);
        
            const errorDetails = {
                status: error.response?.status || "Unknown",
                data: error.response?.data || "No response data",
                message: error.message || "Unknown error",
            };
        
            if (typeof window !== "undefined" && !navigator.onLine) {
                console.warn("[⚠️ Offline Mode] Request will be retried later.");
                alert("You are offline. The request will be retried when you are back online.");
                return;
            }
        
            if (error.response?.status === 500) {
                console.error("[🔥 Server Error] The server encountered an issue.");
                alert("Server is experiencing issues. Please try again later.");
            } else if (error.response?.status === 400) {
                console.warn("[⚠️ Client Error] Invalid request.");
                alert("There was an issue with the request. Please check your data.");
            } else if (error.response?.status === 404) {
                console.error("[🔎 Not Found] The API endpoint was not found.");
                alert("Requested data not found.");
            } else if (error.code === "ECONNABORTED") {
                console.warn("[⏳ Timeout] The request took too long to complete.");
                alert("The request took too long. Please check your internet connection and retry.");
            } else {
                console.error("[❌ Unexpected Error]:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        
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

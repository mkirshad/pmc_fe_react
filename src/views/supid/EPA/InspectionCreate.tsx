import { useState, useEffect, useMemo } from 'react';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';
import InspectionForm from './InspectionForm';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { TbTrash } from 'react-icons/tb';
import { BiSave } from 'react-icons/bi';
import useInspectionStore from '../../../store/supid/useInspectionStore'; // ✅ Zustand Store
import { useSessionUser } from '@/store/authStore';

// ✅ Helper Function to Convert snake_case to camelCase
const convertKeysToCamelCase = (data) => {
    if (!data) return null;

    return {
            id: data.id,
            businessName: data.business_name,
            businessType: data.business_type,
            licenseNumber: data.license_number || '',
            violationFound: data.violation_found || [],
            violationType: data.violation_type || [],
            actionTaken: data.action_taken || [],
            
            plasticBagsConfiscation: data.plastic_bags_confiscation ?? 0,
            confiscationOtherPlastics: data.confiscation_other_plastics || {},
        
            totalConfiscation: data.total_confiscation || 0,
            OtherSingleUseItems: data.other_single_use_items || [],
        
            latitude: data.latitude ?? null,
            longitude: data.longitude ?? null,
            district: data.district || '',
        
            inspectionDate: data.inspection_date || null,
            fineAmount: data.fine_amount ?? 0,
            fineRecoveryStatus: data.fine_recovery_status || undefined,
            fineRecoveryDate: data.fine_recovery_date || '',
            recoveryAmount: data.recovery_amount ?? 0,
            deSealedDate: data.de_sealed_date || '',
            fineRecoveryBreakup: data.fine_recovery_breakup || null,
            // affidavit: data.affidavit || null,  // Assuming it's a file upload
            syncStatus: data.syncStatus || undefined,  // Tracks offline edits

            // confiscationReceipt: ,
            receiptBookNumber: data.receipt_book_number || null,
            receiptNumber: data.receipt_number || null,
            // paymentChallan: 
    };
};

const CustomerEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reports, fetchReports, updateReport, addNewReport, syncReports } = useInspectionStore(); // ✅ Zustand store

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    console.log(reports)

    // ✅ Find and Convert Report Data in Zustand Store
    let inspectionData = useMemo(() => {
        const report = reports.find((report) => report.id == id);
        return report ? convertKeysToCamelCase(report) : null;
    }, [reports, id]);

    inspectionData = { ...inspectionData, inspectionDate:inspectionData?.inspectionDate || new Date().toISOString().split("T")[0]}
    
    // // ✅ Fetch Reports If Not Present
    useEffect(() => {
        if (id && !inspectionData) {
            fetchReports();
        }
    }, [inspectionData, fetchReports]);

    const district_id = useSessionUser((state) => state.user.district_id) || null
    const district_name = useSessionUser((state) => state.user.district_name) || ''
    
    // ✅ Handle Form Submission
    const handleInspectionReportSubmit = async (values) => {
        console.log('Submitting Data:', values);
        setIsSubmitting(true);

        // ✅ Prepare Data
        const reportData = {
            business_name: values.businessName,
            business_type: values.businessType,
            license_number: values.licenseNumber || '',
        
            violation_found: values.violationFound || [],
            violation_type: values.violationType || [],
            action_taken: values.actionTaken || [],
        
            plastic_bags_confiscation: values.plasticBagsConfiscation ?? 0,
            confiscation_other_plastics: values.confiscationOtherPlastics || {},
        
            total_confiscation: values.totalConfiscation || 0,
            other_single_use_items: values.OtherSingleUseItems || [],
        
            latitude: values.latitude ?? null,
            longitude: values.longitude ?? null,
            district: values.district || '',
        
            inspection_date: values.inspectionDate || null,
            fine_amount: values.fineAmount ?? 0,
            fine_recovery_status: values.fineRecoveryStatus || undefined,
            fine_recovery_date: values.fineRecoveryDate || null,
            recovery_amount: values.recoveryAmount ?? 0,
            de_sealed_date: values.deSealedDate || null,
            fine_recovery_breakup: values.fineRecoveryBreakup || null,
            affidavit: values.affidavit || null,  // Assuming it's a file upload
        
            confiscation_receipt: values.confiscationReceipt,
            receipt_book_number: values.receiptBookNumber || null,
            receipt_number: values.receiptNumber || null,
            payment_challan: values.paymentChallan || null,

            syncStatus: id ? 'patch' : 'post', // ✅ Mark as "patch" or "post"
        };

        try {
            if (id) {
                updateReport(id, reportData);
            } else {
                addNewReport(reportData);
            }

            console.log("✅ Report Updated in Store");

            setIsSubmitting(false);
            navigate("/auth/EPAOperations/AllInspections");
        } catch (error) {
            console.error("❌ Error in Submission:", error);
            setIsSubmitting(false);
        }
    };

    const handleDiscard = () => setDiscardConfirmationOpen(true);

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false);
        toast.push(
            <Notification type="success">Customer discard!</Notification>,
            { placement: 'top-center' }
        );
        navigate('/auth/EPAOperations/AllInspections');
    };

    return (
        <>
            {(
                <>
                    <InspectionForm
                        newCustomer
                        defaultValues={inspectionData} // ✅ Use constant directly
                        onFormSubmit={handleInspectionReportSubmit}
                        readOnly={id !== null}
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
                                        loading={isSubmitting}
                                    >
                                        {'Save'}
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </InspectionForm>

                    <ConfirmDialog
                        isOpen={discardConfirmationOpen}
                        type="danger"
                        title="Discard changes"
                        onClose={() => setDiscardConfirmationOpen(false)}
                        onCancel={() => setDiscardConfirmationOpen(false)}
                        onConfirm={handleConfirmDiscard}
                    >
                        <p>Are you sure you want to discard this?</p>
                    </ConfirmDialog>
                </>
            ) }
        </>
    );
};

export default CustomerEdit;

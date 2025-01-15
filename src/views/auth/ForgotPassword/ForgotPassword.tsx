import { useState } from 'react';
import Logo from '@/components/template/Logo';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/shared/PasswordInput';
import Steps from '@/components/ui/Steps';
import { Divider } from '@mui/material';
import InputMask from 'react-input-mask'; 

export const ForgotPasswordBase = () => {
    const [step, setStep] = useState(0);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [psid, setPsid] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [cnic, setCnic] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            setTrackingNumber(formatTrackingNumber(trackingNumber, true));
        }
    };
    
    const formatTrackingNumber = (value, isBackspace) => {
        // Remove any invalid characters for each segment
        let rawValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only alphanumeric characters
    
        // Split the rawValue into segments
        let segment1 = rawValue.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, ''); // First 3 letters (Uppercase only)
        let segment2 = rawValue.slice(3, 6).toUpperCase().replace(/[^A-Z]/g, ''); // Next 3 letters (Uppercase only)
        let segment3 = rawValue.slice(6).replace(/[^0-9]/g, ''); // Numbers only from 6th character onward
    
        // If backspace is detected, allow the deletion without auto-adding new dashes
        if (isBackspace) {
            return [segment1, segment2, segment3].filter(Boolean).join('-');
        }
    
        // Auto-format: Add dashes dynamically
        let formattedValue = '';
        if (segment1) formattedValue += segment1 + (segment1.length === 3 ? '-' : '');
        if (segment2) formattedValue += segment2  + (segment2.length === 3 ? '-' : '');
        if (segment3) formattedValue += segment3
    
        return formattedValue;
    };
    // Handle PSID input
    const handlePsidChange = (value) => {
        // Allow only numeric input up to 17 characters
        const formattedValue = value.replace(/\D/g, '').slice(0, 17);
        setPsid(formattedValue);
    };

    // Handle mobile number input
    const handleMobileNumberChange = (value) => {
        // Allow only numeric input, ensure it starts with '3', and limit to 10 digits
        const formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length <= 10 && (formattedValue.startsWith('3') || formattedValue === '')) {
            setMobileNumber(formattedValue);
        }
    };

    const handleNextStep = async () => {
        if (step === 0) {
            if ((!trackingNumber && !psid) || (!mobileNumber && !cnic)) {
                setMessage('Please provide either Tracking Number or PSID, and either Mobile Number or CNIC.');
                return;
            }

            setLoading(true);
            try {
                const response = await AxiosBase.post('/api/find-user', {
                    tracking_number: trackingNumber,
                    psid,
                    mobile_number: mobileNumber,
                    cnic,
                });
                setUsername(response.data.username || 'Unknown');
                setMessage(null);
                setStep(1);
            } catch (error) {
                setMessage(error.response?.data?.detail || 'Error finding user.');
            } finally {
                setLoading(false);
            }
        } else if (step === 1) {
            if (newPassword !== confirmPassword) {
                setMessage('Passwords do not match.');
                return;
            }

            setLoading(true);
            try {
                await AxiosBase.post('/api/reset-password', {
                    username,
                    new_password: newPassword,
                });
                setMessage('Password reset successfully.');
                setStep(0);
                setTrackingNumber('');
                setPsid('');
                setMobileNumber('');
                setCnic('');
                setNewPassword('');
                setConfirmPassword('');
            } catch (error) {
                setMessage(error.response?.data?.detail || 'Error resetting password.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handlePreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-lg">
                <div className="mb-6 text-center">
                    <Logo type="streamline" imgClass="mx-auto" logoWidth={60} />
                </div>
                <Steps current={step} className="mb-6">
                    <Steps.Item title="Find User" />
                    <Steps.Item title="Reset Password" />
                </Steps>
                {message && (
                    <Alert
                        showIcon
                        className="mb-6"
                        type={message.toLowerCase().includes('success') ? 'success' : 'danger'}
                    >
                        {message}
                    </Alert>
                )}
                {step === 0 && (
                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h6 className="font-bold mb-3 text-center">Tracking Number or PSID generated by this portal</h6>
                            <Input
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(formatTrackingNumber(e.target.value, false))}
                                placeholder="Tracking Number (e.g., LHR-PRO-001)"
                                onKeyDown={handleKeyDown}
                                className="mb-2"
                            />
                            <Divider textAlign="left" className="my-4 text-gray-500 font-medium mb-2 mt-2">
                                OR
                            </Divider>
                            <InputMask
                                mask="99999999999999999" // PSID mask for 17 digits
                                placeholder="PSID (17 digits)"
                                value={psid}
                                onChange={(e) => handlePsidChange(e.target.value)}
                            >
                                {(inputProps) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        className="mt-2"
                                        {...inputProps} // Pass InputMask props to the Input component
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h6 className="font-bold mb-3 text-center">Mobile Number and CNIC of applicant</h6>
                            <InputMask
                                mask="3999999999" // Mobile number mask
                                placeholder="Mobile Number (e.g., 3001234567)"
                                value={mobileNumber}
                                onChange={(e) => handleMobileNumberChange(e.target.value)}
                            >
                                {(inputProps) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        className="mb-2"
                                        {...inputProps} // Pass InputMask props to the Input component
                                    />
                                )}
                            </InputMask>
                            <InputMask
                                mask="99999-9999999-9" // CNIC mask
                                placeholder="CNIC (XXXXX-XXXXXXX-X)"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)} // Update CNIC state
                            >
                                {(inputProps) => (
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        className="mt-2"
                                        {...inputProps} // Pass InputMask props to the Input component
                                    />
                                )}
                            </InputMask>
                        </div>
                    </div>
                )}
                {step === 1 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-bold mb-4 text-center">Reset Password for {username}</h3>
                        <PasswordInput
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="mb-3"
                        />
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                    </div>
                )}
                <div className="mt-6 flex justify-between">
                    {step > 0 && (
                        <Button onClick={handlePreviousStep} variant="outline">
                            Back
                        </Button>
                    )}
                    <Button onClick={handleNextStep} loading={loading} variant="solid">
                        {step === 0 ? 'Next' : 'Reset Password'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ForgotPassword = () => {
    return <ForgotPasswordBase />;
};

export default ForgotPassword;

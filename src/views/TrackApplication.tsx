import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';       // For showing success/error messages
import AxiosBase from '../services/axios/AxiosBase';

// Optional: if you want to auto-clear messages after a few seconds
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';

const TrackApplication = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useTimeOutMessage();  // or just use useState if you don't want auto-clear
    const [messageType, setMessageType] = useState('info');
    const [trackingResult, setTrackingResult] = useState(null);

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

    // The main API call to fetch tracking info
    const fetchTrackingInfo = async () => {
        if (!trackingNumber) {
            setMessage('Please enter a valid tracking number.');
            setMessageType('danger');
            return;
        }

        setLoading(true);
        setMessage(null);
        setTrackingResult(null);

        try {
            const response = await AxiosBase.get('/pmc/track-application/', {
                headers: { 'Content-Type': 'application/json' },
                params: { tracking_number: trackingNumber },
            });
            
            // If your API returns additional data, store it in `trackingResult`
            setTrackingResult(response.data.message || 'No additional details');
            setMessageType('success');
            // setMessage('Tracking information found successfully!');
        } catch (error) {
            setTrackingResult(null);
            setMessage(error?.response?.data?.message || 'Error tracking application.');
            setMessageType('danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center  min-h-fit">
            <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-lg">
                
                {/* Heading / Logo */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Track Your Application</h2>
                    <p className="text-gray-600">Enter your tracking number to get details</p>
                </div>

                {/* Alert Messages */}
                {message && (
                    <Alert
                        showIcon
                        className="mb-4"
                        type={messageType}
                    >
                        {message}
                    </Alert>
                )}

                {/* Tracking Number Input */}
                <div className="mb-4">
                    <Input
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(formatTrackingNumber(e.target.value, false))}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g., LHR-PRO-001"
                        title="Tracking Number (e.g., LHR-PRO-001)"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                    <Button
                        onClick={fetchTrackingInfo}
                        loading={loading}
                        variant="solid"
                    >
                        Track
                    </Button>
                </div>

                {/* Results Section */}
                {trackingResult && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                        <h3 className="font-bold mb-2">Tracking Details:</h3>
                        <p>{trackingResult}</p>
                    </div>
                )}

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">
                        Back to My Applications
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrackApplication;

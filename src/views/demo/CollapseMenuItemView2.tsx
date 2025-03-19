/** Example purpose only */
import AxiosBase from '../../services/axios/AxiosBase';
import Button from '@/components/ui/Button'
import { BsBack, BsReceipt } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CollapseMenuItemView2 = () => {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const navigate = useNavigate();
    const handleDownloadReport = async () => {
        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T').join('_').split('.').join('_'); // Format as 'YYYY-MM-DD_HH-MM-SS'

        try {
            setIsSubmiting(true)
            // Make a GET request using AxiosBase to fetch the report as a downloadable file
            const response = await AxiosBase.get('/pmc/report/', {
                responseType: 'blob', // Important for downloading files
            });
    
            // Create a temporary link to trigger the file download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${formattedDate}.xlsx`); // Set the filename for the download
            document.body.appendChild(link);
            link.click(); // Simulate a click to trigger the download
    
            // Clean up the temporary URL after the download
            window.URL.revokeObjectURL(url);
            setIsSubmiting(false)
        } catch (error) {
            console.error('Error downloading report:', error);
            const errorDetails = {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            };

            navigate('/error', { state: { error: errorDetails } });
            setIsSubmiting(false)
        }
    };

    const handleDownloadReport2 = async () => {
        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T').join('_').split('.').join('_'); // Format as 'YYYY-MM-DD_HH-MM-SS'

        try {
            setIsSubmiting(true)
            // Make a GET request using AxiosBase to fetch the report as a downloadable file
            const response = await AxiosBase.get('/pmc/psid-report/', {
                responseType: 'blob', // Important for downloading files
            });
    
            // Create a temporary link to trigger the file download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${formattedDate}.xlsx`); // Set the filename for the download
            document.body.appendChild(link);
            link.click(); // Simulate a click to trigger the download
    
            // Clean up the temporary URL after the download
            window.URL.revokeObjectURL(url);
            setIsSubmiting(false)
        } catch (error) {
            console.error('Error downloading report:', error);
            const errorDetails = {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            };

            navigate('/error', { state: { error: errorDetails } });
            setIsSubmiting(false)
        }
    };
    return <div className="grid md:grid-cols-4 gap-4">
        
        <Button
            icon={<BsReceipt />}
            className="ltr:mr-3 rtl:ml-3"
            variant="solid"
            type="button"
            loading={isSubmiting}
            onClick={handleDownloadReport}  // Use the handleDownloadReport function here
        >
            Download Excel Report-1
        </Button>

        <Button
            icon={<BsReceipt />}
            className="ltr:mr-3 rtl:ml-3"
            variant="solid"
            type="button"
            loading={isSubmiting}
            onClick={handleDownloadReport2}  // Use the handleDownloadReport function here
        >
            Download Paid PSID Report
        </Button>

    </div>
}

export default CollapseMenuItemView2

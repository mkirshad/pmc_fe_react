import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormItem } from '@/components/ui/Form';
import NumericInput from '@/components/shared/NumericInput';
import { Controller, useWatch } from 'react-hook-form';
import type { FormSectionBaseProps } from './types';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable'
import Checkbox from '@/components/ui/Checkbox'
import type { SyntheticEvent } from 'react'
import { Autocomplete, TextField, Chip, Hidden, List } from '@mui/material';
import Group from '@/components/ui/Checkbox/Group';
import AxiosBase from '../../../services/axios/AxiosBase';
import { ApplicantDetailForm } from '../ApplicantDetailForm';
import useFormStore from '../../../store/supid/supidStore'
import Button from '@/components/ui/Button'
import { BiArrowBack, BiArrowToRight, BiSave, BiStreetView, BiIdCard } from 'react-icons/bi'

type BusinessDetailSectionProps = FormSectionBaseProps & {
    readOnly?: boolean; // Add this prop
};;

let colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const registrationTypes = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company / Corporation / Partnership', label: 'Company / Corporation / Partnership' },
];

const districts = [
    { value: 'Gujranwala', label: 'Gujranwala' },
    { value: 'Lahore', label: 'Lahore' },
    // Add other options as necessary
];

const tehsils = [
    { value: 'Aroop Town', label: 'Aroop Town' },
    // Add other options as necessary
];

const mobileOperators = [
    { value: 'Mobilink', label: 'Mobilink' },
    { value: 'Telenor', label: 'Telenor' },
    { value: 'Ufone', label: 'Ufone' },
    { value: 'Warid', label: 'Warid' },
];

const LicenseDetailProducerSection = ({ control, errors, register, readOnly = false }: BusinessDetailSectionProps) => {

    const [entityType, setEntityType] = useState('');

    const [checkboxList, setCheckboxList] = useState<(string)[]>([

    ])

    const [unitOptions, setUnitOptions] = useState(['Kg Per Day', 'Liters Per Day', 'Tons Per Month']);
    const [selectedUnit, setSelectedUnit] = useState('');

    const [wasteUnitOptions, setWasteUnitOptions] = useState(['Kg Per Day', 'Liters Per Day', 'Tons Per Month']);
    const [selectedWasteUnit, setSelectedWasteUnit] = useState('');

    const [productOptions, setProductOptions] = useState(['Product A', 'Product B', 'Product C']);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [byProductOptions, setByProductOptions] = useState(['By-product X', 'By-product Y']);
    const [selectedByProducts, setSelectedByProducts] = useState([]);

    const handleProductsChange = (event, newValue) => {
        setSelectedProducts(newValue);
        const newOptions = newValue.filter(option => !productOptions.includes(option));
        if (newOptions.length > 0) {
            setProductOptions(prev => [...prev, ...newOptions]);
        }
    };

    const handleByProductsChange = (event, newValue) => {
        setSelectedByProducts(newValue);
        const newOptions = newValue.filter(option => !byProductOptions.includes(option));
        if (newOptions.length > 0) {
            setByProductOptions(prev => [...prev, ...newOptions]);
        }
    };

  
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false)
  const handleChangeSP = (event, newValue) => {
    setSelectedOptions(newValue);

    // Add new options to the list
    const newOptions = newValue.filter(
      (option) => !options.includes(option)
    );
    if (newOptions.length > 0) {
      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }

  };
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-'); // Convert yyyy-MM-dd to dd/MM/yyyy
    return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/'); // Convert dd/MM/yyyy to yyyy-MM-dd
    return `${year}-${month}-${day}`;
};

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

const downloadFile = async () => 
{

    //const applicantId = applicant.id; // Replace with the actual applicant ID
        
        // try {
        //     // Send request to fetch the PDF
        //     const response = await AxiosBase.get(`/pmc/generate-license-pdf?applicant_id=${applicantId}`, {
        //         responseType: 'blob', // Important to get the data as a Blob
        //     });



const response = await AxiosBase.get(`/pmc/chalan-pdf?ApplicantId=${applicantDetail.id}`, {
    responseType: 'blob', // Important to get the data as a Blob
});

// Create a blob URL for the downloaded file
const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = urlBlob;

// Set filename for the downloaded file
link.setAttribute('download', `Fee Challan.pdf`);
document.body.appendChild(link);
link.click();

// Clean up
document.body.removeChild(link);

const formData = new FormData();
// Add non-file fields
formData.append('application_status', 'Fee Challan');

const response2 = await AxiosBase.patch(`/pmc/applicant-detail/${applicantDetail.id}/`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

updateApplicantDetail({applicationStatus: 'Fee Challan'})

}

const downloadFileReceipt = async () => 
{
      // Download Fee Challan            
      const response = await AxiosBase.get(`/pmc/receipt-pdf?ApplicantId=${applicantDetail.id}`, {
        responseType: 'blob', // Important to get the data as a Blob
    });        
    // Create a blob URL for the downloaded file
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = urlBlob;
    // Set filename for the downloaded file
    link.setAttribute('download', `Receipt.pdf`);
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
}

const handlePSIDGeneration = async () => {
    setIsSubmiting(true);
    try {
      const response = await AxiosBase.get(
        `/pmc/generate-psid?applicant_id=${applicantDetail.id}`,
        { responseType: "text" }
      );
  
      // Handle successful response
      const htmlContent = response.data;
      const newWin = window.open("", "_blank");
      newWin.document.write(htmlContent);
      newWin.document.close();
      updateApplicantDetail({"applicationStatus": 'Fee Challan'})
    } catch (error) {
      console.error(error);
  
      // Handle error response (if the server sends an HTML error response)
      if (error.response && error.response.data) {
        const errorContent = error.response.data;
        const errorWin = window.open("", "_blank");
        errorWin.document.write(errorContent);
        errorWin.document.close();
      } else {
        // If the error does not include a response or response data
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmiting(false);
    }
  };
  
  const handlePSIDCheckStatus = async () => {
    setIsSubmiting(true);
    try {
      const response = await AxiosBase.get(
        `/pmc/check-psid-status?applicant_id=${applicantDetail.id}`,
        { responseType: "text" }
      );
  
      // Handle successful response
      const htmlContent = response.data;
      const newWin = window.open("", "_blank");
      newWin.document.write(htmlContent);
      newWin.document.close();
    //   updateApplicantDetail({"applicationStatus": 'Fee Challan'})
    } catch (error) {
      console.error(error);
  
      // Handle error response (if the server sends an HTML error response)
      if (error.response && error.response.data) {
        const errorContent = error.response.data;
        const errorWin = window.open("", "_blank");
        errorWin.document.write(errorContent);
        errorWin.document.close();
      } else {
        // If the error does not include a response or response data
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmiting(false);
    }
  };
  

    return (
        <>
        <Card hidden={true}>
            <h4 className="mb-4">Payment</h4>
            <div className="grid md:grid-cols-1 gap-4 mb-1">
                <div style={{ color: 'blue', fontWeight: 'bold', margin: '10px 0' }}>
                        Please have a look at your application detail prior to generation of fee challan. Once your fee challan is generated, this application will not be amended.
                </div>
            
                <div style={{ color: 'blue', fontWeight: 'bold', margin: '10px 0' }}>
                        Please submit fee challan within 7 days.
                </div>
            </div>

            <div className="grid md:grid-cols-2 mb-1 gap-4">
                {/* Business Name and Registration Type */}


                <div>
                <Button
                                    icon={<BiIdCard />}
                                    className="ltr:mr-3 rtl:ml-3"
                                    variant="solid"
                                    type="button"
                                    loading={isSubmiting}
                                    onClick={downloadFile}
                                >
            
                    Download Fee Challan
                </Button>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
            </Card>

            <Card>                
         
            <h4 className="mb-4">Submission of Application (Applicable only for previously generated and paid Fee Challans)</h4>


                <div className="grid md:grid-cols-1 gap-4 mb-1">
                <div style={{ color: 'red', fontWeight: 'bold', margin: '10px 0' }}>
                    Warning: If any document other than the generated and paid challan is uploaded, it would lead to registration of FIR & arrest of applicant.
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}

                <img 
                    src="/img/others/warning-urdu3.png" 
                    alt="Warning Icon"
                    />
                </div>
                {/* </div> */}

                <div className="grid md:grid-cols-2 gap-2">
                <div>
                <input
                    type="hidden"
                    {...register("existingFileId")}
                    value={String(applicantDetail.has_fee_challan ?? "")}
                />
                <FormItem
                    label="Upload Paid Fee Challan Image and Submit Application*"
                    invalid={Boolean(errors.flow_diagram)}
                    errorMessage={errors.flow_diagram?.message}
                >
                    <Controller
                        name="flow_diagram"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="file"
                                accept="image/*" // Restrict file picker to image types only
                                disabled={!applicantDetail.is_downloaded_fee_challan} // Apply the read-only prop
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.type.startsWith("image/")) {
                                            field.onChange(file); // Update form state if valid image
                                        } else {
                                            alert("Please upload a valid image file (e.g., .jpg, .png)");
                                            e.target.value = ""; // Reset input value
                                        }
                                    } else {
                                        field.onChange(null); // Clear value if no file selected
                                    }
                                }}
                            />
                        )}
                    />
                </FormItem>

                </div>
            </div>
            
            {/* <div>
                    {applicantDetail.has_fee_challan && <label>Paid Fee Challan Document is already Uploaded!</label>}
            </div> */}
            
                {/* <div className="grid md:grid-cols-2 mb-1 gap-4">
                    {applicantDetail.has_fee_challan && <div>
                        <a
                        href='#'
                            onClick={()=>{downloadFileReceipt()}}
                            className="inline-block px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-md shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            Download Receipt
                        </a>
                    </div>
                    }
                </div> */}
        </Card>

        <Card>
            <h4 className="mb-4">Payment</h4>
            <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-semibold text-blue-700">Important Note:</h3>
                    <p className="mt-2 text-gray-700">
                        Click the <strong className="text-blue-600">Generate GoP PSID</strong> button to obtain the PSID. After getting the PSID, follow these steps:
                    </p>
                    <ol className="list-decimal list-inside mt-3 text-gray-600">
                        <li>Open your mobile banking app or mobile payment app.</li>
                        <li>Click on <strong className="text-blue-600">Bill Payment</strong>, <strong className="text-blue-600">Add Payee</strong>, then select <strong className="text-blue-600">GoP</strong>.</li>
                        <li>Enter the generated <strong className="text-blue-600">Consumer Number / PSID</strong> by this portal.</li>
                        <li>Review your details carefully, save the Payee, and click <strong className="text-blue-600">Payment</strong>.</li>
                    </ol>
                    <p className="mt-3 text-gray-700">
                        After completing the payment, the payment status will be <strong className="text-blue-600">automatically updated</strong> in this portal. 
                        If the status is not updated, you can click the <strong className="text-blue-600">Check PSID Payment Status</strong> button to manually verify.
                    </p>
                    <p className="mt-3 text-gray-700">
                        Once the payment verification is successful, the application will be <strong className="text-blue-600">automatically submitted</strong>. Go to  <strong className="text-blue-600">My Applications</strong> and come back to this application and page and you can download receipt of submission for your record.
                    </p>

                    <p className="mt-3 text-gray-700">
                        Note: If you have paid fee challan, please don't generate <strong className="text-blue-600">GoP PSID</strong>, after generation of <strong className="text-blue-600">GoP PSID</strong> you will not be able to upload existing fee challan.
                    </p>

                </div>
                <div className="grid md:grid-cols-3 mb-1 gap-4">
            <div>
                <Button
                                        icon={<BiIdCard />}
                                        className="ltr:mr-3 rtl:ml-3 mb-4"
                                        variant="solid"
                                        type="button"
                                        loading={isSubmiting}
                                        onClick={handlePSIDGeneration}
                                    >
                Generate GoP PSID
                </Button>
            </div>

                    {applicantDetail.has_fee_challan && <div>
                        <Button
                            icon={<BiSave />}
                            className="ltr:mr-3 rtl:ml-3 mb-4"
                            variant="solid"
                            type="button"
                            loading={isSubmiting}
                            onClick={downloadFileReceipt}
                        >
                            Download Receipt
                            </Button>
                    </div>
                    }
                </div>
        </Card>


        <Card hidden={true}>
            <h4 className="mb-4">Submission of Application</h4>
            

            <Button
                                    icon={<BiIdCard />}
                                    className="ltr:mr-3 rtl:ml-3"
                                    variant="solid"
                                    type="button"
                                    loading={isSubmiting}
                                    onClick={handlePSIDCheckStatus}
                                >
            Check GoP PSID Payment Status
            </Button>
        </Card>

    </>
    );
};

export default LicenseDetailProducerSection;

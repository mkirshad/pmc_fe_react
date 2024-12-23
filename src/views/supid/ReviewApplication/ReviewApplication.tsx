import React, { useState, useEffect } from "react";
import useFormStore from "../../../store/supid/supidStore";
import BottomStickyBar from "@/components/template/BottomStickyBar";
import {
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Input from "@/components/ui/Input";
import { FormItem } from "@/components/ui/Form";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import AxiosBase from '../../../services/axios/AxiosBase';
import { Divider } from '@mui/material';

const ReviewAndSavePage = ({ groupList, children }) => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupList !== undefined && groupList.length > 1 ? groupList[1].value : ""
  );
  const [checkboxState, setCheckboxState] = useState({ previousStage: false, nextStage: false });
  const [fieldResponses, setFieldResponses] = useState({});

  const {
    applicantDetail,
    businessDetailIndividual,
    businessEntity,
    licenseDetail,
    licenseDetailProducer,
    licenseDetailConsumer,
    licenseDetailCollector,
    licenseDetailRecycler,
    updateApplicantDetail,
    completedSections,
  } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  const [searchParams] = useSearchParams();
  const group = searchParams.get("group");
  const disabled = group !== "DO";

  useEffect(() => {
    setSelectedGroup(
      groupList !== undefined && groupList.length > 1 ? groupList[1].value : ""
    );
  }, [groupList]);

  useEffect(() => {
    console.log('its in effect of review application ')
    console.log(applicantDetail)

    if (applicantDetail.id) {
        loadApplicantResponses(applicantDetail.id);
    }
  }, [applicantDetail.id]);

  useEffect(() => {
    console.log('fieldResponses', fieldResponses)
    updateApplicantDetail({"fieldResponses":fieldResponses, "readOnly":disabled});

  }, [fieldResponses])
console.log('fieldResponses', fieldResponses)

const loadApplicantResponses = async (applicantId) => {
  try {
      const transformedResponses = applicantDetail.field_responses.reduce((acc, item) => {
        acc[item.field_key] = { response: item.response, comment: item.comment };
        return acc;
      }, {});
      setFieldResponses(transformedResponses); // Update the state with the transformed format
      // setError(err);
  } finally {
      // setLoading(false);
  }
};

  const handleCheckboxChangeYesNo = (key, response) => {
    setFieldResponses((prev) => ({
        ...prev,
        [key]: {
            ...prev[key],
            response,
            comment: response === 'No' ? prev[key]?.comment || '' : null, // Clear comment for "Yes"
        },
    }));
};

const handleCommentChange = (key, comment) => {
  setFieldResponses((prev) => ({
    ...prev,
    [key]: {
      ...prev[key],
      comment, // Update the comment for the specific field
    },
  }));
};

  console.log(applicantDetail)

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    const updatedState = {
      previousStage: name === "previousStage" ? checked : false,
      nextStage: name === "nextStage" ? checked : false,
    };

    setCheckboxState(updatedState);

    if (name === "previousStage" && checked) {
      setSelectedGroup(groupList[0]?.value);
      const data_applicantDetail = { assignedGroup2: groupList[0]?.value };
      updateApplicantDetail(data_applicantDetail);
    } else if (name === "nextStage" && checked) {
      const data_applicantDetail = { assignedGroup2: groupList[2]?.value };
      updateApplicantDetail(data_applicantDetail);
      setSelectedGroup(groupList[2]?.value);
    }
  };

  const handleChangeRemarks = (event) => {
    const data_applicantDetail = { remarks: event.target.value };
    updateApplicantDetail(data_applicantDetail);
  };

  const keyToTitleMapping = {
    firstName: "First Name",
    lastName: "Last Name",
    applicantDesignation:"Designation",
    gender:"Gender",
    cnic:"CNIC",
    email:"Email",
    phoneNumber: "Mobile Number",
    trackingNumber:"Tracking Number",

    businessEntityType: "Business Entity Type",
    name: "Business Name",
    district: "District",
    tehsil: "Tehsil",
    city: "City",
    postalAddress: "Postal Address",

    // Producer
    registration_required_for: "Categories of Single Use Plastics",
    registration_required_for_other: "Categories for Other Plastics",
    registration_required_for_other_other_text: "Other",
    plain_plastic_Sheets_for_food_wrapping: "Additional Options for Packaging",
    PackagingItems: "Packging Item Other List",
    number_of_machines: "Number of machines",
    total_capacity_value: "Average Production Capacity (Kg per day)",
    date_of_setting_up: "Date of Business Setting Up",
    total_waste_generated_value: "Averrage Waste Generated (Kg per day)",
    has_waste_storage_capacity: "Has Waste Storage Capacity?",
    waste_disposal_provision: "Waste Disposal Provision",

    // Consumer
    consumption: "Average Sale (Kg per day)",
    provision_waste_disposal_bins: "Provision of Waste Disposal Bins",
    no_of_waste_disposible_bins: "No. of Waste Disposibal Bins",
    segregated_plastics_handed_over_to_registered_recyclers: "Whether Segregated Plastics are being handed over to registered Re-Cyclers or Collectors?",
    
    // Collector
    selectedCategoriesCollector: "Source of Disposal",
    total_capacity_value_collector: "Average Collection (Kg per day)",
    number_of_vehicles: "Number of vehicles",
    number_of_persons: "Number of persons",
    // Recycler
    selectedCategories: "Categories of plastic collected for recycling (Waste Disposal and Waste Collection in Kg per day)",
    plastic_waste_acquired_through: "Plastic waste acquired through",
    has_adequate_pollution_control_systems: "Has adequate pollution control systems or equipment to meet the standards of emission or effluent?",
    pollution_control_details: "Polution control details",
    
    licenseType:"License Type"
  };

  const renderSection = (title, data) => (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="font-bold mb-4">
          {title}
        </Typography>
        {Object.entries(data || {}).map(([key, value]) =>
          value !== "" &&
          key !== "applicationassignment" &&
          key !== "applicationdocument" &&
          key in keyToTitleMapping ? (
            <div
              key={key}
              className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4"
            >
              {/* Field Label and Value in the same row */}
              <div className="w-full md:flex-[5] flex flex-col md:flex-row items-start md:items-center mb-2 md:mb-0">
                <span className="font-bold mr-2">
                  {keyToTitleMapping[key] || key}:
                </span>
                <span className="text-normal break-words">
                  {typeof value === "object" && value !== null
                    ? JSON.stringify(value, null, 2)
                    : value}
                </span>
              </div>
  
     
  
              {/* Yes/No Radio Buttons */}
              <div className="w-full md:flex-[3] flex items-center justify-center space-x-4 mt-2 md:mt-0">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="Yes"
                    checked={fieldResponses[key]?.response === "Yes"}
                    onChange={() => handleCheckboxChangeYesNo(key, "Yes")}
                    disabled={disabled}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="No"
                    checked={fieldResponses[key]?.response === "No"}
                    onChange={() => handleCheckboxChangeYesNo(key, "No")}
                    disabled={disabled}
                  />
                  <span>No</span>
                </label>
              </div>

                       {/* Comment Input */}
                <div className="w-full md:flex-[5]">
                  {fieldResponses[key]?.response === "No" && (
                    <Input
                      type="textarea"
                      placeholder="Add comment"
                      value={fieldResponses[key]?.comment || ""}
                      onChange={(e) => handleCommentChange(key, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      readOnly={disabled}
                    />
                  )}
              </div>

            </div>
          ) : null
        )}
      </CardContent>
    </Card>
  );
  
  
  
  
  

  const renderDocumentSection = (documents) => (
    <Card sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          Documents
        </Typography>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={doc.document} target="_blank" rel="noopener noreferrer">
                {doc.document_description}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const manualFieldStyles = {
    backgroundColor: "#f0f8ff",
    border: "1px solid #007bff",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
  };

  const renderManualFields = () => (
    <Card sx={manualFieldStyles}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#007bff", marginBottom: "10px" }}>
          Information to be provided by District Incharge
        </Typography>
      <div className="grid md:grid-cols-2 gap-4">

      {/* Global Fields */}
        <FormItem
            label="Latitudue"
            invalid={Boolean(errors.annualProcurement)}
            errorMessage={errors.annualProcurement?.message}
          >
          <Controller
            name="annualProcurement"
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter Latitudue" {...field} readOnly={disabled}/>
            )}
          />
        </FormItem>
        
        <FormItem
          label="Longitude"
          invalid={Boolean(errors.annualProcurement)}
          errorMessage={errors.annualProcurement?.message}
        >
          <Controller
            name="annualProcurement"
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter Longitude" {...field} readOnly={disabled}/>
            )}
          />
        </FormItem>
      {licenseDetail.licenseType === 'Producer' && (<>
       {/* Producer Fields  */}

      

        

        
        <FormItem
              label="List of Products"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
            <Controller
              name="flow_diagram"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="List of Products"
                  // readOnly={readOnly} // Apply the read-only prop
                  {...field}
                  readOnly={disabled}
                />
              )}
            />
          </FormItem>


            <FormItem
              label="List of By Products"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="List of By Products"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>


            <FormItem
              label="List and Quanity of Raw Material Imported"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="List and Quanity of Raw Material Imported"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>


            <FormItem
              label="If raw material is bought then Name of seller"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="If raw material is bought then Name of seller"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="If self import, provide details"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="If self import, provide details"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Quantity of raw material utilized"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="Quantity of raw material utilized"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>
            </>)}
            </div>

          {licenseDetail.licenseType === 'Producer' && (
            <div className="grid md:grid-cols-1 gap-4">
            <div className="mb-4">
                <Divider textAlign="left">
                </Divider>
            </div>
            </div>
          )}

      <div className="grid md:grid-cols-2 gap-4">
          {licenseDetail.licenseType === 'Producer' && (<>

            <FormItem
              label="Status of compliance with - Thickness 75 micron"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <>
                  <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-1`}
                    value="Yes"
                    
                    disabled={disabled}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-2`}
                    value="No"
                    
                    disabled={disabled}
                  />
                  <span>No</span>
                </label>
                </>
                )}
              />
            </FormItem>

            <FormItem
              label="Does the unit have a valid consent/permit under the building and construction by-laws?"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <>
                  <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-1`}
                    value="Yes"
                    
                    disabled={disabled}
                  />
                  <span>Yes, please attach a copy</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-2`}
                    value="No"
                    
                    disabled={disabled}
                  />
                  <span>No</span>
                </label>
                </>
                )}
              />
            </FormItem>

        <FormItem
          label="Copy of consent/permit under the building and construciton by-laws"
          invalid={Boolean(errors.flowDiagram)}
          errorMessage={errors.flowDiagram?.message}
        >
          <Controller
            name="flowDiagram"
            control={control}
            render={({ field }) => (
              <Input type="file" accept=".pdf,.png,.jpg" {...field} disabled={disabled}/>
            )}
          />
        </FormItem>

        <FormItem
          label="Flow Diagram"
          invalid={Boolean(errors.flowDiagram)}
          errorMessage={errors.flowDiagram?.message}
        >
          <Controller
            name="flowDiagram"
            control={control}
            render={({ field }) => (
              <Input type="file" accept=".pdf,.png,.jpg" {...field} disabled={disabled}/>
            )}
          />
        </FormItem>


        <FormItem
          label="Action Plan"
          invalid={Boolean(errors.actionPlan)}
          errorMessage={errors.actionPlan?.message}
        >
          <Controller
            name="actionPlan"
            control={control}
            render={({ field }) => (
              <Input type="file" accept=".pdf,.png,.jpg" {...field} disabled={disabled}/>
            )}
          />
        </FormItem>

        <FormItem
            label="List of Stockist/Distributor/Supplier to whom the products will be supplied"
            invalid={Boolean(errors.firstName)}
            errorMessage={errors.firstName?.message}
          >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="List of Stockist/Distributor/Supplier to whom the products will be supplied"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>

          </>)}


          {licenseDetail.licenseType === 'Consumer' && (<>
          <FormItem
          label="Procurement (Kg per day)"
          invalid={Boolean(errors.annualProcurement)}
          errorMessage={errors.annualProcurement?.message}
        >
          <Controller
            name="annualProcurement"
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter procurement" {...field} readOnly={disabled}/>
            )}
          />
        </FormItem>

</>)}

      {/* Recycler Fields */}
      {licenseDetail.licenseType === 'Recycler' && (<>
      <FormItem
              label="No. of workers (including  contract labour)"
              invalid={Boolean(errors.firstName)}
              errorMessage={errors.firstName?.message}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="No. of workers (including  contract labour)"
                    // readOnly={readOnly} // Apply the read-only prop
                    style={{
                      // width: '200px', // Match width of the comment input
                      padding: '5px', // Same padding as the comment input
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9', // Optional: To match the background
                    }}
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Whether registerd with Labor Dept.? If Yes, provide details?"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <>
                  <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-1`}
                    value="Yes"
                    
                    disabled={disabled}
                  />
                  <span>Yes, please provide details</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-2`}
                    value="No"
                    
                    disabled={disabled}
                  />
                  <span>No</span>
                </label>
                </>
                )}
              />
            </FormItem>
            

            <FormItem
              label="Occupational safety and health 
aspects 
(Please provide details of 
facilities)"
              invalid={Boolean(errors.firstName)}
              errorMessage={errors.firstName?.message}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="Occupational safety and health aspects (Please provide details of facilities)"
                    // readOnly={readOnly} // Apply the read-only prop
                    style={{
                      // width: '200px', // Match width of the comment input
                      padding: '5px', // Same padding as the comment input
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9', // Optional: To match the background
                    }}
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Whether conditions exist or are 
likely to exist of the material 
being handled or processed 
 
posing adverse immediate or 
delayed 
impacts 
on 
the 
environment. "
              invalid={Boolean(errors.firstName)}
              errorMessage={errors.firstName?.message}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="Whether conditions exist or are 
likely to exist of the material 
being handled or processed 
 
posing adverse immediate or 
delayed 
impacts 
on 
the 
environment. "
                    // readOnly={readOnly} // Apply the read-only prop
                    style={{
                      // width: '200px', // Match width of the comment input
                      padding: '5px', // Same padding as the comment input
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9', // Optional: To match the background
                    }}
                    {...field}
                    readOnly={disabled}
                  />
                )}
              />
            </FormItem>
          </>)}
          </div>
      </CardContent>
    </Card>
  );

  return (
    <div
      className="p-4"
      style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}
    >
      <div>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Review Information
        </Typography>
        {
        !disabled && <Card className="mb-4" >
          <CardContent>
          <Typography variant="h7" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          If the provided information is correct, please click "Yes". If it is incorrect, then please click "No" and add comments
        </Typography>
        </CardContent>
        </Card>
        }
        {
        disabled && <Card className="mb-4" >
          <CardContent>
          <Typography variant="h7" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Please review the information provided by the District Incharge. This information is not editable and for your review only.
        </Typography>
        </CardContent>
        </Card>
        }
        {completedSections.includes("applicantDetail") &&
          renderSection("Applicant Details", applicantDetail)}
        {completedSections.includes("businessEntity") &&
          renderSection("Business Entity", businessEntity)}
        {completedSections.includes("businessDetailIndividual") &&
          renderSection("Business Details", businessDetailIndividual)}
        {completedSections.includes("licenseDetail") &&
          renderSection("License Details", licenseDetail)}
        {licenseDetail.licenseType === "Producer" &&
          renderSection("Producer Details", licenseDetailProducer)}
        {licenseDetail.licenseType === "Consumer" &&
          renderSection("Consumer Details", licenseDetailConsumer)}
        {licenseDetail.licenseType === "Collector" &&
          renderSection("Collector Details", licenseDetailCollector)}
        {licenseDetail.licenseType === "Recycler" &&
          renderSection("Recycler Details", licenseDetailRecycler)}
        {applicantDetail?.applicationdocument?.length > 0 &&
          renderDocumentSection(applicantDetail.applicationdocument)}
        {renderManualFields()}

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <FormControl fullWidth>
              <TextField
                id="Remarks"
                label="Remarks"
                variant="outlined"
                onChange={handleChangeRemarks}
              />
            </FormControl>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    name="nextStage"
                    checked={checkboxState.nextStage}
                    onChange={handleCheckboxChange}
                  />
                }
                label={`Yes - Proceed to next stage (${groupList[2]?.label})`}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="previousStage"
                    checked={checkboxState.previousStage}
                    onChange={handleCheckboxChange}
                  />
                }
                label={`No - Proceed to previous stage (${groupList[0]?.label})`}
              />
            </FormControl>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent>

            <div>
            {applicantDetail?.applicationassignment ? (
              <div key={'abc123'}>
                {
                  <div key={'abc123'}>{applicantDetail.applicationassignment}</div>
                }
              </div>
            ) : null}
            </div>
          </CardContent>
        </Card>
        
      </div>

      <Card>
          <CardContent>
           {children}
          </CardContent>
      </Card>

      <div>
      
      </div>
    </div>
  );
};

export default ReviewAndSavePage;

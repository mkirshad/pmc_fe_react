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

const keyToTitleMapping = {
  firstName: "First Name",
  lastName: "Last Name",
  businessEntityType: "Business Entity Type",
  district: "District",
  tehsil: "Tehsil",
  // Add more mappings as needed
};

const ReviewAndSavePage = ({ groupList, children }) => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupList !== undefined && groupList.length > 1 ? groupList[1].value : ""
  );
  const [checkboxState, setCheckboxState] = useState({ previousStage: false, nextStage: false });

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
    <Card sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          {title}
        </Typography>
        {Object.entries(data || {}).map(([key, value]) =>
          value !== "" && key !== "applicationassignment" && key !== "applicationdocument" && (key in keyToTitleMapping)? (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ flex: "1", marginRight: "10px" }}>
                <strong>{keyToTitleMapping[key] || key}:</strong>{" "}
                {typeof value === "object" && value !== null ? JSON.stringify(value, null, 2) : value}
              </div>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="Yes"
                    style={{ marginRight: "5px" }}
                    disabled={disabled}
                  />
                  Yes
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="No"
                    style={{ marginRight: "5px" }}
                    disabled={disabled}
                  />
                  No
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add comment"
                  style={{
                    width: "200px",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  readOnly={disabled}
                />
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

      {/* Global Fields */}
        <FormItem
            label="Latidue"
            invalid={Boolean(errors.annualProcurement)}
            errorMessage={errors.annualProcurement?.message}
          >
          <Controller
            name="annualProcurement"
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter procurement" {...field} />
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
              <Input type="text" placeholder="Enter procurement" {...field} />
            )}
          />
        </FormItem>
      {licenseDetail.licenseType === 'Producer' && (<>
       {/* Producer Fields  */}
        <FormItem
          label="Annual Procurement (Kg per day)"
          invalid={Boolean(errors.annualProcurement)}
          errorMessage={errors.annualProcurement?.message}
        >
          <Controller
            name="annualProcurement"
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter procurement" {...field} />
            )}
          />
        </FormItem>

        <FormItem
            label="Whether there is availability of Segregation at Source"
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
                    placeholder="Whether there is availability of Segregation at Source"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                  />
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
              <Input type="file" accept=".pdf,.png,.jpg" {...field} />
            )}
          />
        </FormItem>
        
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
                  />
                )}
              />
            </FormItem>


            <FormItem
              label="Name of seller/Importer"
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
                    placeholder="Name of seller/Importer"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                  />
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
                  />
                )}
              />
            </FormItem>


            <FormItem
              label="Whether registerd with Labor Dept.? If Yes, provide details"
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
                    placeholder="Whether registerd with Labor Dept.? If Yes, provide details"
                    // readOnly={readOnly} // Apply the read-only prop
                    style={{
                      // width: '200px', // Match width of the comment input
                      padding: '5px', // Same padding as the comment input
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9', // Optional: To match the background
                    }}
                    {...field}
                  />
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
                  />
                )}
              />
            </FormItem>
          </>)}
            
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

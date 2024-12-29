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
  const [manualFields, setManualFields] = useState({ latitude: "", longitude: "" });

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
  const disabled_lsm = group !== "LSM" && group !== "LSM2";

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

useEffect(() => {
  updateApplicantDetail({"manualFields":manualFields, "readOnly":disabled});

}, [manualFields])

const loadApplicantResponses = async (applicantId) => {
  try {
      const transformedResponses = applicantDetail.field_responses.reduce((acc, item) => {
        acc[item.field_key] = { response: item.response, comment: item.comment };
        return acc;
      }, {});
      setFieldResponses(transformedResponses); // Update the state with the transformed format
      // setError(err);
      // If manual_fields is present, setManualFields
      if (applicantDetail.manual_fields) {
        setManualFields(applicantDetail.manual_fields);
      } else {
        // If none, perhaps reset or leave it alone
        setManualFields({});
      }
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

const handleDocumentFormSubmit = async (document, document_description) => {
  const formData = new FormData();
  // Append fields to FormData
  formData.append('document', document);

  formData.append('document_description',  document_description);
  formData.append('applicant',  applicantDetail.id.toString());

  try {
      const response = await AxiosBase.post('/pmc/applicant-documents/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
          // Update the state using updateApplicantDetail
    updateApplicantDetail({
      applicationdocument: [
        ...(applicantDetail.applicationdocument || []), // Ensure it remains an array
        response.data, // Append the new response
      ],
    });
    alert("Payment Verification Letter is uploaded")
  } catch (error) {
      console.error('Error in POST request:', error.response || error.message);
      navigate('/error');
  }

};

const handleChangeManualFields = (fieldName, value) => {
  setManualFields((prev) => ({
    ...prev,
    [fieldName]: value,
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
    
    licenseType:"License Type",
    totalFeeAmount: "Total Fee Amount",
    verifiedFeeAmount: "Verified Fee Amount",
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
                {doc.document_description} {doc.created_at.substring(0,19)}
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
    <>
    <Card sx={manualFieldStyles}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#007bff", marginBottom: "10px" }}>
          Information to be provided by District Incharge
        </Typography>
  
        {/* GLOBAL FIELDS */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormItem
            label="Latitude"
            invalid={Boolean(errors.latitude)}
            errorMessage={errors.latitude?.message}
          >
            <Input
              type="number"
              placeholder="Enter Latitude"
              value={manualFields.latitude || ""}
              onChange={(e) =>
                handleChangeManualFields("latitude", e.target.value)
              }
              readOnly={disabled}
            />
          </FormItem>
  
          <FormItem
            label="Longitude"
            invalid={Boolean(errors.longitude)}
            errorMessage={errors.longitude?.message}
          >
            <Input
              type="number"
              placeholder="Enter Longitude"
              value={manualFields.longitude || ""}
              onChange={(e) =>
                handleChangeManualFields("longitude", e.target.value)
              }
              readOnly={disabled}
            />
          </FormItem>
        </div>
  
        {/* PRODUCER FIELDS */}
        {licenseDetail.licenseType === "Producer" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <FormItem
                label="List of Products"
                invalid={Boolean(errors.listOfProducts)}
                errorMessage={errors.listOfProducts?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="List of Products"
                  value={manualFields.list_of_products || ""}
                  onChange={(e) =>
                    handleChangeManualFields("list_of_products", e.target.value)
                  }
                  readOnly={disabled}
                />
              </FormItem>
  
              <FormItem
                label="List of By Products"
                invalid={Boolean(errors.listOfByProducts)}
                errorMessage={errors.listOfByProducts?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="List of By Products"
                  value={manualFields.list_of_by_products || ""}
                  onChange={(e) =>
                    handleChangeManualFields("list_of_by_products", e.target.value)
                  }
                  readOnly={disabled}
                />
              </FormItem>
  
              <FormItem
                label="List and Quantity of Raw Material Imported"
                invalid={Boolean(errors.rawMaterialImported)}
                errorMessage={errors.rawMaterialImported?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="List and Quantity of Raw Material Imported"
                  value={manualFields.raw_material_imported || ""}
                  onChange={(e) =>
                    handleChangeManualFields(
                      "raw_material_imported",
                      e.target.value
                    )
                  }
                  readOnly={disabled}
                />
              </FormItem>
  
              <FormItem
                label="If raw material is bought, then Name of Seller"
                invalid={Boolean(errors.sellerNameIfRawMaterialBought)}
                errorMessage={errors.sellerNameIfRawMaterialBought?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="If raw material is bought then Name of seller"
                  value={manualFields.seller_name_if_raw_material_bought || ""}
                  onChange={(e) =>
                    handleChangeManualFields(
                      "seller_name_if_raw_material_bought",
                      e.target.value
                    )
                  }
                  readOnly={disabled}
                />
              </FormItem>
  
              <FormItem
                label="If self import, provide details"
                invalid={Boolean(errors.selfImportDetails)}
                errorMessage={errors.selfImportDetails?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="If self import, provide details"
                  value={manualFields.self_import_details || ""}
                  onChange={(e) =>
                    handleChangeManualFields("self_import_details", e.target.value)
                  }
                  readOnly={disabled}
                />
              </FormItem>
  
              <FormItem
                label="Quantity of Raw Material Utilized"
                invalid={Boolean(errors.rawMaterialUtilized)}
                errorMessage={errors.rawMaterialUtilized?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="Quantity of raw material utilized"
                  value={manualFields.raw_material_utilized || ""}
                  onChange={(e) =>
                    handleChangeManualFields(
                      "raw_material_utilized",
                      e.target.value
                    )
                  }
                  readOnly={disabled}
                />
              </FormItem>
            </div>
  
            <div className="grid md:grid-cols-1 gap-4">
              <div className="mb-4">
                <Divider textAlign="left"></Divider>
              </div>
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <FormItem
                label="Status of compliance with – Thickness 75 micron"
                invalid={Boolean(errors.complianceThickness75)}
                errorMessage={errors.complianceThickness75?.message}
              >
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="complianceThickness75"
                      value="Yes"
                      checked={manualFields.compliance_thickness_75 === "Yes"}
                      onChange={() =>
                        handleChangeManualFields("compliance_thickness_75", "Yes")
                      }
                      disabled={disabled}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="complianceThickness75"
                      value="No"
                      checked={manualFields.compliance_thickness_75 === "No"}
                      onChange={() =>
                        handleChangeManualFields("compliance_thickness_75", "No")
                      }
                      disabled={disabled}
                    />
                    <span>No</span>
                  </label>
                </div>
              </FormItem>
  
              <FormItem
                label="Does the unit have a valid consent/permit under the building and construction by-laws?"
                invalid={Boolean(errors.validConsentPermitBuildingBylaws)}
                errorMessage={errors.validConsentPermitBuildingBylaws?.message}
              >
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="validConsentPermitBuildingBylaws"
                      value="Yes"
                      checked={
                        manualFields.valid_consent_permit_building_bylaws === "Yes"
                      }
                      onChange={() =>
                        handleChangeManualFields(
                          "valid_consent_permit_building_bylaws",
                          "Yes"
                        )
                      }
                      disabled={disabled}
                    />
                    <span>Yes, please attach a copy</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="validConsentPermitBuildingBylaws"
                      value="No"
                      checked={
                        manualFields.valid_consent_permit_building_bylaws === "No"
                      }
                      onChange={() =>
                        handleChangeManualFields(
                          "valid_consent_permit_building_bylaws",
                          "No"
                        )
                      }
                      disabled={disabled}
                    />
                    <span>No</span>
                  </label>
                </div>
              </FormItem>
  
              <FormItem
                label="Copy of consent/permit under the building and construction by-laws"
                invalid={Boolean(errors.consentPermitFile)}
                errorMessage={errors.consentPermitFile?.message}
              >
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={(e) =>
                    handleChangeManualFields("consent_permit_file", e.target.files[0])
                  }
                  disabled={disabled}
                />
              </FormItem>
  
              <FormItem
                label="Flow Diagram"
                invalid={Boolean(errors.flowDiagramFile)}
                errorMessage={errors.flowDiagramFile?.message}
              >
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={(e) =>
                    handleChangeManualFields("flow_diagram_file", e.target.files[0])
                  }
                  disabled={disabled}
                />
              </FormItem>
  
              <FormItem
                label="Action Plan"
                invalid={Boolean(errors.actionPlanFile)}
                errorMessage={errors.actionPlanFile?.message}
              >
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={(e) =>
                    handleChangeManualFields("action_plan_file", e.target.files[0])
                  }
                  disabled={disabled}
                />
              </FormItem>
  
              <FormItem
                label="List of Stockist/Distributor/Supplier to whom the products will be supplied"
                invalid={Boolean(errors.stockistDistributorList)}
                errorMessage={errors.stockistDistributorList?.message}
              >
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="List of Stockist/Distributor/Supplier"
                  value={manualFields.stockist_distributor_list || ""}
                  onChange={(e) =>
                    handleChangeManualFields(
                      "stockist_distributor_list",
                      e.target.value
                    )
                  }
                  readOnly={disabled}
                />
              </FormItem>
            </div>
          </>
        )}
  
        {/* CONSUMER FIELDS */}
        {licenseDetail.licenseType === "Consumer" && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormItem
              label="Procurement (Kg per day)"
              invalid={Boolean(errors.procurementPerDay)}
              errorMessage={errors.procurementPerDay?.message}
            >
              <Input
                type="text"
                placeholder="Enter procurement"
                value={manualFields.procurement_per_day || ""}
                onChange={(e) =>
                  handleChangeManualFields("procurement_per_day", e.target.value)
                }
                readOnly={disabled}
              />
            </FormItem>
          </div>
        )}
  
        {/* RECYCLER FIELDS */}
        {licenseDetail.licenseType === "Recycler" && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormItem
              label="No. of workers (including contract labour)"
              invalid={Boolean(errors.noOfWorkers)}
              errorMessage={errors.noOfWorkers?.message}
            >
              <Input
                type="text"
                autoComplete="off"
                placeholder="No. of workers (including contract labour)"
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
                value={manualFields.no_of_workers || ""}
                onChange={(e) =>
                  handleChangeManualFields("no_of_workers", e.target.value)
                }
                readOnly={disabled}
              />
            </FormItem>
  
            <FormItem
              label="Whether registered with Labor Dept.? If Yes, provide details?"
              invalid={Boolean(errors.laborDeptRegistrationStatus)}
              errorMessage={errors.laborDeptRegistrationStatus?.message}
            >
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="labor_dept_registration_status"
                    value="Yes"
                    checked={manualFields.labor_dept_registration_status === "Yes"}
                    onChange={() =>
                      handleChangeManualFields("labor_dept_registration_status", "Yes")
                    }
                    disabled={disabled}
                  />
                  <span>Yes, please provide details</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="labor_dept_registration_status"
                    value="No"
                    checked={manualFields.labor_dept_registration_status === "No"}
                    onChange={() =>
                      handleChangeManualFields("labor_dept_registration_status", "No")
                    }
                    disabled={disabled}
                  />
                  <span>No</span>
                </label>
              </div>
            </FormItem>
  
            <FormItem
              label="Occupational safety and health aspects (Please provide details of facilities)"
              invalid={Boolean(errors.occupationalSafetyAndHealthFacilities)}
              errorMessage={errors.occupationalSafetyAndHealthFacilities?.message}
            >
              <Input
                type="text"
                autoComplete="off"
                placeholder="Occupational safety and health facilities"
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
                value={manualFields.occupational_safety_and_health_facilities || ""}
                onChange={(e) =>
                  handleChangeManualFields(
                    "occupational_safety_and_health_facilities",
                    e.target.value
                  )
                }
                readOnly={disabled}
              />
            </FormItem>
  
            <FormItem
              label="Whether conditions exist or are likely to exist for the material being handled or processed to pose adverse impacts on the environment?"
              invalid={Boolean(errors.adverseEnvironmentalImpacts)}
              errorMessage={errors.adverseEnvironmentalImpacts?.message}
            >
              <Input
                type="text"
                autoComplete="off"
                placeholder="Adverse environmental impacts details"
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
                value={manualFields.adverse_environmental_impacts || ""}
                onChange={(e) =>
                  handleChangeManualFields(
                    "adverse_environmental_impacts",
                    e.target.value
                  )
                }
                readOnly={disabled}
              />
            </FormItem>
          </div>
        )}
      </CardContent>
    </Card>

    <Card sx={manualFieldStyles}>
<CardContent>
  <Typography variant="h6" sx={{ color: "#007bff", marginBottom: "10px" }}>
    Information to be provided by License Support Manager
  </Typography>

  {/* GLOBAL FIELDS */}
  <div className="grid md:grid-cols-1 gap-4">
      <FormItem
                label="Fee Verification from Treasury/District Accounts Office"
                invalid={Boolean(errors.consentPermitFile)}
                errorMessage={errors.consentPermitFile?.message}
              >
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={(e) =>
                    handleDocumentFormSubmit(e.target.files[0], "Fee Verification from Treasury/District Accounts Office")
                  }
                  disabled={disabled_lsm}
                />
      </FormItem>
    </div>
    </CardContent>
    </Card>
    </>
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
                label={`Yes - As per remarks, proceed to next stage (${groupList[2]?.label})`}
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

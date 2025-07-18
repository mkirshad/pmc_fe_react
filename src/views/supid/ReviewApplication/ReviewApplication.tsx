import React, { useState, useEffect } from "react";
import useFormStore from "../../../store/supid/supidStore";
import BottomStickyBar from "@/components/template/BottomStickyBar";
import {
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import Input from "@/components/ui/Input";
import { FormItem } from "@/components/ui/Form";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import AxiosBase from '../../../services/axios/AxiosBase';
import { Divider } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa'; // Information icon
import { Tooltip } from 'react-tooltip'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useSessionUser } from '@/store/authStore';

const ReviewAndSavePage = ({ groupList, children, setMovementDirection }) => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupList !== undefined && groupList.length > 1 ? groupList[1].value : ""
  );
  const [checkboxState, setCheckboxState] = useState({ previousStage: false, nextStage: false });
  const [fieldResponses, setFieldResponses] = useState({});
  const [manualFields, setManualFields] = useState({ latitude: "", longitude: "" });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [documentType, setDocumentType] = useState(
    "Fee Verification from Treasury/District Accounts Office"
  );

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Handler for radio change
  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  // Wrap the file change handler so that it sends the current documentType
  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleDocumentFormSubmit(e.target.files[0], documentType);
    }
  };

  const excludedValidationFields = ["verifiedFeeAmount"];
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

  const userAuthority = useSessionUser((state) => state.user.authority) || []
  const isAuthorized = userAuthority.some(
    group => group === applicantDetail.assignedGroup
  );
  const isAuthorizedDO = userAuthority.some(
    group => group === 'DO'
  );
  const isAuthorizedLSM = userAuthority.some(
    group => group === 'LSM'
  );
  const isAuthorizedLSM2 = userAuthority.some(
    group => group === 'LSM2'
  );
  const isAuthorizedDEO = userAuthority.some(
    group => group === 'DEO'
  );
  const isAuthorizedDG = userAuthority.some(
    group => group === 'DG'
  );

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
  const disabled = !isAuthorizedDO;
  const disabled_lsm = !isAuthorizedLSM && !isAuthorizedLSM2;
  const [laborDeptRegistered, setLaborDeptRegistered] = useState(false);

  const [missingSelections, setMissingSelections] = useState([]);
  const [missingComments, setMissingComments] = useState([]);

  const isFieldMissing = (key) => missingSelections.includes(key);
  const isCommentMissing = (key) => missingComments.includes(key);

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

useEffect(() => {
  if (manualFields?.labor_dept_registration_status === "Yes") {
    setLaborDeptRegistered(true);
  } else {
    setLaborDeptRegistered(false);
  }
}, [manualFields.labor_dept_registration_status]);


// Start 20250218
const handleChangeRemarks = (event) => {
  setRemarks(event.target.value);
  const data_applicantDetail = { remarks: event.target.value };
  updateApplicantDetail(data_applicantDetail);
};

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


const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setMovementDirection(null);
  // Ensure only one checkbox is selected at a time
  const updatedState = {
    previousStage: name === "previousStage" ? checked : false,
    nextStage: name === "nextStage" ? checked : false,
  };

  let updatedRemarks = "";
  let updatedGroup = null;
  let data_applicantDetail = {};

  if (name === "previousStage" && checked) {
    updatedGroup = groupList[0]?.value;
    data_applicantDetail = { assignedGroup2: updatedGroup };
    updatedRemarks = `As per the verification, please proceed to the previous stage for preliminary scrutiny/data entry, etc.`;
 
    // Validation
      if (isAuthorizedDO) {
      const allRequiredKeys = Object.entries(applicantDetail)
      .concat(Object.entries(businessEntity))
      .concat(Object.entries(businessDetailIndividual))
      .concat(Object.entries(licenseDetail))
      // .concat(Object.entries(licenseDetailProducer))
      // .concat(Object.entries(licenseDetailConsumer))
      .concat(Object.entries(licenseDetailCollector))
      // .concat(Object.entries(licenseDetailRecycler))
       .filter(([key, value]) =>
          keyToTitleMapping[key] &&                               // Must be shown in UI
          !excludedValidationFields.includes(key) &&              // Not excluded
          value !== null && value !== undefined && value !== ""  // Value must not be empty
        )
        .map(([key, _]) => key);
        
      const missingSelections = allRequiredKeys.filter(
        (key) => !fieldResponses[key] || !fieldResponses[key].response
      );
      

      const missingComments = allRequiredKeys.filter(
        (key) =>
          fieldResponses[key]?.response === "No" && !fieldResponses[key]?.comment
      );
      setMissingSelections(missingSelections);
      setMissingComments(missingComments);
      if (missingSelections.length > 0) {
        alert("Please select Yes or No for all fields before proceeding. For: " + missingSelections.join(", "));
        return;
      }
    
      if (missingComments.length > 0) {
        alert("For all fields where 'No' is selected, comments are required.");
        return;
      }
    }
    setMovementDirection("backward"); // ✅ Set direction
  } else if (name === "nextStage" && checked) {
    updatedGroup = groupList[2]?.value;
    data_applicantDetail = { assignedGroup2: updatedGroup };
    updatedRemarks = isAuthorizedDEO
      ? "As per the verification, all codal formalities for the issuance of the license have been fulfilled."
      : isAuthorizedDG
      ? "Approved. License has been issued."
      : `As per the verification, please proceed for issuance of the license.`;

    // Validation
      if (isAuthorizedDO) {
      const allRequiredKeys = Object.entries(applicantDetail)
      .concat(Object.entries(businessEntity))
      .concat(Object.entries(businessDetailIndividual))
      .concat(Object.entries(licenseDetail))
      .concat(Object.entries(licenseDetailProducer))
      .concat(Object.entries(licenseDetailConsumer))
      .concat(Object.entries(licenseDetailCollector))
      .concat(Object.entries(licenseDetailRecycler))
      .filter(([key, value]) =>
        keyToTitleMapping[key] &&                               // Must be shown in UI
        !excludedValidationFields.includes(key) &&              // Not excluded
        value !== null && value !== undefined && value !== ""  // Value must not be empty
      )
      .map(([key, _]) => key);
      
      const missingSelections = allRequiredKeys.filter(
        (key) => !fieldResponses[key] || !fieldResponses[key].response
      );
      
      const missingComments = allRequiredKeys.filter(
        (key) =>
          fieldResponses[key]?.response === "No" && !fieldResponses[key]?.comment
      );

      setMissingSelections(missingSelections);
      setMissingComments(missingComments);
      
      if (missingSelections.length > 0) {
        alert("Please select Yes or No for all fields before proceeding. For: " + missingSelections.join(", "));
        return;
      }
      
      if (missingComments.length > 0) {
        alert("For all fields where 'No' is selected, comments are required.");
        return;
      }
    }

    setMovementDirection("forward"); // ✅ Set direction
  } else {
    setMovementDirection(null);
  }

  setCheckboxState(updatedState);

  // Update selected group and applicant details
  if (checked) {
    setSelectedGroup(updatedGroup);
    updateApplicantDetail(data_applicantDetail);
    setRemarks(updatedRemarks); // Update remarks only if a checkbox is checked
    updateApplicantDetail({
      ...data_applicantDetail,
      remarks: updatedRemarks,
    });
  }
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
    alert(documentType + " is uploaded")
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



  // const handleChangeRemarks = (event) => {
  //   const data_applicantDetail = { remarks: event.target.value };
  //   updateApplicantDetail(data_applicantDetail);
  // };

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
    total_waste_generated_value: "Average Waste Generated (Kg per day)",
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


  const renderPSIDTracking = (title, psidData) => (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="font-bold mb-4">
          {title}
        </Typography>
        {Array.isArray(psidData) && psidData.length > 0 ? (
          psidData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 last:border-none"
            >
              {Object.entries(item).map(([key, value]) =>
                value !== "" ? (
                  <div
                    key={key}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2"
                  >
                    <span className="font-bold mr-2 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-normal break-words">
                      {typeof value === "object" && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          ))
        ) : (
          <Typography variant="body2" className="text-gray-600">
            No PSID Tracking records available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
  

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
                  {1===1 //typeof value === "object" // && value !== null
                    ? JSON.stringify(value, null, 2)
                    : key === "licenseType" && value === "Consumer"
                    ? "Stockist/Distributor/Supplier"
                    : value}
                </span>
              </div>
  
     
  
              {/* Yes/No Radio Buttons */}
              {!excludedValidationFields.includes(key) && (
              <div className="w-full md:flex-[3] flex items-center justify-center space-x-4 mt-2 md:mt-0"          
                style={{
                        border: isFieldMissing(key) ? '2px solid red' : '',
                        padding: isFieldMissing(key) ? '5px' : '',
                        borderRadius: isFieldMissing(key) ? '6px' : '',
                      }}
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="Yes"
                    checked={fieldResponses[key]?.response === "Yes"}
                    disabled={disabled}
                    onChange={() => {handleCheckboxChangeYesNo(key, "Yes"); }}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`response-${key}`}
                    value="No"
                    checked={fieldResponses[key]?.response === "No"}
                    disabled={disabled}
                    onChange={() => {handleCheckboxChangeYesNo(key, "No");}}
                  />
                  <span>No</span>
                </label>
              </div>
              )}

              {/* Always show comment input if Yes or No is selected */}
              <div className="w-full md:flex-[5]">
                {(fieldResponses[key]?.response === "Yes" || fieldResponses[key]?.response === "No") && (
                  <div>
                    <Input
                      type="textarea"
                      placeholder="Add comment"
                      value={fieldResponses[key]?.comment || ""}
                      onChange={(e) => handleCommentChange(key, e.target.value)}
                      className={`w-full border ${fieldResponses[key]?.response === "No" && !fieldResponses[key]?.comment ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                      readOnly={disabled}
                    />
                    {/* Validation message */}
                    {fieldResponses[key]?.response === "No" && !fieldResponses[key]?.comment && (
                      <span className="text-red-500 text-sm">Comment is required for 'No'</span>
                    )}
                  </div>
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
            label={"Latitude"}
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
                label={<p><p>Action Plan (in accordance with the Section 6 of the Regulations)</p><span
                  data-tip
                  data-for="info-tooltip"
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                  onClick={handleOpenModal} // Trigger modal on click
                  onMouseEnter={() => setModalVisible(true)} // Track hover start
                  // onMouseLeave={() => setIsHovered(false)} // Track hover end
                >
                  <FaInfoCircle className="text-blue-500" />
                </span>
                </p>}
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
              label="Average Sales (Kg per day)"
              invalid={Boolean(errors.procurementPerDay)}
              errorMessage={errors.procurementPerDay?.message}
            >
              <Input
                type="text"
                placeholder="Average Sales"
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
                    onChange={() => {
                      handleChangeManualFields("labor_dept_registration_status", "Yes");
                      setLaborDeptRegistered(true); // ✅ Enable upload
                    }}
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
                    onChange={() => {
                      handleChangeManualFields("labor_dept_registration_status", "No");
                      setLaborDeptRegistered(false); // ✅ Disable upload
                    }}
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


        <FormItem
          label="Pictorial Evidence*"
          invalid={Boolean(errors.pictorialEvidenceFile)}
          errorMessage={errors.pictorialEvidenceFile?.message}
        >
          <Input
            type="file"
            accept=".png,.jpg"
            onChange={(e) =>
              handleChangeManualFields("pictorial_evidence_file", e.target.files[0])
            }
            disabled={disabled}
          />
        </FormItem>

      {(isAuthorizedDO || !disabled_lsm) && laborDeptRegistered && (
        <Card sx={manualFieldStyles}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#007bff", marginBottom: "10px" }}>
              Upload 'Registration with Labor Department' Document
            </Typography>

            <FormItem
              label="Registration with Labor Department"
              invalid={Boolean(errors.registrationWithLaborDept)}
              errorMessage={errors.registrationWithLaborDept?.message}
            >
              <Input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={(e) =>
                  handleDocumentFormSubmit(e.target.files[0], "Registration with Labor Deparment")
                }
                disabled={disabled_lsm && !isAuthorizedDO}
              />
            </FormItem>
          </CardContent>
        </Card>
      )}

      </CardContent>
    </Card>

    {!disabled_lsm &&
    <Card sx={manualFieldStyles}>
<CardContent>
  <Typography variant="h6" sx={{ color: "#007bff", marginBottom: "10px" }}>
    Information to be provided by License Support Manager
  </Typography>

  {/* GLOBAL FIELDS */}
  <div className="grid md:grid-cols-1 gap-4">

    <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Select Document Type:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="Fee Verification from Treasury/District Accounts Office"
                checked={documentType === "Fee Verification from Treasury/District Accounts Office"}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              Fee Verification from Treasury/District Accounts Office
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="documentType"
                value="Identity Document"
                checked={documentType === "Identity Document"}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              Identity Document
            </label>
          </div>
        </div>

      <FormItem
                label="Fee Verification from Treasury/District Accounts Office / Identity Document"
                invalid={Boolean(errors.consentPermitFile)}
                errorMessage={errors.consentPermitFile?.message}
              >
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={onFileChange}
                  disabled={disabled_lsm}
                />
      </FormItem>
      </div>

    </CardContent>
    </Card>
  }
    </>
  );
  
  

  return (
    <div
      className="p-4"
      style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}
    >
      <Tooltip id="my-tooltip" />
      <div>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Review Information
        </Typography>
        {
        !disabled && <Card className="mb-4" >
          <CardContent>
          <Typography variant="h7" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Please review the information provided by the applicant. This information is not editable and it is for your review only. Please click "Yes" if information is found correct and "No" if information is not correct. In case of "No" pleae add your comments too.
 
        </Typography>
        </CardContent>
        </Card>
        }
        {
        disabled && <Card className="mb-4" >
          <CardContent>
          <Typography variant="h7" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Please review the information provided by the applicant and District Incharge.
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
        {applicantDetail?.psid_tracking?.length > 0 &&
          renderPSIDTracking("PSID Tracking", applicantDetail.psid_tracking)}

        {renderManualFields()}
  
        {isAuthorized &&
        <>
        {/* Remarks TextField */}
          <Card sx={{ marginBottom: "20px" }}>
            <CardContent>
              <FormControl fullWidth>
                <TextField
                  id="Remarks"
                  label="Remarks"
                  variant="outlined"
                  value={remarks}
                  onChange={handleChangeRemarks}
                />
              </FormControl>
            </CardContent>
          </Card>

          {/* Checkboxes for selection */}
          <Card>
            <CardContent>
              <FormControl>
                {/* Yellowish Note */}
                <Box
                  sx={{
                    backgroundColor: '#fff3cd',
                    color: '#856404',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    border: '1px solid #ffeeba',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Note:
                  </Typography>
                  <Typography variant="body2">
                    Please select any of the below actions:
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="nextStage"
                      checked={checkboxState.nextStage}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={isAuthorizedDEO
                  ? "Yes - As per the remarks and verification, all codal formalities for the issuance of the license have been fulfilled."
                  : isAuthorizedDG
                  ? "Yes - Approved. License has been issued."
                  : `Yes - As per the remarks and verification, please proceed for issuance of the license ${
                      groupList[1]?.label === "DO" ? "" : "(" + groupList[2]?.label + ")"
                    }`}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="previousStage"
                      checked={checkboxState.previousStage}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    `No - As per the remarks and verification, please proceed to the previous stage for preliminary scrutiny/data entry, etc. ${
                      groupList[1]?.label === "DO" ? "" : "(" + groupList[0]?.label + ")"
                    }`
                  }
                />
              </FormControl>
            </CardContent>
          </Card>
      </>}
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
{ isAuthorized &&
      <Card>
          <CardContent>
           {children}
          </CardContent>
      </Card>
}
          
      <div>
      
      </div>
            {/* Modal */}
      {(isModalVisible || isHovered) && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
          </div>
        </div>
      )}


<ConfirmDialog
            isOpen={(isModalVisible || isHovered)}
            title="Responsibilities of the producer.-"
            onClose={handleCloseModal}
            onRequestClose={handleCloseModal}
            onCancel={handleCloseModal}
            onConfirm={handleCloseModal}
        >
            <p>
              The producer shall:
              <ol className="list-decimal pl-6">
                <li>establish a system for collection of the plastic waste generated due to his products within a period of six months from the commencement of the regulations;</li>
                <li>ensure that the minimum requirement of twenty percent mixing of recycled material shall be met in production of single-use plastic product along with virgin material;</li>
                <li>carry out awareness campaigns regarding proper disposal of single-use plastic product which may include, but not limited to, displaying educative slogans, or messages, etc.; and</li>
                <li>perform other function as notified by the Agency for implementation of the regulations.</li>
              </ol>
            </p>
        </ConfirmDialog>

    </div>
  );
};

export default ReviewAndSavePage;

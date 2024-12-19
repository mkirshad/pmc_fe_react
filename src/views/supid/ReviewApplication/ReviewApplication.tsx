import React, { useState, useEffect } from 'react';
import useFormStore from '../../../store/supid/supidStore';
import BottomStickyBar from '@/components/template/BottomStickyBar';
import { FormControl, TextField, Checkbox, FormControlLabel } from '@mui/material';
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const ReviewAndSavePage = ({ groupList, children }) => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupList !== undefined && groupList.length > 1 ? groupList[1].value : ''
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
      firstName: '', // Add default values for form fields
    },
  });

  const [searchParams] = useSearchParams();
  const group = searchParams.get('group'); // Extract the "group" parameter from the URL
  const disabled = group !== 'DO';

console.log(applicantDetail)
  useEffect(() => {
    setSelectedGroup(
      groupList !== undefined && groupList.length > 1 ? groupList[1].value : ''
    );
  }, [groupList]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    const updatedState = {
      previousStage: name === 'previousStage' ? checked : false,
      nextStage: name === 'nextStage' ? checked : false,
    };

    setCheckboxState(updatedState);

    if (name === 'previousStage' && checked) {
      setSelectedGroup(groupList[0]?.value);
      const data_applicantDetail = { assignedGroup2: groupList[0]?.value };
      updateApplicantDetail(data_applicantDetail);
    } else if (name === 'nextStage' && checked) {
      const data_applicantDetail = { assignedGroup2: groupList[2]?.value };
      updateApplicantDetail(data_applicantDetail);
      setSelectedGroup(groupList[2]?.value);
    }
  };

  const handleChangeRemarks = (event) => {
    const data_applicantDetail = { remarks: event.target.value };
    updateApplicantDetail(data_applicantDetail);
  };

  console.log('Recycler Properties:', licenseDetailRecycler);
console.log(completedSections)
  return (
    <div className="p-4" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      {/* Left Side: Main Content */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Review Information</h2>

        {completedSections.includes('applicantDetail') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Applicant Details</h3>
            <div>
              {Object.entries(applicantDetail || {}).map(([key, value]) => (
                key !== 'applicationassignment' && key !== 'applicationdocument'? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
                    <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Documents</h3>
                    {applicantDetail.applicationdocument && (
                            <ul>
                                {applicantDetail.applicationdocument.map((doc) => (
                                    <li key={doc.id}>
                                        <a href={doc.document} target="_blank" rel="noopener noreferrer">
                                            Download {doc.document_description}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                      )}
                    </div>

      {completedSections.includes('businessEntity') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Business Entity</h3>
            <div>
              {Object.entries(businessEntity || {}).map(([key, value]) => (
                key !== 'applicationassignment' ? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}


        {completedSections.includes('businessDetailIndividual') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Business Details</h3>
            <div>
              {Object.entries(businessDetailIndividual || {}).map(([key, value]) => (
                value !== '' ? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

        {completedSections.includes('licenseDetail') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">License Detail</h3>
            <div>
              {Object.entries(licenseDetail || {}).map(([key, value]) => (
                key !== 'applicationassignment' ? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

{licenseDetail.licenseType === 'Producer' && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Producer - Detail</h3>
            <div>
              {Object.entries(licenseDetailProducer || {}).map(([key, value]) => (
                key !== 'applicationassignment' ? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>

          <FormItem
            label="Annual Procurement (Kg per day)"
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
                    placeholder="Annual Procurement (Kg per day)"
                    // readOnly={readOnly} // Apply the read-only prop
                    {...field}
                  />
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
              label="Flow Diagaram"
              invalid={Boolean(errors.flow_diagram)}
              errorMessage={errors.flow_diagram?.message}
            >
              <Controller
                name="flow_diagram"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg" // Allow only specific file types
                    onChange={(e) => field.onChange(e.target.files[0] || null)} // Correctly set the file without using 'value'
                  />
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




          </div>
      )
      }
      {licenseDetail.licenseType === 'Consumer' && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Consumer - Detail</h3>
            <div>
              {Object.entries(licenseDetailConsumer || {}).map(([key, value]) => (
                key !== 'applicationassignment'? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
      )
      }
        {licenseDetail.licenseType === 'Collector' && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Collector - Detail</h3>
            <div>
              {Object.entries(licenseDetailCollector || {}).map(([key, value]) => (
                key !== 'applicationassignment'? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
      )
      }
      {licenseDetail.licenseType === 'Recycler' && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Recycler - Detail</h3>
            <div>
              {Object.entries(licenseDetailRecycler || {}).map(([key, value]) => (
                key !== 'applicationassignment'? (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Key and Value */}
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </div>
            
                    {/* Radio Buttons */}
                    <div style={{ marginRight: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="Yes"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        Yes
                      </label>
                      <label style={{ marginLeft: '10px' }}>
                        <input
                          type="radio"
                          name={`response-${key}`}
                          value="No"
                          style={{ marginRight: '5px' }}
                          disabled={disabled} // Disable if group is not "DO"
                        />
                        No
                      </label>
                    </div>
            
                    {/* Comment Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add comment"
                        style={{
                          width: '200px',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        readOnly={disabled}
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>

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

          </div>
      )
      }

        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <TextField
              id="Remarks"
              label="Remarks"
              variant="filled"
              onChange={handleChangeRemarks}
            />
          </FormControl>
        </div>

        <div>
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
        </div>
      </div>

      {/* Right Side: Application Assignments */}
        <div>
          {/* Add dummy or real data for Application Assignments */}
          {Object.entries(applicantDetail || {}).map(([key, value]) => (
                key === 'applicationassignment'?
                <div>
                  {value}
                </div>
                :null
              ))}
        </div>
        {children}
    </div>
  );
};

export default ReviewAndSavePage;

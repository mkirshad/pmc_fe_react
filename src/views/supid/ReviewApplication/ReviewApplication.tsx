import React, { useState, useEffect } from 'react';
import useFormStore from '../../../store/supid/supidStore';
import BottomStickyBar from '@/components/template/BottomStickyBar';
import { FormControl, TextField, Checkbox, FormControlLabel } from '@mui/material';

const ReviewAndSavePage = ({ groupList, children }) => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupList !== undefined && groupList.length > 1 ? groupList[1].value : ''
  );
  const [checkboxState, setCheckboxState] = useState({ previousStage: false, nextStage: false });

  const {
    applicantDetail,
    updateApplicantDetail,
    completedSections,
  } = useFormStore();
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

  console.log('Selected Group:', selectedGroup);

  return (
    <div className="p-4" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      {/* Left Side: Main Content */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Review Your Information</h2>

        {completedSections.includes('applicantDetail') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Applicant Details</h3>
            <div>
              {Object.entries(applicantDetail || {}).map(([key, value]) => (
                key !== 'applicationassignment'?
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>:null
              ))}
            </div>
          </div>
        )}

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

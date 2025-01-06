import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';

// Utility function to flatten nested objects and handle null values
// Utility function to flatten nested objects and handle remarks
const flattenObject = (obj) => {
    // Step 1: Collect remarks from the assignment entries
    // that have assigned_group === 'APPLICANT'.
    const applicantAssignments = ((obj.assigned_group === 'APPLICANT' && obj.applicationassignment) || []).filter(
        (assignment) =>
        assignment.assigned_group === 'APPLICANT' &&
        assignment.remarks &&
        assignment.remarks !== 'undefined'
    );

    // Map out just the remarks from those assignments
    const applicantRemarks = applicantAssignments.map((a) => a.remarks);

    // If we want to ALSO include the top-level remarks if this applicant’s
    // own assigned_group is 'APPLICANT', do something like:
    // if (obj.assigned_group === 'APPLICANT' && obj.remarks) {
    //   applicantRemarks.push(obj.remarks);
    // }

    // Step 2: Combine them or use 'N/A' if none
    const combinedRemarks =
        applicantRemarks.length > 0 ? applicantRemarks.join('; ') : 'N/A';

          // Step 1: Extract the latest time for the matching assigned_group in applicationassignment
    const groupAssignments = obj.applicationassignment.filter(
        (assignment) => assignment.assigned_group === obj.assigned_group
    );

    // Find the latest time for the matching group
    const latestGroupAssignment = groupAssignments.reduce((latest, current) => {
        const currentTime = new Date(current.updated_at).getTime();
        return currentTime > new Date(latest.updated_at).getTime() ? current : latest;
    }, groupAssignments[0]);


    // Calculate group assignment days
    let groupAssignmentDays = 'N/A';
    if (latestGroupAssignment && latestGroupAssignment.updated_at) {
        const assignmentDate = new Date(latestGroupAssignment.updated_at);
        const currentDate = new Date();
        const differenceInTime = currentDate - assignmentDate;
        groupAssignmentDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    }

    // 3) Return your flattened fields + the combined remarks
    return {
      id: obj.id,
      tracking_number: obj.tracking_number,
      first_name: obj.first_name,
      last_name: obj.last_name,
      CNIC: obj.cnic,
      mobile_no: obj.mobile_no,
      application_status: obj.application_status,
      assigned_group: obj.assigned_group,
      registration_for: obj.registration_for,
      days_pending_for: groupAssignmentDays,
      // The new "remarks" field we’ll show in the grid:
      remarks: combinedRemarks,
    };
  };
  

const sanitizeData = (data) => {
    return data.map((record) => {
        const flattened = flattenObject(record);
        Object.keys(flattened).forEach((key) => {
            if (flattened[key] === undefined || flattened[key] === null) {
                flattened[key] = 'N/A'; // Replace undefined/null values
            }
        });
        return flattened;
    });
};

const Home = () => {
    const [flattenedData, setFlattenedData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [userGroups, setUserGroups] = useState(null);
    const [step, setStep] = useState(0); // State to track the current step
    const [selectedRowId, setSelectedRowId] = useState(null); // State for the selected radio button
    const [statistics, setStatistics] = useState({});
    const [selectedTile, setSelectedTile] = useState(null); // State for the selected tile
    console.log(selectedRowId)
    // APPLICANT > LSO > LSM > DO > LSM2 > TL > DEO > Download License
    const groups = [
        'APPLICANT',
        'LSO',
        'LSM',
        'DO',
        'LSM2',
        'TL',
        'DEO',
        'Download License'
    ]

    const groupTitles = {
        APPLICANT: 'Applicant',
        LSO: 'LSO',
        LSM: 'LSM',
        DO: 'DO',
        LSM2: 'LSM',
        TL: 'TL',
        DEO: 'DEO',
        'Download License': 'Download License',
    };
    const downloadFile = async () => {
        // Simulate a file download
        const applicantId = selectedRowId; // Replace with the actual applicant ID
        
        try {
            // Send request to fetch the PDF
            const response = await AxiosBase.get(`/pmc/generate-license-pdf?applicant_id=${applicantId}`, {
                responseType: 'blob', // Important to get the data as a Blob
            });

            // Create a blob URL for the downloaded file
            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;

            // Set filename for the downloaded file
            link.setAttribute('download', `license_${applicantId}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };
    
    const handleTileClick = async (group) => {
        try {
            setSelectedTile(group); // Update selected tile state

              // Logic for LSO.1, LSO.2, LSO.3
        if (group === 'LSO1' || group === 'LSO2' || group === 'LSO3') {
            const moduloValue = group === 'LSO1' ? 1 : group === 'LSO2' ? 2 : 0;

            const response = await AxiosBase.get('/pmc/applicant-detail-main-list/', {
                params: {
                    assigned_group: "LSO",
                },
            });
            const filteredData = (response.data || []).filter((item) => item.submittedapplication?.id % 3 === moduloValue);
            // Update the table data
            const extracted = extractColumns(filteredData, !!userGroups.length, userGroups[0]);
            setFlattenedData(extracted.flattenedData);
            setColumns(extracted.columns);
            
        } else {

            // Fetch filtered data from the backend
            const response = await AxiosBase.get('/pmc/applicant-detail-main-list/', {
                params: {
                    assigned_group: group !== "All-Applications" && group !== "Challan-Downloaded" ? group : undefined,
                    application_status: group === "Challan-Downloaded" ? "Fee Challan" : undefined,
                },
            });
            const filteredData = response.data || [];
    
            // Update the table data
            const extracted = extractColumns(filteredData, !!userGroups.length, userGroups[0]);
            setFlattenedData(extracted.flattenedData);
            setColumns(extracted.columns);
        }
        } catch (error) {
            console.error("Error fetching filtered data:", error);
            setFlattenedData([])
            setColumns([])
        }
    };

    const handleStepClick = (index) => {
        console.log('its here')
        if (groups[index] === 'Download License' && groups[step] === 'Download License') {
            downloadFile(); // Trigger file download if "Completed" step is clicked
        }
        // setStep(index); // Update the active step
    };

    // Extract columns and flattened data
    const extractColumns = (data, hasUserGroup, group) => {
        const allowedColumns = [
            'first_name',
            'CNIC',
            'mobile_no',
            'tracking_number',
            'registration_for',
            'days_pending_for',
            'remarks',
        ]; // List of allowed columns
    
        const flattenedData = sanitizeData(data); // Ensure sanitized data
        const firstRecord = flattenedData[0];
        console.log(data)
        const columns = [
            ...Object.keys(firstRecord)
                .filter((key) => allowedColumns.includes(key)) // Only include allowed columns
                .map((key) => {
                    let customSize = 160; // Default column size
                    if (['mobile_no', 'application_status', 'assigned_group', 'total_fee_amount'].includes(key)) {
                        customSize = 120; // Reduce size for these specific columns
                    } else if (['first_name'].includes(key)) {
                        customSize = 180; // Reduce size for these specific columns
                    }
    
                    return {
                        accessorKey: key,
                        header: key
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (char) => char.toUpperCase()),
                        size: customSize,
                        Cell: ({ cell, row }) => {
                            const id = row.original.id;
                            const url = `/spuid-review/${id}?group=${group}`; // Adjust URL as needed
                            return (
                                <a
                                    href={url} // Link to the desired URL
                                    target="_blank" // Open in a new tab on click
                                    rel="noopener noreferrer" // Security best practices for external links
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {cell.getValue() || '-'}
                                </a>
                            );
                        },
                    };
                }),
        ];

    
        return { flattenedData, columns };
    };
    const navigate = useNavigate();
    useEffect(() => {
                       
        const fetchData = async () => {
            try {
                const response = await AxiosBase.get(`/pmc/ping/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                const errorDetails = {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                };
    
                navigate('/error', { state: { error: errorDetails } });

            }

            try {
                let groupsResponse = [];
                try {
                    const response = await AxiosBase.get(`/pmc/user-groups/`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    groupsResponse = response.data || [];
                    setUserGroups(groupsResponse.map(group => group.name));
                } catch (error) {
                    console.error('Error fetching user groups:', error);
                    // Set user groups to an empty array if an error occurs
                    setUserGroups([]);
                }
                console.log('groupsResponse', groupsResponse)
    
                const response = await AxiosBase.get(`/pmc/applicant-detail/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                const dataApplicants = response.data;
    
                if (Array.isArray(dataApplicants) && dataApplicants.length > 0) {
                    const extracted = extractColumns(dataApplicants, (groupsResponse.length>0), (groupsResponse.map(group => group.name))[0]);
                    setFlattenedData(extracted.flattenedData);
                    setColumns(extracted.columns);
    
                    // Debugging: Log the last row
                    console.log('Flattened Data:', extracted.flattenedData);
                    const lastRow = extracted.flattenedData[extracted.flattenedData.length - 1];
                    console.log('Last Row:', lastRow);
    
                    if (lastRow && lastRow.id) {
                        setSelectedRowId(lastRow.id); // Set last row ID as selected
                        console.log('Last Row ID:', lastRow.id);
    
                        const groupIndex = groups.indexOf(lastRow.assigned_group);
                        if (groupIndex !== -1) {
                            setStep(groupIndex); // Set the step to match the last row's assigned group
                        }
                    }
                }

                // Fetch statistics for groups
                const statsResponse = await AxiosBase.get(`/pmc/fetch-statistics-do-view-groups/`, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
                setStatistics(statsResponse.data); // Save statistics to state
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
          };
    
        fetchData();

        setSelectedRowId(25);
        const groupIndex = groups.indexOf('LSO');
        if (groupIndex !== -1) {
            setStep(groupIndex); // Update the Steps component
        }

    }, []); // Run only once on component load

    useEffect(() => {
        console.log('userGroups:', userGroups)
        if(userGroups && !userGroups.includes('DO')){
            navigate('/home');
        }
    }, [userGroups, navigate]); // Run only once on component load
    
console.log('selectedRowId:', selectedRowId)
console.log(selectedRowId)
    return (
        <div>
                {/* Display Tiles */}
                <div className="tiles-container">
                    {Object.entries(statistics).map(([group, count]) => (
                        <div key={group} className="tile"
                        style={{ cursor: 'pointer', 
                                 backgroundColor: selectedTile === group ? '#007BFF' : '#f8f9fa',
                                 color: selectedTile === group ? '#fff' : '#000', 
                                }} // Add cursor pointer for interactivity
                        onClick={() => handleTileClick(group)} // Call the handler with the group
                        >
                            <h3>{groupTitles[group] || group}</h3> {/* Use title or fallback to the group key */}
                            <p>{count}</p>
                        </div>
                    ))}
                </div>
      {/*         
            <Steps current={step} className="mb-5">
                {groups.map((group, index) => (
                    <Steps.Item
                        key={index}
                        title={
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleStepClick(index)} // Handle step click
                            >
                                {groupTitles[group] || group} 
                            </div>
                        }
                    />
                ))}
            </Steps> 
*/}
            <div className='mb-4'>
                <h3>{userGroups && userGroups.filter(group => group !== "Download License" && group !== "Applicant" && group !== 'LSM2').join(" - ")} Dashboard</h3>
            </div>
            <MaterialReactTable
                    key={selectedRowId} // Force re-render when selectedRowId changes
                    columns={[
                        // {
                        //     accessorKey: 'selected',
                        //     header: 'Select',
                        //     size: 50,
                        //     Cell: ({ row }) => (
                        //         <input
                        //             type="radio"
                        //             name="rowSelect"
                        //             onChange={() => {
                        //                 setSelectedRowId(row.original.id);
                        //                 const groupIndex = groups.indexOf(row.original.assigned_group);
                        //                 if (groupIndex !== -1) {
                        //                     setStep(groupIndex); // Update the Steps component
                        //                 }
                        //             }}
                        //             checked={String(selectedRowId) === String(row.original.id)} // Ensure proper comparison
                        //         />
                        //     ),
                        // },
                        ...columns,
                    ]}
                    data={flattenedData.map((row) => ({
                        ...row,
                        assigned_group_title: groupTitles[row.assigned_group] || row.assigned_group, // Add a title for the assigned group
                    }))} // Include updated data
                    getRowId={(row) => row.id} // Explicitly set the row ID using the `id` field from your original data
                    initialState={{
                        showColumnFilters: false,
                    }}
                    defaultColumn={{
                        maxSize: 420,
                        minSize: 200,
                        size: 100, // default size is usually 180
                    }}
                    enableColumnResizing
                    columnResizeMode="onChange" // default
                    enableTopToolbar={true} // Disables the top-right controls entirely
                    // enableGlobalFilter={false} // Disables the global search/filter box
                    enablePagination={true} // Optionally disable pagination controls
                    // enableSorting={false} // Optionally disable column sorting
                />

        </div>
    );
};

export default Home;

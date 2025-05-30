import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';
import { useSessionUser } from '@/store/authStore';
import { Button } from "@/components/ui/button";
import { AiOutlineFileExcel } from "react-icons/ai"; // Using a relevant Excel icon

// Utility function to flatten nested objects and handle null values
// Utility function to flatten nested objects and handle remarks
const flattenObject = (obj) => {
    const groupOrder = ['APPLICANT', 'LSO', 'LSM', 'DO', 'LSM2', 'TL', 'DEO', 'DG', 'Download License'];
  
    // Step 1: Determine if assigned group is moving backward
    const currentGroupIndex = groupOrder.indexOf(obj.assigned_group);
    const previousAssignments = obj.applicationassignment || [];
    const previousGroupIndex = (() => {
        // Get the second-to-last assignment
        if (previousAssignments.length > 1) {
          const secondLastAssignment = previousAssignments[previousAssignments.length - 2];
          return groupOrder.indexOf(secondLastAssignment.assigned_group);
        }
        // Return -1 if there are fewer than two valid assignments
        return -1;
      })();
    
  
    const isAssignedBack = previousGroupIndex !== -1 && previousGroupIndex > currentGroupIndex;
  
    // Step 2: Extract the latest comment when assigned back
    const lastBackAssignment = previousAssignments.find(
      (assignment) => groupOrder.indexOf(assignment.assigned_group) === previousGroupIndex
    );
  
    // Step 3: Combine the flattened fields
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
      remarks: obj.remarks || 'N/A',
      is_assigned_back: isAssignedBack? 'Yes':'No', // Flag for highlighting
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
    const [loading, setLoading] = useState(false);

    // APPLICANT > LSO > LSM > DO > LSM2 > TL > DEO > Download License
    const groups = [
        'APPLICANT',
        'LSO',
        'LSM',
        'DO',
        'LSM2',
        'TL',
        'DEO',
        'DG',
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
        DG: 'DG',
        'Download License': 'Download License',
    };

    const userAuthority = useSessionUser((state) => state.user.authority) || []
    
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
            setLoading(true);
            setSelectedTile(group); // Update selected tile state

              // Logic for LSO.1, LSO.2, LSO.3
        if (group === 'LSO1' || group === 'LSO2' || group === 'LSO3') {
            const moduloValue = group === 'LSO1' ? 1 : group === 'LSO2' ? 2 : 0;

            const response = await AxiosBase.get('/pmc/applicant-detail-main-do-list/', {
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
            const response = await AxiosBase.get('/pmc/applicant-detail-main-do-list/', {
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
        }finally{
            setLoading(false); // Hide the loading spinner
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
          'is_assigned_back', // Include this column
        ];
      
        const flattenedData = sanitizeData(data); // Ensure sanitized data
        const firstRecord = flattenedData[0];
      
        const columns = [
          ...Object.keys(firstRecord)
            .filter((key) => allowedColumns.includes(key)) // Only include allowed columns
            .map((key) => {
              let customSize = 160; // Default column size
              if (['mobile_no', 'application_status', 'assigned_group', 'total_fee_amount'].includes(key)) {
                customSize = 120; // Reduce size for these specific columns
              } else if (['first_name'].includes(key)) {
                customSize = 180; // Increase size for these specific columns
              }
      
              // Add custom filter for is_assigned_back
              if (key === 'is_assigned_back') {
                return {
                  accessorKey: key,
                  header: 'Assigned Back',
                  size: customSize,
                  Filter: ({ column }) => (
                    <select
                      value={column.getFilterValue() || ''}
                      onChange={(e) => column.setFilterValue(e.target.value || undefined)} // Set the filter value
                      style={{ width: '100%', padding: '4px' }}
                    >
                      <option value="">All</option>
                      <option value="Yes">Yes</option>
                      <option value="">No</option>
                    </select>
                  ),
                  filterFn: (row, _id, filterValue) => {
                    return filterValue === '' || row.original[key] === filterValue;
                  },
                  Cell: ({ cell, row }) => {
                    const id = row.original.id;
                    const assignedBack = row.original.is_assigned_back;
                    const url = `/spuid-review/${id}?group=${group}`; // Adjust URL as needed
                  
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          cursor: 'pointer',
                          // If assigned_back = 'Yes', color is red; otherwise, it's blue
                          color: assignedBack === 'Yes' ? 'red' : 'blue',
                          textDecoration: 'underline',
                        }}
                      >
                        {cell.getValue() || '-'}
                      </a>
                    );
                  },
                };
              }
      
              return {
                accessorKey: key,
                header: key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
                size: customSize,
                Cell: ({ cell, row }) => {
                    const id = row.original.id;
                    const assignedBack = row.original.is_assigned_back;
                    const url = `/spuid-review/${id}?group=${group}`; // Adjust URL as needed
                  
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          cursor: 'pointer',
                          // If assigned_back = 'Yes', color is red; otherwise, it's blue
                          color: assignedBack === 'Yes' ? 'red' : 'blue',
                          textDecoration: 'underline',
                        }}
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
            setLoading(true); // Show the loading spinner
        //     // try {
        //     //     const response = await AxiosBase.get(`/pmc/ping/`, {
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //         },
        //     //     });
        //     // } catch (error) {
        //     //     const errorDetails = {
        //     //         status: error.response?.status,
        //     //         data: error.response?.data,
        //     //         message: error.message,
        //     //     };
    
        //         navigate('/error', { state: { error: errorDetails } });

        //     }

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
    
                if (Array.isArray(dataApplicants) && (dataApplicants.length > 0 && dataApplicants[0] !== '')) {
                    const extracted = extractColumns(dataApplicants, (groupsResponse.length>0 && groupsResponse[0] !== ''), (groupsResponse.map(group => group.name))[0]);
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
            } finally{
                setLoading(false); // Hide the loading spinner
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
    
    useEffect(() => {
        // Find first matching group
        const matchingGroup = Object.keys(groupTitles).find((group) => userAuthority.includes(group));
        handleTileClick(matchingGroup); // Set the highlighted tile
    }, [userAuthority]);

console.log('selectedRowId:', selectedRowId)
console.log(selectedRowId)
const handleExport = async () => {
    try {
    const response = await AxiosBase.post(
        "/pmc/export-applicant/",
        { applicant_ids: flattenedData?.map((row) => row.id) },
        { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Applicant_Details_${new Date().toISOString()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
    console.error("Export failed:", error);
    }
};
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
                      <div className="grid md:grid-cols-5 gap-5 items-center mb-4">
                            {/* Left-aligned warning message */}
                            <h6 className="text-red-500 col-span-3">
                                Records highlighted in red require immediate attention, as they have been returned from a next step.
                            </h6>
                            <span></span>
                            {/* Right-aligned Export button with icon */}
                            <button
                                type="button"
                                onClick={handleExport}
                                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                <AiOutlineFileExcel className="mr-2 text-xl" />
                                Export to Excel
                            </button>
                        </div>
            {loading ? (
            // Show a spinner or loading message
<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
</div>

        ) : (
            <MaterialReactTable
                    columns={[
                        ...columns
                    ]}
                    data={flattenedData.map((row) => ({
                        ...row,
                        assigned_group_title: groupTitles[row.assigned_group] || row.assigned_group,
                    }))}
                    getRowId={(row) => row.id}
                    initialState={{
                        showColumnFilters: false,
                    }}
                    defaultColumn={{
                        maxSize: 420,
                        minSize: 200,
                        size: 100,
                    }}
                    enableColumnResizing
                    columnResizeMode="onChange"
                    enableTopToolbar={true}
                    enablePagination={true}
                    />
                )
            }
        </div>
    );
};

export default Home;

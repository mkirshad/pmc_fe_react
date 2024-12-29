import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';

// Utility function to flatten nested objects and handle null values
// Utility function to flatten nested objects and handle remarks
const flattenObject = (obj) => {
    // Step 1: Extract the latest time for the matching assigned_group in applicationassignment
    const groupAssignments = obj.applicationassignment.filter(
        (assignment) => assignment.assigned_group === obj.assigned_group
    );

    // Find the latest time for the matching group
    const latestGroupAssignment = groupAssignments.reduce((latest, current) => {
        const currentTime = new Date(current.updated_at).getTime();
        return currentTime > new Date(latest.updated_at).getTime() ? current : latest;
    }, groupAssignments[0]);

    const groupAssignmentTime = latestGroupAssignment ? latestGroupAssignment.updated_at?.substring(0, 16) : 'N/A';

        // Calculate the total fee amount and settled fee amount
    const totalFeeAmount = obj.applicantfees
        ? obj.applicantfees.reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
        : 0;

    const verifiedFeeAmount = obj.applicantfees
        ? obj.applicantfees
              .filter((fee) => fee.is_settled)
              .reduce((sum, fee) => sum + parseFloat(fee.fee_amount || 0), 0)
        : 0;

    // Map out just the remarks from those assignments

    // Combine the remarks or use 'N/A' if none

    // Step 3: Return the flattened object with the added group_assignment_time field
    return {
        id: obj.id,
        application_Submission_Time: obj.submittedapplication?.created_at?.substring(0, 16) || 'N/A',
        tracking_number: obj.tracking_number,
        first_name: obj.first_name,
        mobile_no: obj.mobile_no,
        application_status: obj.application_status,
        assigned_group: obj.assigned_group,
        group_assignment_time: groupAssignmentTime, // Add the latest assignment time for the group
        total_fee_amount: totalFeeAmount.toFixed(2), // Include total fee amount
        verified_fee_amount: verifiedFeeAmount.toFixed(2), // Include verified fee amount
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
            'last_name',
            'cnic',
            'mobile_no',
            'application_status',
            'tracking_number',
            'assigned_group',
            'registration_for',
            'application_Start_Time',
            'application_Submission_Time',
            'remarks',
            'group_assignment_time',
            'total_fee_amount',
            'verified_fee_amount',
        ]; // List of allowed columns
    
        const flattenedData = sanitizeData(data); // Ensure sanitized data
        const firstRecord = flattenedData[0];
        console.log(data);
    
        const columns = [
            ...Object.keys(firstRecord)
                .filter((key) => allowedColumns.includes(key)) // Only include allowed columns
                .map((key) => {
                    let customSize = 160; // Default column size
                    if (['mobile_no', 'application_status', 'assigned_group', 'total_fee_amount'].includes(key)) {
                        customSize = 120; // Reduce size for these specific columns
                    }else if (['first_name'].includes(key)) {
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
                navigate('/error');
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
    
                // Fetch statistics for groups
                const statsResponse = await AxiosBase.get(`/pmc/fetch-statistics-view-groups/`, {
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
            if(userGroups && !userGroups.includes('Super'))
            {
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

            <div className='mb-4'>
                <h3>{userGroups && userGroups.filter(group => group !== "Download License" && group !== "Applicant" && group !== 'LSM2').join(" - ")} Dashboard</h3>
            </div>
            <MaterialReactTable
                    key={selectedRowId} // Force re-render when selectedRowId changes
                    columns={[
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
                        maxSize: 200,
                        minSize: 1,
                        size: 50, // default size is usually 180
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

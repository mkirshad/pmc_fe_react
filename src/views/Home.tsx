import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';

// Utility function to flatten nested objects and handle null values
const flattenObject = (obj, parentKey = '', result = {}, excludedKeys = []) => {
    // for (const [key, value] of Object.entries(obj || {})) {
    //     const newKey = parentKey ? `${parentKey}.${key}` : key;

    //     // Check if the key matches any excluded keys
    //     if (excludedKeys.some((excludedKey) => newKey.startsWith(excludedKey))) {
    //         continue; // Skip this key
    //     }

    //     if (value && typeof value === 'object' && !Array.isArray(value)) {
    //         // Recursively flatten nested objects
    //         //flattenObject(value, newKey, result, excludedKeys);
    //     } else {
    //         // Assign value, defaulting to 'N/A' if undefined or null
    //         result[newKey] = value !== undefined && value !== null ? value : 'N/A';
    //     }
    // }
    // return result;
    return {
        id:obj.id,
        tracking_number: obj.tracking_number,
        first_name: obj.first_name,
        last_name: obj.last_name,
        cnic: obj.cnic,
        mobile_no: obj.mobile_no,
        application_status: obj.application_status,
        assigned_group: obj.assigned_group,
        registration_for: obj.registration_for,
        application_Start_Time: obj.created_at.substring(0, 16),
        application_Submission_Time: obj.submittedapplication?.created_at.substring(0, 16) || null,
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
    const [userGroups, setUserGroups] = useState([]);
    const [step, setStep] = useState(0); // State to track the current step
    const [selectedRowId, setSelectedRowId] = useState(null); // State for the selected radio button
    const [statistics, setStatistics] = useState({});
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
        ]; // List of allowed columns
    
        const flattenedData = sanitizeData(data); // Ensure sanitized data
        const firstRecord = flattenedData[0];
        console.log(data)
        const columns = [
            ...Object.keys(firstRecord)
                .filter((key) => allowedColumns.includes(key)) // Only include allowed columns
                .map((key) => ({
                    accessorKey: key,
                    header: key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase()),
                    size: 200,
                    Cell: ({ cell, row }) => {
                        return (
                            <span
                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                onClick={() => {
                                    const id = row.original.id;
                                    console.log(`Clicked ${key}:`, cell.getValue());
                                    console.log(`Navigating with ID: ${id}`);
                                    // Perform navigation or other action
                                    window.location.href = hasUserGroup
                                        ? `/spuid-review/${id}?group=${group}`
                                        : `/spuid-signup/${id}`;
                                }}
                            >
                                {cell.getValue() || '-'}
                            </span>
                        );
                    },
                })),
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
    
console.log('selectedRowId:', selectedRowId)
console.log(selectedRowId)
    return (
        <div>
                {/* Display Tiles */}
            <div className="tiles-container">
                    {Object.entries(statistics).map(([group, count]) => (
                        <div key={group} className="tile">
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
                <h3>{userGroups.filter(group => group !== "Download License" && group !== "Applicant" && group !== 'LSM2').join(" - ")} Dashboard</h3>
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
                        minSize: 1,
                        size: 100, // default size is usually 180
                    }}
                    enableColumnResizing
                    columnResizeMode="onChange" // default
                    enableTopToolbar={userGroups.length>0} // Disables the top-right controls entirely
                    // enableGlobalFilter={false} // Disables the global search/filter box
                    enablePagination={false} // Optionally disable pagination controls
                    // enableSorting={false} // Optionally disable column sorting
                />

        </div>
    );
};

export default Home;

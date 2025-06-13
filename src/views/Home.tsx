import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';
import Tabs from '@/components/ui/Tabs'
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone, HiViewList, HiDocumentDownload } from 'react-icons/hi'
import { FaFilePdf } from 'react-icons/fa';
import { useSessionUser } from '@/store/authStore';
import { AiOutlineFileExcel } from "react-icons/ai"; // Using a relevant Excel icon

const { TabNav, TabList, TabContent } = Tabs


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
      application_Start_Time: obj.created_at?.substring(0, 16) || 'N/A',
      application_Submission_Time:
        obj.submittedapplication?.created_at?.substring(0, 16) || 'N/A',
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
    const [step, setStep] = useState(0); // State to track the current step
    const [selectedRowId, setSelectedRowId] = useState(null); // State for the selected radio button
    const [statistics, setStatistics] = useState({});
    const [currentTab, setCurrentTab] = useState('tab1')
    console.log(selectedRowId)
    // APPLICANT > LSO > LSM > DO > LSM2 > TL > DEO > Download License
    const [loading, setLoading] = useState(false);
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
    const userAuthority = useSessionUser((state) => state.user.authority) || []
    console.log('user authority:', userAuthority)
    const downloadFile = async () => {
        // Simulate a file download
        const applicantId = selectedRowId; // Replace with the actual applicant ID
        
        try {
            if(navigator.onLine){
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
            }else{
                throw new Error("Application is offline. Cannot fetch data.");
            }
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };


    // Extract columns and flattened data
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
    ];

    const flattenedData = sanitizeData(data);
    const firstRecord = flattenedData[0];

    const columns = [
        // Optional: PDF icon column
        {
            accessorKey: 'download',
            header: '',
            size: 50,
            Cell: ({ row }) => {
                const assignedGroup = row.original.assigned_group;
                if (assignedGroup === 'Download License') {
                    const downloadUrl = `/api/pmc/license-pdf?license_number=${row.original.tracking_number}`;
                    return (
                        <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download License"
                        >
                            <FaFilePdf
                                style={{
                                    fontSize: '1.5rem',
                                    color: '#d32f2f',
                                    cursor: 'pointer',
                                }}
                            />
                        </a>
                    );
                }
                return null;
            },
        },

        // Dynamic columns with special condition for 'assigned_group'
        ...Object.keys(firstRecord)
            .filter((key) => allowedColumns.includes(key))
            .map((key) => {
                if (key === 'assigned_group') {
                    return {
                        accessorKey: key,
                        header: 'Assigned Group',
                        Cell: ({ row }) => {
                            const assignedGroup = row.original.assigned_group;
                            const trackingNumber = row.original.tracking_number;

                            if (assignedGroup === 'Download License') {
                                const downloadUrl = `/api/pmc/license-pdf?license_number=${trackingNumber}`;
                                return (
                                    <a
                                        href={downloadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'blue', textDecoration: 'underline' }}
                                        title="Download License PDF"
                                    >
                                        {assignedGroup}
                                    </a>
                                );
                            }

                            return assignedGroup;
                        },
                    };
                }

                // Default clickable cell for all other keys
                return {
                    accessorKey: key,
                    header: key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase()),
                    Cell: ({ cell, row }) => {
                        const id = row.original.id;
                        return (
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                                onClick={() => {
                                    window.location.href = hasUserGroup
                                        ? `/spuid-review/${id}?group=${group}`
                                        : `/spuid-signup/${id}`;
                                }}
                            >
                                {cell.getValue() || '-'}
                            </span>
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
    
            try {
                if (navigator.onLine) {
                    const response = await AxiosBase.get(`/pmc/applicant-detail/`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
    
                    const dataApplicants = response.data;
    
                    if (Array.isArray(dataApplicants) && (dataApplicants.length > 0) ) {
                        const extracted = extractColumns(dataApplicants, (userAuthority.length > 0 && userAuthority[0] !== ''), userAuthority[0]);
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
                } else {
                    throw new Error("Application is offline. Cannot fetch applicant details.");
                }
    
                if (navigator.onLine) {
                    // Fetch statistics for groups
                    const statsResponse = await AxiosBase.get(`/pmc/fetch-statistics-view-groups/`, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
    
                    setStatistics(statsResponse.data); // Save statistics to state
                } else {
                    throw new Error("Application is offline. Cannot fetch statistics.");
                }
    
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
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
        console.log('userGroups:', userAuthority)
        if(userAuthority.includes('DEO') || userAuthority.includes('DG')){
            navigate('/home-deo');
        }else if(userAuthority.includes('Admin')){
            navigate('/home-admin');
        }else if(userAuthority.includes('DO')){
            navigate('/home-do');
        }else if(userAuthority.includes('Super')){
            navigate('/home-super');
        }else if(userAuthority.length === 1 && userAuthority[0] === 'Inspector'){
            navigate('/auth/EPAOperations/AllInspections');
        }        
    }, [userAuthority, navigate]); // Run only once on component load
    
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
            {userAuthority.length > 0 && 
            <div className='mb-4'>
                <h3>{userAuthority.filter(group => group !== "Download License" && group !== "Applicant" && group !== 'LSM2').join(" - ")} Dashboard</h3>
            </div>
            }

{loading ? (
            // Show a spinner or loading message
<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
</div>

        ) : (
            <>
                        <div className="grid md:grid-cols-5 gap-5 items-center mb-4">
                            {/* Left-aligned warning message */}
                            <span className="text-red-500 col-span-3">

                            </span>
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
                    enableColumnFilters
                    enableSorting
                    enableStickyHeader
                    muiTableProps={{
                        sx: {
                            border: '1px solid #ddd', // Table border
                        },
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            backgroundColor: '#f5f5f5', // Header background
                            fontWeight: 'bold',
                            borderBottom: '2px solid #ccc',
                            textAlign: 'center',
                        },
                    }}
                    muiTableBodyCellProps={{
                        sx: {
                            borderRight: '1px solid #ddd', // Column border
                            padding: '10px',
                        },
                    }}
                    muiTableBodyRowProps={{
                        sx: {
                            '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, // Alternate row colors
                            '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                        },
                    }}
                    enableZebraStripes={true}
                    enableColumnResizing={true}
                    // columnResizeMode="onChange" // default
                    enableTopToolbar={true} // Disables the top-right controls entirely
                    // enableGlobalFilter={false} // Disables the global search/filter box
                    enablePagination={true} // Optionally disable pagination controls
                    // enableSorting={false} // Optionally disable column sorting
                />
                </>
                )
                }
        </div>
    );
};

export default Home;

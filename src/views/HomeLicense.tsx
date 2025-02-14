import React, { useEffect, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';
import AxiosBase from '../services/axios/AxiosBase';
import { Link } from 'react-router-dom'; // For navigation
import Steps from '@/components/ui/Steps';
import { useNavigate } from 'react-router-dom';

// Utility function to flatten nested objects and handle null values
// Utility function to flatten nested objects and handle remarks
const flattenObject = (obj) => {
    return obj;
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
    // Extract columns and flattened data
    const extractColumns = (data, hasUserGroup, group) => {
            const allowedColumns = [
                'id',
                'license_number',
                'date_of_issue',
                'license_for',
                'license_duration',
                'owner_name',
                'business_name',
                'district_name',
                'tehsil_name',
                'city_name',
                'address',
                'types_of_plastics',
                'particulars',        
                'fee_amount',
                'is_active',
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
                        Cell: ({ cell, row }) => {
                            return (
                                <span
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                    onClick={() => {
                                        const license_number = row.original.license_number;
                                        const date_of_issue = row.original.date_of_issue;
                                        // Perform navigation or other action
                                        window.location.href = `/generate-license-pdf?license_number=${license_number}&date_of_issue=${date_of_issue}`;
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
    
                const response = await AxiosBase.get(`/pmc/license-by-user/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                const dataApplicants = response.data;
                console.log(dataApplicants)
    
                if (Array.isArray(dataApplicants) && dataApplicants.length > 0) {
                    const extracted = extractColumns(dataApplicants, (groupsResponse.length>0), (groupsResponse.map(group => group.name))[0]);
                    setFlattenedData(extracted.flattenedData);
                    setColumns(extracted.columns);
                }
                
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

console.log('flattenedData', flattenedData)
    return (
        <div>

            <MaterialReactTable
                    key={selectedRowId} // Force re-render when selectedRowId changes
                    columns={[
                        { accessorKey: 'license_number',    header: 'License Number', 
                                  minSize: 50,
                                  maxSize: 500,
                                  size: 150, 
                        // Create a custom cell that shows an <a> link:
                            Cell: ({ row }) => {
                                // row.original contains the full row data
                                const licenseNumber = row.original.license_number;
                                const dateOfIssue = row.original.date_of_issue; // e.g. "2025-01-10"

                                const pdfUrl = `/api/pmc/license-pdf?license_number=${licenseNumber}&date_of_issue=${dateOfIssue}`;

                                return (
                                <a 
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                    href={pdfUrl}
                                    target="_blank"       // open in new tab
                                    rel="noopener noreferrer"
                                >
                                    {licenseNumber}
                                </a>
                                );
                                
                                }
                        },
                        { accessorKey: 'date_of_issue',    header: 'Date Of Issue', 
                        minSize: 50,
                        maxSize: 500,
                        size: 150, },
                        { accessorKey: 'license_for',    header: 'License For', 
                            minSize: 50,
                            maxSize: 500,
                            size: 150, },
                        { accessorKey: 'license_duration',    header: 'License Duration', 
                        minSize: 50,
                        maxSize: 500,
                        size: 150, },
                        { accessorKey: 'owner_name',    header: 'Owner Name', 
                            minSize: 50,
                            maxSize: 500,
                            size: 200, },
                        { accessorKey: 'business_name',    header: 'Business Name', 
                            minSize: 50,
                            maxSize: 500,
                            size: 150, },
                        { accessorKey: 'district_name',    header: 'District Name', 
                        minSize: 50,
                        maxSize: 500,
                        size: 150, },
                        { accessorKey: 'tehsil_name',    header: 'Tehsil Name', 
                            minSize: 50,
                            maxSize: 500,
                            size: 150, },
                        { accessorKey: 'city_name',    header: 'City Name', 
                            minSize: 50,
                            maxSize: 500,
                            size: 150, },
                        { accessorKey: 'address',    header: 'Address', 
                        minSize: 50,
                        maxSize: 500,
                        size: 150, },                
                        { accessorKey: 'types_of_plastics',    header: 'Types Of Plastics', 
                            minSize: 100,
                            maxSize: 500,
                            size: 500, },
                        { accessorKey: 'particulars',    header: 'Particulars', 
                            minSize: 100,
                            maxSize: 100,
                            size: 150, },
                        { accessorKey: 'fee_amount',    header: 'Fee Amount', 
                            minSize: 50,
                            maxSize: 500,
                            size: 150, },
                        { accessorKey: 'is_active',    header: 'Is Active', 
                        minSize: 50,
                        maxSize: 500,
                        size: 150, }, 
                    ]}
                    
                    data={flattenedData} // Include updated data
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
                    enableTopToolbar={userGroups.length>0} // Disables the top-right controls entirely
                    // enableGlobalFilter={false} // Disables the global search/filter box
                    enablePagination={true} // Optionally disable pagination controls
                    // enableSorting={false} // Optionally disable column sorting
                />

        </div>
    );
};

export default Home;

import React, { useEffect, useState } from "react";
import Tabs from '@/components/ui/Tabs';
import { HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import { MaterialReactTable } from "material-react-table";
import AxiosBase from "@/services/axios/AxiosBase";
import { useSessionUser } from '@/store/authStore';
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserForm from "./UserForm"; // ✅ Import Add/Edit User Form

const { TabNav, TabList, TabContent } = Tabs;

const Dashboard = () => {
    const [inspectors, setInspectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("tab1"); // ✅ Track active tab


    const district_id = useSessionUser((state) => state.user.district_id) || null
    const district_name = useSessionUser((state) => state.user.district_name) || ''
    
    // ✅ Function to fetch inspectors
    const fetchInspectors = () => {
        if (district_id) {
            setLoading(true);
            AxiosBase.get("/accounts/list-inspectors/")
                .then(response => {
                    setInspectors(response.data);
                })
                .catch(error => {
                    console.error("Error fetching inspectors:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    // ✅ Initial fetch when component mounts
    useEffect(() => {
        fetchInspectors();
    }, [district_id]);

    // ✅ Fetch users again when switching back to "List Inspectors"
    useEffect(() => {
        if (activeTab === "tab1") {
            fetchInspectors();
        }
    }, [activeTab]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setActiveTab("tab2"); // ✅ Switch to "Add/Edit User" tab
    };

    const handleResetUserForm = () => {
        setSelectedUser(null);
        setActiveTab("tab1"); // ✅ Switch back to List Inspectors (Triggers Refetch)
    };



    const columns = [
        { accessorKey: "id", header: "ID", size: 100 },  // ✅ Include User ID for updating
        { accessorKey: "username", header: "Username", size: 200 },
        { accessorKey: "first_name", header: "First Name", size: 200 },
        { accessorKey: "last_name", header: "Last Name", size: 200 },
        {
            accessorKey: "edit",
            header: "Actions",
            size: 200,
            Cell: ({ row }) => (
                <IconButton onClick={() => handleEditClick(row.original)}>
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div>
            {/* <h2 className="text-lg font-bold mb-4">Dashboard {district_name ? ` - ${district_name}` : ''}</h2> */}
            <Tabs value={activeTab} onChange={setActiveTab}> {/* ✅ Controlled Tabs */}
                <TabList>
                    <TabNav value="tab1" icon={<HiOutlineUserGroup />}>
                        List Inspectors ({district_name})
                    </TabNav>
                    <TabNav value="tab2" icon={<HiOutlineUserAdd />}>
                        Add/Edit Inspector ({district_name})
                    </TabNav>
                </TabList>
                
                <div className="p-4">
                    {/* Tab 1: List Inspectors */}
                    <TabContent value="tab1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                                <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
                            </div>
                        ) : (
                            <MaterialReactTable
                                columns={columns}
                                data={inspectors}
                                enableColumnResizing
                                enablePagination
                                initialState={{ showColumnFilters: false }}
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
                            />
                        )}
                    </TabContent>

                    {/* Tab 2: Add/Edit User */}
                    <TabContent value="tab2">
                        <UserForm 
                            selectedUser={selectedUser} 
                            setSelectedUser={handleResetUserForm} // ✅ Reset user & switch back if needed
                        />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Dashboard;

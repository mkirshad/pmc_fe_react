import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AxiosBase from "../../../services/axios/AxiosBase";
import { useNavigate } from "react-router-dom";
import { useSessionUser } from '@/store/authStore';

const InspectionReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await AxiosBase.get("/pmc/inspection-report/district_summary/");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const district_id = useSessionUser((state) => state.user.district_id) || null
  const district_name = useSessionUser((state) => state.user.district_name) || ''

  const handleEditClick = (row) => {
    navigate(`/edit-inspection/${row.id}`, { state: { reportData: row } });
  };

  const columns = [
    { accessorKey: "district", header: "District Name", size: 200 },
    { accessorKey: "total_inspections", header: "Total No. of Inspections", size: 200 },
    { accessorKey: "total_notices_issued", header: "Total No. of Notices Issued", size: 200 },
    { accessorKey: "total_plastic_bags_confiscated", header: "Total Kgs of Plastic Bags Confiscated", size: 250 },
    { accessorKey: "total_confiscated_plastic", header: "Total Kgs of confiscated Plastic\n(Other than plastic bags)", size: 250 },
    { accessorKey: "total_firs_registered", header: "Total No. of FIRs registered", size: 200 },
    { accessorKey: "total_premises_sealed", header: "No. of Premises Sealed", size: 200 },
    { accessorKey: "total_complaints_filed", header: "No. of Complaints filed before\nthe Environmental Magistrate", size: 300 },
    {
      accessorKey: "edit",
      header: "Actions",
      size: 100,
      Cell: ({ row }) => (
        <IconButton onClick={() => handleEditClick(row.original)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Inspection Reports {district_name!==''?' - ':''} {district_name}</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
        </div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={reports}
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
          enableZebraStripes={true}
        />
      )}
    </div>
  );
};

export default InspectionReportsList;

import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useInspectionStore from "../../../store/supid/useInspectionStore"; // ✅ Import Zustand Store
import { useSessionUser } from '@/store/authStore';

// ✅ Helper Function to Format JSON
const formatJsonColumn = (jsonData) => {
  if (!jsonData) return "N/A";
  if (Array.isArray(jsonData)) return jsonData.join(", ");
  if (typeof jsonData === "object") return JSON.stringify(jsonData, null, 2);
  return jsonData;
};

const InspectionReportsList = () => {
  const navigate = useNavigate();
  const { reports, fetchReports, loading, syncReports } = useInspectionStore(); // ✅ Zustand store

  const district_id = useSessionUser((state) => state.user.district_id) || null
  const district_name = useSessionUser((state) => state.user.district_name) || ''

  useEffect(() => {
    syncReports().then(() => fetchReports());
  }, []);

  // ✅ Define Table Columns
  // Define Table Columns
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      Cell: ({ row }) => (
        <span
          onClick={() => handleEditClick(row.original)}
          className="text-blue-500 underline cursor-pointer"
        >
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "business_name",
      header: "Business Name",
      size: 200,
      Cell: ({ row }) => (
        <div className="flex items-center">
          <span
            onClick={() => handleEditClick(row.original)}
            className="text-blue-500 underline cursor-pointer mr-2"
          >
            {row.original.business_name}
          </span>
          <IconButton
            size="small"
            onClick={() => handleEditClick(row.original)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
    {
      accessorKey: "inspection_date",
      header: "Inspection Date",
      size: 200,
      Cell: ({ row }) => (
        <span
          onClick={() => handleEditClick(row.original)}
          className="text-blue-500 underline cursor-pointer"
        >
          {row.original.inspection_date}
        </span>
      ),
    },
    {
      accessorKey: "business_type",
      header: "Business Type",
      size: 150,
      Cell: ({ row }) => (
        <span
          onClick={() => handleEditClick(row.original)}
          className="text-blue-500 underline cursor-pointer"
        >
          {row.original.business_type}
        </span>
      ),
    },
    {
      accessorKey: "license_number",
      header: "License Number",
      size: 150,
      Cell: ({ row }) => (
        <span
          onClick={() => handleEditClick(row.original)}
          className="text-blue-500 underline cursor-pointer"
        >
          {row.original.license_number}
        </span>
      ),
    },
    {
      accessorKey: "violation_found",
      header: "Violation Found",
      size: 80,
      Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre>,
    },
    {
      accessorKey: "violation_type",
      header: "Violation Type",
      size: 400,
      Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre>,
    },
    {
      accessorKey: "action_taken",
      header: "Action Taken",
      size: 400,
      Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre>,
    },
    { accessorKey: "total_confiscation", header: "Total Confiscation (KG)", size: 200 },
    { accessorKey: "district", header: "District", size: 150 },
    { accessorKey: "created_at", header: "Created At", size: 200 },
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

  // ✅ Handle Edit Click
  const handleEditClick = (row) => {
    navigate(`/auth/EPAOperations/ReportViolation?id=${row.id}`);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Inspection Reports {district_name!==''?' - ':''} {district_name}</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
        </div>
      ) : (
        <MaterialReactTable columns={columns} data={reports} enableColumnResizing enablePagination initialState={{ showColumnFilters: false }} 
        
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

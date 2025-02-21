import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useInspectionStore from "../../../store/supid/useInspectionStore"; // ✅ Import Zustand Store

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

  useEffect(() => {
      syncReports();
      fetchReports();
  }, []);

  // ✅ Define Table Columns
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      Cell: ({ row }) => (
        <a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">
          {row.original.id}
        </a>
      ),
    },
    {
      accessorKey: "business_name",
      header: "Business Name",
      size: 200,
      Cell: ({ row }) => (
        <a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">
          {row.original.business_name}
        </a>
      ),
    },
    {
      accessorKey: "business_type",
      header: "Business Type",
      size: 150,
      Cell: ({ row }) => (
        <a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">
          {row.original.business_type}
        </a>
      ),
    },
    {
      accessorKey: "license_number",
      header: "License Number",
      size: 150,
      Cell: ({ row }) => (
        <a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">
          {row.original.license_number}
        </a>
      ),
    },
    { accessorKey: "violation_found", header: "Violation Found", size: 80, Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre> },
    { accessorKey: "violation_type", header: "Violation Type", size: 400, Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre> },
    { accessorKey: "action_taken", header: "Action Taken", size: 400, Cell: ({ cell }) => <pre>{formatJsonColumn(cell.getValue())}</pre> },
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
      <h2 className="text-lg font-bold mb-4">Inspection Reports</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading data, please wait...</p>
        </div>
      ) : (
        <MaterialReactTable columns={columns} data={reports} enableColumnResizing enablePagination initialState={{ showColumnFilters: false }} />
      )}
    </div>
  );
};

export default InspectionReportsList;

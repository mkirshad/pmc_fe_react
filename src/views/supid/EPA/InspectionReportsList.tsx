import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import AxiosBase from "../../../services/axios/AxiosBase";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Helper function to format JSON
const formatJsonColumn = (jsonData) => {
  if (!jsonData) return "N/A"; // Handle null or undefined values
  if (Array.isArray(jsonData)) return jsonData.join(", "); // Convert arrays to comma-separated string
  if (typeof jsonData === "object") return JSON.stringify(jsonData, null, 2); // Pretty-print JSON
  return jsonData; // Default return
};

const InspectionReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch data from the Django API
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await AxiosBase.get("/pmc/inspection-report/");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Define table columns
   // Define table columns with hyperlinks
   const columns = [
    { accessorKey: "id", header: "ID", size: 50, Cell: ({ row }) => (<a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">{row.original.id}</a>) },
    { accessorKey: "business_name", header: "Business Name", size: 200, Cell: ({ row }) => (<a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">{row.original.business_name}</a>) },
    { accessorKey: "business_type", header: "Business Type", size: 150, Cell: ({ row }) => (<a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">{row.original.business_type}</a>) },
    { accessorKey: "license_number", header: "License Number", size: 150, Cell: ({ row }) => (<a href={`/auth/EPAOperations/ReportViolation?id=${row.original.id}`} className="text-blue-500 underline">{row.original.license_number}</a>) },
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
        <MaterialReactTable
          columns={columns}
          data={reports}
          enableColumnResizing
          enablePagination
          initialState={{ showColumnFilters: false }}
        />
      )}
    </div>
  );
};

export default InspectionReportsList;

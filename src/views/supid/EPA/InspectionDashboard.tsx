import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AxiosBase from "../../../services/axios/AxiosBase";
import { useNavigate } from "react-router-dom";
import { useSessionUser } from '@/store/authStore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
    // ✅ New KPIs added
    { accessorKey: "total_fine_amount", header: "Total Fine Amount (PKR)", size: 200 },
    { accessorKey: "total_fine_recovered", header: "Total Fine Recovered (PKR)", size: 200 },
    { accessorKey: "pending_fine_amount", header: "Pending Fine Amount (PKR)", size: 200 },

    { accessorKey: "total_fines_pending", header: "Total Fines Pending", size: 200 },
    { accessorKey: "total_fines_partial", header: "Total Partially Paid Fines", size: 200 },
    { accessorKey: "total_fines_recovered", header: "Total Recovered Fines", size: 200 },

    { accessorKey: "total_de_sealed_premises", header: "Total De-Sealed Premises", size: 200 },

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

  const downloadExcel = async () => {
    try {
      const response = await AxiosBase.get("/pmc/inspection-report/export-district-summary-excel/", {
        responseType: 'blob', // Important to get binary data
      });
  
      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'district_summary.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Failed to download Excel file:", error);
    }
  };


  const downloadPDF = async () => {
    try {
      const response = await AxiosBase.get("/pmc/inspection-report/export-district-summary-pdf/", {
        responseType: 'blob', // Important to get binary data
      });
  
      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'district_summary.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Failed to download Excel file:", error);
    }
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

        <div>
          <Stack direction="row" spacing={2} className="mb-4">
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadIcon />}
            onClick={downloadExcel}
          >
            Export to Excel
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadIcon />}
            onClick={downloadPDF}
          >
            Export to PDF
          </Button>
        </Stack>

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
      </div>
      )
      }
    </div>
  );
};

export default InspectionReportsList;

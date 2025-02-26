import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AxiosBase from "@/services/axios/AxiosBase";
import { useSessionUser } from "@/store/authStore";
import { MaterialReactTable } from "material-react-table";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Form, FormItem } from "@/components/ui/Form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";


const documentSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    documentType: z.enum(["Notification", "Minutes of Meeting"], { required_error: "Select a document type" }),
    file: z
    .instanceof(File, { message: "Must be a valid file" })
    .optional(),
    document_date: z.string().min(1, { message: "Document Date is required!" }),
});

const DocumentsTab = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const district_id = useSessionUser((state) => state.user.district_id) || null;
    const district_name = useSessionUser((state) => state.user.district_name) || "";

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            title: "",
            documentType: "Notification",
            file: null,
        },
    });

    // ✅ Fetch Documents
    const fetchDocuments = () => {
        setLoading(true);
        AxiosBase.get("/pmc/district-documents/")
            .then((response) => setDocuments(response.data))
            .catch((error) => console.error("Error fetching documents:", error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

        // ✅ Handle File Upload
        const onSubmit = async (data) => {
            const formData = new FormData();
            formData.append("district_id", district_id?.toString() || '0' );
            formData.append("document_type", data.documentType);
            formData.append("title", data.title);
            formData.append("document", data.file);
            if (data.document_date) {
                formData.append("document_date", data.document_date);
            }
        
            try {
                await AxiosBase.post("/pmc/district-documents/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Document uploaded successfully!");
                fetchDocuments();
                reset();
            } catch (error) {
                console.error("Error uploading document:", error);
                alert("Failed to upload document.");
            }
        };
    

    const columns = [
        { accessorKey: "district_name", header: "District", size: 200 },
        { accessorKey: "document_type", header: "Type", size: 150 },
        { accessorKey: "title", header: "Title", size: 300 },
        { accessorKey: "document_date", header: "Document Date", size: 200 },
        { accessorKey: "uploaded_at", header: "Uploaded On", size: 200 },
        { accessorKey: "uploaded_by_name", header: "Uploaded By", size: 200 },
        {
            accessorKey: "file",
            header: "Download",
            size: 80, // Reduced size for better UI balance
            Cell: ({ row }) => {
              const handleDownload = () => {
                if (!row.original.document) {
                  alert("File not available!");
                  return;
                }
                window.open(row.original.document, "_blank", "noopener,noreferrer");
              };
          
              return (
                <Tooltip title="Download Document">
                  <IconButton
                    onClick={handleDownload}
                    sx={{
                      background: "linear-gradient(135deg, #007BFF, #0056b3)", // VIP Blue Gradient
                      color: "#fff",
                      padding: "6px", // Smaller padding for compact look
                      borderRadius: "8px", // Slightly rounded edges
                      transition: "0.3s ease-in-out",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0056b3, #007BFF)", // Reversed hover effect
                        transform: "scale(1.05)", // Slight hover scale
                      },
                    }}
                  >
                    <DownloadForOfflineIcon fontSize="medium" /> {/* Made icon smaller */}
                  </IconButton>
                </Tooltip>
              );
            },
          }
    ];

    return (
        <Card>
            {/* <h2 className="text-lg font-bold mb-4">Manage Documents for District: {district_name}</h2> */}

            {/* ✅ Upload Form with Validation */}
            <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Document Title */}
                    <FormItem label="Document Title" invalid={!!errors.title} errorMessage={errors.title?.message}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter document title" />}
                        />
                    </FormItem>

                    {/* Document Type */}
                    <FormItem label="Document Type" invalid={!!errors.documentType} errorMessage={errors.documentType?.message}>
                        <Controller
                            name="documentType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={[
                                        { label: "Notification", value: "Notification" },
                                        { label: "Minutes of Meeting", value: "Minutes of Meeting" },
                                    ]}
                                    value={{ label: field.value, value: field.value }}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            )}
                        />
                    </FormItem>
                    
                    <FormItem label="Document Date"
                     invalid={!!errors.document_date} errorMessage={errors.document_date?.message}
                    >
                        <Controller
                            name="document_date"
                            control={control}
                            render={({ field }) => <Input type="date" {...field} />}
                        />
                    </FormItem>


                    {/* File Upload */}
                    <FormItem label="Upload File" 
                        invalid={!!errors.file} 
                        errorMessage={errors.file?.message}
                        >
                        <Controller
                            name="file"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                                    onChange={(e) => field.onChange(e.target.files[0])}
                                />
                            )}
                        />
                    </FormItem>

                    {/* Submit Button */}
                    <FormItem  
                        className={"mt-7"}
                        invalid={!!errors.file} 
                        errorMessage={errors.file?.message}
                        >
                        <Controller
                            name="button"
                            control={control}
                            render={({ field }) => (
                                <Button disabled={isSubmitting} className="flex items-center"
                                
                                >
                                    {isSubmitting ? (
                                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                                    ) : (
                                    <FaUpload className="mr-2" />
                                    )}
                                    {isSubmitting ? "Uploading..." : "Upload"}
                                </Button>
                        )}
                        />
                    </FormItem>

                </div>
            </Form>

            {/* ✅ Document List */}
            {loading ? <p>Loading documents...</p> : 
            <
                MaterialReactTable columns={columns} data={documents} enablePagination 
                
                        
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
            }
        </Card>
    );
};

export default DocumentsTab;

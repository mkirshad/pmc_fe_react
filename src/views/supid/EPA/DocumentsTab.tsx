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

const documentSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    documentType: z.enum(["notification", "minutes"], { required_error: "Select a document type" }),
    file: z
    .instanceof(File, { message: "Must be a valid file" })
    .optional(),
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
            documentType: "notification",
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

        try {
            await AxiosBase.post("/pmc/district-documents/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Document uploaded successfully!");
            fetchDocuments();
            reset(); // ✅ Reset form after successful submission
        } catch (error) {
            console.error("Error uploading document:", error);
            alert("Failed to upload document.");
        }
    };

    const columns = [
        { accessorKey: "district_name", header: "District", size: 200 },
        { accessorKey: "document_type", header: "Type", size: 150 },
        { accessorKey: "title", header: "Title", size: 300 },
        { accessorKey: "uploaded_at", header: "Uploaded On", size: 200 },
        {
            accessorKey: "file",
            header: "Download",
            size: 100,
            Cell: ({ row }) => (
                <a href={row.original.file} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    Download
                </a>
            ),
        },
    ];

    return (
        <Card>
            {/* <h2 className="text-lg font-bold mb-4">Manage Documents for District: {district_name}</h2> */}

            {/* ✅ Upload Form with Validation */}
            <Form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 mb-4">
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
                                    { label: "Notification", value: "notification" },
                                    { label: "Minutes of Meeting", value: "minutes" },
                                ]}
                                value={{ label: field.value, value: field.value }}
                                onChange={(option) => field.onChange(option?.value)}
                            />
                        )}
                    />
                </FormItem>

                {/* File Upload */}
                <FormItem label="Upload File" invalid={!!errors.file} errorMessage={errors.file?.message}>
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => field.onChange(e.target.files[0])}
                            />
                        )}
                    />
                </FormItem>

                {/* Submit Button */}
                <Button type="submit" variant="solid" disabled={isSubmitting} loading={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload"}
                </Button>
            </Form>

            {/* ✅ Document List */}
            {loading ? <p>Loading documents...</p> : <MaterialReactTable columns={columns} data={documents} enablePagination />}
        </Card>
    );
};

export default DocumentsTab;

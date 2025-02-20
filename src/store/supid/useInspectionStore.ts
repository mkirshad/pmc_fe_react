import { create } from "zustand";
import { persist } from "zustand/middleware";
import AxiosBase from "../../services/axios/AxiosBase";

// ✅ Define Report Type
interface InspectionReport {
    id: string | number;
    business_name: string;
    business_type: string;
    license_number: string;
    violation_found: string;
    violation_type: string;
    action_taken: string;
    total_confiscation?: number;
    district: string;
    created_at: string;
    syncStatus?: "post" | "patch"; // Tracks offline edits
}

// ✅ Define Zustand Store Type
interface InspectionStore {
    reports: InspectionReport[];
    loading: boolean;
    error: string | null;

    fetchReports: () => Promise<void>;
    updateReport: (id: string | number, updatedData: Partial<InspectionReport>) => void;
    addNewReport: (newData: Omit<InspectionReport, "id">) => void;
    syncReports: () => Promise<void>;
    resetReports: () => void;
}

// ✅ Create Zustand Store with TypeScript
const useInspectionStore = create<InspectionStore>()(
    persist(
        (set, get) => ({
            reports: [],
            loading: false,
            error: null,

            // ✅ Fetch Reports from API (Only if All Data is Synced)
            fetchReports: async () => {
                const hasUnsyncedData = get().reports.some((report) => report.syncStatus);
                if (hasUnsyncedData) {
                    console.warn("Skipping fetch: Unsynced data exists");
                    useInspectionStore.getState().syncReports(); // ✅ Now syncs automatically when online
                }

                set({ loading: true, error: null });
                try {
                    const response = await AxiosBase.get<InspectionReport[]>("/pmc/inspection-report/");
                    set({ reports: response.data });
                } catch (error) {
                    console.error("Error fetching reports:", error);
                    set({ error: "Failed to fetch reports" });
                } finally {
                    set({ loading: false });
                }
            },

            // ✅ Update an Existing Report (Offline Mode)
            updateReport: (id, updatedData) => {
                console.log('its in update state')
                set((state) => ({
                    reports: state.reports.map((report) =>
                        report.id === id
                            ? { ...report, ...updatedData, syncStatus: "patch" }
                            : report
                    ),
                }));
                useInspectionStore.getState().syncReports(); // ✅ Now syncs
            },

            // ✅ Add a New Report (Offline Mode)
            addNewReport: (newData) => {
                const tempId = `temp-${Date.now()}`; // Temporary ID
                set((state) => ({
                    reports: [
                        ...state.reports,
                        { ...newData, id: tempId, syncStatus: "post" } as InspectionReport,
                    ],
                }));
            },

            // ✅ Sync Offline Updates to Server
            syncReports: async () => {
                const { reports } = get();
                const updatedReports = reports.filter((report) => report.syncStatus);
            
                if (updatedReports.length === 0) {
                    console.log("No unsynced reports. Fetching fresh data...");
                    get().fetchReports(); // ✅ Fetch fresh data after sync
                    return;
                }
            
                for (const report of updatedReports) {
                    try {
                        let response;
                        let requestData = report;
                        let headers = {}; // ✅ Default to empty headers
            
                        // ✅ Convert to FormData if it contains a file
                        if (report.hasFileUpload) {
                            const formData = new FormData();
                            formData.append("id", report.id);
                            formData.append("business_name", report.businessName);
                            formData.append("license_number", report.licenseNumber || "");
                            
                            if (report.file) {
                                formData.append("file", report.file);
                            }
            
                            requestData = formData;
                            headers = { "Content-Type": "multipart/form-data" };
                        }
            
                        if (report.syncStatus === "post") {
                            response = await AxiosBase.post("/pmc/inspection-report/", requestData, { headers });
                            report.id = response.data.id; // Assign new ID
                        } else if (report.syncStatus === "patch") {
                            response = await AxiosBase.patch(
                                `/pmc/inspection-report/${report.id}/`,
                                requestData,
                                { headers }
                            );
                        }
            
                        console.log("[✅ Synced]:", response.status, report.id);
            
                        // ✅ Remove syncStatus after syncing
                        set((state) => ({
                            reports: state.reports.map((r) =>
                                r.id === report.id ? { ...r, syncStatus: undefined } : r
                            ),
                        }));
                    } catch (error) {
                        console.error("[❌ Sync Failed]:", report.id, error);
                    }
                }
            },

            // ✅ Reset Store (Optional)
            resetReports: () => set({ reports: [] }),
        }),
        {
            name: "inspection-reports",
            getStorage: () => localStorage,
        }
    )
);

// ✅ Add Event Listener for Syncing When Online
if (typeof window !== "undefined") {
    window.addEventListener("online", async () => {
        console.log("[🔄 Online] Syncing stored reports...");
        useInspectionStore.getState().syncReports(); // ✅ Now syncs automatically when online
    });
}

export default useInspectionStore;

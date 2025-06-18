import { useState, useEffect } from 'react';
import { Form } from '@/components/ui/Form';
import Container from '@/components/shared/Container';
import BottomStickyBar from '@/components/template/BottomStickyBar';
import InspectionDetailSection from './InspectionDetailSection';
import isEmpty from 'lodash/isEmpty';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod';
import type { CommonProps } from '@/@types/common';
import type { InspectionReportSchema } from './types';

const validationSchema: ZodType<InspectionReportSchema> = z.object({
        businessName: z.string().min(1, { message: "Business name required" }),
        businessType: z.string().min(1, { message: "Business type required" }),

        licenseNumber: z.string()
            .optional(),

        violationFound: z.array(z.string()).optional(),
        violationType: z.array(z.string()).optional(),
        
        actionTaken: z.array(z.string()).optional(),

        plasticBagsConfiscation: z
            .coerce.number()
            .optional(),

        confiscation_otherPlastics: z
            .record(z.string(), z.coerce.number())
            .optional(),

        totalConfiscation: z
            .coerce.number()
            .optional(),

        OtherSingleUseItems: z.array(z.string()).optional(),

        // ✅ Make `latitude` and `longitude` required
        latitude: z.coerce.number().min(-90, { message: "Latitude is required and must be valid (-90 to 90)" }),
        longitude: z.coerce.number().min(-180, { message: "Longitude is required and must be valid (-180 to 180)" }),
        
        district: z.string().optional(),

        // ✅ New Fields Added for Validation
        inspectionDate: z.string().min(1, { message: "Inspection date is required" }),  // Date field

        fineAmount: z.coerce.number().optional(), // Allow numbers

        fineRecoveryStatus: z.enum(["Pending", "Recovered"]).optional(), // Dropdown

        fineRecoveryDate: z.string().optional(), // Date field (optional)

        recoveryAmount: z.coerce.number().optional(), // Allow numbers

        deSealedDate: z.string().optional(), // Date field (optional)

        // ✅ **Handles `null` values by defaulting to an empty array**
        fineRecoveryBreakup: z.array(
            z.object({
                date: z.string().min(1, { message: "Date is required" }),  
                amount: z.coerce.number().min(0, { message: "Amount must be a number and at least 0" }),
                isNew: z.boolean().optional(),
            })
        ).default([]),  // **🚀 Default to an empty array to avoid `null` issue**

        
        // ✅ Affidavit (File Upload)
        affidavit: z
            .instanceof(File, { message: "Must be a valid file" })
            .optional(),

        // New fields for confiscation
        confiscationReceipt: z
            .instanceof(File, { message: "Must be a valid file" })
            .optional(),

        receiptBookNumber: z.string().optional(),
        receiptNumber: z.string().optional(),

        paymentChallan: z
            .instanceof(File, { message: "Must be a valid file" })
            .optional(),
}).superRefine((data, ctx) => {

    if (data.fineRecoveryStatus === "Recovered") {
        if (!data.paymentChallan) {
            ctx.addIssue({
                path: ["paymentChallan"],
                message: "Payment challan is required when fine is recovered",
                code: z.ZodIssueCode.custom,
            });
        } else if (data.paymentChallan.size > 10 * 1024 * 1024) {
            ctx.addIssue({
                path: ["paymentChallan"],
                message: "Payment challan must be smaller than 10MB",
                code: z.ZodIssueCode.custom,
            });
        }
    }

    const isConfiscation = data.actionTaken?.includes("Confiscation");
    if (isConfiscation) {
        if (!data.confiscationReceipt) {
            ctx.addIssue({
                path: ["confiscationReceipt"],
                message: "Confiscation receipt is required",
                code: z.ZodIssueCode.custom,
            });
        } else if (data.confiscationReceipt.size > 10 * 1024 * 1024) {
            ctx.addIssue({
                path: ["confiscationReceipt"],
                message: "Confiscation receipt must be smaller than 10MB",
                code: z.ZodIssueCode.custom,
            });
        }

        if (!data.receiptBookNumber || data.receiptBookNumber.trim() === "") {
            ctx.addIssue({
                path: ["receiptBookNumber"],
                message: "Receipt book number is required",
                code: z.ZodIssueCode.custom,
            });
        }

        if (!data.receiptNumber || data.receiptNumber.trim() === "") {
            ctx.addIssue({
                path: ["receiptNumber"],
                message: "Receipt number is required",
                code: z.ZodIssueCode.custom,
            });
        }

        // ✅ 3. Add your `totalConfiscation` > 0 validation
        if (!data.totalConfiscation || data.totalConfiscation <= 0) {
            ctx.addIssue({
                path: ["totalConfiscation"],
                message: "Total confiscation must be greater than 0 KG",
                code: z.ZodIssueCode.custom,
            });
        }
    }
});

const InspectionForm = ({ onFormSubmit, defaultValues = {}, readOnly, children }: CommonProps) => {
    // console.log('defaultValues2', defaultValues);
    const { handleSubmit, reset, formState: { errors }, control } = useForm<InspectionReportSchema>({
        defaultValues: {
            fineRecoveryBreakup: defaultValues?.fineRecoveryBreakup ?? [], // ✅ Ensures it's never null
        },
        resolver: zodResolver(validationSchema),
    });


    // ✅ Ensure the form updates when defaultValues change
    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues); // Update form with new values
        }
    }, [JSON.stringify(defaultValues)]); // Runs whenever defaultValues change

    return (
        <Form className="flex w-full h-full" containerClassName="flex flex-col w-full justify-between" onSubmit={handleSubmit(onFormSubmit)}>
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <InspectionDetailSection control={control} errors={errors} defaultValues={defaultValues} readOnly={readOnly} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    );
};

export default InspectionForm;

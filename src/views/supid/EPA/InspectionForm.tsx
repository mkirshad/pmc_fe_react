import { useState } from 'react';
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

     // ✅ Directly adding latitude, longitude, and district
     latitude: z.coerce.number().nullable(),
     longitude: z.coerce.number().nullable(),
     district: z.string().optional(),
     
});

const InspectionForm = ({ onFormSubmit, defaultValues = {}, readOnly, children }: CommonProps) => {
    const { handleSubmit, reset, formState: { errors }, control } = useForm<InspectionReportSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    });

    useState(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues);
        }
    }, [JSON.stringify(defaultValues)]);

    return (
        <Form className="flex w-full h-full" containerClassName="flex flex-col w-full justify-between" onSubmit={handleSubmit(onFormSubmit)}>
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <InspectionDetailSection control={control} errors={errors} readOnly={readOnly} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    );
};

export default InspectionForm;

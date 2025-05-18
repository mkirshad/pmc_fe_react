
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '../../../components/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Container from '../../../components/shared/Container'
import BottomStickyBar from '../../../components/template/BottomStickyBar'
import CompetitionDetailSection from './CompetitionDetailSection'
import Button from '@/components/ui/Button'
import { BiArrowBack, BiArrowToRight, BiSave, BiStreetView } from 'react-icons/bi'
import AxiosBase from '../../../services/axios/AxiosBase';

const schema = z.object({
    fullName: z.string().min(1, { message: 'Required' }),
    institute: z.string().min(1, { message: 'Required' }),
    grade: z.string().min(1),
    // category: z.string().min(1),
    competitionType: z.string().min(1),
    mobile: z.string().min(10).max(10),
    studentCardFront: z
    .instanceof(File, { message: 'Student Card (Front) is required' })
    .refine(file => file.size <= 10 * 1024 * 1024, {
      message: 'Student Card (Front) must be smaller than 10MB',
    }),
    studentCardBack: z.union([z.instanceof(File), z.null(), z.undefined()])
    .optional()
    .refine(file => {
      if (file === null || file === undefined) return true; // Skip validation if null or undefined
      return file.size <= 10 * 1024 * 1024; // Check file size
    }, {
      message: 'Back Student Card must be a file smaller than 10 MB.',
    }).optional()
})

const CompetitionFormPage = () => {
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: '',
            institute: '',
            grade: '',
            category: '',
            competitionType: '',
            mobile: ''
        }
    })

    const determineCategory = (grade: string) => {
        const universityGrades = ['BS', 'MS', 'MPhil', 'PhD'];
        const schoolGrades = ['8th', '9th', '10th', 'Intermediate', 'O Level', 'A Level']
        return universityGrades.includes(grade) ? 'University' : 
            schoolGrades.includes(grade) ? 'School' :'';
    }

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("full_name", data.fullName);
        formData.append("institute", data.institute);
        formData.append("grade", data.grade);
        formData.append("category", determineCategory(data.grade)); // Or pass separately if user selects it
        formData.append("competition_type", data.competitionType);
        formData.append("mobile", data.mobile);
        formData.append("student_card_front", data.studentCardFront);
    
        if (data.studentCardBack instanceof File) {
            formData.append("student_card_back", data.studentCardBack);
        }
    
        try {
            const headers = { "Content-Type": "multipart/form-data" };
            const response = await AxiosBase.post("/pmc/competition/register/", formData, { headers });
    
            const result = response.data;
    
            if (result.success) {
                alert(`Registration Successful! Your ID is ${result.registration_id}\n\n📦 The courier label will now be downloaded.\nPlease print it and paste it on your courier package before dispatching your competition submission to the Plastic Management Cell.`);
    
                // Fetch PDF as blob
                const labelResponse = await AxiosBase.get(
                    `/pmc/competition/generate-label/?registration_id=${result.registration_id}`,
                    { responseType: 'blob' }
                );
    
                // Create a temporary link to download the file
                const blob = new Blob([labelResponse.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `courier_label_${result.registration_id}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url); // Clean up

                         // ✅ Reset form to clear fields
                reset({
                    fullName: '',
                    institute: '',
                    grade: '',
                    category: '',
                    competitionType: '',
                    mobile: '',
                    studentCardFront: undefined,
                    studentCardBack: undefined
                });
                
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Submission failed:', err);
            alert('Error submitting the form. Please try again later.');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CompetitionDetailSection control={control} errors={errors} readOnly={false} watch={watch}/>
            </Container>
            <BottomStickyBar>
                <Container className="flex justify-end">
                    <Button icon={<BiSave />} variant="solid" type="submit">Submit & Generate Slip</Button>
                </Container>
            </BottomStickyBar>
        </Form>
    )
}

export default CompetitionFormPage

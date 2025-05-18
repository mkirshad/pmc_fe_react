
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { FormItem } from '../../../components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import InputMask from 'react-input-mask'

type OverviewSectionProps = FormSectionBaseProps & {
    readOnly?: boolean;
    watch: (name: string) => any; // 👈 add this
}

const competitionList = [
    { label: 'Poster', value: 'poster' },
    { label: 'Painting', value: 'painting' },
    { label: '3D Model', value: '3d_model' }
]

const categoryList = [
    { label: 'School/College', value: 'School' },
    { label: 'University', value: 'University' }
]

const gradeList = [
    '8th', '9th', '10th', 'Intermediate', 'O Level', 'A Level',
    'BS', 'MS', 'MPhil', 'PhD'
].map(g => ({ label: g, value: g }))

const determineCategory = (grade: string) => {
    const universityGrades = ['BS', 'MS', 'MPhil', 'PhD'];
    const schoolGrades = ['8th', '9th', '10th', 'Intermediate', 'O Level', 'A Level']
    return universityGrades.includes(grade) ? 'University' : 
        schoolGrades.includes(grade) ? 'School' :'';
}

const competitionAvailability = {
    School: ['poster', 'painting', '3d_model'],
    University: ['poster', 'painting'] // ❌ No 3D Model for university
}


const CompetitionDetailSection = ({ control, errors, readOnly = false, watch }: OverviewSectionProps) => {
    const grade = watch('grade')
    const category = determineCategory(grade)

    // Filter competition list based on category
    const availableCompetitions = competitionList.filter(c =>
        competitionAvailability[category]?.includes(c.value)
    )

    return (
        <Card>
            <h4 className="mb-6">Competition Registration</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Full Name *" invalid={Boolean(errors.fullName)} errorMessage={errors.fullName?.message}>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => <Input placeholder="Full Name" readOnly={readOnly} {...field} />}
                    />
                </FormItem>

                <FormItem label="Institute Name *" invalid={Boolean(errors.institute)} errorMessage={errors.institute?.message}>
                    <Controller
                        name="institute"
                        control={control}
                        render={({ field }) => <Input placeholder="Institute Name" readOnly={readOnly} {...field} />}
                    />
                </FormItem>

                <FormItem label="Grade *" invalid={Boolean(errors.grade)} errorMessage={errors.grade?.message}>
                    <Controller
                        name="grade"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={gradeList}
                                value={gradeList.find(g => g.value === field.value)}
                                isDisabled={readOnly}
                                onChange={opt => field.onChange(opt?.value)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Auto-detected Category">
                    <Input
                        value={determineCategory(watch('grade'))}
                        readOnly
                    />
                </FormItem>

                <FormItem label="Competition Type *" invalid={Boolean(errors.competitionType)} errorMessage={errors.competitionType?.message}>
                    <Controller
                        name="competitionType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={availableCompetitions}
                                value={competitionList.find(c => c.value === field.value)}
                                isDisabled={readOnly}
                                onChange={opt => field.onChange(opt?.value)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Mobile Number *" invalid={Boolean(errors.mobile)} errorMessage={errors.mobile?.message}>
                    <Controller
                        name="mobile"
                        control={control}
                        render={({ field }) => (
                            <InputMask mask="3999999999" value={field.value} readOnly={readOnly} onChange={e => field.onChange(e.target.value)}>
                                {(inputProps) => <Input placeholder="Mobile"{...inputProps} />}
                            </InputMask>
                        )}
                    />
                </FormItem>

                <FormItem label="Student Card Front *" invalid={Boolean(errors.studentCardFront)} errorMessage={errors.studentCardFront?.message}>
                    <Controller
                        name="studentCardFront"
                        control={control}
                        render={({ field }) => (
                        <Input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                        )}
                    />
                </FormItem>

                <FormItem label="Student Card Back">
                    <Controller
                        name="studentCardBack"
                        control={control}
                        render={({ field }) => (
                        <Input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default CompetitionDetailSection

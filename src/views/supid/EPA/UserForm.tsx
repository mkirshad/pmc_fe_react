import { useState, useEffect } from 'react';
import { FormItem, Form } from '@/components/ui/Form';
import PasswordInput from '@/components/shared/PasswordInput';
import Button from '@/components/ui/Button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AxiosBase from '@/services/axios/AxiosBase';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

const validationSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const UserForm = ({ selectedUser, setSelectedUser }) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);  

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            confirmPassword: '',
        },
    });

    const isEditMode = !!selectedUser?.id;

    useEffect(() => {
        reset({
            username: selectedUser?.username || '',
            first_name: selectedUser?.first_name || '',
            last_name: selectedUser?.last_name || '',
            password: '',
            confirmPassword: '',
        });
        setServerError(null);
    }, [selectedUser, reset]);

    const onSubmit = async (data) => {
        setSubmitting(true);
        setServerError(null);

        try {
            const requestData = {
                user_id: selectedUser ? selectedUser.id : null,
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password ? data.password : undefined,
            };

            await AxiosBase.post('/accounts/create-update-inpsector-user/', requestData);

            alert(selectedUser ? "User updated successfully!" : "User created successfully!");
            setSelectedUser(null);
            reset();  // ✅ Explicitly Reset Form After Submission
        } catch (error) {
            console.error("Error updating/creating user:", error);
            setServerError(error.response?.data?.error || "An unexpected error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setSelectedUser(null);
        reset();  // ✅ Explicitly Reset Form Fields on Reset Button Click
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-1 gap-4">
                    <FormItem label="Username" invalid={!!errors.username} errorMessage={errors.username?.message}>
                        <Controller
                            name="username"
                            type="text"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Username" readOnly={isEditMode} />
                            )}
                        />
                    </FormItem>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem label="First Name" invalid={!!errors.first_name} errorMessage={errors.first_name?.message}>
                        <Controller
                            name="first_name"
                            type="text"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="First Name" />}
                        />
                    </FormItem>

                    <FormItem label="Last Name" invalid={!!errors.last_name} errorMessage={errors.last_name?.message}>
                        <Controller
                            name="last_name"
                            type="text"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Last Name" />}
                        />
                    </FormItem>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem label="Password (Optional)" invalid={!!errors.password} errorMessage={errors.password?.message}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput {...field} placeholder="Enter new password" />
                            )}
                        />
                    </FormItem>

                    <FormItem label="Confirm Password (Optional)" invalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword?.message}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput {...field} placeholder="Confirm password" />
                            )}
                        />
                    </FormItem>
                </div>

                {serverError && (
                    <div className="text-red-500 text-sm mb-3">
                        ⚠️ {serverError}
                    </div>
                )}

                <div className="grid md:grid-cols-4 gap-4">
                    <Button type="submit" block loading={isSubmitting} disabled={isSubmitting} variant="solid">
                        {isSubmitting ? 'Saving...' : selectedUser ? 'Update User' : 'Create User'}
                    </Button>

                    {/* ✅ Reset Button */}
                    <Button type="button" block variant="outline" onClick={handleReset}>
                        Reset Form
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default UserForm;

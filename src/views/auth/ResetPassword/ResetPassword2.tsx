import Logo from '@/components/template/Logo';
import Alert from '@/components/ui/Alert';
import ResetPasswordForm from './components/ResetPasswordForm2';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { useThemeStore } from '@/store/themeStore';
import { Link } from "react-router-dom";

type ResetPasswordProps = {
    backToDashboardUrl?: string;
    disableSubmit?: boolean;
};

export const ResetPasswordBase = ({
    backToDashboardUrl = '/dashboard',
    disableSubmit,
}: ResetPasswordProps) => {
    const [message, setMessage] = useTimeOutMessage();

    const mode = useThemeStore((state) => state.mode);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <div className="mb-6">
                <Link to="/">
                    <Logo type="streamline" mode={mode} imgClass="mx-auto" logoWidth={60} />
                </Link>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">Reset Your Password</h2>
                <p className="mt-2 mb-6 text-center text-gray-600">
                    Enter your current password and a new password to proceed.
                </p>
                {message && (
                    <Alert 
                        showIcon 
                        className="mb-4" 
                        type={message.toLowerCase().includes('success') ? 'success' : 'danger'}
                    >
                        <span className="break-all">{message}</span>
                    </Alert>
                )}
                <ResetPasswordForm disableSubmit={disableSubmit} setMessage={setMessage} />
                <div className="mt-6 text-center">
                    <a href={backToDashboardUrl} className="text-blue-500 hover:underline font-semibold">
                        Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

const ResetPassword = () => {
    return <ResetPasswordBase />;
};

export default ResetPassword;

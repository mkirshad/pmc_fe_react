import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const errorDetails = location.state?.error; // Retrieve error details from location state

    const handleGoHome = () => {
        navigate('/home'); // Redirect to home or any other relevant page
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Oops! Something Went Wrong</h1>
                <p style={styles.message}>
                    We’re experiencing some technical difficulties. Please try refreshing the page or come back later.
                </p>
                <p style={styles.message}>
                    If the issue persists, our support team is here to help. You can reach out at:
                    <a href="mailto:fmd@epd.punjab.gov.pk" style={styles.email}>
                        fmd@epd.punjab.gov.pk
                    </a>
                </p>
                {errorDetails && (
                    <div style={styles.errorDetails}>
                        <h3 style={styles.errorTitle}>Technical Details</h3>
                        <pre style={styles.errorMessage}>{JSON.stringify(errorDetails, null, 2)}</pre>
                    </div>
                )}
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleGoHome}>
                        Go to My Applications
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
    },
    content: {
        maxWidth: '600px',
        textAlign: 'center',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    message: {
        fontSize: '18px',
        color: '#666',
        marginBottom: '15px',
        lineHeight: '1.6',
    },
    email: {
        color: '#007BFF',
        textDecoration: 'none',
        marginLeft: '5px',
    },
    errorDetails: {
        marginTop: '20px',
        textAlign: 'left',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '5px',
        color: '#721c24',
        border: '1px solid #f5c6cb',
    },
    errorTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    errorMessage: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontSize: '14px',
        lineHeight: '1.4',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ErrorPage;

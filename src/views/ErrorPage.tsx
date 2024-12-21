import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

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
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleGoHome}>
                        Go to Home
                    </button>
                    {/* <button
                        style={{ ...styles.button, ...styles.secondaryButton }}
                        onClick={() => window.location.reload()}
                    >
                        Refresh Page
                    </button> */}
                </div>
            </div>
            {/* <div style={styles.imageContainer}>
                <img
                    src="/img/others/error.webp" // Replace with your error image URL
                    alt="Error"
                    style={styles.image}
                />
            </div> */}
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
        margin: '0 10px',
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
    imageContainer: {
        marginLeft: '20px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default ErrorPage;

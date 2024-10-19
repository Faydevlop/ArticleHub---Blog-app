// src/components/LoadingSpinner.js
import React from 'react';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div style={styles.loaderContainer}>
            <ScaleLoader color="#000000" loading={true} size={15} />
            <p style={styles.loadingText}>Loading...</p>
        </div>
    );
};

const styles = {
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f0f0f0', // Optional: change background color
    },
    loadingText: {
        marginTop: '10px',
        fontSize: '18px',
        color: '#333',
    },
};

export default LoadingSpinner;

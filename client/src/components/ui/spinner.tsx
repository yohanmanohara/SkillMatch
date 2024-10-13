"use client";
import React, { useEffect, useState } from 'react';

function Spinner() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 0); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <div>
            {loading && (
                <div className="flex items-center justify-center min-h-screen bg-transparent">
                     <span className="loader"></span>
                </div>
            ) 
            }
        </div>
    );
}

export default Spinner;

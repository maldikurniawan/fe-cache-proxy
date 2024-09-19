// src/components/StoreUpdate.jsx
import React, { useEffect, useRef } from 'react';

const StoreUpdate = () => {

    useEffect(() => {
        const fetchAndUpdateCache = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/storelogupdate/', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data immediately and then every 10 seconds
        fetchAndUpdateCache();
        const intervalId = setInterval(fetchAndUpdateCache, 60 * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

};

export default StoreUpdate;
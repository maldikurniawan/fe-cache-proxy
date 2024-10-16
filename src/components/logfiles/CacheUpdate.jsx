// src/components/CacheUpdate.jsx
import React, { useEffect, useRef } from 'react';

const CacheUpdate = () => {

    useEffect(() => {
        const fetchAndUpdateCache = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/cachelogupdate/', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data immediately and then every 60 seconds
        fetchAndUpdateCache();
        const intervalId = setInterval(fetchAndUpdateCache, 60 * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

};

export default CacheUpdate;
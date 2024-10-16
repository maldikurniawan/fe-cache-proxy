import React, { useEffect, useState } from 'react';

const CacheUpdate = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/update-cache-log/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Update logData state with received data
            setLogData(prevData => [...prevData, data]);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        // Cleanup on component unmount
        return () => {
            socket.close();
        };
    }, []);
};

export default CacheUpdate;

// src/components/AgentUpdate.jsx
import React, { useEffect, useRef, useState } from 'react';

const AgentUpdate = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/update-user-agent-log/');
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Update logData state with received data
            setLogData(prevData => [...prevData, data]);
            socket.onclose = (event) => {
                console.log('WebSocket connection closed:', event);
            };
            return () => {
                socket.close();
            };
        };
    }, []);

    useEffect(() => {
        const fetchAndUpdateCache = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/agentlogupdate/', { method: 'GET' });
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

export default AgentUpdate;
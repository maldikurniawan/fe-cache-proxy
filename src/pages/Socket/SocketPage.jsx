// SocketPage.jsx
import React, { useEffect, useState } from 'react';

const SocketPage = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Ganti dengan URL WebSocket yang sesuai
        const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data.message); // Tambahkan ini
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message) {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default SocketPage;

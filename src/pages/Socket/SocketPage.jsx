import React, { useEffect, useState, useRef } from 'react';

const SocketPage = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null); // Ref untuk scroll

    const username = localStorage.getItem('username') || 'Anonymous'; // Default to 'Anonymous' if not found

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(savedMessages);

        const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data); // Check the structure of the received data
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, data];
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        // Scroll ke bawah setiap kali messages berubah
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (socket && message) {
            console.log('Sending message as:', username); // Debugging: Cek nilai username saat mengirim
            const messageData = { username, message };
            socket.send(JSON.stringify(messageData));
            setMessage('');
        }
    };

    const clearChatHistory = () => {
        localStorage.removeItem('chatMessages');
        setMessages([]);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-4">
                <div className="overflow-y-auto h-64">
                    {messages.map((msg, index) => (
                        <div key={index} className="flex items-start p-2 border-b last:border-b-0">
                            <div>
                                <div className="font-bold capitalize">{msg.username || 'Anonymous'}</div>
                                <div>{msg.message}</div>
                            </div>
                        </div>
                    ))}
                    {/* Ref untuk scroll ke bawah */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="flex w-full max-w-md">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="border border-gray-300 p-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white rounded-r-lg px-4 hover:bg-blue-600">
                    Send
                </button>
            </div>
            <button
                onClick={clearChatHistory}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Clear History
            </button>
        </div>
    );
};

export default SocketPage;

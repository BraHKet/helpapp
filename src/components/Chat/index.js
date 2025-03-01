import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { requestId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchChat = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/chats/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(response.data.messages);
        };

        fetchChat();
    }, [requestId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('/api/chats/message', {
            requestId,
            content: message
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setMessage('');
        // Fetch updated messages
        const response = await axios.get(`/api/chats/${requestId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setMessages(response.data.messages);
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender.username}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
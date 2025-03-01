import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Request = () => {
    const { id } = useParams();
    const history = useHistory();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequest(response.data);
        };

        fetchRequest();
    }, [id]);

    const handleAssign = async () => {
        const token = localStorage.getItem('token');
        await axios.put(`/api/requests/${id}/assign`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        history.push('/dashboard');
    };

    if (!request) return <div>Loading...</div>;

    return (
        <div>
            <h1>{request.description}</h1>
            <p>Status: {request.status}</p>
            {request.status === 'open' && <button onClick={handleAssign}>Assign to Me</button>}
        </div>
    );
};

export default Request;
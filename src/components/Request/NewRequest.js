import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NewRequest = () => {
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('/api/requests', { description }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        history.push('/dashboard');
    };

    return (
        <div>
            <h1>Create New Request</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your issue"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewRequest;
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ history }) => {
    const [isRegister, setIsRegister] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isExpert, setIsExpert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? '/api/auth/register' : '/api/auth/login';
        const data = isRegister ? { username, password, email, isExpert } : { username, password };
        try {
            const response = await axios.post(url, data);
            localStorage.setItem('token', response.data.token);
            history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                {isRegister && (
                    <>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <label>
                            <input type="checkbox" checked={isExpert} onChange={(e) => setIsExpert(e.target.checked)} />
                            Register as Expert
                        </label>
                    </>
                )}
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    );
};

export default Auth;
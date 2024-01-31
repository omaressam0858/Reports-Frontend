'use client'

import { useState } from "react";
import axios from "axios"
const API = 'http://localhost:8080/api'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            

            setError('');
            setLoading(true);
            const response = await axios.post(API + '/auth/login', {
                email,
                password
            })

            const token = response.data.token;

            localStorage.setItem('token', token);
        } 
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleLogin}>
            {error && <p className="text-red-600 text-s italic mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">E-Mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" className="text-black w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="text-black w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>

    );
};

export default LoginForm;

'use client'

import { useState,useEffect } from "react";
import axios from "axios"
import { useRouter } from 'next/navigation'

import { Box, Typography, TextField, Button } from '@mui/material';

import FirstLoginModal from "./FirstLoginModal";
const API = 'https://eagles-57a4.onrender.com/api'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [firstLogin, setFirstLogin] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const roleId = localStorage.getItem('roleId');
        if(roleId == 2) {
            router.push('/admin');
        }else if(roleId == 1) {
            router.push('/coach');
        }else if(roleId == 0) {
            router.push('/player');
        }
    })
    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            const response = await axios.post(API + '/auth/login', {
                email,
                password
            })

            const {token, roleId, name} = response.data;
            localStorage.setItem('name', name);
            localStorage.setItem('token', token);
            localStorage.setItem('roleId', roleId);
            switch(roleId) {
                case 2:
                    router.push('/admin');
                    break;
                case 1:
                    router.push('/coach');
                    break;
                case 0:
                    router.push('/player');
                    break;
                default:
                    router.push('/');
            }

        } 
        catch(error) {
            if(error.response)
            {
                if (error.response.status === 406) 
                {
                    setFirstLogin(true);
                } 
                else 
                {
                setError(error.response.data.message);
                }
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleLogin} className="max-w-md mx-auto">
            {error && <Typography variant="body2" color="error" className="italic mb-4">{error}</Typography>}
            <FirstLoginModal open={firstLogin} handleClose={() => setFirstLogin(false)} email={email} password={password} />
            <Box mb={4}>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    name="email"
                    label="E-Mail"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                />
            </Box>
            <Box mb={4}>
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                />
            </Box>
            <Button type="submit" disabled={loading} variant="contained" color="primary" className="bg-blue-500" fullWidth>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;

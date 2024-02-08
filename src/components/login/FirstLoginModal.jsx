import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const API = 'https://eagles-57a4.onrender.com/api'

import { useState } from 'react';

export default function FirstLoginModal({ open, handleClose , email , password }) {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    async function handleFirstLogin() {
        
        try {
            const response = await axios.post(API + '/auth/login', {
                email,
                password,
                newPassword
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
        }catch(error) {
            console.log(error)
            if(error.response)
            {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                <div className="bg-white rounded-lg p-6">
                    <Box sx={{ 
                        width: 400,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h5" component="h2" id="modal-modal-title" className='text-black' sx={{ mb: 2 }}>
                            First Login
                        </Typography>
                        <Typography variant="body1" id="modal-modal-description" className='text-black' sx={{ mb: 2 }}>
                            Welcome to Eagles! You are required to change your password before you can proceed.
                        </Typography>
                        {error && <Typography variant="body2" color="error" className="italic mb-4">{error}</Typography>}
                        <form className="space-y-4" action={handleFirstLogin}>
                            <TextField
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                required
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </div>
            </div>
        </Modal>
    );
}

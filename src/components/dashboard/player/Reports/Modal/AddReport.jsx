'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

import { Modal } from '@mui/material';

const API = 'https://eagles-57a4.onrender.com/api';

export default function PlayerAddReport({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(API + '/player/reports', {
        title,
        description,
      }, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });

      router.push('/player/reports');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('roleId');
        router.push('/login');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="flex h-screen w-full items-center">
      <form action={handleSubmit} className="max-w-sm mx-auto rounded-3xl w-full bg-white p-5">
        <h1 className="text-2xl font-bold mb-4 text-black">Add Report</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </Modal>
  );
}

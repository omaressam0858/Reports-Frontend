import axios from 'axios';

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { CircularProgress, Card, CardContent } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import Container from '../Container'

import AddNewPlayerButton from './Buttons/AddNewPlayer'
import AddNewPlayerWindow from './Modals/AddNewPlayer'

import DeletePlayer from './API/DeletePlayer';
const API = 'https://eagles-57a4.onrender.com/api'
export default function AllPlayers() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPlayerisOpen, setNewPlayerisOpen] = useState(false)
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/players", { headers: { Authorization: token } }).then((res) => {

                setPlayers(res.data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                localStorage.removeItem("token");
                localStorage.removeItem("roleId");
                router.push('/login');
            })
        } catch (err) {
            console.error(err)
        }
    }, []);

    if (loading)
        return <Container pageTitle="Loading Players"><div className="flex justify-center items-center"><CircularProgress /></div></Container>

    return (
        <Container pageTitle="Players Manager" headerButton={<AddNewPlayerButton onClick={setNewPlayerisOpen} />}>
            <AddNewPlayerWindow isOpen={newPlayerisOpen} onClose={() => setNewPlayerisOpen(false)} />
            {players.map((player) => (
                <Card key={player.id} className="p-4 m-4 bg-gradient-to-r from-red-400 to-blue-600">
                    <CardContent className='flex justify-between text-white'>
                        <h1 className='font-bold'>{player.name}</h1>
                        <div className='flex'>
                            <Link href={`/admin/players/${player.id}`}><VisibilityIcon /></Link>
                            <button className='text-white mx-2' onClick={() => {DeletePlayer(player.id);}}><DeleteIcon /></button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Container>

    )

}

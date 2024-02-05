import Container from '@/components/dashboard/admin/Container'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress,Card,CardContent } from '@mui/material'
import { useRouter } from 'next/navigation'

import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import GamesIcon from '@mui/icons-material/Games';

const API = 'http://localhost:8080/api'

export default function SinglePlayer({ playerId }) {
    const [player, setPlayer] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/players/" + playerId, { headers: { Authorization: token } }).then((res) => {
                setPlayer(res.data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                if (err.response.status == 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("roleId");
                    router.push('/login');
                }else if (err.response.status == 404) {
                    router.push('/not-found');
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, []);
    if (loading)
        return (
            <Container pageTitle="Loading Player">
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            </Container>
        )
    return (
        <Container pageTitle={player.name}>
            <div>
                <Card className="p-4 m-4 bg-gradient-to-r from-red-400 to-blue-600">
                    <CardContent className='text-white'>
                        <h1 className='text-3xl font-extrabold'>{player.roleId == 0 ? "Player" : "Coach"} - {player.Team.teamName}</h1>
                        <p><MailIcon /> {player.email}</p>
                        <p><PhoneIcon /> {player.phoneNumber}</p>
                        <p><GamesIcon /> {player.gameUserName}</p>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
import Container from '@/components/dashboard/admin/Container'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress,Card,CardContent } from '@mui/material'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';

const API = 'https://eagles-57a4.onrender.com/api'

export default function SingleTeam({ teamId }) {
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/teams/" + teamId, { headers: { Authorization: token } }).then((res) => {
                setTeam(res.data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                if (err.response.status == 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("roleId");
                    router.push('/login');}
                else if (err.response.status == 404) {
                    router.push('/not-found');
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, []);
    if (loading)
        return (
            <Container pageTitle="Loading Team">
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            </Container>
        )
    return (
        <Container pageTitle={team.teamName + " - Players"}>
            <div>
                {team.Users.map((user) => (
                    <Card key={user.id} className="p-4 m-4 bg-gradient-to-r from-red-400 to-blue-600">
                        <CardContent className='flex justify-between text-white'>
                            <h1 className='font-bold'>{user.name}</h1>
                            <Link href={`/admin/players/${user.id}`}><VisibilityIcon /></Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    )
}
import axios from 'axios';

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { CircularProgress, Card, CardContent } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import Container from '../Container'

import AddNewTeamButton from './Buttons/AddNewTeam'
import AddNewTeamWindow from './Modals/AddNewTeam'

import DeleteTeam from './API/DeleteTeam';
const API = 'https://eagles-57a4.onrender.com/api'
export default function AllTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTeamisOpen, setNewTeamisOpen] = useState(false)
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/teams", { headers: { Authorization: token } }).then((res) => {

                setTeams(res.data);
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
        return <Container pageTitle="Loading Teams"><div className="flex justify-center items-center"><CircularProgress /></div></Container>

    return (
        <Container pageTitle="Teams Manager" headerButton={<AddNewTeamButton onClick={setNewTeamisOpen} />}>
            <AddNewTeamWindow isOpen={newTeamisOpen} onClose={() => setNewTeamisOpen(false)} />
            {teams.map((team) => (

                <Card key={team.id} className="p-4 m-4 bg-gradient-to-r from-red-400 to-blue-600">
                    <CardContent className='flex justify-between text-white'>
                        <h1 className='font-bold'>{team.teamName}</h1>
                        <div className='flex'>
                            <Link href={`/admin/teams/${team.id}`}><VisibilityIcon /></Link>
                            <button className='text-white mx-2' onClick={() => {DeleteTeam(team.id);}}><DeleteIcon /></button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Container>

    )

}

'use client'

import axios from "axios";
import { CircularProgress, Divider, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import Container from "../Container";

export default function PlayerTeam() {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API = 'https://eagles-57a4.onrender.com/api'
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/player/team", { headers: { Authorization: token } }).then((res) => {

                setTeam(res.data);
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
    if (loading) {
        return (
            <Container pageTitle="Loading">
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            </Container>
        );
    }
    return (
        <Container pageTitle={team.teamName}>
            {team.Users.map((player) => (
                <Card key={player.id} className={player.roleId == 0 ? "p-4 m-4 bg-gradient-to-r from-red-400 to-blue-600" : "p-4 m-4 bg-gradient-to-r from-green-400 to-blue-600"}>
                    <CardContent className='text-white block'>
                        <h1 className='font-bold sm:block align-center'>{player.name}</h1>
                        <h1 className='sm:block'>{player.email}</h1>
                        <h1 className='sm:block'>{player.gameUserName}</h1>
                    </CardContent>
                </Card>
            ))}
        </Container>
    )
}
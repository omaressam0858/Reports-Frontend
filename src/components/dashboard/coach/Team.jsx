'use client'

import axios from "axios";
import { CircularProgress, Divider, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
export default function CoachTeam() {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API = 'http://localhost:8080/api'
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/coach/team", { headers: { Authorization: token } }).then((res) => {

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
            <div className="flex justify-center">
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="flex">
                    <h1 className="text-2xl font-bold">{team.teamName}</h1>
                </div>
                <br />
                <Divider sx={{ borderBottomWidth: '5px' }} />
                <br />
                <div className="grid grid-rows-1 gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {team.Users.map((player) => {
                        return (
                            <Card key={player.id} variant="outlined" className="bg-white text-black rounded-lg">
                                <CardContent className="p-4">
                                    <h1 className="text-2xl font-bold mb-2">{player.name}</h1>
                                    <Divider sx={{ borderBottomWidth: '2px' }} />
                                    <p className="text-lg mt-2">{player.roleId === 1 ? "Coach" : "Player"}</p>
                                    <p className="text-sm mt-2">{player.email}</p>
                                    <p className="text-sm">{player.phoneNumber}</p>
                                    <p className="text-sm">{player.gameUserName}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
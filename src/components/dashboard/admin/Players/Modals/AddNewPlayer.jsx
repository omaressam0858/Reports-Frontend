import { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import axios from 'axios';

import BadgeIcon from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';
import PhoneIcon from '@mui/icons-material/Phone';
import GamesIcon from '@mui/icons-material/Games';

import { CircularProgress, InputLabel, Select, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material'

const API = 'http://localhost:8080/api'

export default function AddNewPlayerWindow({ isOpen, onClose }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [roleId, setRoleId] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gameUserName, setGameUserName] = useState('')
    const [playerTeamId, setPlayerTeamId] = useState('')
    
    
    const [teams, setTeams] = useState(null)

    const [responseError, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [iLoading, setILoading] = useState(true)

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/teams", { headers: { Authorization: token } }).then((res) => {
                setTeams(res.data)
                setILoading(false)
            }).catch((err) => {
                console.error(err);
            })
        } catch (err) {
            console.error(err)
        }
    }, [])

    function addPlayer() {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.post(API + "/auth/register", { name,email,password,teamId:playerTeamId,roleId,phoneNumber,gameUserName }, { headers: { Authorization: token } }).then((res) => {
            setLoading(false);
            setName('')
            setEmail('')
            setPassword('')
            setRoleId(0)
            setPhoneNumber('')
            setGameUserName('')
            setPlayerTeamId('')
            setError(null)
            onClose();
        }).catch((err) => {
            setLoading(false);
            setError(err.response.data.message)
        })
    }

    if (iLoading)
        return (
            <Modal open={isOpen} onClose={onClose} className="flex h-screen m-auto items-center">
                <div className="max-w-sm mx-auto rounded-3xl bg-white p-5">
                    <CircularProgress />
                </div>
            </Modal>

        )

    return (
        <Modal open={isOpen} onClose={onClose} className="flex h-screen m-auto items-center">
            <form className="max-w-sm mx-auto rounded-3xl bg-white p-5" action={addPlayer}>
                {responseError && <p className="text-red-600 text-s italic mb-4">{responseError}</p>}
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Player Name</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <BadgeIcon />
                    </span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Negm" />
                </div>

                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-Mail</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <MailIcon />
                    </span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="teammeagles@gmail.com" />
                </div>

                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <PasswordIcon />
                    </span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" />
                </div>

                <label for="gameUserName" className="block mb-2 text-sm font-medium text-gray-900 ">Game Username</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <GamesIcon />
                    </span>
                    <input type="text" value={gameUserName} onChange={(e) => setGameUserName(e.target.value)} id="gameUserName" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="OmarSucks#ME" />
                </div>

                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <PhoneIcon />
                    </span>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} id="phone" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="0111********" />
                </div>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="block">
                    <div className="flex">
                        <InputLabel id="Team">Team</InputLabel>
                        <Select
                            labelId="Team"
                            id="TeamSelect"
                            value={playerTeamId}
                            onChange={(e) => setPlayerTeamId(e.target.value)}
                            label="Team"
                            className="w-full">
                            {teams.map((team) => {
                                return <MenuItem value={team.id}>{team.teamName}</MenuItem>
                            })}
                        </Select>
                    </div>
                </FormControl>
                <FormControl className="block">
                    <RadioGroup
                        row
                        aria-labelledby="Role"
                        name="RoleSelect"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        className="text-black"
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Player" />
                        <FormControlLabel value={1} control={<Radio />} label="Coach" />
                    </RadioGroup>
                </FormControl>

                <Button type="submit" disabled={loading} className="rounded mx-auto my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2.5 items-center">Add</Button>
            </form>
        </Modal>

    )
}
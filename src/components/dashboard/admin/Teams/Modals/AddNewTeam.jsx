import { useState } from "react";
import { Button, Modal } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import axios from 'axios';

const API = 'http://localhost:8080/api'

export default function AddNewTeamWindow({ isOpen, onClose }) {
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);
    function addTeam() {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.post(API + "/admin/teams", { teamName: teamName }, { headers: { Authorization: token } }).then((res) => {
            setLoading(false);
            onClose();
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <Modal open={isOpen} onClose={onClose} className="flex h-screen m-auto items-center">
            <form className="max-w-sm mx-auto rounded-3xl bg-white p-5" action={addTeam}>
            <label for="teamName" className="block mb-2 text-sm font-medium text-gray-900 ">Team Name</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                        <GroupsIcon />
                    </span>
                    <input type="text" onChange={(e) => setTeamName(e.target.value)} id="teamName" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Valorant Academy" />
                </div>
                <Button type="submit" disabled={loading} className="rounded mx-auto my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2.5 items-center">Add</Button>
            </form>
        </Modal>

    )
}
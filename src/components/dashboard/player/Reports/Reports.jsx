'use client'

import { CircularProgress, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

import VisibilityIcon from '@mui/icons-material/Visibility';

import Container from "../Container";
import PlayerAddReport from "./Modal/AddReport";
import AddNewReportButton from "./Buttons/AddReport";

import axios from "axios";

export default function PlayerReports() {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const API = 'https://eagles-57a4.onrender.com/api';

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/player/reports", { headers: { Authorization: token } }).then((res) => {
                setReports(res.data);
                setLoading(false);
            })
                .catch((err) => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("roleId");
                    router.push('/login');
                });
        } catch (err) {
            console.error(err);
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
        <Container pageTitle="Reports Manager" headerButton={<AddNewReportButton onClick={setOpen} />}>
            <div>
                <PlayerAddReport isOpen={open} onClose={() => setOpen(false)} />
                {reports.map((report) => (
                    <Card key={report.id} className={"p-4 m-4 bg-gradient-to-r " + (report.responderId ? "from-green-400 to-blue-600" : "from-red-400 to-blue-600")}>
                        <CardContent className='flex justify-between text-white'>
                            <h1 className='font-bold'>{report.title}</h1>
                            <div className='flex'>
                                <Link href={`/player/reports/${report.id}`}><VisibilityIcon /></Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

'use client'

import { CircularProgress, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

import VisibilityIcon from '@mui/icons-material/Visibility';

import Container from "../Container";

import axios from "axios";

export default function CoachReports() {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API = 'https://eagles-57a4.onrender.com/api';

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/coach/reports", { headers: { Authorization: token } }).then((res) => {
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
        <Container pageTitle="Reports Manaeger">
            <div>
                {reports.map((report) => (
                    <Card key={report.id} className={"p-4 m-4 bg-gradient-to-r " + (report.responderId ? "from-green-400 to-blue-600" : "from-red-400 to-blue-600")}>
                        <CardContent className='flex justify-between text-white'>
                            <h1 className='font-bold'>{report.title}</h1>
                            <div className='flex'>
                                <Link href={`/coach/reports/${report.id}`}><VisibilityIcon /></Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

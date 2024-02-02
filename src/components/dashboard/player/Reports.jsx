'use client'

import { CircularProgress, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PlayerReports() {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API = 'http://localhost:8080/api';

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
            <div className="flex justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="container mx-auto my-2">
            <h1 className="text-2xl font-bold">Your Reports</h1>
            <br />
            <Card>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Responder</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((report) => (
                                    <TableRow key={report.id} hover onClick={() => router.push(`/player/reports/${report.id}`)}>
                                        <TableCell>{report.title}</TableCell>
                                        <TableCell>{report.status === 0 ? 'Pending' : report.status === 1 ? 'Accepted' : 'Rejected'}</TableCell>
                                        <TableCell>{report.responder ? report.responder.name : "No Response"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    );
}

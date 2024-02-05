import Container from '@/components/dashboard/admin/Container'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress, Card, CardContent,Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import AcceptReport from "./SingleReportButton/accept";
import RejectReport from "./SingleReportButton/reject";

const API = 'https://eagles-57a4.onrender.com/api'

export default function SingleReport({ reportId }) {
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/reports/" + reportId, { headers: { Authorization: token } }).then((res) => {
                setReport(res.data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                if (err.response.status == 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("roleId");
                    router.push('/login');
                } else if (err.response.status == 404) {
                    router.push('/not-found');
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, []);
    if (loading)
        return (
            <Container pageTitle="Loading Report">
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            </Container>
        )

    const actionButtons = (
        <div className="ml-4">
            <AcceptReport reportId={report.id} />
            <RejectReport reportId={report.id} />
        </div>
    )
    return (
        <Container pageTitle={report.title} headerButton={report.responder ? null : actionButtons}>
            <Card>
                <CardContent className="flex">
                    <div>

                        <Typography variant="body1" color="textSecondary" paragraph>
                            {report.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" paragraph>
                            Date: {new Date(report.createdAt).toLocaleDateString()} | Author: {report.user.name} | Responder: {report.responderId ? report.responder.name : "Not Responded Yet"}
                        </Typography>
                    </div>

                </CardContent>
            </Card>
        </Container>
    )
}
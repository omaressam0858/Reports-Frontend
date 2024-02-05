import axios from 'axios';

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { CircularProgress, Card, CardContent } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

import Container from '../Container'

const API = 'http://localhost:8080/api'
export default function AllReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            axios.get(API + "/admin/reports", { headers: { Authorization: token } }).then((res) => {

                setReports(res.data);
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
        return <Container pageTitle="Loading Reports"><div className="flex justify-center items-center"><CircularProgress /></div></Container>

    return (
        <Container pageTitle="Reports Manager">
            {reports.map((report) => (
                <Card key={report.id} className={"p-4 m-4 bg-gradient-to-r " + (report.responderId ? "from-green-400 to-blue-600" : "from-red-400 to-blue-600")}>
                    <CardContent className='flex justify-between text-white'>
                        <h1 className='font-bold'>{report.title}</h1>
                        <div className='flex'>
                            <Link href={`/admin/reports/${report.id}`}><VisibilityIcon /></Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Container>

    )

}

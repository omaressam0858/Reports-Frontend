import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"

export default function AcceptReport({ reportId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const API = 'http://localhost:8080/api';
    
    const acceptReport = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.post(`${API}/coach/reports/${reportId}/accept`, {}, { headers: { Authorization: token } })
            .then(() => {
                setLoading(false);
                router.push('/coach/reports');
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }
    return (
        <Button variant="contained" color="success" onClick={acceptReport} disabled={loading} className="bg-green-500 m-1">
            Accept
        </Button>
    )
}
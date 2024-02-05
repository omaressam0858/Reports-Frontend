import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"

export default function RejectButton({ reportId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const API = 'http://localhost:8080/api';
    
    const rejectReport = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.post(`${API}/coach/reports/${reportId}/reject`, {}, { headers: { Authorization: token } })
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
        <Button variant="contained" color="error" onClick={rejectReport} disabled={loading} className="bg-red-500 m-1">
            Reject
        </Button>
    )
}
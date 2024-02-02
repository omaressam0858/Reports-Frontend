'use client'

import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SingleReport({ reportId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API = 'http://localhost:8080/api';

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      axios.get(`${API}/player/reports/${reportId}`, { headers: { Authorization: token } })
        .then((res) => {
          setReport(res.data);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err)
        });
    } catch (err) {
      console.error(err);
    }
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {report.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {report.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" paragraph>
          Date: {new Date(report.createdAt).toLocaleDateString()} | Author: {report.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

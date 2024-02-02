'use client'

import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import AcceptReport from "./ReportPageButtons/accept";
import RejectReport from "./ReportPageButtons/reject";

export default function SingleReport({ reportId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API = 'http://localhost:8080/api';

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      axios.get(`${API}/coach/reports/${reportId}`, { headers: { Authorization: token } })
        .then((res) => {
          setReport(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            router.push('/not-found');
          } else if (err.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("roleId");
            router.push('/login');
          } else if (err.response.status === 403) {
            router.push('/player');
          }
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
      <CardContent className="flex">
        <div>
          <Typography variant="h4" gutterBottom>
            {report.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {report.description}
          </Typography>
          <Typography variant="caption" color="textSecondary" paragraph>
            Date: {new Date(report.createdAt).toLocaleDateString()} | Author: {report.user.name}
          </Typography>
        </div>
        <div className="ml-4">
          <AcceptReport reportId={report.id} />
          <RejectReport reportId={report.id} />
        </div>
      </CardContent>
    </Card>
  );
}

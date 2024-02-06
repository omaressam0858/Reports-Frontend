'use client'

import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Container from "../Container";


export default function SingleReport({ reportId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API = 'https://eagles-57a4.onrender.com/api';

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
        <Container pageTitle="Loading">
            <div className="flex justify-center">
                <CircularProgress />
            </div>
        </Container>
    );
}

  return (
    <Container pageTitle={report.title} >
      <Card>
        <CardContent className="flex">
          <div>
            <Typography variant="body1" color="textSecondary" paragraph>
              {report.description}
            </Typography>
            <Typography variant="caption" color="textSecondary" paragraph>
              Date: {new Date(report.createdAt).toLocaleDateString()} | Author: {report.user.name} | Responder: {report.responderId ? report.responder.name : "Not Responded Yet"} | Status: {report.status == 0 ? "Pending" : report.status == 1 ? "Accepted" : "Rejected"}
            </Typography>
          </div>

        </CardContent>
      </Card>
    </Container>
  );
}

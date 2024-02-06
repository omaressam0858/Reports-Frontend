'use client'

import NavigationBar from "@/components/dashboard/coach/NavigationBar";
import SingleReport from "@/components/dashboard/coach/Reports/ReportPage";
export default function Page({params: { reportId }}) {
    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <SingleReport reportId={reportId}/>
        </div>
    )
}   
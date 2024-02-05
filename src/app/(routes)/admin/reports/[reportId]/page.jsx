'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import SingleReport from '@/components/dashboard/admin/Reports/SingleReport'
export default function Page({params: { reportId }}) {

    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <SingleReport reportId={reportId} />
        </div>
    )
}
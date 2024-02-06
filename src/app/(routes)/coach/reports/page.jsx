'use client'
import NavigationBar from "@/components/dashboard/coach/NavigationBar"
import CoachReports from "@/components/dashboard/coach/Reports/Reports"
export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <CoachReports />
        </div>
    )

}   
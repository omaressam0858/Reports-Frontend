'use client'
import NavigationBar from "@/components/dashboard/coach/NavigationBar"
import CoachTeam from "@/components/dashboard/coach/TeamPage/Team"
export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <CoachTeam />
        </div>
    )

}   
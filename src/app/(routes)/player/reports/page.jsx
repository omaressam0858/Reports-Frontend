'use client'

import NavigationBar from "@/components/dashboard/player/NavigationBar";
import PlayerReports from "@/components/dashboard/player/Reports/Reports";
export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <PlayerReports />
        </div>
    )

}   
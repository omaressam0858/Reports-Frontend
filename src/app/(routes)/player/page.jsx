'use client'
import NavigationBar from "@/components/dashboard/player/NavigationBar";
import PlayerTeam from "@/components/dashboard/player/TeamPage/Team";

export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <PlayerTeam />
        </div>
    )

}   
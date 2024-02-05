'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import SinglePlayer from '@/components/dashboard/admin/Players/SinglePlayer'
export default function Page({params: { playerId }}) {

    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <SinglePlayer playerId={playerId} />
        </div>
    )
}
'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import AllPlayers from '@/components/dashboard/admin/Players/AllPlayers'

export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar /> 
            <AllPlayers />
        </div>
    )
}
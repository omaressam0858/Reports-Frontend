'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import Container from '@/components/dashboard/admin/Container'
import AllTeams from '@/components/dashboard/admin/Teams/AllTeams'

export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar /> 
            <AllTeams />
        </div>
    )
}
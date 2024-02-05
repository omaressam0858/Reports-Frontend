'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import SingleTeam from '@/components/dashboard/admin/Teams/SingleTeam'
export default function Page({params: { teamId }}) {

    return (
        <div className="bg-white h-screen">
            <NavigationBar />
            <SingleTeam teamId={teamId} />
        </div>
    )
}
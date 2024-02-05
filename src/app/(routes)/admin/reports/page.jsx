'use client'
import NavigationBar from '@/components/dashboard/admin/NavigationBar'
import AllReports from '@/components/dashboard/admin/Reports/AllReports'

export default function Page() {
    return (
        <div className="bg-white h-screen">
            <NavigationBar /> 
            <AllReports />
        </div>
    )
}
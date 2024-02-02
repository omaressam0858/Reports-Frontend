import NavBar from "@/components/dashboard/Navbar/NavBar"
import SingleReport from "@/components/dashboard/player/ReportPage"

export default function Page({params: { reportId }}) {

    return ( 
    <NavBar roleId="0">
        <div className="flex h-full flex-col bg-neutral-200 overflow-y-auto">
            <div>
                <section className="text-black my-5 container bg-neutral-100 mx-auto p-4 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
                    <SingleReport reportId={reportId} />
                </section>
            </div>
        </div>
    </NavBar>
    )
}
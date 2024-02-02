import NavBar from "@/components/dashboard/Navbar/NavBar"
import CoachTeam from "@/components/dashboard/coach/Team";

export default function Page() {
    return (
        <NavBar roleId="1">
            <div className="flex h-full flex-col bg-neutral-200 overflow-y-auto	">
                <div>
                    <section className="text-black my-5 container bg-neutral-100 mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
                        <CoachTeam />
                    </section>
                    
                </div>
            </div>
        </NavBar>
    )

}   
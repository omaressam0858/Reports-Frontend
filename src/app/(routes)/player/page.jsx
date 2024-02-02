import NavBar from "@/components/dashboard/Navbar/NavBar"
import PlayerTeam from "@/components/dashboard/player/Team";

export default function Page() {
    return (
        <NavBar roleId="0">
            <div className="flex h-full flex-col bg-neutral-200 overflow-y-auto	">
                <div>
                    <section className="text-black my-5 container bg-neutral-100 mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
                        <PlayerTeam />
                    </section>
                    
                </div>
            </div>
        </NavBar>
    )

}   
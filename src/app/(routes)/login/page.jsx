import LoginForm from "../../../components/login/LoginForm.jsx"
import Image from 'next/image'

export default function Page() {
    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <Image src="/Login.png" alt="login" width={1600} height={1600} className="w-full h-full object-cover"/>
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl text-black font-semibold mb-4">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
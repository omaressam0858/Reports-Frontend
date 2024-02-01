import Link from "next/link";

export default function Home() {
  return (
    <div
      className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12"
    >
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-serif text-3xl font-medium">Eagles E-Sports</h1>
        </div>
        <Link href="/login" className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-blue-500 from-gray-900 to-black">
          Login
        </Link>
      </div>

      <div className="h-32 md:h-40"></div>

      <p
        className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl"
      >
        Welcome Eagler!
      </p>
      <div className="h-10"></div>
      <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
        Welcome to Eagles Admin Hub! Unlock the door to seamless coordination, where players and coaches converge to elevate their game. Your journey to victory starts here!
      </p>
    </div>
  );
}

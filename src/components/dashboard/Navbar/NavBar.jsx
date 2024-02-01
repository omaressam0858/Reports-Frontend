import React from 'react';
import PlayerNavBar from '../player/PlayerNavBar';
import Image from 'next/image';


export default function NavBar(props) {
  const navColor = props.roleId == 0 ? "bg-violet-600" : "bg-black";
  return (
    <div className={navColor+" h-screen w-full relative flex overflow-hidden"}>
      {props.roleId == 0 && (<PlayerNavBar />)}


      <div className="w-full h-full flex flex-col justify-between">
        <header className= "h-16 w-full flex items-center relative justify-end px-5 space-x-10">
          <div className="flex flex-shrink-0 items-center space-x-4 text-white">

            <div className="flex flex-col items-end">
              <h1 className="text-lg font-bold">Eagles E-Sports</h1>
            </div>
            <Image src="/Eagles.png" width={75} height={75}/>
            
          </div>
        </header>

        <main className="w-full h-full">
          {props.children}
        </main>
      </div>

    </div>


  );
}


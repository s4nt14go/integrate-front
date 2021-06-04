import mater from "../assets/jwt.png";
import placeholder from "../assets/placeholder.png";
import React, {useState} from "react";

function Header(){

  const [ imgLoaded, setImgLoaded ] = useState(false);

  return <section className="text-gray-600 body-font">
    <div className="flex flex-col text-center w-full mb-8 mt-7">
      <div>
        <img alt='Mater' src={mater} className='mx-auto inline md:w-28 w-1/4 my-4' onLoad={() => setImgLoaded(true)}/>
        { !imgLoaded && <img alt='Mater' src={placeholder} className='mx-auto inline md:w-28 w-1/4 my-4' /> }
      </div>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">JWT Serverless Authentication</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Sourcecode and instructions in <a href="https://github.com/s4nt14go/jwt-front" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>this repo</a></p>
    </div>
  </section>
}

export default Header;

import logo from "../assets/logo.png";
import React from "react";

const img = `w-8/12 md:w-96 mx-auto inline my-6`;

function Header(){

  return <section className="text-gray-600 body-font">
    <div className="flex flex-col text-center w-full mb-8 mt-7">
      <div>
        <img alt='Civic' src={logo} className={img} />
      </div>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Integration Exercise</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base"><a href="https://docs.civic.com" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Reference Guide</a></p>
    </div>
  </section>
}

export default Header;

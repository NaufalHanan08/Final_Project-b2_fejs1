import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-gray-700 shadow py-2">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <h2 className="text-2xl font-bold text-white">
                <span className="text-lime-600 underline">Byte</span>Academy
              </h2>
            </a>
            <div className="md:hidden">
              <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border" onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 lg:text-md text-sm">
              <li className="text-slate-400 hover:text-lime-600 transition-all">
                <a href="javascript:void(0)">HOME</a>
              </li>
              <li className="text-slate-400 hover:text-lime-600 transition-all">
                <a href="javascript:void(0)">ABOUT</a>
              </li>
              <li className="text-slate-400 hover:text-lime-600 transition-all">
                <a href="javascript:void(0)">CONTACT US</a>
              </li>

              <ul className="flex md:flex-row flex-col gap-3">
                <ul className="lg:ms-36 md:ms-24 ms-0">
                  <input type="text" placeholder="Search here..." className="outline-none py-2 px-2 flex-2" />
                  <button className="border border-lime-600 text-lime-600 py-2 px-3">Search</button>
                </ul>
                <Link to="/Login">
                  <button className="w-24 bg-lime-800 border border-lime-800 hover:bg-transparent transition-all text-white text-sm py-2">LOGIN</button>
                </Link>
                <Link to="/Register">
                  <button className="w-24 bg-lime-800 border border-lime-800 hover:bg-transparent transition-all text-white text-sm py-2">REGISTER</button>
                </Link>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navbar = `bg-${scrolled ? 'gray-800' : 'teal-800'} fixed w-full z-50`;

  return (
    <div>
      <nav className={navbar + 'bg-gray-800 fixed w-full z-50 transition-all duration-300'}>
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                <h2 className="text-2xl font-bold text-white bg-gray-800 py-1 px-3 pb-2 rounded-md">
                  <span className="text-teal-600 underline">Byte</span>
                  Academy
                </h2>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" onClick={() => navigate('/')} className=" hover:text-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    HOME
                  </a>

                  <a href="#" onClick={() => navigate('/about')} className="text-gray-300 hover:text-teal-900 px-3 py-2 rounded-md text-sm font-medium">
                    ABOUT
                  </a>

                  <a href="#" className="text-gray-300 hover:text-teal-900 px-3 py-2 rounded-md text-sm font-medium">
                    COURSES
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-3"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden bg-teal-600" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#" onClick={() => navigate('/')} className="hover:text-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                  HOME
                </a>
                <a href="#" onClick={() => navigate('/about')} className="text-gray-300 hover:text-teal-900 block px-3 py-2 rounded-md text-base font-medium">
                  ABOUT
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-900 block px-3 py-2 rounded-md text-base font-medium">
                  COURSES
                </a>
                <Link to="/Login">
                  <button className="w-24 mr-3 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Login</button>
                </Link>
                <Link to="/Register">
                  <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Register</button>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <span onClick={() => navigate('/search')} className="text-white hover:bg-teal-700 hover:scale-90 rounded-full p-2 transition-all text-2xl fixed top-3 md:end-60 end-20 cursor-pointer z-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
            fill="#EBF3FC"
          />
          <path
            d="M11.4121 8.58609C11.7911 8.96609 12.0001 9.46809 12.0001 10.0001H14.0001C14.001 9.47451 13.8977 8.95398 13.6961 8.46857C13.4946 7.98316 13.1989 7.54251 12.8261 7.17209C11.3121 5.66009 8.68707 5.66009 7.17407 7.17209L8.58607 8.58809C9.34607 7.83009 10.6561 7.83209 11.4121 8.58609Z"
            fill="#EBF3FC"
          />
        </svg>
      </span>
      <div className="md:flex hidden gap-2 fixed top-3 md:end-5 end-20 z-50">
        <Link to="/Login">
          <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Login</button>
        </Link>
        <Link to="/Register">
          <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

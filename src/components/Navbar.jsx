import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FaRegBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        try {
          const response = await axios.get('https://byteacademy.as.r.appspot.com/api/v1/customer/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Anda belum login:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, [location]);

  const handleLogout = async () => {
    const accessToken = Cookies.get('accessToken');

    try {
      const response = await fetch('https://byteacademy.as.r.appspot.com/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log('Logout berhasil');
        navigate('/');
      } else {
        console.error('Logout gagal');
      }
    } catch (error) {
      console.error('Error selama logout:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get('https://byteacademy.as.r.appspot.com/api/v1/customer/notification?page=0', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setNotifications(data.results.content);
      } else {
        console.error('Failed to load notifications');
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const accessToken = Cookies.get('accessToken');
      await axios.post(
        `https://byteacademy.as.r.appspot.com/api/v1/customer/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error('Failed to read notification:', error);
    }
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const navbar = `bg-${scrolled ? 'gray-800' : 'teal-600'} fixed w-full z-50`;

  return (
    <div>
      <nav className={navbar + 'bg-gray-800 border-b-2 border-teal-600 fixed w-full z-50 transition-all duration-300'}>
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

                  <a href="#" onClick={() => navigate('/courses')} className="text-gray-300 hover:text-teal-900 px-3 py-2 rounded-md text-sm font-medium">
                    COURSES
                  </a>
                </div>
              </div>
            </div>
            <div className="mr-2 flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2"
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
            <div className="lg:hidden bg-teal-600" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <span
                  onClick={() => navigate('/search')}
                  className="text-white hover:bg-teal-700 hover:scale-90 rounded-full p-4 transition-all text-2xl fixed top-24
                    end-4 sm:hidden block cursor-pointer z-50"
                >
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
                <span
                  onClick={toggleNotification}
                  className="text-white hover:bg-teal-700 hover:scale-90 rounded-full p-4 transition-all text-xl fixed top-14
                  end-5 sm:hidden block cursor-pointer z-50"
                >
                  <FaRegBell />
                  {notifications.length > 0 && <span className="text-sm bg-red-500 text-white font-bold w-6 h-6 flex justify-center items-center rounded-full absolute top-1 right-1">{notifications.length}</span>}
                </span>
                <a href="#" onClick={() => navigate('/')} className="hover:text-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                  HOME
                </a>

                <a href="#" onClick={() => navigate('/about')} className="text-gray-300 hover:text-teal-900 block px-3 py-2 rounded-md text-base font-medium">
                  ABOUT
                </a>

                <a href="#" onClick={() => navigate('/courses')} className="text-gray-300 hover:text-teal-900 block px-3 py-2 rounded-md text-base font-medium">
                  COURSES
                </a>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard-user')}
                      className="text-white hover:bg-teal-700 hover:scale-90 rounded-full p-4 transition-all text-3xl fixed top-0
                      end-3 lg:hidden block cursor-pointer z-50"
                    >
                      <FaUserCircle />
                    </button>
                    <button onClick={handleLogout} className="w-24 mr-3 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/Login">
                      <button className="w-24 mr-3 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Login</button>
                    </Link>
                    <Link to="/Register">
                      <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Register</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
      <span
        onClick={() => navigate('/search')}
        className={`text-white hover:bg-teal-700 hover:scale-90 rounded-full p-4 transition-all text-2xl fixed top-2 ${isLoggedIn ? 'lg:end-44' : 'lg:end-72'} end-36 sm:block hidden cursor-pointer z-50`}
      >
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
      <span onClick={toggleNotification} className={`text-white hover:bg-teal-700 hover:scale-90 rounded-full p-4 transition-all text-xl fixed top-2 ${isLoggedIn ? 'lg:end-32' : 'lg:end-60'} end-24 sm:block hidden cursor-pointer z-50`}>
        <FaRegBell />
        {notifications.length > 0 && <span className="text-sm bg-red-500 text-white font-bold w-6 h-6 flex justify-center items-center rounded-full absolute top-2 right-2">{notifications.length}</span>}
      </span>
      <div className="lg:flex hidden gap-2 fixed top-3 md:end-5 end-20 z-50">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/dashboard-user')}
              className="text-white p-2 transition-all text-2xl fixed top-4
                        end-60 block cursor-pointer z-50"
            >
              <FaUserCircle />
            </button>
            <button onClick={handleLogout} className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/Login">
              <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Login</button>
            </Link>
            <Link to="/Register">
              <button className="w-24 bg-gray-800 border border-teal-700 hover:bg-teal-600 transition-all rounded-md text-white font-semibold text-sm py-2">Register</button>
            </Link>
          </>
        )}
      </div>

      {showNotification && (
        <div className="notification-canvas">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={`notification-item ${notification.status === 'UNREAD' ? 'unread' : ''}`} onClick={() => markAsRead(notification.id)}>
                <p className="text-gray-800 font-bold">{notification.notification.title}</p>
                <p className="text-gray-500 mb-2">{notification.notification.body}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-800">Belum ada notifikasi</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;

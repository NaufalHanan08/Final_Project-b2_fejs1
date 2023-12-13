import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VscAccount, VscKey, VscHistory, VscSignOut, VscArrowLeft } from 'react-icons/vsc';

const DashboardNavigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <nav id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between">
            <Link to=".." className="w-full focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <VscArrowLeft size={25} className="inline-block mb-1" />
              <span className="tab tab-back block text-xs">Back</span>
            </Link>
            <Link to="../dashboard-user/profile" className="w-full focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <VscAccount size={25} className="inline-block mb-1" />
              <span className="tab tab-profile block text-xs">Profile</span>
            </Link>
            <Link to="../dashboard-user/change-password" className="w-full focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <VscKey size={25} className="inline-block mb-1" />
              <span className="tab tab-change-password block text-xs">Change Password</span>
            </Link>
            <Link to="../payment-history" className="w-full focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <VscHistory size={25} className="inline-block mb-1" />
              <span className="tab tab-payment-history block text-xs">Payment History</span>
            </Link>
            <Link to="/logout" className="w-full focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <VscSignOut size={25} className="inline-block mb-1" />
              <span className="tab tab-logout block text-xs">Logout</span>
            </Link>
          </div>
        </nav>
      ) : (
        <div className="flex flex-auto antialiased bg-gray-50 text-gray-800 ml-[-30rem] mr-[-0rem]">
          <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b">
              <div>Sidebar Navigation</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li>
                  <Link to=".." className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 border-l-4 border-transparent  pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <VscArrowLeft size={25} className="mb-1" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Back</span>
                  </Link>
                </li>
                <li>
                  <Link to="../dashboard-user/profile" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 border-l-4 border-transparent  pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <VscAccount size={25} className="mb-1" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="../dashboard-user/change-password" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 border-l-4 border-transparent  pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <VscKey size={25} className="mb-1" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to="../payment-history" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 border-l-4 border-transparent pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <VscHistory size={25} className="mb-1" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Payment History</span>
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-teal-500 border-l-4 border-transparent pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <VscSignOut size={25} className="mb-1" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavigation;
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { RiMenu5Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { ImExit } from "react-icons/im";
import PropTypes from "prop-types";
import Navbar from "../../components/admin/Navbar";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Card = ({ children, className }) => (
  <div className={`bg-secondary shadow-none ${className}`}>{children}</div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardHeader = ({ children, className }) => (
  <div className={`text-4xl text-primary p-3 ms-6 rounded-sm ${className}`}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardContent = ({ children, className }) => (
  <div className={`py-10 ${className}`}>{children}</div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardTitle = ({ children, className }) => (
  <div className={`text-2xl text-primary font-semibold ${className}`}>
    {children}
  </div>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardDescription = ({ children, className }) => (
  <div className={`text-primary ${className}`}>{children}</div>
);

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    try {
      // Hapus AccessToken dari cookie
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Redirect ke halaman login setelah logout berhasil
      window.location.href = "/admin-login";
    } catch (error) {
      console.error("Error saat logout:", error);
    }
  };

  const [dashboardData, setDashboardData] = React.useState({
    activeUser: 0,
    nonActiveUser: 0,
    activeCourse: 0,
    nonActiveCourse: 0,
    premiumCourse: 0,
    freeCourse: 0,
  });

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://byteacademy.as.r.appspot.com/api/v1/admin/dashboard"
        );

        const { results } = response.data;

        setDashboardData(results);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const menu = [
    { id: 1, path: "/dashboard", label: "Dashboard", icon: <RxDashboard /> },
    {
      id: 2,
      path: "/kelolakelas",
      label: "Kelola Kelas",
      icon: <SiGoogleclassroom />,
    },
    {
      id: 3,
      path: "/admin-login",
      label: "Keluar",
      onClick: handleLogout,
      icon: <ImExit />,
    },
  ];

  return (
    <div className="flex h-screen">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-5 left-3 z-40 p-2 bg-gray-800 text-white rounded-md"
      >
        {sidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <RiMenu5Line className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`md:w-1/4 sm:w-2/5 w-full h-screen space-y-6 items-center bg-gray-800 text-white fixed z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <h1 className="font-bold text-2xl mx-auto w-fit my-8 mt-16">
          <span className="text-teal-600 underline">Byte</span>Academy
        </h1>

        <div className="space-y-2 flex-col justify-start items-center">
          {menu.map((item) => (
            <div key={item.id} className="block">
              <div
                className={
                  location.pathname === item.path
                    ? "bg-teal-600 py-4 ps-10"
                    : "py-4 ps-10"
                }
              >
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-2"
                  >
                    {item.icon} {item.label}
                  </button>
                ) : (
                  <Link to={item.path} className="flex items-center gap-2">
                    {item.icon} {item.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:w-3/4 w-full h-fit ms-auto">
        <Navbar />
        <div className="items-center flex flex-wrap w-full justify-center gap-6 sm:px-16 px-4 py-6">
          <Card className="flex md:w-60 w-full md:justify-start justify-center items-center my-auto h-28 bg-gray-800 rounded-md overflow-hidden">
            <CardHeader className="text-4xl text-white p-3 ms-6 rounded-sm">
              <FontAwesomeIcon icon={faUserGroup} />
            </CardHeader>
            <CardContent className="py-10 ">
              <CardTitle className="text-2xl text-white font-semibold">
                {dashboardData.activeUser}
              </CardTitle>
              <CardDescription className="text-white">
                Active Users
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex sm:w-60 w-full md:justify-start justify-center items-center my-auto h-28 bg-teal-600 rounded-md overflow-hidden">
            <CardHeader className="text-4xl text-white p-3 ms-6 rounded-sm">
              <FontAwesomeIcon icon={faUserGroup} />
            </CardHeader>
            <CardContent className="py-10 ">
              <CardTitle className="text-2xl text-white font-semibold">
                {dashboardData.activeCourse}
              </CardTitle>
              <CardDescription className="text-white">
                Active Class
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex sm:w-60 w-full md:justify-start justify-center items-center my-auto h-28 bg-gray-800 rounded-md overflow-hidden">
            <CardHeader className="text-4xl text-white p-3 ms-6 rounded-sm">
              <FontAwesomeIcon icon={faUserGroup} />
            </CardHeader>
            <CardContent className="py-10 ">
              <CardTitle className="text-2xl text-white font-semibold">
                {dashboardData.premiumCourse}
              </CardTitle>
              <CardDescription className="text-white">
                Premium Class
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

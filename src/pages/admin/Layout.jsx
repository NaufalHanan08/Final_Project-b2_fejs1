import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Navbar from "../../components/admin/Navbar";
import React from "react";
import axios from "axios";

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
  const handleLogout = () => {
    console.log("Keluar sekarang juga!");
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
    { id: 1, path: "/dashboard", label: "Dashboard" },
    { id: 2, path: "/kelolakelas", label: "Kelola Kelas" },
    { id: 3, path: "/Keluar", label: "Keluar", onClick: handleLogout },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 h-screen space-y-6 items-center bg-gray-800 text-white">
        <h1 className="font-bold text-2xl mx-auto w-44 my-8">
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
                  <button onClick={item.onClick}>{item.label}</button>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className=" items-center flex justify-between space-x-14 my-2 px-16 pt-4 pb-16 overflow-hidden">
          <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-teal-600 rounded-md overflow-hidden">
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
          <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-teal-600 rounded-md overflow-hidden">
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
          <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-teal-600 rounded-md overflow-hidden">
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
          {/* ... (card lainnya) */}
        </div>

        <div className="p-4 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

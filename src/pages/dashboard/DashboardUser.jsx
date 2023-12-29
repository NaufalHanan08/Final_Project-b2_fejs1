import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNavigation from "../../components/dashboard/DashboardNavigation";
import Profile from "../../components/dashboard/Profile";
import ChangePassword from "../../components/dashboard/ChangePassword";

const DashboardUser = () => {
  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUser;

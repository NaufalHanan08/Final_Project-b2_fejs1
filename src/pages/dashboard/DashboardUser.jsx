import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNavigation from "../../components/dashboard/DashboardNavigation";
import Profile from "../../components/dashboard/Profile";
import ChangePassword from "../../components/dashboard/ChangePassword";
import ChangeEmail from "../../components/dashboard/ChangeEmail";
import ChangePhoneNumber from "../../components/dashboard/ChangePhonenumber";

const DashboardUser = () => {
  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="change-email" element={<ChangeEmail />} />
          <Route path="change-phonenumber" element={<ChangePhoneNumber />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUser;

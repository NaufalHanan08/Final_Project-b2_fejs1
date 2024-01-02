import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import OneTimePasswordPage from "./pages/authentication/OneTimePasswordPage";
import Payment from "./pages/payment/Payment";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardUser from "./pages/dashboard/DashboardUser";
import AllCourse from "./pages/course/Courses";
import CourseDetail from "./components/coursedetail/CourseDetail";
import ConfirmationChangePassword from "./pages/authentication/ConfirmationChangePassword";
import ConfirmationEmail from "./pages/authentication/ConfirmationEmail";
import ConfirmationChangeEmail from "./components/dashboard/ConfirmationChangeEmail";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import KelolaKelas from "./pages/admin/KelolaKelas";
import AdminLoginPage from "./pages/authentication/AdminLoginPage";
import VideoPlayer from "./components/coursedetail/CourseMaterial";
import MyCourseDetail from "./components/coursedetail/MyCourseDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard-user/*" element={<DashboardUser />} />
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/detail/:slugCourse" element={<CourseDetail />} />
        <Route path="/material/:slugMaterial" element={<VideoPlayer />} />
        <Route path="/my-detail/:slugCourse" element={<MyCourseDetail />} />
        <Route
          path="/email-verify-forgot-password"
          element={<ConfirmationChangePassword />}
        />
        <Route path="/email-verify-register" element={<ConfirmationEmail />} />
        <Route
          path="/email-verify-change"
          element={<ConfirmationChangeEmail />}
        />

        {/* Halaman Admin */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/kelolakelas"
          element={
            <Layout>
              <KelolaKelas />
            </Layout>
          }
        />

        {/* Halaman Authentication */}
        <Route
          path="/*"
          element={
            <AuthLayout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/otp" element={<OneTimePasswordPage />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

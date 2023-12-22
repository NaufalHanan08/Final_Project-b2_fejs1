import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ForgotPasswordPage from './pages/authentication/ForgotPasswordPage';
import OneTimePasswordPage from './pages/authentication/OneTimePasswordPage';
import Payment from './pages/payment/Payment';
import AuthLayout from './components/layout/AuthLayout';
import DashboardUser from './pages/dashboard/DashboardUser';
import CoursePage from './pages/course/CoursePage';
import AllCourse from './components/courselist/Courses';
import CourseDetail from './components/coursedetail/CourseDetail';
import ConfirmationChangePassword from './pages/authentication/ConfirmationChangePassword';
import ConfirmationEmail from './pages/authentication/ConfirmationEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard-user/*" element={<DashboardUser />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/detail" element={<CourseDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/email-verify-forgot-password" element={<ConfirmationChangePassword />} />
        <Route path="/email-verify-register" element={<ConfirmationEmail />} />

        {/* Halaman Authentication */}
        <Route
          path="/*"
          element={
            <AuthLayout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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

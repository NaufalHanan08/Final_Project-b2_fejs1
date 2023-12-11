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
import AllCourse from './components/courselist/Courses';
import CourseDetail from './components/coursedetail/CourseDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OneTimePasswordPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/detail" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

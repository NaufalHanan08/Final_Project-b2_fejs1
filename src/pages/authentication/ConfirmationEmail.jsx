import { useEffect, useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ConfirmationEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      verifyEmail(token);
    } else {
      console.error('Token tidak ditemukan dalam URL.');
      setVerificationStatus('Tautan konfirmasi tidak valid.');
    }
  }, [location.search, navigate]);

  const verifyEmail = async (token) => {
    try {
      const response = await fetch('http://byteacademy.as.r.appspot.com/api/v1/auth/verify-register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });

      const responseData = await response.json();

      setVerificationStatus(responseData.message);

      if (responseData.success) {
        navigate('/login', { state: { successMessage: 'Registrasi berhasil. Anda sekarang dapat masuk.' } });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('Server response:', error);
      }
      setVerificationStatus('Terjadi kesalahan saat memverifikasi email. Tolong periksa email Anda.');
    }
  };

  const resendVerificationLink = async () => {
    try {
      // Mengambil alamat email dari cookie
      const emailFromCookie = Cookies.get('registeredEmail');

      if (emailFromCookie) {
        const response = await fetch('http://byteacademy.as.r.appspot.com/api/v1/auth/generate-email-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailFromCookie }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          setVerificationStatus('Tautan verifikasi baru telah dikirim ke email Anda.');
        } else {
          console.error('Failed to resend verification link:', responseData.message);

          if (responseData.message.includes('User not found or already verified')) {
            setVerificationStatus('Email tidak ditemukan atau sudah diverifikasi sebelumnya.');
          } else {
            setVerificationStatus('Gagal mengirim ulang tautan verifikasi. Coba lagi nanti.');
          }
        }
      } else {
        setVerificationStatus('Alamat email tidak ditemukan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error resending verification link:', error);
      setVerificationStatus('Terjadi kesalahan saat mengirim ulang tautan verifikasi. Coba lagi nanti.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verifikasi Email
          </Typography>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>{verificationStatus || 'Tunggu sebentar saat kami memverifikasi alamat email Anda.'}</p>
          {verificationStatus && verificationStatus.includes('error') && <div className="mt-4 text-red-500 text-sm font-medium">{verificationStatus}</div>}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={resendVerificationLink}
            className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Kirim Ulang Tautan Verifikasi
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmationEmail;
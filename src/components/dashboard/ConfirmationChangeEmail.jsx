import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const ConfirmationChangeEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const { token } = useParams(); // Ambil token dari URL

  useEffect(() => {
    // Lakukan verifikasi ketika komponen dimount dengan token dari URL
    if (token) {
      verifyEmailChange(token);
    }
  }, [token]);

  const verifyEmailChange = async (verificationToken) => {
    try {
      const response = await axios.post(
        'http://byteacademy.as.r.appspot.com/api/v1/setting/verify-change-email',
        {
          token: verificationToken,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      setVerificationStatus(response.data.message);
    } catch (error) {
      console.error('Error verifying email change', error);
      setVerificationStatus('Terjadi kesalahan saat memverifikasi perubahan email. Silakan coba lagi.');
    }
  };

  const resendVerificationLink = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      const newEmail = Cookies.get('newEmail'); // Ambil email baru dari cookie

      const response = await axios.post(
        'http://byteacademy.as.r.appspot.com/api/v1/setting/generate-email-change',
        {
          email: newEmail,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setVerificationStatus(response.data.message);
    } catch (error) {
      console.error('Error resending verification link', error);
      setVerificationStatus('Terjadi kesalahan saat mengirim ulang tautan verifikasi. Silakan coba lagi.');
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

export default ConfirmationChangeEmail;

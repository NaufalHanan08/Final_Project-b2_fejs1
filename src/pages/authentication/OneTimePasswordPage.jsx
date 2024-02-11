import { useState, useRef } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function OneTimePasswordPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');

  const phoneNumber = location.state?.phoneNumber || '';

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      setOtp(newOtp);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const otpValue = otp.join('');

      const response = await axios.post('https://byteacademy.as.r.appspot.com/api/v1/auth/verify-register-phone', {
        phoneNumber: phoneNumber,
        otp: otpValue,
      });

      if (response.status === 200) {
        console.log('Verifikasi berhasil');
        setShowNotification(true);
      } else {
        console.error('Verifikasi gagal:', response.data);
        setError('Verifikasi gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error selama verifikasi:', error);
      setError('Terjadi kesalahan selama verifikasi. Silakan coba lagi.');
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log('Mengirim ulang OTP untuk nomor telepon:', phoneNumber);
      await axios.post('https://byteacademy.as.r.appspot.com/api/v1/auth/generate-otp-register', {
        phoneNumber,
      });

      console.log('OTP baru dihasilkan dan dikirimkan dengan berhasil');
    } catch (error) {
      console.error('Error selama menghasilkan dan mengirimkan OTP baru:', error);
      setError('Terjadi kesalahan saat mengirim ulang OTP. Silakan coba lagi.');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        {showNotification && (
          <div className="px-8 py-6 bg-green-400 text-white flex justify-between rounded">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <p>Verifikasi no HP Anda telah berhasil. Sekarang cek email Anda untuk melakukan verifikasi email.</p>
            </div>
            <button className="text-green-100 hover:text-white" onClick={() => setShowNotification(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Verifikasi OTP</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Kami telah mengirimkan kode ke nomor telepon Anda</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleVerification} action="#">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Daftar
                  </Button>

                  {/* Pesan error ditampilkan di sini */}
                  {error && (
                    <div className="mt-4 text-red-600 text-center">
                      <p>{error}</p>
                    </div>
                  )}

                  <Typography variant="p" className="mt-10 text-center text-sm text-gray-500">
                    Belum menerima kode?{' '}
                    <span onClick={handleResendOTP} className="cursor-pointer font-semibold leading-6 text-teal-600 hover:text-gray-800">
                      Kirim Ulang
                    </span>
                  </Typography>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneTimePasswordPage;

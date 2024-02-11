import { useState, useRef } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ConfirmationChangePhonenumber() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
    const accessToken = Cookies.get('accessToken');
    const otpValue = otp.join('');

    console.log('OTP yang dimasukkan:', otpValue);

    try {
      const response = await axios.post(
        'https://byteacademy.as.r.appspot.com/api/v1/setting/verify-change-phone',
        {
          otp: otpValue,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Verifikasi berhasil');
        navigate('/dashboard-user');
      } else {
        setError('Verifikasi gagal. Silakan coba lagi.');
        setTimeout(() => {
          setError('');
        }, 5000);
        console.error('Verifikasi gagal:', response.data);
      }
    } catch (error) {
      setError('Error selama verifikasi. Silakan coba lagi.');
      setTimeout(() => {
        setError('');
      }, 5000);
      console.error('Error selama verifikasi:', error);
    }
  };

  const handleResendOTP = async () => {
    const accessToken = Cookies.get('accessToken');
    const newPhoneNumber = Cookies.get('newPhoneNumber');

    try {
      console.log('Mengirim ulang OTP untuk nomor telepon:', newPhoneNumber);

      await axios.post(
        'https://byteacademy.as.r.appspot.com/api/v1/setting/generate-otp-change-phone',
        {
          phoneNumber: newPhoneNumber,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setError('OTP baru dihasilkan dan berhasil terkirim.');
      setTimeout(() => {
        setError('');
      }, 5000);

      console.log('OTP baru dihasilkan dan berhasil terkirim');
    } catch (error) {
      setError('Error selama menghasilkan dan mengirimkan OTP baru. Silakan coba lagi.');
      setTimeout(() => {
        setError('');
      }, 5000);

      console.error('Error selama menghasilkan dan mengirimkan OTP baru:', error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
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
                {error && <div className="mt-4 text-red-500 text-sm font-medium text-center">{error}</div>}

                <div>
                  <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Verifikasi
                  </Button>

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

export default ConfirmationChangePhonenumber;

import { useState, useRef } from 'react';
import { Button, Typography } from '@material-tailwind/react';

function OneTimePasswordPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Validasi hanya angka
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      // Fokus pada input berikutnya
      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      setOtp(newOtp);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
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
                    Sign up
                  </Button>

                  <Typography variant="p" className="mt-10 text-center text-sm text-gray-500">
                    Didn't receive code?{' '}
                    <a className="font-semibold leading-6 text-teal-600 hover:text-gray-800" href="http://" target="_blank" rel="noopener noreferrer">
                      Resend
                    </a>
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

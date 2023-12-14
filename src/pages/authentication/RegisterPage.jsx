// RegisterPage.js
import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGenerateOTP = async () => {
    try {
      const response = await axios.post('http://byteacademy.as.r.appspot.com/api/v1/auth/generate-otp-register', {
        phoneNumber,
      });

      console.log('OTP generated successfully:', response.data);
    } catch (error) {
      console.error('Error generating OTP:', error.response.data);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://byteacademy.as.r.appspot.com/api/v1/auth/register', {
        username,
        email,
        password,
        name,
        phoneNumber,
      });

      console.log('Register success:', response.data);

      // Setelah berhasil mendaftar, generate OTP dan arahkan ke halaman OTP
      await handleGenerateOTP();
      navigate('/otp'); // Sesuaikan dengan path halaman OTP yang Anda miliki
    } catch (error) {
      console.error('Register error:', error.response.data);
      setError('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </Typography>
        </div>

        <form className="mt-10 space-y-6" action="#" method="POST" onSubmit={handleRegister}>
          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Username
            </Typography>
            <div className="mt-2">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                size="md"
                placeholder="Your Username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Name
            </Typography>
            <div className="mt-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                size="md"
                placeholder="Your Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Email
            </Typography>
            <div className="mt-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                size="md"
                placeholder="name@mail.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Phonenumber
            </Typography>
            <div className="mt-2">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="phonenumber"
                name="phonenumber"
                type="tel"
                autoComplete="phonenumber"
                required
                size="md"
                placeholder="Your Phonenumber"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </Typography>
            <div className="mt-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                size="md"
                placeholder="********"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Button>
          </div>
        </form>

        <Typography variant="p" className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-teal-600 hover:text-gray-800">
            Sign In
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default RegisterPage;

import { Card, Input, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function ConfirmationChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null); // Menambahkan state untuk menyimpan token

  useEffect(() => {
    // Menggunakan URLSearchParams untuk mengekstrak token dari query parameter
    const tokenFromURL = new URLSearchParams(location.search).get('token');

    // Memeriksa apakah token ada
    if (!tokenFromURL) {
      // Token tidak ada, mungkin perlu menangani kasus ini
      console.error('Token not found');
      navigate('/error'); // Ganti dengan rute yang sesuai untuk penanganan kesalahan
      return;
    }

    // Menyimpan token dalam state
    setToken(tokenFromURL);

    // Jangan lupa untuk menyertakan tokenFromURL dalam dependency array jika digunakan dalam useEffect
  }, [location.search, navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      // Kirim data ke API menggunakan metode POST
      const response = await axios.post('https://byteacademy.as.r.appspot.com/api/v1/auth/verify-forgot-password-email', {
        password: newPassword,
        confirmPassword,
        token: token, // Menggunakan token yang sudah disimpan dalam state
      });

      // Tanggapi respons dari API
      console.log('Change password success:', response.data);

      // Arahkan pengguna ke halaman profil atau halaman lain setelah berhasil mengubah password
      navigate('/login');
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error('Change password error:', error.response.data);
      setError('Failed to change password. Please check your input and try again.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </Typography>
        </div>

        <form className="mt-10 space-y-6" action="#" method="POST" onSubmit={handleChangePassword}>
          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </Typography>
            <div className="mt-2">
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                size="md"
                placeholder="********"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm New Password
            </Typography>
            <div className="mt-2">
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
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
              Change Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ConfirmationChangePassword;

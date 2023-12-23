import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export function Profil() {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await axios.get('http://byteacademy.as.r.appspot.com/api/v1/customer/user/me', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { customerDetail, email, phoneNumber, username } = response.data.results;
        setUserData({
          username,
          name: customerDetail.name,
          email,
          phoneNumber,
          country: customerDetail.country,
          city: customerDetail.city,
        });
      } catch (error) {
        console.error('Error fetching user data', error);
        console.error('Error details:', error.response);
        setError('Error saat mengambil data pengguna. Silakan coba lagi.'); // Set the error state
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const accessToken = Cookies.get('accessToken');

      await axios.put(
        'http://byteacademy.as.r.appspot.com/api/v1/setting/update-customer-detail',
        {
          name: userData.name,
          country: userData.country,
          city: userData.city,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccessMessage('Profil berhasil diperbarui');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error updating profile', error);
      setError('Error saat memperbarui profil. Silakan coba lagi.'); // Set the error state
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-[-32px] sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Profil Pengguna
          </Typography>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSaveProfile}>
          <div className="space-y-6 p-4">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nama
              </label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  size="md"
                  placeholder="Nama Anda"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="text-sm">
                  <Link to="../change-email" className="font-semibold text-teal-600 hover:text-gray-800">
                    Ganti Email
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  size="md"
                  placeholder="nama@mail.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Nomor Telepon
                </label>
                <div className="text-sm">
                  <Link to="../change-phonenumber" className="font-semibold text-teal-600 hover:text-gray-800">
                    Ganti Nomor Telepon
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  size="md"
                  placeholder="Nomor Telepon Anda"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.phoneNumber}
                  onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Negara
              </label>
              <div className="mt-2">
                <Input
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="country"
                  required
                  size="md"
                  placeholder="Negara Anda"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.country}
                  onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Kota
              </label>
              <div className="mt-2">
                <Input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="city"
                  required
                  size="md"
                  placeholder="Kota Anda"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.city}
                  onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Simpan Profil
              </Button>
            </div>

            {error && (
              <div className="mt-4 text-red-600 text-center">
                <p>{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 text-green-600 text-center">
                <p>{successMessage}</p>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Profil;

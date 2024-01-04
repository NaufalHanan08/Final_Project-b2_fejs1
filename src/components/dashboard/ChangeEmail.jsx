import { useState, useEffect } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Cookies from 'js-cookie';

function ChangeEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  useEffect(() => {
    const timeoutId = setTimeout(clearMessages, 5000);
    return () => clearTimeout(timeoutId);
  }, [error, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = Cookies.get('accessToken');
      const response = await fetch('https://byteacademy.as.r.appspot.com/api/v1/setting/generate-email-change', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        Cookies.set('newEmail', newEmail);
        setSuccessMessage(`Tautan verifikasi telah dikirim ke ${newEmail}, silakan cek email anda`);
      } else {
        setError(responseData.message || 'Gagal menirim tautan ke ${newEmail}');
      }
    } catch (error) {
      setError('Terjadi kesalahan');
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-[-20px] sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ganti Email
          </Typography>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newEmail" className="block text-sm font-medium leading-6 text-gray-900">
              Email Baru
            </label>
            <div className="mt-2">
              <Input
                id="newEmail"
                name="newEmail"
                type="email"
                autoComplete="email"
                required
                size="md"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Masukkan Email Baru"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ganti Email
            </Button>
          </div>

          {successMessage && <div className="mt-4 text-center text-green-500 text-sm">{successMessage}</div>}
          {error && <div className="mt-4 text-center text-red-500 text-sm">{error}</div>}
        </form>
      </Card>
    </div>
  );
}

export default ChangeEmail;

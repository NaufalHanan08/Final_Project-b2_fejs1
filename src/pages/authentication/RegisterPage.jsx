import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Mengelola pendaftaran pertama
      const response = await axios.post(
        "http://byteacademy.as.r.appspot.com/api/v1/auth/register",
        {
          username,
          email,
          password,
          name,
          phoneNumber,
        }
      );

      console.log("Pendaftaran berhasil:", response.data);
      // Set email dalam cookie setelah berhasil mendaftar
      Cookies.set("registeredEmail", email);

      // Langsung arahkan ke halaman OTP setelah berhasil mendaftar
      navigate("/otp", { state: { phoneNumber } }); // Pass phoneNumber as a prop
    } catch (error) {
      console.error(
        "Error saat mendaftar:",
        error.response?.data || error.message
      );
      setError("Pendaftaran gagal. Periksa input Anda dan coba lagi.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography
            variant="h2"
            className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Daftar
          </Typography>
        </div>

        <form
          className="mt-10 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleRegister}
        >
          <div>
            <Typography
              variant="label"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nama Pengguna
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
                placeholder="Nama Pengguna"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography
              variant="label"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nama Anda
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
                placeholder="Nama Anda"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography
              variant="label"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Anda
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
                placeholder="nama@mail.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography
              variant="label"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nomor Telepon Anda
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
                placeholder="Nomor Telepon Anda"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography
              variant="label"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kata Sandi
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
                placeholder="****"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Daftar
            </Button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        <Typography
          variant="p"
          className="mt-10 text-center text-sm text-gray-500"
        >
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-teal-600 hover:text-gray-800"
          >
            Masuk
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default RegisterPage;

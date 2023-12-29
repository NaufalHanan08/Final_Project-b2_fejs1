// Import statements
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://byteacademy.as.r.appspot.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Data Respons API:", data);

        // Mengakses token
        const accessToken = data.results?.accessToken;
        const refreshToken = data.results?.refreshToken;

        if (accessToken && refreshToken) {
          // Token berhasil diambil
          Cookies.set("accessToken", accessToken);
          Cookies.set("refreshToken", refreshToken);
          console.log("Login berhasil");
          console.log("AccessToken:", accessToken);
          console.log("RefreshToken:", refreshToken);
          // Membawa user ke halaman Home
          navigate("/dashboard");
        } else {
          // Tampilkan pesan kesalahan jika token tidak dapat diambil
          console.error("Token tidak ditemukan dalam respons API");
        }
      } else {
        // Handle error login, misalnya, tampilkan pesan error
        const data = await response.json();
        setError(data.error || "Login gagal");
        console.error("Login gagal:", data);
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login");
      console.error("Terjadi kesalahan saat login:", error);
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
            Masuk ke akun Anda
          </Typography>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Alamat Email
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                size="md"
                placeholder="nama@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kata Sandi
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-teal-600 hover:text-gray-800"
                >
                  Lupa kata sandi?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                size="md"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Masuk
            </Button>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-teal-600 hover:text-gray-800"
          >
            Daftar
          </Link>
        </p>
      </Card>
      {location.state?.successMessage && (
        <div className="mt-4 text-green-500 text-sm font-medium">
          {location.state.successMessage}
        </div>
      )}
    </div>
  );
}

export default AdminLoginPage;

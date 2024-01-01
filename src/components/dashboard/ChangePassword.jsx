import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const accessToken = Cookies.get("accessToken");

    try {
      const response = await fetch(
        "http://byteacademy.as.r.appspot.com/api/v1/setting/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            currentPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Kata sandi berhasil diubah!");
        setError("");

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        const data = await response.json();
        setSuccessMessage("");
        setError(data.message || "Gagal mengganti kata sandi");

        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengganti kata sandi:",
        error.message
      );
      setSuccessMessage("");
      setError("Terjadi kesalahan yang tidak terduga.");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-[-20px] sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography
            variant="h2"
            className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Ubah Kata Sandi
          </Typography>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleChangePassword}>
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kata Sandi Lama
            </label>
            <div className="mt-2">
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                required
                size="md"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Masukkan Kata Sandi Lama"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kata Sandi Baru
            </label>
            <div className="mt-2">
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                size="md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan Kata Sandi Baru"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="mt-2">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                size="md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi Kata Sandi Baru"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ubah Kata Sandi
            </Button>
          </div>

          {successMessage && (
            <div className="mt-4 text-green-500 text-center">
              <p>{successMessage}</p>
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-600 text-center">
              <p>{error}</p>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}

export default ChangePassword;

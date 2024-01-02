import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(
            "https://byteacademy.as.r.appspot.com/api/v1/admin/user/me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log(response.data);

          if (response.status === 200) {
            setIsLoggedIn(true);
            setUsername(response.data.results);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Anda belum login:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <nav className="bg-teal-600 font-medium px-4 w-full z-10 overflow-hidden md:text-start text-end h-20 flex items-center">
      <div className="container">
        {isLoggedIn ? (
          <h1 key={username.username} className="text-xl font-bold text-white">
            Hi, {username.username}!
          </h1>
        ) : (
          <h1 className="text-xl font-bold text-white">
            Silahkan{" "}
            <span
              onClick={() => navigate("/admin-login")}
              className="text-blue-500"
            >
              login
            </span>{" "}
            terlebih dahulu!
          </h1>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

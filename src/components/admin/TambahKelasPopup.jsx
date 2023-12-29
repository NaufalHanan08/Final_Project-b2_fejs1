import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const TambahKelasPopup = ({ isVisible, togglePopup, setKelasData }) => {
  const [inputData, setInputData] = useState({
    courseName: "",
    instructorName: "",
    price: 0,
    courseDuration: 0,
    courseDescription: "",
    targetMarket: "",
    slugCourse: "",
    pathCourseImage: "",
    groupLink: "",
    courseType: "FREE",
    courseLevel: "BEGINNER",
    courseStatus: "ACTIVE",
    slugCategory: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Token tidak ditemukan.");
        return [];
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        "http://byteacademy.as.r.appspot.com/api/v1/admin/course",
        { headers }
      );

      return response.data.results.content;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const showToastMessage = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Token tidak ditemukan.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      await axios.post(
        "http://byteacademy.as.r.appspot.com/api/v1/admin/course",
        inputData,
        {
          headers: headers,
        }
      );

      const updatedData = await fetchData();
      setKelasData(updatedData);

      toast.success("Kelas berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        togglePopup();
      }, 2000);
    } catch (error) {
      toast.error("Gagal menambahkan kelas. Silakan coba lagi.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      handleInputChange({ target: { name: "pathCourseImage", value: base64 } });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-gray-700 z-50 overflow-scroll">
        <div className="bg-white p-8 rounded-md w-96 max-h-full overflow-auto">
          <h1 className="text-teal-600 font-bold mb-4">BUAT KELAS BARU</h1>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Nama Kelas</label>
            <input
              type="text"
              name="courseName"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Nama Instruktur</label>
            <input
              type="text"
              name="instructorName"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.instructorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Harga Kelas</label>
            <input
              type="number"
              name="price"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Durasi Kelas</label>
            <input
              type="number"
              name="courseDuration"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseDuration}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Deskripsi Kelas</label>
            <textarea
              // type="text"
              name="courseDescription"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Target Pasar</label>
            <textarea
              // type="text"
              name="targetMarket"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.targetMarket}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Slug Kelas</label>
            <input
              type="text"
              name="slugCourse"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.slugCourse}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Path Gambar Kelas</label>
            <input
              type="file"
              accept="image/*"
              name="pathCourseImage"
              className="border-2 border-gray-200 p-2 rounded-md"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Link Grup Kelas</label>
            <input
              type="text"
              name="groupLink"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.groupLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Tipe Kelas</label>
            <select
              name="courseType"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseType}
              onChange={handleInputChange}
            >
              <option value="FREE">FREE</option>
              <option value="PREMIUM">PREMIUM</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Level Kelas</label>
            <select
              name="courseLevel"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseLevel}
              onChange={handleInputChange}
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Status Kelas</label>
            <select
              name="courseStatus"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.courseStatus}
              onChange={handleInputChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm">Kategori Slug</label>
            <input
              type="text"
              name="slugCategory"
              className="border-2 border-gray-200 p-2 rounded-md"
              value={inputData.slugCategory}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
              onClick={() => {
                showToastMessage();
              }}
            >
              Simpan
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
              onClick={() => {
                togglePopup();
              }}
            >
              Batal
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

TambahKelasPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  togglePopup: PropTypes.func.isRequired,
  setKelasData: PropTypes.func.isRequired,
};

export default TambahKelasPopup;

import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const EditForm = ({ selectedCourse, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pathCourseImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Set the form data based on the selected course
    if (selectedCourse) {
      setFormData({
        courseName: selectedCourse.courseName || "",
        instructorName: selectedCourse.instructorName || "",
        price: selectedCourse.price || 0,
        courseDuration: selectedCourse.courseDuration || 0,
        courseDescription: selectedCourse.courseDescription || "",
        targetMarket: selectedCourse.targetMarket || "",
        slugCourse: selectedCourse.slugCourse || "",
        pathCourseImage: selectedCourse.pathCourseImage || "",
        groupLink: selectedCourse.groupLink || "",
        courseType: selectedCourse.courseType || "FREE",
        courseLevel: selectedCourse.courseLevel || "BEGINNER",
        courseStatus: selectedCourse.courseStatus || "ACTIVE",
        slugCategory: selectedCourse.slugCategory || "",
      });
    }
  }, [selectedCourse]);

  const handleUpdate = async () => {
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

      const response = await axios.put(
        `http://byteacademy.as.r.appspot.com/api/v1/admin/course/${selectedCourse.slugCourse}`,
        formData,
        { headers }
      );

      onUpdate(response.data);

      toast.success("Kelas berhasil diupdate", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        onUpdate();
      }, 2000);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Gagal menambahkan kelas. Silakan coba lagi.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

      {/* Your form JSX with input fields */}
      <label className="block mb-4">
        <span className="text-gray-700">Nama Kelas</span>
        <input
          type="text"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.courseName}
          onChange={(e) =>
            setFormData({ ...formData, courseName: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Nama Instruktur</span>
        <input
          type="text"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.instructorName}
          onChange={(e) =>
            setFormData({ ...formData, instructorName: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Harga Kelas</span>
        <input
          type="number"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Durasi Kelas</span>
        <input
          type="number"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.courseDuration}
          onChange={(e) =>
            setFormData({ ...formData, courseDuration: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Deskripsi Kelas</span>
        <textarea
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.courseDescription}
          onChange={(e) =>
            setFormData({ ...formData, courseDescription: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Target Market</span>
        <textarea
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.targetMarket}
          onChange={(e) =>
            setFormData({ ...formData, targetMarket: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Slug Kelas</span>
        <input
          type="text"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.slugCourse}
          onChange={(e) =>
            setFormData({ ...formData, slugCourse: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Gambar Kelas</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-input mt-1 block w-full border-2 py-1 px-2"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Link Grup Kelas</span>
        <input
          type="text"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.groupLink}
          onChange={(e) =>
            setFormData({ ...formData, groupLink: e.target.value })
          }
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Tipe Kelas</span>
        <select
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.courseType}
          onChange={(e) =>
            setFormData({ ...formData, courseType: e.target.value })
          }
        >
          <option value="FREE">FREE</option>
          <option value="PREMIUM">PREMIUM</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Level Kelas</span>
        <select
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.courseLevel}
          onChange={(e) =>
            setFormData({ ...formData, courseLevel: e.target.value })
          }
        >
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="ADVANCE">ADVANCE</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Status Kelas</span>
        <select
          className="form-input mt-1 block w-full"
          value={formData.courseStatus}
          onChange={(e) =>
            setFormData({ ...formData, courseStatus: e.target.value })
          }
        >
          <option value="ACTIVE">ACTIVE</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Slug Kategori</span>
        <input
          type="text"
          className="form-input mt-1 block w-full border-2 py-1 px-2"
          value={formData.slugCategory}
          onChange={(e) =>
            setFormData({ ...formData, slugCategory: e.target.value })
          }
        />
      </label>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Simpan Perubahan
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  selectedCourse: PropTypes.shape({
    courseName: PropTypes.string,
    instructorName: PropTypes.string,
    price: PropTypes.number,
    courseDuration: PropTypes.number,
    courseDescription: PropTypes.string,
    targetMarket: PropTypes.string,
    slugCourse: PropTypes.string,
    pathCourseImage: PropTypes.string,
    groupLink: PropTypes.string,
    courseType: PropTypes.string,
    courseLevel: PropTypes.string,
    courseStatus: PropTypes.string,
    slugCategory: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditForm;

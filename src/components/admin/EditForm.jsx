import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const EditForm = ({ selectedCourse, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    instructorName: '',
    price: 0,
    courseDuration: 0,
    courseDescription: '',
    targetMarket: '',
    slugCourse: '',
    pathCourseImage: '',
    groupLink: '',
    courseType: 'FREE',
    courseLevel: 'BEGINNER',
    courseStatus: 'ACTIVE',
    slugCategory: '',
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      handleInputChange({
        target: { name: 'pathCourseImage', value: base64 },
      });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        courseName: selectedCourse.courseName || '',
        instructorName: selectedCourse.instructorName || '',
        price: selectedCourse.price || 0,
        courseDuration: selectedCourse.courseDuration || 0,
        courseDescription: selectedCourse.courseDescription || '',
        targetMarket: selectedCourse.targetMarket || '',
        slugCourse: selectedCourse.slugCourse || '',
        pathCourseImage: selectedCourse.pathCourseImage || '',
        groupLink: selectedCourse.groupLink || '',
        courseType: selectedCourse.courseType || 'FREE',
        courseLevel: selectedCourse.courseLevel || 'BEGINNER',
        courseStatus: selectedCourse.courseStatus || 'ACTIVE',
        slugCategory: selectedCourse.slugCategory || '',
      });
    }
  }, [selectedCourse]);

  const handleUpdate = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        console.error('Token tidak ditemukan.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const payload = { ...formData };

      // Menghilangkan properti yang tidak perlu diupdate (seperti pathCourseImageFile)
      delete payload.pathCourseImageFile;

      // Ubah data ke format JSON
      const jsonData = JSON.stringify(payload);

      const response = await axios.put(`https://byteacademy.as.r.appspot.com/api/v1/admin/course/${selectedCourse.slugCourse}`, jsonData, { headers });

      if (response.status === 200) {
        onUpdate(response.data);

        toast.success('Kelas berhasil diupdate', {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          onUpdate();
        }, 2000);
      } else {
        console.error('Gagal mengupdate kelas. Status:', response.status);
      }
    } catch (error) {
      console.log('Update gagal:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

      <label className="block mb-4">
        <span className="text-gray-700">Nama Kelas</span>
        <input type="text" className="form-input mt-1 block w-full border-2 py-1 px-2" name="courseName" value={formData.courseName} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Nama Instruktur</span>
        <input type="text" className="form-input mt-1 block w-full border-2 py-1 px-2" name="instructorName" value={formData.instructorName} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Harga Kelas</span>
        <input type="number" className="form-input mt-1 block w-full border-2 py-1 px-2" name="price" value={formData.price} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Durasi Kelas</span>
        <input type="number" className="form-input mt-1 block w-full border-2 py-1 px-2" name="courseDuration" value={formData.courseDuration} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Deskripsi Kelas</span>
        <textarea className="form-input mt-1 block w-full border-2 py-1 px-2" name="courseDescription" value={formData.courseDescription} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Target Market</span>
        <textarea className="form-input mt-1 block w-full border-2 py-1 px-2" name="targetMarket" value={formData.targetMarket} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Slug Kelas</span>
        <input type="text" className="form-input mt-1 block w-full border-2 py-1 px-2" name="slugCourse" value={formData.slugCourse} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Gambar Kelas</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="form-input mt-1 block w-full border-2 py-1 px-2" />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Link Grup Kelas</span>
        <input type="text" className="form-input mt-1 block w-full border-2 py-1 px-2" name="groupLink" value={formData.groupLink} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Tipe Kelas</span>
        <select className="form-input mt-1 block w-full border-2 py-1 px-2" name="courseType" value={formData.courseType} onChange={handleInputChange}>
          <option value="FREE">FREE</option>
          <option value="PREMIUM">PREMIUM</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Level Kelas</span>
        <select className="form-input mt-1 block w-full border-2 py-1 px-2" name="courseLevel" value={formData.courseLevel} onChange={handleInputChange}>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="ADVANCE">ADVANCE</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Status Kelas</span>
        <select className="form-input mt-1 block w-full" name="courseStatus" value={formData.courseStatus} onChange={handleInputChange}>
          <option value="ACTIVE">ACTIVE</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Slug Kategori</span>
        <input type="text" className="form-input mt-1 block w-full border-2 py-1 px-2" name="slugCategory" value={formData.slugCategory} onChange={handleInputChange} />
      </label>
      <div className="flex justify-end gap-2">
        <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Simpan Perubahan
        </button>
        <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray">
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

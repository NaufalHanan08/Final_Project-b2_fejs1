import { useState, useEffect, useCallback } from "react";
import Filter from "../../components/admin/Filter";
import TambahKelasPopup from "../../components/admin/TambahKelasPopup";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import axios from "axios";

const KelolaKelas = () => {
  const [kelasData, setKelasData] = useState([]);
  const [isTambahPopupOpen, setIsTambahPopupOpen] = useState(false);
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
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");

  const handleSort = useCallback(
    (data) => {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const aSlug = String(a.slugCourse);
        const bSlug = String(b.slugCourse);

        if (filterType === "ASC") {
          return aSlug.localeCompare(bSlug);
        } else {
          return bSlug.localeCompare(aSlug);
        }
      });
      return sortedData;
    },
    [filterType]
  );

  useEffect(() => {
    const fetchKelasData = async () => {
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

        const [page0Response, page1Response] = await Promise.all([
          axios.get(
            "http://byteacademy.as.r.appspot.com/api/v1/admin/course?page=0",
            {
              headers: headers,
            }
          ),
          axios.get(
            "http://byteacademy.as.r.appspot.com/api/v1/admin/course?page=1",
            {
              headers: headers,
            }
          ),
        ]);

        const page0Data = page0Response.data.results.content;
        const page1Data = page1Response.data.results.content;

        const combinedData = [...page0Data, ...page1Data];

        const sortedData = handleSort(combinedData);
        setKelasData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKelasData();
  }, [handleSort]);

  const toggleTambahPopup = () => {
    setIsTambahPopupOpen(!isTambahPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleTambahKelas = async () => {
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

      // Memperbarui state dengan menambahkan data baru
      setKelasData([...kelasData, inputData]);
      setIsTambahPopupOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const filteredData = kelasData.filter(
    (course) =>
      String(course.slugCourse)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.category)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.courseName)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.courseType)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.level).toLowerCase().includes(searchText.toLowerCase()) ||
      String(course.price).toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (slugCourse) => {
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

      // Make the DELETE request to the API using the slugCourse
      await axios.delete(
        `http://byteacademy.as.r.appspot.com/api/v1/admin/course/${slugCourse}`,
        {
          headers: headers,
        }
      );

      // Update the state by filtering out the deleted course
      const updatedData = kelasData.filter(
        (course) => course.slugCourse !== slugCourse
      );

      setKelasData(updatedData);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="px-10 font-poppins">
      <div className="flex flex-1 items-center justify-between mb-4 ps-5 bg-gray-800">
        <div className="text-2xl font-semibold text-white">Kelola Kelas</div>
        <div className="flex space-x-4 items-center">
          <Button
            onClick={toggleTambahPopup}
            className="bg-yellow-600 py-2 px-4 rounded-md text-sm"
          >
            Tambah
          </Button>
          <Filter
            onFilterChange={handleFilterChange}
            onSearch={(text) => setSearchText(text)}
          />
        </div>
      </div>
      <div>
        <table className="min-w-full bg-white border border-gray-300">
          <caption className="text-lg font-semibold mb-4">
            Table Data Kelas.
          </caption>
          <thead className="bg-gray-200 text-black text-sm sticky">
            <tr>
              <th className="py-2 px-4 text-left">Kode Kelas</th>
              <th className="py-2 px-4 text-left">Kategori</th>
              <th className="py-2 px-4 text-left">Nama Kelas</th>
              <th className="py-2 px-4 text-left">Tipe Kelas</th>
              <th className="py-2 px-4 text-left">Level</th>
              <th className="py-2 px-4 text-left">Harga Kelas</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((course) => (
              <tr key={course.slugCourse} className="text-sm">
                <td className="py-2 px-4 text-sm">{course.slugCourse}</td>
                <td className="py-2 px-4 text-sm">
                  {course.category.categoryName}
                </td>
                <td className="py-2 px-4 text-sm">{course.courseName}</td>
                <td
                  className={`py-2 px-4 ${
                    course.courseType === "PREMIUM"
                      ? "text-yellow-700 font-semibold"
                      : "text-teal-600 font-medium"
                  }`}
                >
                  {course.courseType}
                </td>
                <td className="py-2 px-4">{course.level}</td>
                <td className="py-2 px-4">Rp. {course.price}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col gap-1">
                    <Button className="w-20 h-fit text-xs bg-teal-600">
                      ubah
                    </Button>
                    <Button
                      onClick={() => handleDelete(course.slugCourse)}
                      className="w-20 h-fit text-xs bg-red-600"
                    >
                      hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isTambahPopupOpen && (
          <TambahKelasPopup
            isVisible={isTambahPopupOpen}
            togglePopup={toggleTambahPopup}
            inputData={inputData}
            handleInputChange={handleInputChange}
            handleTambah={handleTambahKelas}
          />
        )}
      </div>
    </div>
  );
};

export default KelolaKelas;

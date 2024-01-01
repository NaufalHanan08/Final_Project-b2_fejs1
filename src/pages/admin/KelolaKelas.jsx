import { useState, useEffect, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import Filter from "../../components/admin/Filter";
import axios from "axios";
import Cookies from "js-cookie";
import EditForm from "../../components/admin/EditForm";
import TambahChapter from "../../components/admin/TambahChapter";
import TambahForm from "../../components/admin/TambahForm";

const KelolaKelas = () => {
  const [kelasData, setKelasData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isTambahPopupOpen, setIsTambahPopupOpen] = useState(false);
  const [isTambahChapterPopupOpen, setIsTambahChapterPopupOpen] =
    useState(false);
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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

        const response = await axios.get(
          `http://byteacademy.as.r.appspot.com/api/v1/admin/course?page=${currentPage}`,
          { headers }
        );

        const data = response.data.results.content;
        const totalPages = response.data.results.totalPages;

        const sortedData = handleSort(data);
        setKelasData(sortedData);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching table course data:", error);
      }
    };

    fetchKelasData();
  }, [handleSort, filterType, currentPage]);

  const toggleTambahPopup = () => {
    setIsTambahPopupOpen(!isTambahPopupOpen);
  };

  const toggleTambahChapterPopup = () => {
    setIsTambahChapterPopupOpen(!isTambahChapterPopupOpen);
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

      // Update state by filtering out the deleted course
      const updatedData = kelasData.filter(
        (course) => course.slugCourse !== slugCourse
      );
      setKelasData(updatedData);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdate = (updatedCourse) => {
    const updatedData = kelasData.map((course) =>
      course.slugCourse === updatedCourse.slugCourse ? updatedCourse : course
    );
    setKelasData(updatedData);
    setSelectedCourse(null);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-4 ps-5 sm:pt-0 pt-4 bg-gray-800">
        <div className="md:text-2xl text-lg font-semibold text-white">
          Kelola <span className="text-teal-600 font-bold">Kelas</span>
        </div>
        <div className="flex sm:justify-normal justify-end space-x-4 items-center">
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

      {/* Main Content */}
      <div className="lg:overflow-hidden overflow-x-scroll">
        {!selectedCourse ? (
          <table className="w-full bg-white border border-gray-300 lg:overflow-hidden overflow-x-scroll">
            <thead className="bg-gray-200 text-black text-sm">
              <tr>
                <th className="py-2 px-4 text-center">Kode Kelas</th>
                <th className="py-2 px-4 text-center">Kategori</th>
                <th className="py-2 px-4 text-center">Nama Kelas</th>
                <th className="py-2 px-4 text-center">Tipe Kelas</th>
                <th className="py-2 px-4 text-center">Level</th>
                <th className="py-2 px-4 text-center">Harga Kelas</th>
                <th className="py-2 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((course) => (
                <tr key={course.slugCourse}>
                  <td className="py-2 px-4 text-xs">{course.slugCourse}</td>
                  <td className="py-2 px-4 text-xs font-bold text-center">
                    {course.category.categoryName}
                  </td>
                  <td className="py-2 px-4 text-xs">{course.courseName}</td>
                  <td
                    className={`py-2 px-4 text-xs text-center ${
                      course.courseType === "PREMIUM"
                        ? "text-yellow-700 font-semibold"
                        : "text-teal-600 font-medium"
                    }`}
                  >
                    {course.courseType}
                  </td>
                  <td className="py-2 px-4 text-xs text-center">
                    {course.courseLevel}
                  </td>
                  <td className="py-2 px-4 text-xs">Rp. {course.price}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="w-20 h-fit py-1 px-2 text-xs bg-teal-600 text-white rounded-md"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDelete(course.slugCourse)}
                        className="w-20 h-fit py-1 px-2 text-xs bg-red-600 text-white rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EditForm
            selectedCourse={selectedCourse}
            onUpdate={handleUpdate}
            onCancel={() => setSelectedCourse(null)}
          />
        )}

        {/* Popup Components */}
        {isTambahPopupOpen && (
          <TambahForm
            isVisible={isTambahPopupOpen}
            togglePopup={toggleTambahPopup}
            setKelasData={setKelasData}
          />
        )}

        {isTambahChapterPopupOpen && (
          <TambahChapter
            isVisible={isTambahChapterPopupOpen}
            togglePopup={toggleTambahChapterPopup}
            setKelasData={setKelasData}
            selectedCourse={selectedCourse}
          />
        )}
        <div className="flex justify-end p-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`mx-1 font-bold text-md px-5 ${
                currentPage === index
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-teal-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KelolaKelas;

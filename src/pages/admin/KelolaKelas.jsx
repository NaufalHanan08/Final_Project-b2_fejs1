import { useState, useEffect, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import Filter from "../../components/admin/Filter";
import TambahKelasPopup from "../../components/admin/TambahKelasPopup";
import axios from "axios";
import Cookies from "js-cookie";
import EditForm from "../../components/admin/EditForm";

const KelolaKelas = () => {
  const [kelasData, setKelasData] = useState([]);
  const [isTambahPopupOpen, setIsTambahPopupOpen] = useState(false);
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to handle sorting based on filterType
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
            { headers }
          ),
          axios.get(
            "http://byteacademy.as.r.appspot.com/api/v1/admin/course?page=1",
            { headers }
          ),
        ]);
        console.log(page0Response.data);
        console.log(page1Response.data);
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
  }, [handleSort, filterType]);

  const toggleTambahPopup = () => {
    setIsTambahPopupOpen(!isTambahPopupOpen);
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
      <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-4 ps-5 sm:pt-0 pt-4 bg-gray-800">
        <div className="text-2xl font-semibold text-white">
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

        {isTambahPopupOpen && (
          <TambahKelasPopup
            isVisible={isTambahPopupOpen}
            togglePopup={toggleTambahPopup}
            setKelasData={setKelasData}
          />
        )}
      </div>
    </div>
  );
};

export default KelolaKelas;

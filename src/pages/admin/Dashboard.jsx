import { useEffect, useState } from "react";
import Filter from "../../components/admin/Filter";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");
  const [paymentsData, setPaymentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `https://byteacademy.as.r.appspot.com/api/v1/admin/purchase?page=${currentPage}`,
          { headers }
        );

        console.log(response.data);
        setPaymentsData(response.data.results.content);
        setTotalPages(response.data.results.totalPages);
      } catch (error) {
        console.error("Error fetching payments table data:", error);
      }
    };

    fetchPaymentsData();
  }, [currentPage]);

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = paymentsData.filter(
    (course) =>
      String(course.username)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.courseName)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.purchaseStatus)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(course.amountPaid).toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedPayments = filteredData.sort((a, b) => {
    const aValue = parseInt(a.amountPaid, 10);
    const bValue = parseInt(b.amountPaid, 10);

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return filterType === "ASC" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className="px-10 font-poppin">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-4 ps-5 sm:pt-0 pt-4 bg-gray-800">
        <div className="md:text-2xl text-lg font-semibold text-white">
          Status <span className="text-teal-600 font-bold">Pembayaran</span>
        </div>
        <div className="flex sm:justify-normal justify-end space-x-4 items-center">
          <Filter
            onFilterChange={handleFilterChange}
            onSearch={(text) => setSearchText(text)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-sm sticky top-0 z-10">
            <tr>
              <th className="py-2 px-4 text-left font-bold">username</th>
              <th className="py-2 px-4 text-center text-teal-600 font-bold">
                Nama Kelas
              </th>
              <th className="py-2 px-4 text-center font-bold">Status</th>
              <th className="py-2 px-4 text-center font-bold">
                Total Terbayar
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-sm">{item.username}</td>
                <td className="py-2 px-4 text-sm">{item.courseName}</td>
                <td
                  className={`py-2 px-4 text-sm text-center ${
                    item.purchaseStatus === "PENDING"
                      ? "text-red-500"
                      : "text-teal-600"
                  }`}
                >
                  {item.purchaseStatus}
                </td>
                <td className="py-2 px-4 text-sm text-center">
                  {item.amountPaid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
};

export default Dashboard;

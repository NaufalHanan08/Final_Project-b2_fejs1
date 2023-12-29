import { useEffect, useState } from "react";
import Filter from "../../components/admin/Filter";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        // Set headers with accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          "http://byteacademy.as.r.appspot.com/api/v1/admin/purchase?page=0",
          { headers }
        );

        console.log(response.data);
        // Set the payments data from the API response
        setPaymentsData(response.data.results.content);
      } catch (error) {
        console.error("Error fetching payments data:", error);
      }
    };

    fetchPaymentsData();
  }, []);

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredPayments = paymentsData.filter((item) => {
    return (
      item.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tokenPurchase.toLowerCase().includes(searchText.toLowerCase()) ||
      item.amountPaid.toLowerCase().includes(searchText.toLowerCase()) ||
      item.purchaseStatus.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const sortedPayments = filteredPayments.sort((a, b) => {
    if (a.id && b.id) {
      if (filterType === "ASC") {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    }
    return 0; // Default case when either a.id or b.id is undefined
  });

  return (
    <div className="px-10 font-poppin">
      <div className="flex flex-1 items-center justify-between mb-4 ps-5 bg-gray-800">
        <div className="text-2xl font-semibold text-white">
          Status <span className="text-teal-600 font-bold">Pembayaran</span>
        </div>
        <div>
          <Filter onFilterChange={handleFilterChange} onSearch={handleSearch} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-sm sticky top-0 z-10">
            <tr>
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
    </div>
  );
};

export default Dashboard;

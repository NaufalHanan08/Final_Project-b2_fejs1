import { useState } from "react";
import Filter from "../../components/admin/Filter";

const Dashboard = () => {
  const [filterType, setFilterType] = useState("DESC");
  const [searchText, setSearchText] = useState("");
  const dummyPayments = [
    {
      id: "johndoe1",
      kategori: "UI/UX Design",
      kelasPremium: "Belajar Web Designer dengan Figma",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "21 Sep, 2023 at 2.00 AM",
    },
    {
      id: "johndoe4",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Pemasaran di Era Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe6",
      kategori: "Data Science",
      kelasPremium: "Pengenalan ke Big Data",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe3",
      kategori: "Programming",
      kelasPremium: "Belajar React.js",
      status: "SUDAH BAYAR",
      metodePembayaran: "PayPal",
      tanggalBayar: "22 Sep, 2023 at 3.30 PM",
    },
    {
      id: "johndoe5",
      kategori: "UI/UX Design",
      kelasPremium: "Desain Interaksi untuk Aplikasi Mobile",
      status: "SUDAH BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: "23 Sep, 2023 at 10.45 AM",
    },
    {
      id: "johndoe8",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Konten Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: null,
    },
  ];

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredPayments = dummyPayments.filter((item) => {
    return (
      item.id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
      item.kelasPremium.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase()) ||
      item.metodePembayaran.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.tanggalBayar &&
        item.tanggalBayar.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  const sortedPayments = filteredPayments.sort((a, b) => {
    if (filterType === "ASC") {
      return a.id.localeCompare(b.id);
    } else {
      return b.id.localeCompare(a.id);
    }
  });

  return (
    <div className="px-10 font-poppin">
      <div className="flex flex-1 items-center justify-between mb-4 ps-5 bg-gray-800">
        <div className="text-2xl font-semibold text-white">
          {" "}
          Status Pembayaran
        </div>
        <div>
          <Filter onFilterChange={handleFilterChange} onSearch={handleSearch} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <caption className="text-lg font-semibold mb-4">
            Tabel Status Pembayaran.
          </caption>
          <thead className="bg-gray-200 text-sm h-12 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-4 text-left text-teal-600 font-bold">
                ID
              </th>
              <th className="py-2 px-4 text-left font-bold">Kategori</th>
              <th className="py-2 px-4 text-left font-bold">Kelas Premium</th>
              <th className="py-2 px-4 text-left font-bold">Status</th>
              <th className="py-2 px-4 text-left font-bold">
                Metode Pembayaran
              </th>
              <th className="py-2 px-4 text-left font-bold">Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-sm">{item.id}</td>
                <td className="py-2 px-4 text-sm">{item.kategori}</td>
                <td className="py-2 px-4 text-sm">{item.kelasPremium}</td>
                <td
                  className={`py-2 px-4 text-sm ${
                    item.status === "BELUM BAYAR"
                      ? "text-red-500"
                      : "text-teal-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-2 px-4 text-sm">{item.metodePembayaran}</td>
                <td className="py-2 px-4 text-sm">{item.tanggalBayar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

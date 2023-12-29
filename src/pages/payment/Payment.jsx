import { useState } from "react";

const Payment = () => {
  const [card, setCard] = useState(true);

  return (
    <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        {/* Komponen Pembayaran */}
        <div>
          {/* Latar belakang kartu */}
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
            <img
              className="rounded-t shadow-lg"
              src="https://preview.cruip.com/mosaic/images/pay-bg.jpg"
              width="460"
              height="180"
              alt="Pay background"
            />
          </div>
          {/* Tubuh kartu */}
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
            <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
              {/* Header kartu */}
              <div className="text-center mb-6">
                <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">
                  Pembayaran Kelas
                </h1>
                <div className="text-sm">
                  Lakukan pembayaran untuk materi pembelajaran yang lebih jauh
                  lagi.
                </div>
              </div>

              {/* Toggle */}
              <div className="flex justify-center mb-6">
                <div className="relative flex w-full p-1 bg-gray-50 rounded">
                  <span
                    className="absolute inset-0 m-1 pointer-events-none"
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                        card ? "translate-x-0" : "translate-x-full"
                      }`}
                    ></span>
                  </span>
                  <button
                    className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                    onClick={() => setCard(true)}
                  >
                    Bayar dengan Kartu
                  </button>
                  <button
                    className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                    onClick={() => setCard(false)}
                  >
                    Bayar dengan PayPal
                  </button>
                </div>
              </div>

              {/* Formulir Kartu */}
              {card && (
                <div className="space-y-4">
                  {/* Nomor Kartu */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-nr"
                    >
                      Nomor Kartu <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-nr"
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                      type="text"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div>
                  {/* Tanggal Kedaluwarsa dan CVC */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-expiry"
                      >
                        Tanggal Kedaluwarsa{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-expiry"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-cvc"
                      >
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-cvc"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="000"
                      />
                    </div>
                  </div>
                  {/* Nama pada Kartu */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-name"
                    >
                      Nama pada Kartu <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-name"
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-email"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-email"
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Form footer */}
                  <div className="mt-6">
                    <div className="mb-4">
                      <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                        Bayar Rp. 100.000,-
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Anda akan dikenakan biaya Rp. 100.000, termasuk Rp. 10.000
                      untuk PPN di Indonesia
                    </div>
                  </div>
                </div>
              )}

              {/* Formulir PayPal */}
              {!card && (
                <div>
                  <div className="mb-4">
                    <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                      Bayar dengan PayPal - Rp. 100.000,-
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 italic text-center">
                    Anda akan dikenakan biaya Rp. 100.000, termasuk Rp. 10.000
                    untuk PPN di Indonesia
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;

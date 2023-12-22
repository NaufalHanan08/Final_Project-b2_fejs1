function Benefits() {
  return (
    <div className="w-full h-fit flex justify-center">
      <div className="benefits-content w-full py-2 md:px-10 px-4 overflow-hidden">
        <h3 className="w-fit bg-gray-800 text-white font-bold px-5 py-1 shadow-md">
          <span className="text-teal-600">LEARN</span> ANYTHING
        </h3>
        <h1 className="text-black font-bold md:text-3xl text-2xl mb-10 py-1 overflow-hidden">
          Keuntungan belajar bersama{" "}
          <span className="text-teal-600 underline">Byte</span>Academy
        </h1>
        <div className="flex flex-col gap-2">
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-8 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">Belajar secara online</h2>
            <p className="text-justify">
              Belajar bisa dilakukan dimana saja dan kapanpun asal mau berusaha
            </p>
          </a>
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-10 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">Sertifikat</h2>
            <p className="text-justify">
              Dapatkan kesempatan meraih sertifikasi profesional sebagai bahan
              tambahan portofolio anda
            </p>
          </a>
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-10 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">
              Kesempatan belajar dengan ahlinya
            </h2>
            <p className="text-justify">
              Jangan lewatkan kesempatan untuk belajar sesuai bidang teknologi
              yang anda inginkan bersama pengajar profesional di bidangnya
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Benefits;

import { useNavigate } from 'react-router-dom';

function RegisterBanner() {
  const navigate = useNavigate('');

  return (
    <div className="lg:px-20 md:px-12 sm:px-8 px-4 my-10">
      <div className="w-full h-60 bg-gray-800 flex justify-center items-center text-center rounded-lg">
        <div className="flex flex-col gap-5">
          <h1 className="xl:text-4xl md:text-3xl sm:text-2xl text-xl pb-3 font-semibold text-white">Tunggu apa lagi?</h1>
          <p className="text-slate-300 xl:text-lg md:text-md text-xs px-5">Ayo daftarkan dirimu sekarang juga dan mulai belajar bersama kami!</p>
          <button onClick={() => navigate('/register')} className="bg-teal-600 text-white hover:bg-gray-800 border border-teal-600 hover:border-teal-600 transition-all rounded-md py-3 px-6 flex justify-center items-center m-auto">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterBanner;
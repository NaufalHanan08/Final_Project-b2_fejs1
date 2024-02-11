import { useNavigate } from 'react-router-dom';
import heroimg from '../assets/heroimg.png';

function Hero() {
  const navigate = useNavigate('');

  return (
    <div className="w-full bg-teal-600">
      <div className="bg-hero w-full md:h-fit md:block flex flex-col-reverse items-center md:px-6 px-5">
        <div className="hero-content  lg:w-3/5 md:w-2/4 w-full md:py-28 py-5 md:mb-0 mb-20 md:mt-10 mt-0 overflow-hidden md:block flex flex-col items-center">
          <h1 className="sm:text-4xl text-2xl font-bold text-white py-2 md:text-start text-center">Belajar Pemrograman Bersama Ahlinya di ByteAcademy</h1>
          <h2 className="md:text-2xl text-lg font-light text-white py-6 md:text-start text-center">Tidak ada kata terlambat untuk belajar</h2>
          <div>
            <button
              onClick={() => navigate('/register')}
              className="text-white font-semibold bg-gray-800 border border-gray-800 hover:bg-teal-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-300 rounded-lg py-2 px-3 mt-5"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
        <div className="md:pb-0 pb-6">
          <img src={heroimg} alt="hero-img" className="md:h-80 h-3/4 md:absolute static md:mt-0 mt-20 right-20 lg:top-48 md:top-60 bg-teal-600 border-b-4 border-teal-900 rounded-full p-3 shadow-lg shadow-teal-900" />
        </div>
      </div>
    </div>
  );
}

export default Hero;

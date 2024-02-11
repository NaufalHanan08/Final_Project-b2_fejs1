import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Thanks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/courses');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <h1 className="text-3xl py-px font-bold text-black mb-2">Selamat!</h1>
          <p className="text-black mb-4">Lihat Kelasmu yuk!</p>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={handleButtonClick}>
            Lihat Kelas
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Thanks;
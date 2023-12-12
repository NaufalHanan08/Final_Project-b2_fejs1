import { useNavigate } from 'react-router-dom';
import CardComponent from './CourseCard';

function CourseList() {
  const navigate = useNavigate('');

  return (
    <div className="py-28 flex flex-col items-center xl:px-20 md:px-14 sm:px-8 px-4">
      <h1 className="md:text-5xl text-3xl text-center font-bold overflow-hidden mb-5">
        Featured <span className="text-teal-600">Courses</span>
      </h1>
      <CardComponent />
      <div className="w-full px-5">
        <a onClick={() => navigate('/course')} className="flex sm:justify-end justify-center underline text-gray-800 font-semibold text-lg cursor-pointer">
          Lihat semua course
        </a>
      </div>
    </div>
  );
}

export default CourseList;

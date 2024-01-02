import { useNavigate } from 'react-router-dom';
import HomeCourseCategory from './HomeCourseCategory';
import { MdDoubleArrow } from 'react-icons/md';

function CourseList() {
  const navigate = useNavigate('');

  return (
    <div className="py-28 flex flex-col items-center lg:px-20">
      <h1 className="text-5xl text-center font-bold overflow-hidden mb-5">
        Featured <span className="text-teal-600">Courses</span>
      </h1>
      <HomeCourseCategory />
      <div className="w-full flex justify-center px-8">
        <button onClick={() => navigate('/courses')} className="md:w-3/5 w-full flex items-center justify-center gap-1 text-white font-semibold hover:bg-gray-700 transition-all bg-gray-800 py-2 px-10">
          <p className="flex items-center text-lg gap-1">
            SEE ALL <span className="text-teal-600 font-bold">COURSE</span>
            <MdDoubleArrow className="text-2xl" />
          </p>
        </button>
      </div>
    </div>
  );
}

export default CourseList;

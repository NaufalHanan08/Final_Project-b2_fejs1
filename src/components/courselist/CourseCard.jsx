import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RiShieldStarLine } from "react-icons/ri";
import { RiBook3Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";

export default function CourseCard({ courses }) {
  return (
    <>
      <div className="grid xl:gap-2 md:gap-4 gap-2 md:grid-cols-2 grid-cols-1 p-5">
        {courses.map((result) => (
          <div key={result.slugCourse} className="shadow-lg rounded-2xl">
            <Link to={`/detail/${result.slugCourse}`}>
              <img
                className="w-full sm:h-48 h-28 object-cover"
                src={result.pathCourseImage}
                alt={result.category.categoryName}
              />
              <div className="px-4 pb-2 pt-1">
                <h2 className="lg:text-lg md:text-xl text-md text-teal-600">
                  {result.category.categoryName}
                </h2>
                <h1 className="lg:text-xl md:text-2xl sm:text-xl text-lg font-semibold">
                  {result.courseName}
                </h1>
                <p className="text-xs font-light">by {result.instructorName}</p>
                <div className="flex justify-around flex-wrap md:gap-2 py-2">
                  <p className="text-blue-700 font-bold sm:text-sm text-xs flex items-center gap-1">
                    <RiShieldStarLine className="text-green-600 text-lg" />
                    {result.courseLevel} Level
                  </p>
                  <p className="sm:text-sm text-xs flex items-center gap-1">
                    <RiBook3Line className="text-green-600 text-lg" />
                    {result.totalChapters} Modul
                  </p>
                  <p className="sm:text-sm text-xs flex items-center gap-1">
                    <HiClock className="text-green-600 text-lg" />
                    {result.courseDuration} Menit
                  </p>
                </div>
                <button className="bg-teal-600 text-white text-sm font-medium py-1 px-4 rounded-full">
                  {result.courseType}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// Prop types
CourseCard.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      slugCourse: PropTypes.string.isRequired,
      pathCourseImage: PropTypes.string.isRequired,
      category: PropTypes.shape({
        categoryName: PropTypes.string.isRequired,
      }).isRequired,
      courseName: PropTypes.string.isRequired,
      instructorName: PropTypes.string.isRequired,
      courseLevel: PropTypes.string.isRequired,
      totalChapters: PropTypes.number.isRequired,
      courseDuration: PropTypes.number.isRequired,
      courseType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

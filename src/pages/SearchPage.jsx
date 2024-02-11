import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiShieldStarLine } from 'react-icons/ri';
import { RiBook3Line } from 'react-icons/ri';
import { HiClock } from 'react-icons/hi2';

function SearchPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [page0Response, page1Response] = await Promise.all([axios.get('https://byteacademy.as.r.appspot.com/api/v1/course/search?page=0'), axios.get('https://byteacademy.as.r.appspot.com/api/v1/course/search?page=1')]);

        const page0Data = page0Response.data.results.content;
        const page1Data = page1Response.data.results.content;
        const allCourses = [...page0Data, ...page1Data];

        setCourses(allCourses);

        setLoading(false);
      } catch (error) {
        console.log('Error fetching search data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);

        const response = await axios.get('https://byteacademy.as.r.appspot.com/api/v1/category?page=0');
        setCategories(response.data.results.content);
      } catch (error) {
        console.log('Error fetching category:', error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleSearch = () => {
    const results = courses.filter(
      (course) =>
        course.category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseLevel.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setShowCourses(true);
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-fit flex justify-center items-center lg:px-14 py-10 md:px-10 px-4 bg-teal-600">
        <div className="bg-white xl:w-3/4 lg:w-11/12 w-full min-h-screen mt-14 border-2 rounded-md md:p-5">
          <div className="flex mb-4">
            <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border-2 p-2 rounded-md" />
            <button onClick={handleSearch} className="border py-2 px-6 bg-teal-600 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                  fill="#EBF3FC"
                />
                <path
                  d="M11.4121 8.58609C11.7911 8.96609 12.0001 9.46809 12.0001 10.0001H14.0001C14.001 9.47451 13.8977 8.95398 13.6961 8.46857C13.4946 7.98316 13.1989 7.54251 12.8261 7.17209C11.3121 5.66009 8.68707 5.66009 7.17407 7.17209L8.58607 8.58809C9.34607 7.83009 10.6561 7.83209 11.4121 8.58609Z"
                  fill="#EBF3FC"
                />
              </svg>
            </button>
          </div>
          {loading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <div className="custom-loader p-2"></div>
            </div>
          ) : (
            <>
              {showCourses ? (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4 ms-5">Search Results</h2>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-5">
                    {searchResults.map((result) => (
                      <div key={result.slugCourse} className="shadow-lg rounded-2xl">
                        <Link to={`/detail/${result.slugCourse}`}>
                          <img className="w-full" src={result.pathCourseImage} alt={result.category.categoryName} />
                          <div className="px-4 py-2">
                            <h2 className="lg:text-lg md:text-xl text-md text-teal-600">{result.category.categoryName}</h2>
                            <h1 className="lg:text-xl md:text-2xl sm:text-xl text-lg font-semibold">{result.courseName}</h1>
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
                            <button className="bg-teal-600 text-white text-sm font-medium py-1 px-4 rounded-full">{result.courseType}</button>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4 ms-5">COURSE CATEGORY</h2>
                  <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-5">
                    {categories.map((category) => (
                      <div key={category.slugCategory} className="shadow-lg">
                        <div>
                          <img className="" src={category.pathCategoryImage} alt={category.categoryName} />
                          <h1 className="text-center py-2 font-semibold md:text-lg sm:text-md text-sm">{category.categoryName}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;
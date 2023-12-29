import CourseCard from "../../components/courselist/CourseCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function AllCourses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categoryFilters, setCategoryFilters] = useState({});
  const [levelFilters, setLevelFilters] = useState({
    BEGINNER: false,
    INTERMEDIATE: false,
    ADVANCED: false,
  });
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortFilter, setSortFilter] = useState({
    newest: false,
    popular: false,
    promo: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [page0Response, page1Response] = await Promise.all([
          axios.get(
            "https://byteacademy.as.r.appspot.com/api/v1/course/search?page=0"
          ),
          axios.get(
            "https://byteacademy.as.r.appspot.com/api/v1/course/search?page=1"
          ),
        ]);

        const page0Data = page0Response.data.results.content;
        const page1Data = page1Response.data.results.content;
        const allCourses = [...page0Data, ...page1Data];

        setCourses(allCourses);

        setLoading(false);

        // Extracting unique categories from the API response
        const uniqueCategories = Array.from(
          new Set(allCourses.map((course) => course.category.categoryName))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses([]);
    } else {
      const filtered = courses.filter((course) => course.courseType === filter);
      setFilteredCourses(filtered);
    }
  }, [filter, courses]);

  const handleCategoryFilter = (category) => {
    let updatedFilters = { ...categoryFilters };

    if (category === "all") {
      updatedFilters = {};
    } else {
      updatedFilters[category] = !categoryFilters[category];
    }

    setCategoryFilters(updatedFilters);
  };

  const handleLevelFilter = (level) => {
    setLevelFilters((prevFilters) => ({
      ...prevFilters,
      [level]: !prevFilters[level],
    }));
  };

  useEffect(() => {
    const selectedCategories = Object.keys(categoryFilters).filter(
      (category) => categoryFilters[category]
    );

    const selectedLevels = Object.keys(levelFilters).filter(
      (level) => levelFilters[level]
    );

    if (
      selectedCategories.length === 0 &&
      filter === "all" &&
      selectedLevels.length === 0
    ) {
      setFilteredCourses([]);
    } else {
      const filtered = courses.filter((course) => {
        return (
          (selectedCategories.length === 0 ||
            selectedCategories.includes(course.category.categoryName)) &&
          (filter === "all" || course.courseType === filter) &&
          (selectedLevels.length === 0 ||
            selectedLevels.includes(course.courseLevel))
        );
      });

      setFilteredCourses(filtered);
    }
  }, [categoryFilters, filter, courses, levelFilters]);

  useEffect(() => {
    let sortedCourses = [...courses];

    if (sortFilter.newest) {
      sortedCourses.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortFilter.popular) {
      sortedCourses.sort((a, b) => b.totalCourseRate - a.totalCourseRate);
    } else if (sortFilter.promo) {
      sortedCourses = sortedCourses.filter((course) => course.price === 0);
    }

    setFilteredCourses(sortedCourses);
  }, [sortFilter, courses]);

  const coursesToShow = filteredCourses.length > 0 ? filteredCourses : courses;

  return (
    <>
      <Navbar />
      {/* <div className="w-full bg-gray-800">tes</div> */}
      <div className="flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-3 z-40 p-2 bg-gray-800 text-white rounded-md"
        >
          {sidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* SIDEBAR */}

        <div
          className={`md:w-1/4 sm:w-2/5 w-full p-4 fixed h-full flex flex-col sm:justify-center justify-evenly sm:py-0 py-16 sm:gap-4 overflow-y-auto bg-gray-800 text-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0`}
          // className="md:w-1/4 w-2/6 p-4 fixed h-full flex flex-col md:justify-center justify-evenly gap-4 overflow-y-auto bg-gray-800 text-white"
        >
          <div>
            <h1 className="md:text-lg sm:text-md text-sm font-bold text-teal-600">
              Filter
            </h1>
            <hr />
            <ul className="mt-2">
              <li className="mb-2 flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="newest"
                  checked={sortFilter.newest}
                  onChange={() =>
                    setSortFilter((prevFilters) => ({
                      ...prevFilters,
                      newest: !prevFilters.newest,
                      popular: false,
                      promo: false,
                    }))
                  }
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="newest"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Paling Baru
                </label>
              </li>
              <li className="mb-2 flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={sortFilter.popular}
                  onChange={() =>
                    setSortFilter((prevFilters) => ({
                      ...prevFilters,
                      popular: !prevFilters.popular,
                      newest: false,
                      promo: false,
                    }))
                  }
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="popular"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Paling Populer
                </label>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="promo"
                  checked={sortFilter.promo}
                  onChange={() =>
                    setSortFilter((prevFilters) => ({
                      ...prevFilters,
                      promo: !prevFilters.promo,
                      newest: false,
                      popular: false,
                    }))
                  }
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="promo"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Promo
                </label>
              </li>
            </ul>
          </div>
          {/* Category checkboxes */}
          <div>
            <h1 className="md:text-lg sm:text-md text-sm font-bold text-teal-600">
              Kategori
            </h1>
            <hr />
            <ul className="mt-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className="mb-2 flex flex-wrap items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id={category}
                    checked={categoryFilters[category]}
                    onChange={() => handleCategoryFilter(category)}
                    className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                  />
                  <label
                    htmlFor={category}
                    className="md:text-md sm:text-sm text-xs text-center"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {/* Level checkboxes */}
          <div>
            <h1 className="md:text-lg sm:text-md text-sm font-bold text-teal-600">
              Level Kesulitan
            </h1>
            <hr />
            <ul className="mt-2">
              <li className="mb-2 flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="BEGINNER"
                  checked={levelFilters.BEGINNER}
                  onChange={() => handleLevelFilter("BEGINNER")}
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="BEGINNER"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Beginner Level
                </label>
              </li>
              <li className="mb-2 flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="INTERMEDIATE"
                  checked={levelFilters.INTERMEDIATE}
                  onChange={() => handleLevelFilter("INTERMEDIATE")}
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="INTERMEDIATE"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Intermediate Level
                </label>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  id="ADVANCED"
                  checked={levelFilters.ADVANCED}
                  onChange={() => handleLevelFilter("ADVANCED")}
                  className="md:h-5 md:w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="ADVANCED"
                  className="md:text-md sm:text-sm text-xs text-center"
                >
                  Advanced Level
                </label>
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div
          className="md:w-3/4 w-full md:p-4 py-2 px-1 ml-auto"
          // className={`${
          //   sidebarOpen ? "md:w-3/4 w-2/3" : "w-full"
          // } md:p-4 py-2 px-1 ml-auto md:w-3/4`}
        >
          {/* Your existing code */}
          {loading ? (
            <div className="w-full h-screen flex justify-center items-center">
              {/* <p className="text-4xl text-teal-600 font-extrabold">
                Loading...
              </p> */}
              <div className="custom-loader p-2"></div>
            </div>
          ) : (
            <>
              <div className="flex md:justify-center justify-end md:mt-16 mt-32 md:gap-2 gap-1">
                <button
                  className={`${
                    filter === "all"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-teal-600"
                  } font-bold w-28 py-2 rounded-2xl`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`${
                    filter === "FREE"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-teal-600"
                  } text-teal-600 font-bold lg:w-72 md:w-56 w-28 rounded-2xl`}
                  onClick={() => setFilter("FREE")}
                >
                  Gratis
                </button>
                <button
                  className={`${
                    filter === "PREMIUM"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-teal-600"
                  } text-teal-600 font-bold md:w-56 w-28 rounded-2xl`}
                  onClick={() => setFilter("PREMIUM")}
                >
                  Premium
                </button>
                <button
                  className={`${
                    filter === "myCourses"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-teal-600"
                  } text-teal-600 font-bold md:w-56 w-28 rounded-2xl`}
                  onClick={() => setFilter("myCourses")}
                >
                  Kelas Saya
                </button>
              </div>
              <CourseCard courses={coursesToShow} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCourses;

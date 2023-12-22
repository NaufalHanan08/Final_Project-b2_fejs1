import CourseCard from "../../components/courselist/CourseCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function AllCourses() {
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
    axios
      .get("https://byteacademy.as.r.appspot.com/api/v1/course/search?page=0")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data.results.content);

        // Extracting unique categories from the API response
        const uniqueCategories = Array.from(
          new Set(
            res.data.results.content.map(
              (course) => course.category.categoryName
            )
          )
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.log("error", err));
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
      <div className="w-full bg-gray-800">tes</div>
      <div className="flex">
        {/* SIDEBAR */}
        <div className="w-1/4 p-4 fixed h-full flex flex-col justify-center gap-4 overflow-y-auto bg-gray-800 text-white">
          <div>
            <h1 className="text-lg font-bold text-teal-600">Filter</h1>
            <hr />
            <ul className="mt-2">
              <li className="mb-2 flex items-center gap-2">
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
                  className="h-5 w-5"
                />
                <label htmlFor="newest">Paling Baru</label>
              </li>
              <li className="mb-2 flex items-center gap-2">
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
                  className="h-5 w-5"
                />
                <label htmlFor="popular">Paling Populer</label>
              </li>
              <li className="flex items-center gap-2">
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
                  className="h-5 w-5"
                />
                <label htmlFor="promo">Promo</label>
              </li>
            </ul>
          </div>
          {/* Category checkboxes */}
          <div>
            <h1 className="text-lg font-bold text-teal-600">Kategori</h1>
            <hr />
            <ul className="mt-2">
              {categories.map((category) => (
                <li key={category} className="mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={categoryFilters[category]}
                    onChange={() => handleCategoryFilter(category)}
                    className="h-5 w-5"
                  />
                  <label htmlFor={category}>{category}</label>
                </li>
              ))}
            </ul>
          </div>
          {/* Level checkboxes */}
          <div>
            <h1 className="text-lg font-bold text-teal-600">Level Kesulitan</h1>
            <hr />
            <ul className="mt-2">
              <li className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="BEGINNER"
                  checked={levelFilters.BEGINNER}
                  onChange={() => handleLevelFilter("BEGINNER")}
                  className="h-5 w-5"
                />
                <label htmlFor="BEGINNER">Beginner Level</label>
              </li>
              <li className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="INTERMEDIATE"
                  checked={levelFilters.INTERMEDIATE}
                  onChange={() => handleLevelFilter("INTERMEDIATE")}
                  className="h-5 w-5"
                />
                <label htmlFor="INTERMEDIATE">Intermediate Level</label>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ADVANCED"
                  checked={levelFilters.ADVANCED}
                  onChange={() => handleLevelFilter("ADVANCED")}
                  className="h-5 w-5"
                />
                <label htmlFor="ADVANCED">Advanced Level</label>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-3/4 p-4 ml-auto">
          <div className="flex justify-center mt-10 space-x-4">
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
              } text-teal-600 font-bold w-72 rounded-2xl`}
              onClick={() => setFilter("FREE")}
            >
              Gratis
            </button>
            <button
              className={`${
                filter === "PREMIUM"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-teal-600"
              } text-teal-600 font-bold w-56 rounded-2xl`}
              onClick={() => setFilter("PREMIUM")}
            >
              Premium
            </button>
          </div>
          <CourseCard courses={coursesToShow} />
        </div>
      </div>
    </>
  );
}

export default AllCourses;

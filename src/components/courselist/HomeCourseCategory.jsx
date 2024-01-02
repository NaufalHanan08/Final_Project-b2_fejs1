import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeCourseCategory() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("https://byteacademy.as.r.appspot.com/api/v1/course/search?page=0")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data.results.content);
      })
      .catch((err) => console.log("Error fetching home category:", err));
  }, []);

  const displayedCourses = courses.slice(0, 4);

  return (
    <>
      <div className="grid xl:gap-2 md:gap-4 xl:grid-cols-4 md:grid-cols-2 py-5 px-0">
        {displayedCourses.map((course, key) => (
          <div
            className="w-full rounded-lg shadow-md lg:max-w-sm hover:shadow-md hover:shadow-black transition-all"
            key={key}
          >
            <img
              className="object-cover w-full h-48"
              src={course.category.pathCategoryImage}
              alt={course.category.categoryName}
            />
            <div className="p-4">
              <h4 className="text-lg text-center font-semibold text-black">
                {course.category.categoryName}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

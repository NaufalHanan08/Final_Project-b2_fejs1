import { useEffect, useState } from "react";
import axios from "axios";

export default function CardComponent() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses initially
    axios
      .get("https://byteacademy.as.r.appspot.com/api/v1/course/search?page=0")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data.results.content);
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <>
      <div className="grid xl:gap-2 md:gap-6 xl:grid-cols-4 md:grid-cols-2 p-5">
        {courses.map((course, key) => (
          <div
            className="w-full rounded-lg shadow-md lg:max-w-sm hover:shadow-md hover:shadow-black transition-all"
            key={key}
          >
            <img
              className="object-cover w-full h-48"
              src={course.category.pathCategoryImage}
              alt={course.categoryName}
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

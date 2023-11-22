import { useState } from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import CourseList from "../components/courselist/CourseList";
import Benefits from "../components/Benefits";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Navbar />
      <Carousel />
      {isLoggedIn ? (
        <CourseList />
      ) : (
        <div className="py-20 flex flex-col items-center px-20">
          <h1 className="text-5xl text-center font-bold overflow-hidden mb-5">
            Featured Courses
          </h1>
          <p className="mb-10 text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi rerum
            similique illo laborum dolor expedita iure sunt placeat repudiandae
            sequi at ipsa obcaecati, consectetur consequatur eos, odio vero
            ducimus culpa qui saepe distinctio eveniet soluta. Quidem vero a
            ullam nam?
          </p>
          <div className="w-full border flex justify-center py-5">
            <button
              onClick={login}
              className="bg-lime-700 p-5 text-white text-xl font-medium"
            >
              Login to see Courses
            </button>
          </div>
        </div>
      )}
      <Benefits />
    </>
  );
}

export default HomePage;

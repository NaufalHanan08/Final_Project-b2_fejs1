import { Typography } from "@material-tailwind/react";
import Navbar from "../Navbar";
import { RiShieldStarLine } from "react-icons/ri";
import { RiBook3Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import { HiChatAlt2 } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CourseDetail() {
  const { slugCourse } = useParams();
  const [detailCourses, setDetailCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://byteacademy.as.r.appspot.com/api/v1/course/${slugCourse}`
        );
        console.log("Course Detail:", response.data);

        if (response.data.code === 200) {
          setDetailCourses(response.data.results);
        } else {
          setError(`Error: ${response.data.code} - ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setError("Failed to get course detail");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [slugCourse]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!detailCourses) {
    return <p>Data not found</p>;
  }

  return (
    <>
      <Navbar />
      <div className="py-6">
        <div className="bg-gray-800 py-10 px-12">
          <div className="inline-flex items-center mt-8">
            <Link to="/course">
              <FaArrowLeft className="text-white" />
            </Link>
            <Typography className="font-bold mx-4 text-white">
              Kelas Lainnya
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography className="mt-4 font-bold text-teal-600 text-2xl">
                {detailCourses.category.categoryName}
              </Typography>
              <Typography className="mt-4 font-bold text-white text-lg inline-flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {detailCourses.totalCourseRate}
              </Typography>
            </div>
            <Typography className="font-bold text-white text-xl py-1">
              {detailCourses.courseName}
            </Typography>
            <Typography className="mb-2 font-medium text-white text-sm">
              by {detailCourses.instructorName}
            </Typography>
            <div className="flex gap-4 my-3">
              <div className="inline-flex items-center gap-1">
                <RiShieldStarLine className="text-green-600" />
                <Typography className="text-blue-500 font-bold text-sm items-center mb-px">
                  {detailCourses.courseLevel} Level
                </Typography>
              </div>
              <div className="inline-flex items-center gap-1">
                <RiBook3Line className="text-green-600" />
                <Typography className="font-bold text-white text-sm items-center mb-px">
                  {detailCourses.totalChapter} Modul
                </Typography>
              </div>
              <div className="inline-flex items-center gap-1">
                <HiClock className="text-green-600" />
                <Typography className="font-bold text-white text-sm items-center mb-px">
                  {detailCourses.courseDuration} Menit
                </Typography>
              </div>
            </div>
            <a
              href={detailCourses.groupLink}
              className="bg-teal-600 text-white hover:bg-white hover:text-teal-600 transition-all border border-teal-600 text-md rounded-full inline-flex justify-center items-center gap-2 py-1 w-60 mb-2"
            >
              <span className="font-bold">Join Grup Whatsapp</span>{" "}
              <HiChatAlt2 className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="flex lg:flex-wrap flex-wrap-reverse justify-center w-full lg:pe-8">
          <div className="lg:w-3/5">
            <div className="w-full py-8 px-10">
              <video className="flex justtify-center rounded-2xl" controls>
                <source
                  src="https://docs.material-tailwind.com/demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="lg:ps-12 lg:px-0 px-12">
              <Typography className="heading-2 font-bold my-2 text-xl">
                Tentang Kelas
              </Typography>
              <Typography className="my-2 font-normal">
                {detailCourses.courseDescription}
              </Typography>
              <Typography className="heading-2 font-bold mt-6 text-xl ">
                Kelas ini ditujukan untuk
              </Typography>
              <div className="font-normal mt-4">
                {detailCourses.targetMarket.split("\n").map((item, index) => (
                  <p key={index}>{item.trim()}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-2 rounded-2xl shadow-xl lg:h-screen lg:w-2/6 w-1/2 mt-8 lg:ms-16 lg:mx-0 mx-8 py-2 px-4">
            <h1 className="font-bold text-xl">Materi Belajar</h1>
            {detailCourses.chapters.map((chapter, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h2 className="text-teal-600 xl:text-sm text-xs font-bold">
                    <span>Chapter {chapter.noChapter}</span> -
                    <span> {chapter.title}</span>
                  </h2>
                  <h2 className="text-blue-600 text-xs font-bold">
                    {chapter.chapterDuration} Menit
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

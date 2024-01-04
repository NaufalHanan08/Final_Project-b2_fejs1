import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { RiBook3Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import { HiChatAlt2 } from "react-icons/hi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { Typography } from "@material-tailwind/react";
import VideoPlayer from "./CourseMaterial";
import Cookies from "js-cookie";

const CourseDetail = () => {
  const { slugCourse } = useParams();
  const [detailCourses, setDetailCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_PAYMENT_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    const fetchCourseDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://byteacademy.as.r.appspot.com/api/v1/course/${slugCourse}`
        );

        console.log(response.data);
        if (response.data.code === 200) {
          setDetailCourses(response.data.results);
        } else {
          setError(
            `Error fetching course detail: ${response.data.code} - ${response.data.message}`
          );
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setError("Failed to get course detail");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();

    return () => {
      document.body.removeChild(script);
    };
  }, [slugCourse]);

  const handleBuyCourse = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      const midtransResponse = await axios.post(
        `https://byteacademy.as.r.appspot.com/api/v1/customer/purchase/${slugCourse}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(midtransResponse.data);

      window.snap.embed(midtransResponse.data.results.tokenPurchase, {
        embedId: "snap-container",
        onSuccess: function (result) {
          console.log("Payment successful!", result);
          navigate("/payment-success");
        },
        onError: function (result) {
          console.error("Payment failed!", result);
        },
        onClose: function () {
          console.log("Pop-up closed without payment");
        },
      });
    } catch (error) {
      console.error("Error initiating purchase:", error);
    }
  };

  const handleChapterClick = (material) => {
    setSelectedMaterial(material);

    const materialApiUrl = `https://byteacademy.as.r.appspot.com/api/v1/customer/material/${material?.slugMaterial}`;
    const accessToken = Cookies.get("accessToken");
    axios
      .get(materialApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Material API Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching material data:", error);
      });
  };

  const handleMaterialViewed = async (slugMaterial) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken"))
        .split("=")[1];

      const response = await axios.post(
        `https://byteacademy.as.r.appspot.com/api/v1/customer/material/${slugMaterial}/complete`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.results && response.data.code === 200) {
        console.log("Material marked as viewed successfully!");
      } else {
        console.error(
          "Error marking material as viewed:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error marking material as viewed:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="custom-loader p-2"></div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div id="snap-container"></div>
      <div className="py-6">
        <div className="bg-gray-800 py-10 md:px-12 sm:px-8 px-4">
          <div className="inline-flex items-center mt-8">
            <Link to="/courses">
              <FaArrowLeft className="text-white sm:text-lg text-sm" />
            </Link>
            <Typography className="font-bold mx-4 text-white sm:text-lg text-sm">
              Kelas Lainnya
            </Typography>
          </div>
          <div className="flex flex-col sm:items-start items-center w-full">
            <div className="flex sm:justify-between justify-evenly items-center w-full">
              <Typography className="mt-4 font-bold text-teal-600 xs:text-2xl text-xl">
                {detailCourses.category.categoryName}
              </Typography>
              <Typography className="mt-4 font-bold text-white sm:text-lg text-sm sm:text-start text-center inline-flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {detailCourses.totalCourseRate}
              </Typography>
            </div>
            <Typography className="font-bold text-white sm:text-start text-center sm:text-xl xs:text-lg text-md py-1">
              {detailCourses.courseName}
            </Typography>
            <Typography className="mb-2 font-medium sm:text-start text-center text-white sm:text-sm text-xs">
              by {detailCourses.instructorName}
            </Typography>
            <div className="flex gap-4 my-3 sm:justify-start justify-center">
              <div className="inline-flex items-center gap-1">
                <RiShieldStarLine className="text-green-600" />
                <Typography className="text-blue-500 font-bold sm:text-sm text-xs items-center mb-px">
                  {detailCourses.courseLevel} Level
                </Typography>
              </div>
              <div className="inline-flex items-center gap-1">
                <RiBook3Line className="text-green-600" />
                <Typography className="font-bold text-white sm:text-sm text-xs items-center mb-px">
                  {detailCourses.totalChapter} Modul
                </Typography>
              </div>
              <div className="inline-flex items-center gap-1">
                <HiClock className="text-green-600" />
                <Typography className="font-bold text-white sm:text-sm text-xs items-center mb-px">
                  {detailCourses.courseDuration} Menit
                </Typography>
              </div>
            </div>
            <a
              href={detailCourses.groupLink}
              className="bg-teal-600 text-white hover:bg-white hover:text-teal-600 transition-all border border-teal-600 sm:text-md text-sm rounded-full inline-flex justify-center items-center gap-2 py-1 sm:w-60 w-fit px-2 mb-2"
            >
              <span className="font-bold">Join Grup Whatsapp</span>{" "}
              <HiChatAlt2 className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="flex lg:flex-wrap flex-wrap-reverse justify-center w-full lg:pe-8">
          <div className="lg:w-3/5">
            <div className="py-8 pl-10 lg:pr-0 pr-10">
              {selectedMaterial === null && (
                <img
                  src={detailCourses.pathCourseImage}
                  alt={detailCourses.courseName}
                  className="w-full sm:h-96 h-fit object-cover rounded-xl"
                />
              )}
            </div>
            <VideoPlayer
              key={selectedMaterial?.slugMaterial}
              videoLink={`https://byteacademy.as.r.appspot.com/api/v1/customer/material/${selectedMaterial?.slugMaterial}`}
              materialData={selectedMaterial}
              onMaterialViewed={() =>
                handleMaterialViewed(selectedMaterial?.slugMaterial)
              }
            />
            <div className="lg:ps-12 lg:px-0 sm:px-12 px-6">
              <Typography className="heading-2 font-bold my-2 text-xl">
                Tentang Kelas
              </Typography>
              <Typography className="my-2 font-normal text-justify">
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
          <div className="border-2 rounded-2xl shadow-xl lg:h-screen h-fit lg:w-2/6 sm:w-1/2 w-full mt-8 lg:ms-16 lg:mx-0 sm:mx-8 mx-2 py-10 sm:px-6 px-2">
            <h1 className="font-bold text-xl sm:text-start text-center mb-4">
              Materi Belajar
            </h1>
            <div className="flex flex-col gap-8">
              {detailCourses.chapters.map((chapter, index) => (
                <div key={index}>
                  <div className="flex sm:flex-row flex-col justify-between items-center">
                    <h2 className="text-teal-600 xl:text-lg text-xs font-bold">
                      <span>Chapter {chapter.noChapter}</span> -
                      <span> {chapter.title}</span>
                    </h2>
                    <h2 className="text-blue-600 text-xs font-bold lg:pt-12">
                      {chapter.chapterDuration} Menit
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2 mt-2 sm:items-start items-center">
                    {chapter.materials.map((material) => (
                      <li
                        key={material.slugMaterial}
                        onClick={() => {
                          handleChapterClick(material);
                          handleMaterialViewed(material.slugMaterial);
                        }}
                        className="text-gray-800 hover:underline hover:font-extrabold transition-all cursor-pointer sm:text-start text-center text-xs font-semibold flex items-center gap-2"
                      >
                        <span>{material.serialNumber}</span>
                        {material.canBeWatched ? (
                          <IoIosLock />
                        ) : (
                          <MdOutlineVideoLibrary className="text-lg md:block hidden" />
                        )}
                        <span>{material.materialName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit sm:pb-4 pb-0 sm:px-8 px-0">
        <button
          className="flex justify-center w-full sm:rounded-lg rounded-none border border-teal-600 bg-teal-600 py-2 text-white hover:bg-white hover:text-teal-600 transition-all text-2xl font-bold"
          onClick={handleBuyCourse}
        >
          Beli Course
        </button>
      </div>
    </>
  );
};

export default CourseDetail;

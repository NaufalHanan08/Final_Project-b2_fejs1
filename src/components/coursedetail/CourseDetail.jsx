import { Typography } from "@material-tailwind/react";
import ArrowLeft from "../../assets/icons/fi_arrow-left.svg";
import Navbar from "../Navbar";

export default function CourseDetail() {
  return (
    <>
    <Navbar/>
      <div className="container ms-5 py-6 sm:ps-20 sm:py-20">
        <div className="inline-flex mt-10 sm: ">
          <img src={ArrowLeft} alt="" className="w-6" />
          <Typography className="font-bold mx-4">Kelas Lainnya</Typography>
        </div>
        <div>
          <Typography className="ms-6 mt-4 font-bold text-teal-600 text-lg">Category</Typography>
          <Typography className="ms-6 font-bold text-gray-900 text-lg">Intro to Basic of User Interaction Design</Typography>
          <Typography className="ms-6 mb-2 font-bold text-gray-900 text-sm">by ByteAcademy</Typography>
          <Typography className="ms-6 mb-2 font-bold text-gray-900 text-sm">by ByteAcademy</Typography>
          
        </div>
        <div className="detail">
          <video className="sm:w-auto  rounded-2xl" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
              />
            Your browser does not support the video tag.
          </video>
              <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </div>
      </div>
    </>
  );
}

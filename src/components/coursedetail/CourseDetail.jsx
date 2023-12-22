import { Typography } from "@material-tailwind/react";
import ArrowLeft from "../../assets/icons/fi_arrow-left.svg";
import Navbar from "../Navbar";
import Level from "../../assets/icons/Vector.svg";
import { Link } from "react-router-dom";

export default function CourseDetail() {
  return (
    <>
      <Navbar />
      <div className="container ms-5 py-6 sm:ps-20 sm:py-20">
        <div className="inline-flex mt-10 sm: ">
          <Link to="/course">
            <img src={ArrowLeft} alt="" className="w-6" />
          </Link>
          <Typography className="font-bold mx-4">Kelas Lainnya</Typography>
        </div>
        <div>
          <Typography className="ms-6 mt-4 font-bold text-teal-600 text-lg">
            Category
          </Typography>
          <Typography className="ms-6 font-bold text-gray-900 text-lg">
            Intro to Basic of User Interaction Design
          </Typography>
          <Typography className="ms-6 mb-2 font-bold text-gray-900 text-sm">
            by ByteAcademy
          </Typography>
          <div className="level-div inline-flex sm:ms-6 sm:my-2">
            <img src={Level} alt="" className="w-4" />
            <Typography className="ms-2 font-bold text-teal-600 text-sm align-items-center mb-px">
              Beginner Level
            </Typography>
          </div>
        </div>
        <div className="detail sm:pe-40 md:ms-5">
          <video className="sm:w-40 md:w-auto md:flex   rounded-2xl" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <Typography className="heading-2 font-bold my-2 text-xl">
            Tentang Kelas
          </Typography>
          <Typography className="my-2 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography className="heading-2 font-bold mt-4 text-xl ">
            Kelas ini ditujukan untuk
          </Typography>
          <Typography className="font-normal mt-4 ">
            Anda yang ingin memahami poin penting design system
          </Typography>
          <Typography className="font-normal mt-4 ">
            Anda yang ingin membantu perusahaan lebih optimal dalam membuat
            design produk
          </Typography>
          <Typography className="font-normal mt-4 ">
            Anda yang ingin latihan membangun design system
          </Typography>
          <Typography className="font-normal mt-4 ">
            Anda yang ingin latihan membangun design system
          </Typography>
        </div>
      </div>
    </>
  );
}

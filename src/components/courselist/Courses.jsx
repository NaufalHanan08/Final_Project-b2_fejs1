import CategoriesCard from "./CategoriesCard";
import CourseCard from "./CourseCard";
import Navbar from "../Navbar"
import { Typography } from "@material-tailwind/react";
import Footer from "../Footer"
const AllCourse = () => {
  return (
    <>
    <Navbar/>
    <div className="container block px-5 md:mx-16 lg:mx-px">
      <Typography className="pt-20 text-teal-600">#Kategoriterbaik</Typography>
      <span className="text-2xl lg:text-5xl font-bold mb-2 overflow-y-clip flex items-start pb-2">
        Katalog Kelas
      </span>
      <h3 className="text-base text-lg mb-8 mx-px sm:text-lg md:h-fit">
        Belajar dari kelas kami untuk skill yang lebih menarik
      </h3>
      <span className="text-xl lg:text-4xl font-bold mb-2">
        Kategori Populer
      </span>
      <CategoriesCard />
      <p className="mt-8 text-xl lg:text-2xl font-bold ">
        Pilih kelas sesuai Role mu!
      </p>
        <CourseCard />
    </div>
    <Footer/>
    </>
  );
};

export default AllCourse;

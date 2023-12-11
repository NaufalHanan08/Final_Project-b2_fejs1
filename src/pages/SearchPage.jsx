import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { IoIosSearch } from "react-icons/io";
import searchimg from "../assets/searchimg.png"

function SearchPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center md:px-10 px-0 bg-teal-600">
        <div className="bg-white lg:w-3/5 w-11/12 h-3/4 max-h-fit mt-14 border-2 rounded-md p-5">
          <div className="border-2 rounded-md p-3 flex items-center gap-2">
            <input type="text" placeholder="Search course..." className="border rounded-sm px-3 py-1 w-full" />
            <button className="border py-2 px-6 bg-teal-600 text-white"><IoIosSearch/></button>
          </div>

          <div className="w-full flex justify-center items-center pt-16">
            <img src={searchimg} alt="search-img" className="w-1/2 border-2 rounded-full p-2" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SearchPage;

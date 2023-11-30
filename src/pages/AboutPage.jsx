import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { IoIosArrowDown } from "react-icons/io";
import aboutimg from "../assets/aboutimg.png";
import Team from "../components/aboutcomponent/Team";

function AboutPage() {

  return (
    <>
      <Navbar />
      <div>
        <div className="about-bg flex flex-col w-full h-screen  bg-teal-600">
          <div className=" w-full h-screen flex items-center md:justify-start justify-center px-10 ">
            <div className="about-title flex items-center px-8 py-5 lg:ml-24 ml-0 md:mb-20 md:mt-0 mt-20 shadow-md shadow-gray-800 rounded-md">
              <h1 className="text-white font-bold text-2xl flex items-center gap-3">
                ABOUT{" "}
                <span>
                  {" "}
                  <h1 className="md:text-2xl text-xl py-2 px-3 pb-4 rounded-md font-bold text-white bg-gray-800 w-fit">
                    <span className="text-teal-600 underline">Byte</span>Academy
                  </h1>
                </span>
              </h1>
            </div>
          </div>
          <span className="flex justify-center items-center w-full mb-10 h-14">
            <a
              href="#about"
              className="scroll flex items-center bg-gray-800 hover:bg-teal-600 transition-all text-teal-600 hover:text-white rounded-full text-3xl p-2 overflow-hidden"
            >
              <IoIosArrowDown />
            </a>
          </span>
        </div>

        <div
          id="about"
          className="flex md:flex-row flex-col items-center justify-center w-full md:h-screen md:gap-0 gap-10 md:py-0 py-10"
        >
          <div className="md:w-1/2 px-10">
            <h1 className="text-4xl font-bold py-1 mb-10">
              ABOUT <span className="text-teal-600">US</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              quisquam vel minima omnis ad illum qui, odit voluptates dolore
              inventore dicta fugit enim dolores laboriosam nostrum veniam
              deleniti laborum rerum? Officiis blanditiis, quae perferendis,
              reiciendis id unde velit vitae facilis molestias eos ut culpa
              dolore sapiente!
            </p>
          </div>

          <div className=" bg-teal-600 hover:bg-gray-800 transition-all duration-300 rounded-full shadow-lg shadow-teal-600 flex justify-center border-t-4 border-b-4 border-teal-600 h">
            <img src={aboutimg} alt="" className=" w-5/6" />
          </div>
        </div>
      </div>
      <Team/>
      <Footer />
    </>
  );
}

export default AboutPage;

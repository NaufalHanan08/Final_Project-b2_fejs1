// import benefitsbg from "../assets/benefitsbg.jpg"

function Benefits() {
  return (
    <div className="w-full h-fit flex justify-center">
      {/* <img src={benefitsbg} alt="" className="lg:block hidden object-cover border-2 rounded-full bg-teal-600" /> */}
      <div className="benefits-content w-full py-2 md:px-10 px-4 overflow-hidden">
        <h3 className="bg-gray-800 text-white font-bold ps-5 shadow-md">
          <span className="text-teal-600">LEARN</span> ANYTHING
        </h3>
        <h1 className="text-black font-bold md:text-4xl text-2xl mb-10 overflow-hidden">
          Benefits About Online Learning Expertise
        </h1>
        <div className="flex flex-col gap-2">
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-8 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">Online Courses</h2>
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam sequi aperiam iusto eius, consectetur nesciunt!
            </p>
          </a>
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-10 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">Earn A Certificates</h2>
            <p className="text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
              ullam non facilis sit, impedit veritatis!
            </p>
          </a>
          <a
            href=""
            className="bg-slate-100 hover:bg-gray-800 sm:p-10 p-5 text-black hover:text-white transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">Learn with Expert</h2>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              unde accusamus, magni ipsum ea minima?
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
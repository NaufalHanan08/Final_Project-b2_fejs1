import heroimg from "../assets/heroimg.png";

function Hero() {
  return (
    <div className="w-full bg-teal-600">
      <div className="bg-hero w-full md:h-fit md:block flex flex-col-reverse items-center md:px-20 px-5">
        <div className="hero-content  md:w-2/4 w-full md:py-28 py-5 md:mb-0 mb-20 md:mt-10 mt-0 overflow-hidden md:block flex flex-col items-center">
          <h1 className="md:text-4xl text-3xl py-2 px-3 pb-4 rounded-md font-bold mb-3 text-white bg-gray-800 w-fit">
            <span className="text-teal-600 underline">Byte</span>Academy
          </h1>
          <h2 className="md:text-xl text-md text-white py-6 md:text-start text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            reiciendis dolorum vitae placeat doloremque ducimus.
          </h2>
          <div>
            <button className="text-white font-semibold bg-gray-800 border border-gray-800 hover:bg-teal-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-300 rounded-lg py-2 px-3 mt-5">
              Daftar Sekarang
            </button>
          </div>
        </div>
        <div>
          <img
            src={heroimg}
            alt="hero-img"
            className="md:h-80 h-3/4 md:absolute static md:mt-0 mt-20 right-20 bottom-32  bg-teal-600 border-b-4 border-teal-900 rounded-full p-3 shadow-xl shadow-teal-900"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;

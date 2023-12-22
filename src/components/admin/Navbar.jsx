import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 font-poppins font-medium p-4 top-0 right-0 w-full z-10 overflow-hidden pb-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-14 text-gray-800">
          <div className="text-primary text-2xl font-bold">Hi, Admin! </div>
          <div className="flex space-x-4 relative">
            <div>
              <input
                type="text"
                placeholder="cari"
                className="bg-white h-12 w-72 px-2 text-black rounded-md"
              ></input>
            </div>
            <div className="absolute right-3 flex items-center bg-teal-600 text-white my-2 w-10 h-8 justify-center rounded-sm cursor-pointer">
              <IoSearch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

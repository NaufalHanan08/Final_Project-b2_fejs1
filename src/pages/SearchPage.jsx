import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import searchimg from '../assets/searchimg.png';

function SearchPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center lg:px-14 md:px-10 px-4 bg-teal-600">
        <div className="bg-white xl:w-3/5 lg:w-11/12 w-full md:h-3/4 h-3/5 mt-14 border-2 rounded-md p-5">
          <div className="border-2 rounded-md p-3 flex items-center gap-2">
            <input type="text" placeholder="Search course..." className="border rounded-sm px-3 py-1 w-full" />
            <button className="border py-2 px-6 bg-teal-600 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                  fill="#EBF3FC"
                />
                <path
                  d="M11.4121 8.58609C11.7911 8.96609 12.0001 9.46809 12.0001 10.0001H14.0001C14.001 9.47451 13.8977 8.95398 13.6961 8.46857C13.4946 7.98316 13.1989 7.54251 12.8261 7.17209C11.3121 5.66009 8.68707 5.66009 7.17407 7.17209L8.58607 8.58809C9.34607 7.83009 10.6561 7.83209 11.4121 8.58609Z"
                  fill="#EBF3FC"
                />
              </svg>
            </button>
          </div>

          <div className="w-full flex justify-center items-center pt-16">
            <img src={searchimg} alt="search-img" className="w-1/2 border-2 rounded-full p-2" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;

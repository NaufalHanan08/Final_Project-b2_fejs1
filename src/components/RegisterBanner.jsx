function RegisterBanner() {
    return (
      <div className="px-20 my-10">
        <div className="w-full h-60 bg-gray-800 flex justify-center items-center text-center rounded-lg">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl py-1 font-semibold text-white">Tunggu apa lagi?</h1>
            <p className="text-slate-300 text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
              quaerat.
            </p>
            <button className="bg-teal-600 text-white hover:bg-gray-800 border border-teal-600 hover:border-teal-600 transition-all rounded-md py-3 px-6 flex justify-center items-center m-auto">REGISTER</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegisterBanner;
  
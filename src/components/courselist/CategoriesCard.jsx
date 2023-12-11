import FigmaLogo from "../../assets/images/figma_logo.png";

// Dummy data untuk konten kartu
const cardContents = [
  {
    title: "Title 1",
    description: "Deskripsi untuk kartu 1.",
    price: "$399",
    logo: FigmaLogo,
  },
  {
    title: "Title 2",
    description: "Deskripsi untuk kartu 2.",
    price: "$499",
    logo: FigmaLogo,
  },
  {
    title: "Title 2",
    description: "Deskripsi untuk kartu 2.",
    price: "$499",
    logo: FigmaLogo,
  },
  {
    title: "Title 2",
    description: "Deskripsi untuk kartu 2.",
    price: "$499",
    logo: FigmaLogo,
  },
  // ... tambahkan data lain sesuai kebutuhan
];

function CategoriesCard() {
  return (
    <div className="flex overflow-x-auto flex-wrap justify-start">
      {cardContents.map((content, index) => (
        <div
          key={index}
          className="w-full sm:w-64 p-4 mb-8 sm:mb-0 sm:mr-5 overflow-hidden bg-white shadow-lg rounded-2xl relative"
        >
          <img
            alt="moto"
            src={content.logo}
            className="w-30 mb-4 -bottom-4 left-1/2 transform -translate-x-1/2"
          />
          <div className="w-4/6">
            <p className="mb-2 text-lg font-medium text-gray-800">{content.title}</p>
            <p className="text-xs text-gray-400">{content.description}</p>
            <p className="text-xl font-medium text-indigo-500">{content.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesCard;

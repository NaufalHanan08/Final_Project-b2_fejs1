import pmimg from "../../assets/course-images/pmimg.jpg";
import uiuximg from "../../assets/course-images/uiuximg.jpg";
import wdimg from "../../assets/course-images/wdimg.jpg";
import adimg from "../../assets/course-images/adimg.jpg";

export default function CardComponent() {
  const posts = [
    {
      title: "Product Management",
      img: `${pmimg}`,
      content:
        "Learn strategic thinking, time management, and improve analytical skills",
    },
    {
      title: "UI/UX Design",
      img: `${uiuximg}`,
      content:
        "Study visual and aesthetic design, user experience, prototyping and interactive design",
    },
    {
      title: "Web Development",
      img: `${wdimg}`,
      content: "Learn to develop web from the frontend and backend side",
    },
    {
      title: "Android Development",
      img: `${adimg}`,
      content:
        "Learn to create, develop, maintain application software used on the Android OS.",
    },
  ];
  return (
    <>
      <div className="grid xl:gap-2 md:gap-6 xl:grid-cols-4 md:grid-cols-2 p-5">
        {posts.map((items, key) => (
          <div
            className="w-full rounded-lg shadow-md lg:max-w-sm hover:shadow-md hover:shadow-black transition-all"
            key={key}
          >
            <img
              className="object-cover w-full h-48"
              src={items.img}
              alt="image"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-teal-600">
                {items.title}
              </h4>
              <p className="mb-2 leading-normal text-sm text-gray-800">
                {items.content}
              </p>
              <button className="px-4 py-2 text-sm text-white bg-gray-800 rounded shadow">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
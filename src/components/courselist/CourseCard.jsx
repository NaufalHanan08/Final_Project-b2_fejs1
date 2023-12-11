
export default function CardComponent() {
    const posts = [
        {
            title: "React JS",
            img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
            content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
        },
        {
            title: "Taildwind CSS",
            img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
            content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
        },
        {
            title: "Intro to UI/UX Design",
            img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
            content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
        },
        {
            title: "Back end framework: Java Springboot",
            img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
            content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
        },
    ];
    return (
        <>
            <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 py-2">
                {/* Mapping course item */}
                {posts.map((items, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm hover:shadow-md xl:max-w-md hover:shadow-black transition-all" key={key}>
                        <img
                            className="object-cover w-full h-48"
                            src={items.img}
                            alt="image"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-teal-600">
                                
                                {items.title}
                            </h4>
                            <p className="mb-2 leading-normal">
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
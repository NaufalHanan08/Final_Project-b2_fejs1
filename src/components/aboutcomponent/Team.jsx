import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const teams = [
  {
    foto: "https://placehold.co/600x500",
    nama: "Adam Anwar",
    jabatan: "Scrum Master",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: "Resa Riyan",
    jabatan: "Tech Lead Backend",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: " M Zaqi Hidayat",
    jabatan: "Tech Lead Frontend",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: "Akbar Oktaviadi",
    jabatan: "Backend Developer",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: "Naufal Hanan",
    jabatan: "Frontend Developer",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: "Najib Sauqi R",
    jabatan: "Backend Developer",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
  {
    foto: "https://placehold.co/600x500",
    nama: "Lutfi Isnan Safrudin",
    jabatan: "Backend Developer",
    link: {
      linkedinLink:
        "https://www.linkedin.com/in/muhammad-zaqi-hidayat-564443279/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BOHrpdCpuReSZBRqxH5BoOQ%3D%3D",
      instagramLink: "https://www.instagram.com",
    },
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem minus dolore quas voluptatibus nostrum illo accusantium. Consequuntur, dolores maxime?",
  },
];

function Team() {
  return (
    <div className="md:px-10 px-5 py-20">
      <div className="text-center">
        <h1 className="md:text-4xl sm:text-2xl text-xl py-1 font-bold mb-10">Meet Our <span className="text-teal-600">Team</span></h1>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-5">
        {teams.map((team, index) => (
          <div className="shadow-lg rounded-lg py-2 px-4" key={index}>
            <img src={team.foto} alt={team.nama} />
            <div>
              <h2 className="text-xl font-bold mt-5">{team.nama}</h2>
              <h3 className="text-sm text-gray-600 font-medium">{team.jabatan}</h3>
              <ul className="flex mb-5 justify-end">
                <li>
                  <a href={team.link.linkedinLink}>
                    <FaLinkedin className="text-teal-600" />
                  </a>
                </li>
                <li>
                  <a href={team.link.instagramLink}>
                    <FaInstagramSquare className="text-teal-600" />
                  </a>
                </li>
              </ul>
              {/* <p className="text-sm text-justify">{team.deskripsi}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;

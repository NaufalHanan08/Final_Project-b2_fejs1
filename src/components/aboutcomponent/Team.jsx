import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const teams = [
  {
    foto: "https://placehold.co/600x500",
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    nama: "Nama Anggota",
    jabatan: "Jabatan",
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
    <div className="p-10">
      <div className="text-center">
        <h1 className="text-4xl py-1 font-bold mb-10">Meet Our <span className="text-teal-600">Team</span></h1>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div className="border-2 p-2" key={index}>
            <img src={team.foto} alt={team.nama} />
            <div>
              <h2 className="text-xl font-semibold mt-5">{team.nama}</h2>
              <h3 className="text-lg text-gray-600 font-semibold">{team.jabatan}</h3>
              <ul className="flex mb-5 justify-end">
                <li>
                  <a href={team.link.linkedinLink}>
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a href={team.link.instagramLink}>
                    <FaInstagramSquare />
                  </a>
                </li>
              </ul>
              <p>{team.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;

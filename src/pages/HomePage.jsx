import Navbar from "../components/Navbar";
import CourseList from "../components/courselist/CourseList";
import Benefits from "../components/Benefits";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseList />
      <Benefits />
      <Footer />
    </>
  );
}

export default HomePage;

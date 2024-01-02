import Navbar from '../components/Navbar';
import CourseList from '../components/courselist/CourseList';
import Benefits from '../components/Benefits';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import RegisterBanner from '../components/RegisterBanner';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseList />
      <Benefits />
      <RegisterBanner />
      <Footer />
    </>
  );
}

export default HomePage;

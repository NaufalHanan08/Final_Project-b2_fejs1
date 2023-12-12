import CourseList from '../components/courselist/CourseList';
import Benefits from '../components/Benefits';
import Hero from '../components/Hero';
import RegisterBanner from '../components/RegisterBanner';

function HomePage() {
  return (
    <>
      <Hero />
      <CourseList />
      <Benefits />
      <RegisterBanner />
    </>
  );
}

export default HomePage;

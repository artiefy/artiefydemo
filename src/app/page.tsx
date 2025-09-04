import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProgramCategories from '../components/ProgramCategories';
import Projects from '../components/Projects';
import Stats from '../components/Stats';
import StudentZone from '../components/StudentZone';

export default function Home() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <ProgramCategories />
      <Stats />
      <Projects />
      <StudentZone />
      <BlogSection />
      <Footer />
    </>
  );
}

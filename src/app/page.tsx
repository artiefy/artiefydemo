import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import ProgramList from "../components/ProgramList";
import Stats from "../components/Stats";
import About from "../components/About";
import Projects from "../components/Projects";
import StudentZone from "../components/StudentZone";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <ProgramList />
      <Stats />
      <About />
      <Projects />
      <StudentZone />
      <BlogSection />
      <Footer />
    </>
  );
}
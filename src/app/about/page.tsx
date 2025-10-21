import AboutHero from '../../components/About/AboutHero';
import MisionVision from '../../components/About/MisionVision';
import Services from '../../components/About/Services';
import Team from '../../components/About/Team';
import VisionSection from '../../components/About/VisionSection';
import Footer from '../../components/Footer';
import Header from '../../components/Header1';

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutHero />
      <VisionSection />
      <Services />
      <MisionVision />
      <Team />
      <Footer />
    </>
  );
}

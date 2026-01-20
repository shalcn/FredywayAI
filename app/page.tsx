import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import CTASection from './components/CTASection';
import Introduction from './components/Introduction';
import FourPillars from './components/FourPillars';
import TargetAudience from './components/TargetAudience';
import Benefits from './components/Benefits';
import Facilitator from './components/Facilitator';
import Pricing from './components/Pricing';
import EventDetails from './components/EventDetails';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <PainPoints />
      <CTASection />
      <TargetAudience />
      <Introduction />
      <FourPillars />
      <Benefits />
      <Facilitator />
      <Gallery />
      <Pricing />
      <EventDetails />
      <FAQ />
      <Footer />
    </main>
  );
}

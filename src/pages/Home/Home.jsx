import Hero from "../../components/home/Hero";
import TrustedBy from "../../components/home/TrustedBy";
import FeaturesGrid from "../../components/home/FeaturesGrid";
import SecondBrain from "../../components/home/SecondBrain";
import FounderCTA from "../../components/home/FounderCTA";
import Testimonials from "../../components/home/Testimonials";
import Newsletter from "../../components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturesGrid />
      <SecondBrain />
      <FounderCTA />
      <Testimonials />
      <Newsletter />
    </>
  );
}

import Hero from "../../components/home/Hero";
import TrustedBy from "../../components/home/TrustedBy";
import FeaturesGrid from "../../components/home/FeaturesGrid";
import ConnectedSystem from "../../components/home/ConnectedSystem";
import DayAtGlance from "../../components/home/DayAtGlance";
import HowItWorks from "../../components/home/HowItWorks";
import FounderCTA from "../../components/home/FounderCTA";
import BuiltAroundLife from "../../components/home/BuiltAroundLife";
import LessManaging from "../../components/home/LessManaging";
import LifeRemembers from "../../components/home/LifeRemembers";
import SecondBrain from "../../components/home/SecondBrain";
import MadeForRealLife from "../../components/home/MadeForRealLife";
import SocialProofNote from "../../components/home/SocialProofNote";
import Testimonials from "../../components/home/Testimonials";
import CtaBand from "../../components/ui/CtaBand";
import Newsletter from "../../components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* What LifeOS is */}
      <Hero />
      <TrustedBy />
      <FeaturesGrid />

      {/* What it does */}
      <ConnectedSystem />
      <DayAtGlance />
      <HowItWorks />
      <FounderCTA />

      {/* How it helps your life */}
      <BuiltAroundLife />
      <LessManaging />
      <LifeRemembers />
      <SecondBrain />
      <MadeForRealLife />

      {/* Why you should care */}
      <SocialProofNote />
      <Testimonials />

      {/* Get started */}
      <CtaBand
        title="Your life deserves one place."
        text="Bring your tasks, memories, plans and priorities together with LifeOS."
        primaryLabel="Get Started"
        primaryTo="/get-started"
        secondaryLabel="Explore LifeOS"
        secondaryTo="/features"
      />
      <Newsletter />
    </>
  );
}

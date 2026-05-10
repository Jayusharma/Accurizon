import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemOutcome from "@/components/ProblemOutcome";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import Breather from "@/components/Breather";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Proof from "@/components/Proof";
import FinalCTA from "@/components/FinalCTA";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemOutcome />
      <WhyChoose />
      <Services />
      <Breather />
      <Process />
      <Industries />
      <Testimonials />
      <ContactSection />
      {/* <Proof />
      <FinalCTA /> */}
    </main>
  );
}

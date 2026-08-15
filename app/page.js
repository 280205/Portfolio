import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Resume />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Contact />
      </main>
      <Chatbot />
    </>
  );
}

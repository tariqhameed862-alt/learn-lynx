import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import About from "@/components/About";
import { Features } from "@/components/Features";
import Services from "@/components/Services";
import { QADemo } from "@/components/QADemo";
import { Showcase } from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <Services />
      <QADemo />
      <Showcase />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

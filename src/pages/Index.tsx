import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { QADemo } from "@/components/QADemo";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <Hero />
      <QADemo />
      <Showcase />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

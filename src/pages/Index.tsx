import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { QADemo } from "@/components/QADemo";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <QADemo />
      <Showcase />
      <Footer />
    </div>
  );
};

export default Index;

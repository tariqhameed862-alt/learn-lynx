import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import Stats from "@/components/Stats";
import { QADemo } from "@/components/QADemo";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturesGrid from "@/components/FeaturesGrid";
import { Showcase } from "@/components/Showcase";
import LatestUpdates from "@/components/LatestUpdates";
import CallToAction from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <Hero />
      <Stats />
      <QADemo />
      <ProcessSteps />
      <FeaturesGrid />
      <Showcase />
      <LatestUpdates />
      <CallToAction />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

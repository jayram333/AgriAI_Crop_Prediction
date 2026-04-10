import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { PredictionDashboard } from "@/components/sections/PredictionDashboard";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PredictionDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Brain, Users } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full border border-accent/30">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Agriculture</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Smart Crop Yield
              <span className="block bg-gradient-harvest bg-clip-text text-transparent">
                Optimizer
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl leading-relaxed">
              Predict crop yields with AI, get personalized farming recommendations, 
              and increase your productivity by up to 10% with data-driven insights.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary-foreground/20">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="font-semibold">10%+ Yield Increase</span>
                </div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary-foreground/20">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="font-semibold">50,000+ Farmers</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="harvest" 
                size="lg" 
                className="gap-2 text-lg px-8 py-6"
                onClick={() => window.location.href = '/auth'}
              >
                Start Predicting Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6 bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};
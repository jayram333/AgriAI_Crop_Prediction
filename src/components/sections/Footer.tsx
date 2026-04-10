import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Leaf,
  Brain,
  Users,
  TrendingUp
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-harvest rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">🌱</span>
              </div>
              <span className="text-2xl font-bold">AgriAI</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering farmers with AI-driven insights for better crop yields and sustainable agriculture. 
              Join thousands of farmers already using our platform.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "Dashboard", href: "#dashboard" },
                { name: "Recommendations", href: "#recommendations" },
                { name: "Weather", href: "#weather" },
                { name: "About Us", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2">
              {[
                { name: "Yield Prediction", icon: TrendingUp },
                { name: "Smart Recommendations", icon: Brain },
                { name: "Weather Integration", icon: Leaf },
                { name: "Multi-language Support", icon: Users }
              ].map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <li key={feature.name} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-accent" />
                    <span className="text-primary-foreground/80 text-sm">{feature.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>support@agriai.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-primary-foreground/80">
                Get weekly farming tips and updates
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="harvest" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/60">
              © {currentYear} AgriAI. All rights reserved. Built with ❤️ for farmers worldwide.
            </div>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
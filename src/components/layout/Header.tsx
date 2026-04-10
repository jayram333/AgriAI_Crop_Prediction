import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSelector } from "@/components/sections/LanguageSelector";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AgriAI</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-sm font-medium"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/farm-data")}
                className="text-sm font-medium"
              >
                Farm Data
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/analytics")}
                className="text-sm font-medium"
              >
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/recommendations")}
                className="text-sm font-medium"
              >
                Recommendations
              </Button>
            </>
          ) : (
            <>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#recommendations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Recommendations
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSelector />
          {user ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/dashboard");
                    toggleMenu();
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/farm-data");
                    toggleMenu();
                  }}
                >
                  Farm Data
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/analytics");
                    toggleMenu();
                  }}
                >
                  Analytics
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/recommendations");
                    toggleMenu();
                  }}
                >
                  Recommendations
                </Button>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={toggleMenu}
                >
                  Features
                </a>
                <a
                  href="#dashboard"
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={toggleMenu}
                >
                  Dashboard
                </a>
                <a
                  href="#recommendations"
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={toggleMenu}
                >
                  Recommendations
                </a>
                <a
                  href="#about"
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={toggleMenu}
                >
                  About
                </a>
                <div className="pt-3 space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/auth");
                      toggleMenu();
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/auth");
                      toggleMenu();
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
            
            {/* Language Selector for Mobile */}
            <div className="pt-3 border-t">
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
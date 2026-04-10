import { Header } from "@/components/layout/Header";
import { WeatherOverview } from "@/components/sections/WeatherOverview";
import { SoilHealthSummary } from "@/components/sections/SoilHealthSummary";
import { AlertsPanel } from "@/components/sections/AlertsPanel";
import { PredictionDashboard } from "@/components/sections/PredictionDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarChart3, TrendingUp, Target, Settings } from "lucide-react";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.email?.split('@')[0]} • Today's farming insights
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button onClick={() => navigate("/farm-data")} variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Farm Settings
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Weather & Soil */}
          <div className="lg:col-span-2 space-y-8">
            <WeatherOverview />
            <SoilHealthSummary />
          </div>

          {/* Right Column - Alerts */}
          <div className="lg:col-span-1">
            <AlertsPanel />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer" 
                onClick={() => navigate("/analytics")}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
                <p className="text-sm text-muted-foreground">View detailed insights</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/recommendations")}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
                <p className="text-sm text-muted-foreground">AI-powered guidance</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/farm-data")}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-earth/10">
                <TrendingUp className="w-6 h-6 text-earth" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Farm Data</h3>
                <p className="text-sm text-muted-foreground">Manage your data</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Yield Prediction Section */}
        <PredictionDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
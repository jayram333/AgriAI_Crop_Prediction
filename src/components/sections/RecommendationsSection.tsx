import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  Leaf, 
  Bug, 
  Calendar, 
  ThermometerSun, 
  Lightbulb,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const RecommendationsSection = () => {
  const recommendations = [
    {
      category: "Irrigation",
      icon: Droplets,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      priority: "High",
      title: "Increase Watering Frequency",
      description: "Soil moisture is below optimal levels. Increase irrigation by 20% for the next 7 days.",
      action: "Water 2-3 times daily",
      timeline: "Next 7 days",
      impact: "15% yield increase expected"
    },
    {
      category: "Fertilizer", 
      icon: Leaf,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      priority: "Medium",
      title: "Nitrogen Supplement Required",
      description: "Soil analysis shows nitrogen deficiency. Apply nitrogen-rich fertilizer for better growth.",
      action: "Apply 25kg/hectare NPK 20-10-10",
      timeline: "This week",
      impact: "12% yield increase expected"
    },
    {
      category: "Pest Control",
      icon: Bug,
      color: "text-warning",
      bgColor: "bg-warning/10", 
      borderColor: "border-warning/20",
      priority: "Critical",
      title: "Early Pest Warning",
      description: "Weather conditions favor pest development. Take preventive measures immediately.",
      action: "Apply organic pesticide spray",
      timeline: "Within 2 days",
      impact: "Prevent 20% crop loss"
    }
  ];

  const weeklyPlan = [
    { day: "Mon", task: "Soil testing", status: "completed" },
    { day: "Tue", task: "Irrigation check", status: "completed" },
    { day: "Wed", task: "Fertilizer application", status: "pending" },
    { day: "Thu", task: "Pest monitoring", status: "pending" },
    { day: "Fri", task: "Growth assessment", status: "pending" },
    { day: "Sat", task: "Equipment maintenance", status: "pending" },
    { day: "Sun", task: "Planning next week", status: "pending" }
  ];


  return (
    <section id="recommendations" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">Smart Recommendations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI-Powered Farming Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized recommendations based on your crop data, weather patterns, and soil conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recommendations Cards */}
          {recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            const priorityColor = rec.priority === "Critical" ? "text-destructive" : 
                                rec.priority === "High" ? "text-warning" : "text-success";
            
            return (
              <Card key={index} className={`p-6 shadow-card hover:shadow-hover transition-all duration-300 ${rec.borderColor} border-2`}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${rec.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${rec.color}`} />
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${priorityColor}`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{rec.title}</h3>
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                  </div>

                  {/* Action Details */}
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-foreground mb-1">Recommended Action</div>
                      <div className="text-sm text-muted-foreground">{rec.action}</div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium text-foreground">{rec.timeline}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected Impact:</span>
                      <span className="font-medium text-success">{rec.impact}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <Button variant="default" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Weekly Planning & Weather Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Plan */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Weekly Farm Plan</h3>
            </div>
            
            <div className="space-y-3">
              {weeklyPlan.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {item.day}
                    </div>
                    <span className="text-foreground">{item.task}</span>
                  </div>
                  <div className="flex items-center">
                    {item.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium text-foreground">Weekly Progress</span>
              </div>
              <Progress value={28} className="mb-2" />
              <div className="text-sm text-muted-foreground">2 of 7 tasks completed</div>
            </div>
          </Card>

          {/* Weather Overview */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <ThermometerSun className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-semibold text-foreground">Weather Insights</h3>
            </div>

            <div className="space-y-4">
              {/* Current Conditions */}
              <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">Today's Conditions</span>
                  <span className="text-2xl">🌤️</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="ml-2 font-medium text-foreground">28°C</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Humidity:</span>
                    <span className="ml-2 font-medium text-foreground">65%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Wind:</span>
                    <span className="ml-2 font-medium text-foreground">12 km/h</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rain Chance:</span>
                    <span className="ml-2 font-medium text-foreground">20%</span>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Heat Wave Alert:</span>
                    <span className="text-muted-foreground ml-1">Expected 35°C+ next 3 days</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <Droplets className="w-5 h-5 text-secondary" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Rain Forecast:</span>
                    <span className="text-muted-foreground ml-1">Light showers expected Friday</span>
                  </div>
                </div>
              </div>

              {/* Weekly Outlook */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">7-Day Outlook</h4>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="p-2">
                      <div className="text-muted-foreground mb-1">{day}</div>
                      <div className="text-lg mb-1">{['☀️', '🌤️', '☀️', '🌡️', '🌧️', '⛅', '☀️'][index]}</div>
                      <div className="text-foreground font-medium">{[28, 30, 32, 35, 26, 29, 31][index]}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
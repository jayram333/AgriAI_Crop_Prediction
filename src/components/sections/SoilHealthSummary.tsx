import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Beaker, Droplets, Leaf, TrendingUp } from "lucide-react";

interface SoilMetrics {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  healthScore: number;
}

export const SoilHealthSummary = () => {
  // Mock soil data - in real app, this would come from sensors/API
  const soilData: SoilMetrics = {
    ph: 6.8,
    moisture: 45,
    nitrogen: 85,
    phosphorus: 72,
    potassium: 68,
    organicMatter: 3.2,
    healthScore: 78
  };

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "success" };
    if (score >= 60) return { label: "Good", color: "secondary" };
    if (score >= 40) return { label: "Fair", color: "warning" };
    return { label: "Poor", color: "destructive" };
  };

  const getOptimalRange = (metric: string, value: number) => {
    const ranges: { [key: string]: { min: number; max: number } } = {
      ph: { min: 6.0, max: 7.5 },
      moisture: { min: 40, max: 60 },
      nitrogen: { min: 70, max: 100 },
      phosphorus: { min: 65, max: 100 },
      potassium: { min: 60, max: 100 }
    };
    
    const range = ranges[metric];
    if (!range) return "optimal";
    
    if (value >= range.min && value <= range.max) return "optimal";
    if (value < range.min) return "low";
    return "high";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-success";
      case "low": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const healthStatus = getHealthStatus(soilData.healthScore);

  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Beaker className="w-6 h-6 text-earth" />
          Soil Health Summary
        </h3>
        <Badge 
          variant={healthStatus.color === "success" ? "default" : "secondary"}
          className={healthStatus.color === "success" ? "bg-success text-success-foreground" : ""}
        >
          {healthStatus.label}
        </Badge>
      </div>

      {/* Overall Health Score */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-earth">
        <div className="flex items-center justify-between text-earth-foreground mb-2">
          <span className="font-medium">Overall Soil Health</span>
          <span className="text-2xl font-bold">{soilData.healthScore}/100</span>
        </div>
        <Progress 
          value={soilData.healthScore} 
          className="h-3 bg-earth-foreground/20" 
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* pH Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">pH Level</span>
            <span className={`text-sm font-bold ${getStatusColor(getOptimalRange('ph', soilData.ph))}`}>
              {soilData.ph}
            </span>
          </div>
          <Progress 
            value={(soilData.ph / 14) * 100} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Optimal: 6.0 - 7.5</div>
        </div>

        {/* Moisture */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              Moisture
            </span>
            <span className={`text-sm font-bold ${getStatusColor(getOptimalRange('moisture', soilData.moisture))}`}>
              {soilData.moisture}%
            </span>
          </div>
          <Progress 
            value={soilData.moisture} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Optimal: 40% - 60%</div>
        </div>

        {/* Nitrogen */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Nitrogen (N)</span>
            <span className={`text-sm font-bold ${getStatusColor(getOptimalRange('nitrogen', soilData.nitrogen))}`}>
              {soilData.nitrogen}%
            </span>
          </div>
          <Progress 
            value={soilData.nitrogen} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Optimal: 70% - 100%</div>
        </div>

        {/* Phosphorus */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Phosphorus (P)</span>
            <span className={`text-sm font-bold ${getStatusColor(getOptimalRange('phosphorus', soilData.phosphorus))}`}>
              {soilData.phosphorus}%
            </span>
          </div>
          <Progress 
            value={soilData.phosphorus} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Optimal: 65% - 100%</div>
        </div>

        {/* Potassium */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Potassium (K)</span>
            <span className={`text-sm font-bold ${getStatusColor(getOptimalRange('potassium', soilData.potassium))}`}>
              {soilData.potassium}%
            </span>
          </div>
          <Progress 
            value={soilData.potassium} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Optimal: 60% - 100%</div>
        </div>

        {/* Organic Matter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground flex items-center gap-1">
              <Leaf className="w-4 h-4" />
              Organic Matter
            </span>
            <span className="text-sm font-bold text-success">
              {soilData.organicMatter}%
            </span>
          </div>
          <Progress 
            value={(soilData.organicMatter / 10) * 100} 
            className="h-2" 
          />
          <div className="text-xs text-muted-foreground">Good: 2.5% - 5%</div>
        </div>
      </div>

      {/* Quick Recommendations */}
      <div className="mt-6 p-4 rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Quick Recommendations
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          {soilData.nitrogen < 70 && <li>• Consider nitrogen-rich fertilizers</li>}
          {soilData.moisture < 40 && <li>• Increase irrigation frequency</li>}
          {soilData.ph < 6.0 && <li>• Apply lime to increase pH</li>}
          {soilData.ph > 7.5 && <li>• Apply sulfur to decrease pH</li>}
          {soilData.organicMatter < 2.5 && <li>• Add compost to improve organic matter</li>}
        </ul>
      </div>
    </Card>
  );
};
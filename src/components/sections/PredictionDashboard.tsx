import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Brain, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface FormData {
  cropType: string;
  pH: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  temperature: number;
  rainfall: number;
  landArea: number;
}

interface PredictionResult {
  yield: number;
  confidence: number;
  expectedGrowth: number;
  riskLevel: string;
  riskDescription: string;
}

export const PredictionDashboard = () => {
  console.log('PredictionDashboard component loading...');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cropType: '',
    pH: 0,
    moisture: 0,
    nitrogen: 0,
    phosphorus: 0,
    temperature: 0,
    rainfall: 0,
    landArea: 0
  });

  // Intelligent prediction function based on input parameters
  const calculateYieldPrediction = (data: FormData) => {
    // Base yields for different crops (tons/hectare)
    const baseYields: { [key: string]: number } = {
      rice: 4.5,
      wheat: 3.2,
      maize: 5.8,
      cotton: 2.1,
      sugarcane: 75.0
    };

    let baseYield = baseYields[data.cropType] || 3.0;
    let yieldMultiplier = 1.0;
    let confidenceScore = 85;
    let riskFactors = 0;
    let growthFactors = 0;

    // pH factor (optimal range 6.0-7.5)
    if (data.pH >= 6.0 && data.pH <= 7.5) {
      yieldMultiplier *= 1.1; // +10% for optimal pH
      growthFactors += 8;
    } else if (data.pH < 5.5 || data.pH > 8.0) {
      yieldMultiplier *= 0.8; // -20% for poor pH
      confidenceScore -= 10;
      riskFactors += 15;
      growthFactors -= 12;
    } else {
      riskFactors += 5;
      growthFactors -= 3;
    }

    // Moisture factor (optimal 40-60%)
    if (data.moisture >= 40 && data.moisture <= 60) {
      yieldMultiplier *= 1.05; // +5% for good moisture
      growthFactors += 5;
    } else if (data.moisture < 20 || data.moisture > 80) {
      yieldMultiplier *= 0.75; // -25% for poor moisture
      confidenceScore -= 15;
      riskFactors += 20;
      growthFactors -= 15;
    } else {
      riskFactors += 8;
      growthFactors -= 5;
    }

    // Nitrogen factor (optimal varies by crop)
    const optimalN = data.cropType === 'rice' ? 150 : data.cropType === 'maize' ? 200 : 120;
    const nRatio = data.nitrogen / optimalN;
    if (nRatio >= 0.8 && nRatio <= 1.2) {
      yieldMultiplier *= 1.08; // +8% for optimal nitrogen
      growthFactors += 10;
    } else if (nRatio < 0.5) {
      yieldMultiplier *= 0.7; // -30% for nitrogen deficiency
      confidenceScore -= 20;
      riskFactors += 25;
      growthFactors -= 20;
    } else {
      riskFactors += 10;
      growthFactors -= 8;
    }

    // Temperature factor (crop-specific optimal ranges)
    const tempOptimal = data.cropType === 'rice' ? 30 : data.cropType === 'wheat' ? 22 : 28;
    const tempDiff = Math.abs(data.temperature - tempOptimal);
    if (tempDiff <= 3) {
      yieldMultiplier *= 1.03; // +3% for optimal temperature
      growthFactors += 3;
    } else if (tempDiff > 8) {
      yieldMultiplier *= 0.85; // -15% for extreme temperature
      confidenceScore -= 12;
      riskFactors += 18;
      growthFactors -= 10;
    } else {
      riskFactors += 8;
      growthFactors -= 4;
    }

    // Rainfall factor (crop-specific optimal ranges)
    const rainfallOptimal = data.cropType === 'rice' ? 1200 : data.cropType === 'wheat' ? 600 : 800;
    const rainfallRatio = data.rainfall / rainfallOptimal;
    if (rainfallRatio >= 0.8 && rainfallRatio <= 1.3) {
      yieldMultiplier *= 1.06; // +6% for optimal rainfall
      growthFactors += 6;
    } else if (rainfallRatio < 0.4 || rainfallRatio > 2.0) {
      yieldMultiplier *= 0.6; // -40% for extreme rainfall conditions
      confidenceScore -= 25;
      riskFactors += 30;
      growthFactors -= 25;
    } else {
      riskFactors += 12;
      growthFactors -= 8;
    }

    // Add some randomness for realistic variation
    const randomFactor = 0.9 + Math.random() * 0.2; // ±10% variation
    yieldMultiplier *= randomFactor;

    const finalYield = baseYield * yieldMultiplier;
    const finalConfidence = Math.max(50, Math.min(95, confidenceScore));

    // Calculate expected growth percentage
    const expectedGrowth = Math.max(-30, Math.min(40, growthFactors + (Math.random() * 6 - 3)));
    
    // Calculate risk level
    let riskLevel = 'Low';
    let riskDescription = 'Conditions favorable';
    
    if (riskFactors >= 50) {
      riskLevel = 'High';
      riskDescription = 'Multiple risk factors';
    } else if (riskFactors >= 25) {
      riskLevel = 'Medium';
      riskDescription = 'Some challenges expected';
    } else if (riskFactors >= 10) {
      riskLevel = 'Low-Medium';
      riskDescription = 'Minor concerns';
    }

    return {
      yield: parseFloat(finalYield.toFixed(2)),
      confidence: Math.round(finalConfidence),
      expectedGrowth: Math.round(expectedGrowth),
      riskLevel,
      riskDescription
    };
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Validate inputs
    if (!formData.cropType || formData.pH === 0 || formData.moisture === 0) {
      setIsLoading(false);
      return;
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = calculateYieldPrediction(formData);
    setPredictionResult(result);
    setIsLoading(false);
  };

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock data for charts
  const yieldData = [
    { month: 'Jan', yield: 3.2 },
    { month: 'Feb', yield: 3.5 },
    { month: 'Mar', yield: 3.8 },
    { month: 'Apr', yield: 4.1 },
    { month: 'May', yield: 4.2 },
    { month: 'Jun', yield: 4.0 },
  ];

  const comparisonData = [
    { crop: 'Rice', currentYear: 4.2, lastYear: 3.8 },
    { crop: 'Wheat', currentYear: 3.9, lastYear: 3.5 },
    { crop: 'Maize', currentYear: 5.1, lastYear: 4.7 },
    { crop: 'Cotton', currentYear: 2.8, lastYear: 2.5 },
  ];

  return (
    <section id="dashboard" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full border border-secondary/20 mb-4">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">AI Prediction Engine</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Crop Yield Prediction Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your crop and field parameters to get AI-powered yield predictions with actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Input Parameters
            </h3>
            
            <div className="space-y-6">
              {/* Crop Selection */}
              <div className="space-y-2">
                <Label htmlFor="crop-type" className="text-sm font-medium">Crop Type</Label>
                <Select onValueChange={(value) => updateFormData('cropType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Soil Parameters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph" className="text-sm font-medium">Soil pH</Label>
                  <Input
                    id="ph"
                    type="number"
                    placeholder="6.5"
                    step="0.1"
                    min="0"
                    max="14"
                    onChange={(e) => updateFormData('pH', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moisture" className="text-sm font-medium">Soil Moisture (%)</Label>
                  <Input
                    id="moisture"
                    type="number"
                    placeholder="45"
                    min="0"
                    max="100"
                    onChange={(e) => updateFormData('moisture', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen" className="text-sm font-medium">Nitrogen (kg/ha)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="120"
                    min="0"
                    onChange={(e) => updateFormData('nitrogen', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus" className="text-sm font-medium">Phosphorus (kg/ha)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="60"
                    min="0"
                    onChange={(e) => updateFormData('phosphorus', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Weather Data */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-sm font-medium">Avg Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="28"
                    min="-50"
                    max="50"
                    onChange={(e) => updateFormData('temperature', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rainfall" className="text-sm font-medium">Rainfall (mm)</Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="850"
                    min="0"
                    onChange={(e) => updateFormData('rainfall', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Land Area */}
              <div className="space-y-2">
                <Label htmlFor="land-area" className="text-sm font-medium">Land Area (hectares)</Label>
                <Input
                  id="land-area"
                  type="number"
                  placeholder="2.5"
                  min="0"
                  step="0.1"
                  onChange={(e) => updateFormData('landArea', parseFloat(e.target.value) || 0)}
                />
              </div>

              <Button 
                onClick={handlePredict} 
                disabled={isLoading}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Predict Yield
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6 shadow-card">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-success" />
              Prediction Results
            </h3>

            {(() => {
              console.log('Checking predictionResult:', predictionResult);
              return predictionResult;
            })() ? (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className="text-center p-6 bg-gradient-hero rounded-lg">
                  <div className="text-primary-foreground">
                    <div className="text-sm font-medium mb-2">Predicted Yield</div>
                    <div className="text-4xl font-bold mb-2">{predictionResult.yield} tons/hectare</div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span>Confidence: {predictionResult.confidence}%</span>
                      <Progress value={predictionResult.confidence} className="w-20 h-2" />
                    </div>
                  </div>
                </div>

                {/* Additional Insights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${predictionResult.expectedGrowth >= 0 ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'} border rounded-lg p-4`}>
                    <div className={`flex items-center gap-2 mb-2 ${predictionResult.expectedGrowth >= 0 ? 'text-success' : 'text-destructive'}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">Expected Growth</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {predictionResult.expectedGrowth >= 0 ? '+' : ''}{predictionResult.expectedGrowth}%
                    </div>
                    <div className="text-sm text-muted-foreground">vs last season</div>
                  </div>
                  <div className={`${predictionResult.riskLevel === 'Low' ? 'bg-success/10 border-success/20' : predictionResult.riskLevel === 'High' ? 'bg-destructive/10 border-destructive/20' : 'bg-warning/10 border-warning/20'} border rounded-lg p-4`}>
                    <div className={`flex items-center gap-2 mb-2 ${predictionResult.riskLevel === 'Low' ? 'text-success' : predictionResult.riskLevel === 'High' ? 'text-destructive' : 'text-warning'}`}>
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Risk Level</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{predictionResult.riskLevel}</div>
                    <div className="text-sm text-muted-foreground">{predictionResult.riskDescription}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Enter your parameters and click "Predict Yield" to see AI-powered results</p>
              </div>
            )}
          </Card>
        </div>

        {/* Charts Section */}
        {predictionResult && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Yield Trend Chart */}
            <Card className="p-6 shadow-card">
              <h4 className="text-xl font-semibold text-foreground mb-4">Yield Trend (Last 6 Months)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Crop Comparison Chart */}
            <Card className="p-6 shadow-card">
              <h4 className="text-xl font-semibold text-foreground mb-4">Crop Yield Comparison</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="currentYear" fill="hsl(var(--primary))" name="Current Year" />
                  <Bar dataKey="lastYear" fill="hsl(var(--secondary))" name="Last Year" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
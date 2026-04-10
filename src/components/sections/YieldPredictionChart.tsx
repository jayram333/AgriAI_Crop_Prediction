import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface YieldData {
  month: string;
  predicted: number;
  actual: number;
  target: number;
}

export const YieldPredictionChart = () => {
  // Mock yield prediction data - in real app, this would come from AI model
  const yieldData: YieldData[] = [
    { month: "Jan", predicted: 3.2, actual: 3.0, target: 3.5 },
    { month: "Feb", predicted: 3.5, actual: 3.4, target: 3.7 },
    { month: "Mar", predicted: 3.8, actual: 3.9, target: 4.0 },
    { month: "Apr", predicted: 4.1, actual: 4.0, target: 4.2 },
    { month: "May", predicted: 4.4, actual: 4.2, target: 4.5 },
    { month: "Jun", predicted: 4.6, actual: 0, target: 4.7 }, // Future prediction
    { month: "Jul", predicted: 4.8, actual: 0, target: 4.9 }, // Future prediction
  ];

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Yield Prediction Trends
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground"
              label={{ 
                value: 'Yield (tons/hectare)', 
                angle: -90, 
                position: 'insideLeft',
                className: 'text-muted-foreground'
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: 'hsl(var(--shadow-card))'
              }}
            />
            
            {/* Predicted Yield Line */}
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
              name="Predicted Yield"
            />
            
            {/* Actual Yield Line */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 6 }}
              connectNulls={false}
              name="Actual Yield"
            />
            
            {/* Target Yield Line */}
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
              name="Target Yield"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">4.6</div>
          <div className="text-sm text-muted-foreground">Next Month Prediction</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">95%</div>
          <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">+18%</div>
          <div className="text-sm text-muted-foreground">Improvement vs Last Year</div>
        </div>
      </div>
    </Card>
  );
};
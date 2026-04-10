import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('yield');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Mock data for charts
  const yieldTrendData = [
    { month: 'Jan', currentYear: 3.2, lastYear: 2.9, predicted: 3.4 },
    { month: 'Feb', currentYear: 3.5, lastYear: 3.1, predicted: 3.7 },
    { month: 'Mar', currentYear: 3.8, lastYear: 3.4, predicted: 4.0 },
    { month: 'Apr', currentYear: 4.1, lastYear: 3.7, predicted: 4.3 },
    { month: 'May', currentYear: 4.2, lastYear: 3.8, predicted: 4.5 },
    { month: 'Jun', currentYear: 4.4, lastYear: 4.0, predicted: 4.6 },
  ];

  const cropComparisonData = [
    { crop: 'Rice', yield: 4.2, revenue: 84000, cost: 52000 },
    { crop: 'Wheat', yield: 3.9, revenue: 70200, cost: 48000 },
    { crop: 'Maize', yield: 5.1, revenue: 91800, cost: 55000 },
    { crop: 'Cotton', yield: 2.8, revenue: 112000, cost: 68000 },
  ];

  const soilHealthData = [
    { parameter: 'pH Level', value: 6.8, optimal: 6.5, status: 'Good' },
    { parameter: 'Nitrogen', value: 120, optimal: 110, status: 'Good' },
    { parameter: 'Phosphorus', value: 45, optimal: 60, status: 'Low' },
    { parameter: 'Potassium', value: 85, optimal: 80, status: 'Good' },
    { parameter: 'Organic Matter', value: 3.2, optimal: 3.5, status: 'Moderate' },
  ];

  const irrigationData = [
    { method: 'Drip', efficiency: 92, area: 15 },
    { method: 'Sprinkler', efficiency: 78, area: 8 },
    { method: 'Flood', efficiency: 45, area: 2 },
  ];

  const weatherImpactData = [
    { factor: 'Temperature', impact: 85, color: '#ff6b6b' },
    { factor: 'Rainfall', impact: 92, color: '#4ecdc4' },
    { factor: 'Humidity', impact: 67, color: '#45b7d1' },
    { factor: 'Sunlight', impact: 78, color: '#feca57' },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-foreground">Analytics & Reports</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Yield</p>
                <p className="text-2xl font-bold text-foreground">156.2 tons</p>
                <p className="text-xs text-success">+12.5% from last period</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">₹3,58,000</p>
                <p className="text-xs text-success">+18.2% from last period</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Efficiency</p>
                <p className="text-2xl font-bold text-foreground">82%</p>
                <p className="text-xs text-success">+5.1% improvement</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Water Usage</p>
                <p className="text-2xl font-bold text-foreground">1,250 L/ha</p>
                <p className="text-xs text-success">-8.3% reduction</p>
              </div>
              <Filter className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Yield Trend */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Yield Trend Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="currentYear" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Current Year"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lastYear" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Last Year"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Crop Performance */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Crop Performance Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="hsl(var(--primary))" name="Yield (tons/ha)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Soil Health Status */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Soil Health Status</h3>
            <div className="space-y-4">
              {soilHealthData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.parameter}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'Good' ? 'bg-green-100 text-green-800' :
                        item.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Current: {item.value}</span>
                      <span>Optimal: {item.optimal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Irrigation Efficiency */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Irrigation Efficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={irrigationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="area"
                    label={(entry) => `${entry.method}: ${entry.efficiency}%`}
                  >
                    {irrigationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Weather Impact */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Weather Impact Analysis</h3>
            <div className="space-y-4">
              {weatherImpactData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.factor}</span>
                    <span className="text-sm text-muted-foreground">{item.impact}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${item.impact}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Revenue Analysis */}
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-semibold text-foreground mb-6">Revenue vs Cost Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cropComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Revenue (₹)"
                />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stackId="2"
                  stroke="hsl(var(--destructive))" 
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                  name="Cost (₹)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
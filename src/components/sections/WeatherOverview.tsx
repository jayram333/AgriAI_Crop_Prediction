import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  condition: string;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    rainfall: number;
  }>;
}

export const WeatherOverview = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Simulate weather data - in real app, this would come from weather API
    const mockWeather: WeatherData = {
      location: "Farm Location",
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall: 15,
      condition: "Partly Cloudy",
      forecast: [
        { day: "Today", temp: 28, condition: "Partly Cloudy", rainfall: 15 },
        { day: "Tomorrow", temp: 26, condition: "Rainy", rainfall: 45 },
        { day: "Thu", temp: 30, condition: "Sunny", rainfall: 0 },
        { day: "Fri", temp: 29, condition: "Cloudy", rainfall: 10 },
        { day: "Sat", temp: 27, condition: "Rainy", rainfall: 35 },
      ]
    };
    setWeather(mockWeather);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-warning" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-secondary" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-6 h-6 text-muted-foreground" />;
      default:
        return <Sun className="w-6 h-6 text-warning" />;
    }
  };

  if (!weather) return null;

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Current Weather</h3>
          <Badge variant="secondary">{weather.location}</Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-5 h-5 text-warning" />
            <div>
              <div className="text-2xl font-bold text-foreground">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">Temperature</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-secondary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{weather.humidity}%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Wind className="w-5 h-5 text-earth" />
            <div>
              <div className="text-2xl font-bold text-foreground">{weather.windSpeed} km/h</div>
              <div className="text-sm text-muted-foreground">Wind Speed</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <CloudRain className="w-5 h-5 text-secondary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{weather.rainfall}mm</div>
              <div className="text-sm text-muted-foreground">Rainfall</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {weather.forecast.map((day, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-muted/30 hover:bg-card-hover transition-colors">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-lg font-bold text-foreground">{day.temp}°C</div>
              <div className="text-xs text-muted-foreground">{day.condition}</div>
              {day.rainfall > 0 && (
                <div className="text-xs text-secondary mt-1">{day.rainfall}mm</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
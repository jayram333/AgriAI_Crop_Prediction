import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bug, Droplets, Calendar, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  type: "pest" | "irrigation" | "fertilizer" | "disease" | "weather";
  priority: "high" | "medium" | "low";
  title: string;
  message: string;
  date: string;
  actionRequired: boolean;
}

export const AlertsPanel = () => {
  // Mock alerts data - in real app, this would come from backend
  const alerts: Alert[] = [
    {
      id: "1",
      type: "pest",
      priority: "high",
      title: "Aphid Detection Alert",
      message: "High aphid activity detected in wheat fields. Immediate action recommended.",
      date: "Today",
      actionRequired: true
    },
    {
      id: "2",
      type: "irrigation",
      priority: "medium",
      title: "Irrigation Reminder",
      message: "Soil moisture below optimal level. Schedule irrigation for tomorrow.",
      date: "Today",
      actionRequired: true
    },
    {
      id: "3",
      type: "fertilizer",
      priority: "medium",
      title: "Fertilizer Application Due",
      message: "NPK fertilizer application scheduled for this week based on soil analysis.",
      date: "2 days ago",
      actionRequired: true
    },
    {
      id: "4",
      type: "weather",
      priority: "low",
      title: "Rain Forecast",
      message: "Heavy rainfall expected in 3 days. Consider adjusting irrigation schedule.",
      date: "Yesterday",
      actionRequired: false
    },
    {
      id: "5",
      type: "disease",
      priority: "high",
      title: "Leaf Spot Risk",
      message: "Conditions favorable for leaf spot disease. Monitor crops closely.",
      date: "Today",
      actionRequired: true
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "pest":
        return <Bug className="w-5 h-5" />;
      case "irrigation":
        return <Droplets className="w-5 h-5" />;
      case "fertilizer":
        return <Calendar className="w-5 h-5" />;
      case "disease":
        return <AlertTriangle className="w-5 h-5" />;
      case "weather":
        return <Calendar className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-secondary";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const highPriorityAlerts = alerts.filter(alert => alert.priority === "high");
  const otherAlerts = alerts.filter(alert => alert.priority !== "high");

  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-warning" />
          Alerts & Reminders
        </h3>
        <Badge variant="secondary">
          {alerts.filter(a => a.actionRequired).length} Action Required
        </Badge>
      </div>

      <div className="space-y-4">
        {/* High Priority Alerts */}
        {highPriorityAlerts.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-destructive mb-3">High Priority</h4>
            <div className="space-y-3">
              {highPriorityAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={getPriorityColor(alert.priority)}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <h5 className="font-medium text-foreground">{alert.title}</h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadge(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  {alert.actionRequired && (
                    <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Take Action
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Alerts */}
        {otherAlerts.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Other Alerts</h4>
            <div className="space-y-3">
              {otherAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-card-hover transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={getPriorityColor(alert.priority)}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <h5 className="font-medium text-foreground">{alert.title}</h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadge(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  {alert.actionRequired && (
                    <Button size="sm" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View All Alerts Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" className="w-full">
          View All Alerts & Recommendations
        </Button>
      </div>
    </Card>
  );
};

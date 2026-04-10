import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Droplets, 
  Sprout, 
  Bug, 
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Calendar,
  Filter
} from 'lucide-react';

const Recommendations = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<any[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchRecommendations();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    applyFilters();
  }, [recommendations, filterType, filterPriority, filterStatus]);

  const fetchRecommendations = async () => {
    if (!user) return;

    // Since we don't have farm data yet, we'll use mock data
    // In a real app, this would fetch from the database
    const mockRecommendations = [
      {
        id: 1,
        recommendation_type: 'irrigation',
        title: 'Increase Irrigation Frequency',
        description: 'Current soil moisture levels are below optimal for rice cultivation. Recommend increasing irrigation frequency from twice weekly to daily for the next 2 weeks to improve yield potential.',
        priority: 'high',
        status: 'pending',
        recommended_date: '2024-01-15',
        created_at: '2024-01-10',
        details: {
          currentMoisture: '35%',
          targetMoisture: '50-60%',
          estimatedYieldIncrease: '15%'
        }
      },
      {
        id: 2,
        recommendation_type: 'fertilizer',
        title: 'Nitrogen Fertilizer Application',
        description: 'Soil analysis indicates nitrogen deficiency. Apply 120 kg/ha of urea fertilizer during the vegetative growth stage to optimize crop development.',
        priority: 'medium',
        status: 'pending',
        recommended_date: '2024-01-20',
        created_at: '2024-01-12',
        details: {
          currentNitrogen: '85 kg/ha',
          recommendedAmount: '120 kg/ha',
          applicationMethod: 'Split application'
        }
      },
      {
        id: 3,
        recommendation_type: 'pest_control',
        title: 'Brown Planthopper Monitoring',
        description: 'Weather conditions and crop stage indicate high risk for brown planthopper infestation. Monitor crops closely and consider preventive spraying.',
        priority: 'high',
        status: 'pending',
        recommended_date: '2024-01-12',
        created_at: '2024-01-11',
        details: {
          pestType: 'Brown Planthopper',
          riskLevel: 'High',
          treatmentOptions: ['Imidacloprid', 'Thiamethoxam']
        }
      },
      {
        id: 4,
        recommendation_type: 'irrigation',
        title: 'Switch to Drip Irrigation',
        description: 'Consider transitioning to drip irrigation system for better water efficiency and uniform water distribution.',
        priority: 'low',
        status: 'applied',
        recommended_date: '2024-01-05',
        created_at: '2024-01-01',
        details: {
          potentialSavings: '30% water reduction',
          efficiency: '90-95%',
          paybackPeriod: '2-3 years'
        }
      },
      {
        id: 5,
        recommendation_type: 'fertilizer',
        title: 'Phosphorus Supplementation',
        description: 'Soil test results show phosphorus levels below optimal range. Apply DAP fertilizer to boost phosphorus availability.',
        priority: 'medium',
        status: 'dismissed',
        recommended_date: '2024-01-08',
        created_at: '2024-01-05',
        details: {
          currentPhosphorus: '45 kg/ha',
          targetPhosphorus: '60-80 kg/ha',
          recommendedFertilizer: 'DAP (Diammonium Phosphate)'
        }
      },
      {
        id: 6,
        recommendation_type: 'pest_control',
        title: 'Integrated Pest Management',
        description: 'Implement IPM strategies including beneficial insects and bio-pesticides to reduce chemical dependency.',
        priority: 'medium',
        status: 'pending',
        recommended_date: '2024-01-25',
        created_at: '2024-01-14',
        details: {
          strategy: 'IPM',
          beneficialInsects: ['Trichogramma', 'Lady beetles'],
          chemicalReduction: '40-60%'
        }
      }
    ];

    setRecommendations(mockRecommendations);
  };

  const applyFilters = () => {
    let filtered = recommendations;

    if (filterType !== 'all') {
      filtered = filtered.filter(rec => rec.recommendation_type === filterType);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(rec => rec.priority === filterPriority);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(rec => rec.status === filterStatus);
    }

    setFilteredRecommendations(filtered);
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    // In a real app, this would update the database
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, status: newStatus } : rec
      )
    );

    toast({
      title: 'Status updated',
      description: `Recommendation marked as ${newStatus}`,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return Droplets;
      case 'fertilizer':
        return Sprout;
      case 'pest_control':
        return Bug;
      default:
        return AlertTriangle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'irrigation':
        return 'text-blue-600 bg-blue-100';
      case 'fertilizer':
        return 'text-green-600 bg-green-100';
      case 'pest_control':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'applied':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

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
              <h1 className="text-xl font-bold text-foreground">Smart Recommendations</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{recommendations.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending Actions</p>
            </div>
          </Card>
          <Card className="p-6 shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{recommendations.filter(r => r.priority === 'high').length}</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </Card>
          <Card className="p-6 shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{recommendations.filter(r => r.status === 'applied').length}</p>
              <p className="text-sm text-muted-foreground">Applied</p>
            </div>
          </Card>
          <Card className="p-6 shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{recommendations.length}</p>
              <p className="text-sm text-muted-foreground">Total Recommendations</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="irrigation">Irrigation</SelectItem>
                <SelectItem value="fertilizer">Fertilizer</SelectItem>
                <SelectItem value="pest_control">Pest Control</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-6">
          {filteredRecommendations.map((recommendation) => {
            const Icon = getIcon(recommendation.recommendation_type);
            return (
              <Card key={recommendation.id} className="p-6 shadow-card hover:shadow-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(recommendation.recommendation_type)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {recommendation.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(recommendation.priority)}>
                            {recommendation.priority} priority
                          </Badge>
                          <Badge className={getStatusColor(recommendation.status)}>
                            {recommendation.status}
                          </Badge>
                          <Badge variant="outline">
                            {recommendation.recommendation_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {recommendation.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(recommendation.id, 'applied')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStatusChange(recommendation.id, 'dismissed')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {recommendation.description}
                    </p>
                    
                    {/* Details */}
                    {recommendation.details && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-foreground mb-2">Details:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          {Object.entries(recommendation.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <br />
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Recommended: {new Date(recommendation.recommended_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Created: {new Date(recommendation.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredRecommendations.length === 0 && (
          <Card className="p-12 text-center shadow-card">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No recommendations found</h3>
            <p className="text-muted-foreground">
              No recommendations match your current filters. Try adjusting the filter criteria.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Recommendations;
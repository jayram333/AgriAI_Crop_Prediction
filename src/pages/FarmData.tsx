import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  MapPin, 
  Sprout, 
  Beaker,
  Droplets,
  Thermometer
} from 'lucide-react';

const FarmData = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const [isAddingFarm, setIsAddingFarm] = useState(false);
  const [soilData, setSoilData] = useState<any>({});
  const [crops, setCrops] = useState<any[]>([]);
  const [isAddingCrop, setIsAddingCrop] = useState(false);

  const [farmForm, setFarmForm] = useState({
    farm_name: '',
    location: '',
    total_area: '',
    irrigation_method: ''
  });

  const [cropForm, setCropForm] = useState({
    crop_type: '',
    crop_variety: '',
    planting_date: '',
    expected_harvest_date: '',
    area: ''
  });

  const [soilForm, setSoilForm] = useState({
    ph_level: '',
    moisture_percentage: '',
    nitrogen_level: '',
    phosphorus_level: '',
    potassium_level: '',
    organic_matter: '',
    soil_texture: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchFarms();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (selectedFarm) {
      fetchCrops();
      fetchSoilData();
    }
  }, [selectedFarm]);

  const fetchFarms = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('farms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: 'Error fetching farms',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      setFarms(data || []);
      if (data && data.length > 0 && !selectedFarm) {
        setSelectedFarm(data[0]);
      }
    }
  };

  const fetchCrops = async () => {
    if (!selectedFarm) return;
    
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .eq('farm_id', selectedFarm.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: 'Error fetching crops',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      setCrops(data || []);
    }
  };

  const fetchSoilData = async () => {
    if (!selectedFarm) return;
    
    const { data, error } = await supabase
      .from('soil_data')
      .select('*')
      .eq('farm_id', selectedFarm.id)
      .order('recorded_at', { ascending: false })
      .limit(1);
    
    if (error) {
      toast({
        title: 'Error fetching soil data',
        description: error.message,
        variant: 'destructive'
      });
    } else if (data && data.length > 0) {
      const latestSoil = data[0];
      setSoilData(latestSoil);
      setSoilForm({
        ph_level: latestSoil.ph_level?.toString() || '',
        moisture_percentage: latestSoil.moisture_percentage?.toString() || '',
        nitrogen_level: latestSoil.nitrogen_level?.toString() || '',
        phosphorus_level: latestSoil.phosphorus_level?.toString() || '',
        potassium_level: latestSoil.potassium_level?.toString() || '',
        organic_matter: latestSoil.organic_matter?.toString() || '',
        soil_texture: latestSoil.soil_texture || ''
      });
    }
  };

  const handleSaveFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('farms')
      .insert({
        ...farmForm,
        user_id: user.id,
        total_area: parseFloat(farmForm.total_area)
      });

    if (error) {
      toast({
        title: 'Error saving farm',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Farm saved successfully',
        description: 'Your farm data has been saved.'
      });
      setIsAddingFarm(false);
      setFarmForm({ farm_name: '', location: '', total_area: '', irrigation_method: '' });
      fetchFarms();
    }
  };

  const handleSaveCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarm) return;

    const { error } = await supabase
      .from('crops')
      .insert({
        ...cropForm,
        farm_id: selectedFarm.id,
        area: parseFloat(cropForm.area)
      });

    if (error) {
      toast({
        title: 'Error saving crop',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Crop saved successfully',
        description: 'Your crop data has been saved.'
      });
      setIsAddingCrop(false);
      setCropForm({ crop_type: '', crop_variety: '', planting_date: '', expected_harvest_date: '', area: '' });
      fetchCrops();
    }
  };

  const handleSaveSoilData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarm) return;

    const { error } = await supabase
      .from('soil_data')
      .insert({
        ...soilForm,
        farm_id: selectedFarm.id,
        ph_level: parseFloat(soilForm.ph_level),
        moisture_percentage: parseFloat(soilForm.moisture_percentage),
        nitrogen_level: parseFloat(soilForm.nitrogen_level),
        phosphorus_level: parseFloat(soilForm.phosphorus_level),
        potassium_level: parseFloat(soilForm.potassium_level),
        organic_matter: parseFloat(soilForm.organic_matter)
      });

    if (error) {
      toast({
        title: 'Error saving soil data',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Soil data saved successfully',
        description: 'Your soil analysis has been updated.'
      });
      fetchSoilData();
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
              <h1 className="text-xl font-bold text-foreground">Farm Data Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Farm Selection */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Farms
            </h2>
            <Button onClick={() => setIsAddingFarm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Farm
            </Button>
          </div>

          {isAddingFarm && (
            <form onSubmit={handleSaveFarm} className="mb-6 p-4 border rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-4">Add New Farm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farm_name">Farm Name</Label>
                  <Input
                    id="farm_name"
                    value={farmForm.farm_name}
                    onChange={(e) => setFarmForm({ ...farmForm, farm_name: e.target.value })}
                    placeholder="Enter farm name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={farmForm.location}
                    onChange={(e) => setFarmForm({ ...farmForm, location: e.target.value })}
                    placeholder="Enter farm location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_area">Total Area (hectares)</Label>
                  <Input
                    id="total_area"
                    type="number"
                    step="0.1"
                    value={farmForm.total_area}
                    onChange={(e) => setFarmForm({ ...farmForm, total_area: e.target.value })}
                    placeholder="Enter total area"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation_method">Irrigation Method</Label>
                  <Select value={farmForm.irrigation_method} onValueChange={(value) => setFarmForm({ ...farmForm, irrigation_method: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                      <SelectItem value="manual">Manual Watering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit">Save Farm</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingFarm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {farms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {farms.map((farm) => (
                <div 
                  key={farm.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedFarm?.id === farm.id ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFarm(farm)}
                >
                  <h3 className="font-semibold text-foreground">{farm.farm_name}</h3>
                  <p className="text-sm text-muted-foreground">{farm.location}</p>
                  <p className="text-sm text-muted-foreground">{farm.total_area} hectares</p>
                  <p className="text-sm text-muted-foreground">
                    Irrigation: {farm.irrigation_method || 'Not specified'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {selectedFarm && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crops Section */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  <Sprout className="w-6 h-6 text-primary" />
                  Crops
                </h2>
                <Button onClick={() => setIsAddingCrop(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Crop
                </Button>
              </div>

              {isAddingCrop && (
                <form onSubmit={handleSaveCrop} className="mb-6 p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-4">Add New Crop</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="crop_type">Crop Type</Label>
                        <Select value={cropForm.crop_type} onValueChange={(value) => setCropForm({ ...cropForm, crop_type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="maize">Maize</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="sugarcane">Sugarcane</SelectItem>
                            <SelectItem value="soybean">Soybean</SelectItem>
                            <SelectItem value="pulses">Pulses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="crop_variety">Crop Variety</Label>
                        <Input
                          id="crop_variety"
                          value={cropForm.crop_variety}
                          onChange={(e) => setCropForm({ ...cropForm, crop_variety: e.target.value })}
                          placeholder="Enter crop variety"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="planting_date">Planting Date</Label>
                        <Input
                          id="planting_date"
                          type="date"
                          value={cropForm.planting_date}
                          onChange={(e) => setCropForm({ ...cropForm, planting_date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expected_harvest_date">Expected Harvest Date</Label>
                        <Input
                          id="expected_harvest_date"
                          type="date"
                          value={cropForm.expected_harvest_date}
                          onChange={(e) => setCropForm({ ...cropForm, expected_harvest_date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (hectares)</Label>
                      <Input
                        id="area"
                        type="number"
                        step="0.1"
                        value={cropForm.area}
                        onChange={(e) => setCropForm({ ...cropForm, area: e.target.value })}
                        placeholder="Enter crop area"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button type="submit">Save Crop</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingCrop(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {crops.map((crop) => (
                  <div key={crop.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {crop.crop_type} {crop.crop_variety && `- ${crop.crop_variety}`}
                        </h3>
                        <p className="text-sm text-muted-foreground">Area: {crop.area} hectares</p>
                        {crop.planting_date && (
                          <p className="text-sm text-muted-foreground">
                            Planted: {new Date(crop.planting_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Soil Data Section */}
            <Card className="p-6 shadow-card">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Beaker className="w-6 h-6 text-primary" />
                Soil Analysis
              </h2>

              <form onSubmit={handleSaveSoilData} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ph_level">pH Level</Label>
                    <Input
                      id="ph_level"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={soilForm.ph_level}
                      onChange={(e) => setSoilForm({ ...soilForm, ph_level: e.target.value })}
                      placeholder="6.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moisture_percentage">Moisture (%)</Label>
                    <Input
                      id="moisture_percentage"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={soilForm.moisture_percentage}
                      onChange={(e) => setSoilForm({ ...soilForm, moisture_percentage: e.target.value })}
                      placeholder="45"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen_level">Nitrogen (kg/ha)</Label>
                    <Input
                      id="nitrogen_level"
                      type="number"
                      step="0.1"
                      value={soilForm.nitrogen_level}
                      onChange={(e) => setSoilForm({ ...soilForm, nitrogen_level: e.target.value })}
                      placeholder="120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phosphorus_level">Phosphorus (kg/ha)</Label>
                    <Input
                      id="phosphorus_level"
                      type="number"
                      step="0.1"
                      value={soilForm.phosphorus_level}
                      onChange={(e) => setSoilForm({ ...soilForm, phosphorus_level: e.target.value })}
                      placeholder="60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potassium_level">Potassium (kg/ha)</Label>
                    <Input
                      id="potassium_level"
                      type="number"
                      step="0.1"
                      value={soilForm.potassium_level}
                      onChange={(e) => setSoilForm({ ...soilForm, potassium_level: e.target.value })}
                      placeholder="80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organic_matter">Organic Matter (%)</Label>
                    <Input
                      id="organic_matter"
                      type="number"
                      step="0.1"
                      value={soilForm.organic_matter}
                      onChange={(e) => setSoilForm({ ...soilForm, organic_matter: e.target.value })}
                      placeholder="3.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soil_texture">Soil Texture</Label>
                    <Select value={soilForm.soil_texture} onValueChange={(value) => setSoilForm({ ...soilForm, soil_texture: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil texture" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="sandy_loam">Sandy Loam</SelectItem>
                        <SelectItem value="clay_loam">Clay Loam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Soil Analysis
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmData;
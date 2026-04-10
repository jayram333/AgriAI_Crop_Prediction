-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  farm_location TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create farms table
CREATE TABLE public.farms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  location TEXT,
  total_area DECIMAL(10,2),
  irrigation_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own farms" 
ON public.farms 
FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Create crops table
CREATE TABLE public.crops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  crop_variety TEXT,
  planting_date DATE,
  expected_harvest_date DATE,
  area DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage crops for their farms" 
ON public.crops 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.farms 
  WHERE farms.id = crops.farm_id 
  AND farms.user_id = auth.uid()
));

-- Create soil_data table
CREATE TABLE public.soil_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  ph_level DECIMAL(3,1),
  moisture_percentage DECIMAL(5,2),
  nitrogen_level DECIMAL(8,2),
  phosphorus_level DECIMAL(8,2),
  potassium_level DECIMAL(8,2),
  organic_matter DECIMAL(5,2),
  soil_texture TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.soil_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage soil data for their farms" 
ON public.soil_data 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.farms 
  WHERE farms.id = soil_data.farm_id 
  AND farms.user_id = auth.uid()
));

-- Create weather_data table
CREATE TABLE public.weather_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  rainfall DECIMAL(8,2),
  wind_speed DECIMAL(5,2),
  sunlight_hours DECIMAL(4,2),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Weather data is viewable by all authenticated users" 
ON public.weather_data 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create yield_predictions table
CREATE TABLE public.yield_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
  predicted_yield DECIMAL(10,2),
  confidence_score DECIMAL(5,2),
  prediction_date DATE NOT NULL,
  model_version TEXT,
  input_parameters JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.yield_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view predictions for their crops" 
ON public.yield_predictions 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.crops 
  JOIN public.farms ON farms.id = crops.farm_id
  WHERE crops.id = yield_predictions.crop_id 
  AND farms.user_id = auth.uid()
));

-- Create recommendations table
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL, -- 'irrigation', 'fertilizer', 'pest_control'
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  status TEXT DEFAULT 'pending', -- 'pending', 'applied', 'dismissed'
  recommended_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage recommendations for their farms" 
ON public.recommendations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.farms 
  WHERE farms.id = recommendations.farm_id 
  AND farms.user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON public.farms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crops_updated_at
  BEFORE UPDATE ON public.crops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recommendations_updated_at
  BEFORE UPDATE ON public.recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
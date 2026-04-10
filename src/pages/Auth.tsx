import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Brain, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'aadhar'>('email');
  const [signupMethod, setSignupMethod] = useState<'email' | 'aadhar'>('email');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateAadhar = (aadhar: string): boolean => {
    if (aadhar.length !== 12) return false;
    
    // Simple Luhn algorithm check for Aadhar
    const digits = aadhar.split('').map(Number);
    const checksum = digits.pop();
    
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    return (sum + checksum!) % 10 === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation for Aadhar
      if (isLogin && loginMethod === 'aadhar' && !validateAadhar(aadharNumber)) {
        toast({
          title: 'Invalid Aadhar',
          description: 'Please enter a valid 12-digit Aadhar number.',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      if (!isLogin && signupMethod === 'aadhar' && !validateAadhar(aadharNumber)) {
        toast({
          title: 'Invalid Aadhar',
          description: 'Please enter a valid 12-digit Aadhar number.',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      if (isLogin) {
        const loginIdentifier = loginMethod === 'email' ? email : `${aadharNumber}@aadhar.local`;
        const { error } = await signIn(loginIdentifier, password);
        if (error) {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'Successfully logged in to your account.',
          });
          navigate('/dashboard');
        }
      } else {
        const signupEmail = signupMethod === 'email' ? email : `${aadharNumber}@aadhar.local`;
        const metadata = {
          full_name: fullName,
          phone,
          farm_location: farmLocation,
          preferred_language: preferredLanguage,
          registration_method: signupMethod,
          ...(signupMethod === 'aadhar' && { aadhar_number: aadharNumber })
        };

        const { error } = await signUp(signupEmail, password, metadata);
        
        if (error) {
          toast({
            title: 'Registration failed',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Registration successful!',
            description: signupMethod === 'email' 
              ? 'Please check your email to verify your account.'
              : 'Your account has been created successfully.',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AgriAI Platform</h1>
          </div>
          
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to your farming dashboard' : 'Join thousands of smart farmers'}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="p-6 shadow-card">
          <div className="space-y-6">
            {/* Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  !isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Sign up only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Login Method Toggle */}
              {isLogin && (
                <div className="space-y-3">
                  <Label>Login with</Label>
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'email' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('aadhar')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'aadhar' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Aadhar
                    </button>
                  </div>
                </div>
              )}

              {/* Signup Method Toggle */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label>Register with</Label>
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setSignupMethod('email')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        signupMethod === 'email' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupMethod('aadhar')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        signupMethod === 'aadhar' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Aadhar
                    </button>
                  </div>
                </div>
              )}

              {/* Email Input */}
              {((isLogin && loginMethod === 'email') || (!isLogin && signupMethod === 'email')) && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}

              {/* Aadhar Input */}
              {((isLogin && loginMethod === 'aadhar') || (!isLogin && signupMethod === 'aadhar')) && (
                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input
                    id="aadhar"
                    type="text"
                    value={aadharNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 12) {
                        setAadharNumber(value);
                      }
                    }}
                    placeholder="Enter your 12-digit Aadhar number"
                    maxLength={12}
                    required
                  />
                  {aadharNumber && aadharNumber.length !== 12 && (
                    <p className="text-sm text-destructive">Aadhar number must be 12 digits</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Additional fields for sign up */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    <Input
                      id="farmLocation"
                      type="text"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      placeholder="Enter your farm location"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="kn">Kannada</SelectItem>
                        <SelectItem value="ml">Malayalam</SelectItem>
                        <SelectItem value="bn">Bengali</SelectItem>
                        <SelectItem value="gu">Gujarati</SelectItem>
                        <SelectItem value="mr">Marathi</SelectItem>
                        <SelectItem value="pa">Punjabi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted by farmers worldwide</p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>✓ AI Yield Predictions</span>
            <span>✓ Smart Recommendations</span>
            <span>✓ Weather Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
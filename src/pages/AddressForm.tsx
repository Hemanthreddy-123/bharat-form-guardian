
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddressData {
  houseNumber: string;
  streetName: string;
  landmark: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  addressType: string;
  duration: string;
}

const AddressForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<AddressData>({
    houseNumber: '',
    streetName: '',
    landmark: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    addressType: '',
    duration: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const addressTypes = ['Residential', 'Commercial', 'Office', 'Temporary'];
  const durations = ['Less than 1 year', '1-3 years', '3-5 years', 'More than 5 years'];

  // Sample PIN code to location mapping (in real app, this would be an API call)
  const pincodeData: {[key: string]: {city: string, district: string, state: string}} = {
    '110001': { city: 'New Delhi', district: 'Central Delhi', state: 'Delhi' },
    '400001': { city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra' },
    '560001': { city: 'Bangalore', district: 'Bangalore Urban', state: 'Karnataka' },
    '600001': { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu' },
    '700001': { city: 'Kolkata', district: 'Kolkata', state: 'West Bengal' },
    '500001': { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana' },
    '411001': { city: 'Pune', district: 'Pune', state: 'Maharashtra' },
    '380001': { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'houseNumber':
        if (!value.trim()) return 'House number is required';
        return '';
        
      case 'streetName':
        if (!value.trim()) return 'Street name is required';
        if (value.length < 3) return 'Street name must be at least 3 characters';
        return '';
        
      case 'area':
        if (!value.trim()) return 'Area is required';
        return '';
        
      case 'city':
        if (!value.trim()) return 'City is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
        
      case 'district':
        if (!value.trim()) return 'District is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
        
      case 'state':
        if (!value.trim()) return 'State is required';
        return '';
        
      case 'pincode':
        if (!value) return 'PIN code is required';
        if (!/^\d{6}$/.test(value)) return 'PIN code must be 6 digits';
        return '';
        
      case 'addressType':
        if (!value) return 'Address type is required';
        return '';
        
      case 'duration':
        if (!value) return 'Duration is required';
        return '';
        
      default:
        return '';
    }
  };

  const handlePincodeChange = async (pincode: string) => {
    setPincodeLoading(true);
    setFormData(prev => ({ ...prev, pincode }));

    if (pincode.length === 6) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const locationData = pincodeData[pincode];
      if (locationData) {
        setFormData(prev => ({
          ...prev,
          city: locationData.city,
          district: locationData.district,
          state: locationData.state
        }));
        toast({
          title: "Location Found",
          description: `Auto-filled location for PIN ${pincode}`,
        });
      } else {
        toast({
          title: "PIN Code Not Found",
          description: "Please enter city, district, and state manually",
          variant: "destructive"
        });
      }
    }
    
    setPincodeLoading(false);
    
    const error = validateField('pincode', pincode);
    setErrors(prev => ({ ...prev, pincode: error }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'landmark') { // landmark is optional
        const error = validateField(key, formData[key as keyof AddressData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive"
      });
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Success!",
      description: "Address verification submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof AddressData];
    const error = errors[fieldName];
    
    if (!value) return null;
    if (error) return 'error';
    return 'success';
  };

  const renderFieldIcon = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Address Verification</h1>
              <p className="text-gray-600">Verify your residential address</p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Address Verification Form</CardTitle>
            <p className="text-center text-gray-600">Enter your complete address details for verification</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* House Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>House/Flat Number *</Label>
                    <div className="relative">
                      <Input
                        value={formData.houseNumber}
                        onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                        placeholder="e.g., 123, A-45, Flat 301"
                        className={errors.houseNumber ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('houseNumber')}
                      </div>
                    </div>
                    {errors.houseNumber && <p className="text-red-500 text-sm">{errors.houseNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Street Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.streetName}
                        onChange={(e) => handleInputChange('streetName', e.target.value)}
                        placeholder="e.g., MG Road, Main Street"
                        className={errors.streetName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('streetName')}
                      </div>
                    </div>
                    {errors.streetName && <p className="text-red-500 text-sm">{errors.streetName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Landmark (Optional)</Label>
                  <Input
                    value={formData.landmark}
                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                    placeholder="e.g., Near City Hospital, Opposite Park"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Area/Locality *</Label>
                  <div className="relative">
                    <Input
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      placeholder="e.g., Koramangala, Bandra West"
                      className={errors.area ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('area')}
                    </div>
                  </div>
                  {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                
                <div className="space-y-2">
                  <Label>PIN Code *</Label>
                  <div className="relative">
                    <Input
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      className={errors.pincode ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {pincodeLoading ? (
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      ) : (
                        renderFieldIcon('pincode') || <Search className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  <p className="text-xs text-gray-500">
                    Enter PIN code to auto-fill city, district, and state
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <div className="relative">
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City name"
                        className={errors.city ? 'border-red-500' : ''}
                        disabled={pincodeLoading}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('city')}
                      </div>
                    </div>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>District *</Label>
                    <div className="relative">
                      <Input
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="District name"
                        className={errors.district ? 'border-red-500' : ''}
                        disabled={pincodeLoading}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('district')}
                      </div>
                    </div>
                    {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>State *</Label>
                    <div className="relative">
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State name"
                        className={errors.state ? 'border-red-500' : ''}
                        disabled={pincodeLoading}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('state')}
                      </div>
                    </div>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address Type *</Label>
                    <Select value={formData.addressType} onValueChange={(value) => handleInputChange('addressType', value)}>
                      <SelectTrigger className={errors.addressType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select address type" />
                      </SelectTrigger>
                      <SelectContent>
                        {addressTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.addressType && <p className="text-red-500 text-sm">{errors.addressType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Duration at this Address *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger className={errors.duration ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map(duration => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                  </div>
                </div>
              </div>

              {/* Full Address Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Address Preview:</h4>
                <p className="text-gray-700">
                  {[
                    formData.houseNumber,
                    formData.streetName,
                    formData.landmark && `Near ${formData.landmark}`,
                    formData.area,
                    formData.city,
                    formData.district,
                    formData.state,
                    formData.pincode
                  ].filter(Boolean).join(', ') || 'Address will appear here as you fill the form'}
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || pincodeLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Verifying Address...' : 'Submit for Verification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddressForm;

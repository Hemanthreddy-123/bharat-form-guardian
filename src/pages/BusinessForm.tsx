
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessFormData {
  businessName: string;
  businessType: string;
  registrationType: string;
  gstNumber: string;
  panNumber: string;
  ownerName: string;
  email: string;
  mobile: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessCategory: string;
  annualTurnover: string;
  numberOfEmployees: string;
  businessStartDate: string;
  termsAccepted: boolean;
}

const BusinessForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: '',
    businessType: '',
    registrationType: '',
    gstNumber: '',
    panNumber: '',
    ownerName: '',
    email: '',
    mobile: '',
    businessAddress: '',
    city: '',
    state: '',
    pincode: '',
    businessCategory: '',
    annualTurnover: '',
    numberOfEmployees: '',
    businessStartDate: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'LLP'];
  const registrationTypes = ['New Registration', 'Existing Business', 'Branch Office', 'Subsidiary'];
  const businessCategories = [
    'Manufacturing', 'Trading', 'Service Provider', 'Retail', 'Wholesale', 
    'IT/Software', 'Healthcare', 'Education', 'Real Estate', 'Others'
  ];
  const turnoverRanges = [
    'Below 20 Lakhs', '20 Lakhs - 75 Lakhs', '75 Lakhs - 5 Crores', 
    '5 Crores - 50 Crores', 'Above 50 Crores'
  ];
  const employeeCounts = ['1-10', '11-50', '51-200', '201-500', '500+'];

  const validateGST = (gst: string): boolean => {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  };

  const validatePAN = (pan: string): boolean => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'businessName':
        if (typeof value === 'string') {
          if (!value.trim()) return 'Business name is required';
          if (value.length < 3) return 'Business name must be at least 3 characters';
        }
        return '';
        
      case 'ownerName':
        if (typeof value === 'string') {
          if (!value.trim()) return 'Owner name is required';
          if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        }
        return '';
        
      case 'email':
        if (typeof value === 'string') {
          if (!value) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        }
        return '';
        
      case 'mobile':
        if (typeof value === 'string') {
          if (!value) return 'Mobile number is required';
          if (!/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit mobile number';
        }
        return '';
        
      case 'gstNumber':
        if (typeof value === 'string' && value && !validateGST(value)) {
          return 'Invalid GST number format';
        }
        return '';
        
      case 'panNumber':
        if (typeof value === 'string') {
          if (!value) return 'PAN number is required';
          if (!validatePAN(value)) return 'Invalid PAN format (e.g., ABCDE1234F)';
        }
        return '';
        
      case 'pincode':
        if (typeof value === 'string') {
          if (!value) return 'PIN code is required';
          if (!/^\d{6}$/.test(value)) return 'PIN code must be 6 digits';
        }
        return '';
        
      case 'businessStartDate':
        if (typeof value === 'string') {
          if (!value) return 'Business start date is required';
          const startDate = new Date(value);
          const today = new Date();
          if (startDate > today) return 'Start date cannot be in future';
        }
        return '';
        
      case 'termsAccepted':
        if (typeof value === 'boolean' && !value) {
          return 'You must accept the terms and conditions';
        }
        return '';
        
      default:
        if (typeof value === 'string' && !value.trim()) {
          return 'This field is required';
        }
        return '';
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'gstNumber') { // GST is optional
        const error = validateField(key, formData[key as keyof BusinessFormData]);
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
      description: "Business registration submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof BusinessFormData];
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Business Registration</h1>
              <p className="text-gray-600">Register your business for compliance</p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Business Registration Form</CardTitle>
            <p className="text-center text-gray-600">Complete all required fields for business registration</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                
                <div className="space-y-2">
                  <Label>Business Name *</Label>
                  <div className="relative">
                    <Input
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="Enter business name"
                      className={errors.businessName ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('businessName')}
                    </div>
                  </div>
                  {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Type *</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Registration Type *</Label>
                    <Select value={formData.registrationType} onValueChange={(value) => handleInputChange('registrationType', value)}>
                      <SelectTrigger className={errors.registrationType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select registration type" />
                      </SelectTrigger>
                      <SelectContent>
                        {registrationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.registrationType && <p className="text-red-500 text-sm">{errors.registrationType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Category *</Label>
                    <Select value={formData.businessCategory} onValueChange={(value) => handleInputChange('businessCategory', value)}>
                      <SelectTrigger className={errors.businessCategory ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessCategory && <p className="text-red-500 text-sm">{errors.businessCategory}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Business Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.businessStartDate}
                      onChange={(e) => handleInputChange('businessStartDate', e.target.value)}
                      className={errors.businessStartDate ? 'border-red-500' : ''}
                    />
                    {errors.businessStartDate && <p className="text-red-500 text-sm">{errors.businessStartDate}</p>}
                  </div>
                </div>
              </div>

              {/* Owner Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Owner/Authorized Person Details</h3>
                
                <div className="space-y-2">
                  <Label>Owner/Director Name *</Label>
                  <div className="relative">
                    <Input
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Full name of owner/director"
                      className={errors.ownerName ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('ownerName')}
                    </div>
                  </div>
                  {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email Address *</Label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Business email address"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('email')}
                      </div>
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Mobile Number *</Label>
                    <div className="relative">
                      <Input
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={errors.mobile ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('mobile')}
                      </div>
                    </div>
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Tax Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>PAN Number *</Label>
                    <div className="relative">
                      <Input
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className={errors.panNumber ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('panNumber')}
                      </div>
                    </div>
                    {errors.panNumber && <p className="text-red-500 text-sm">{errors.panNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>GST Number (Optional)</Label>
                    <div className="relative">
                      <Input
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        className={errors.gstNumber ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('gstNumber')}
                      </div>
                    </div>
                    {errors.gstNumber && <p className="text-red-500 text-sm">{errors.gstNumber}</p>}
                    <p className="text-xs text-gray-500">Leave empty if not registered for GST</p>
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
                
                <div className="space-y-2">
                  <Label>Complete Business Address *</Label>
                  <div className="relative">
                    <Input
                      value={formData.businessAddress}
                      onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                      placeholder="House/Office no, Street, Area, Landmark"
                      className={errors.businessAddress ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('businessAddress')}
                    </div>
                  </div>
                  {errors.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress}</p>}
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
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('city')}
                      </div>
                    </div>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>State *</Label>
                    <div className="relative">
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State name"
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('state')}
                      </div>
                    </div>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>PIN Code *</Label>
                    <div className="relative">
                      <Input
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="6-digit PIN"
                        maxLength={6}
                        className={errors.pincode ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('pincode')}
                      </div>
                    </div>
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Business Scale */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Scale</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Turnover *</Label>
                    <Select value={formData.annualTurnover} onValueChange={(value) => handleInputChange('annualTurnover', value)}>
                      <SelectTrigger className={errors.annualTurnover ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select turnover range" />
                      </SelectTrigger>
                      <SelectContent>
                        {turnoverRanges.map(range => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.annualTurnover && <p className="text-red-500 text-sm">{errors.annualTurnover}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Employees *</Label>
                    <Select value={formData.numberOfEmployees} onValueChange={(value) => handleInputChange('numberOfEmployees', value)}>
                      <SelectTrigger className={errors.numberOfEmployees ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeCounts.map(count => (
                          <SelectItem key={count} value={count}>{count}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.numberOfEmployees && <p className="text-red-500 text-sm">{errors.numberOfEmployees}</p>}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                    className={errors.termsAccepted ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I declare that all the information provided is true and correct to the best of my knowledge. 
                    I agree to the terms and conditions for business registration and understand that providing 
                    false information may lead to rejection or cancellation of registration.
                  </Label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting Registration...' : 'Submit Business Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessForm;

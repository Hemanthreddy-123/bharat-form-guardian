
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  aadhaarNumber: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const AadhaarForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaarNumber: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const validateAadhaar = (aadhaar: string): boolean => {
    // Aadhaar validation algorithm
    if (!/^\d{12}$/.test(aadhaar)) return false;
    
    const digits = aadhaar.split('').map(Number);
    const checksum = digits.pop();
    
    const verhoeffTable = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    
    const permutationTable = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
    
    let c = 0;
    digits.reverse().forEach((digit, i) => {
      c = verhoeffTable[c][permutationTable[((i + 1) % 8)][digit]];
    });
    
    return c === checksum;
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
      case 'fatherName':
      case 'motherName':
        if (!value.trim()) return 'This field is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
        
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 0 || age > 150) return 'Please enter a valid date of birth';
        return '';
        
      case 'mobile':
        if (!value) return 'Mobile number is required';
        if (!/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit mobile number starting with 6-9';
        return '';
        
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        return '';
        
      case 'pincode':
        if (!value) return 'PIN code is required';
        if (!/^\d{6}$/.test(value)) return 'PIN code must be 6 digits';
        return '';
        
      case 'aadhaarNumber':
        if (!value) return 'Aadhaar number is required';
        if (!/^\d{12}$/.test(value)) return 'Aadhaar must be 12 digits';
        if (!validateAadhaar(value)) return 'Invalid Aadhaar number';
        return '';
        
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.length < 10) return 'Address must be at least 10 characters';
        return '';
        
      case 'city':
        if (!value.trim()) return 'City is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
        
      case 'state':
        if (!value) return 'State is required';
        return '';
        
      case 'gender':
        if (!value) return 'Gender is required';
        return '';
        
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key] = error;
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Success!",
      description: "Aadhaar registration submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof FormData];
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Aadhaar Registration</h1>
              <p className="text-gray-600">Complete your Aadhaar card application</p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">आधार पंजीकरण फॉर्म</CardTitle>
            <p className="text-center text-gray-600">Please fill all fields carefully</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (पूरा नाम) *</Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-red-500' : getFieldStatus('fullName') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('fullName')}
                    </div>
                  </div>
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name (पिता का नाम) *</Label>
                  <div className="relative">
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="Enter father's name"
                      className={errors.fatherName ? 'border-red-500' : getFieldStatus('fatherName') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('fatherName')}
                    </div>
                  </div>
                  {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother's Name (माता का नाम) *</Label>
                  <div className="relative">
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      placeholder="Enter mother's name"
                      className={errors.motherName ? 'border-red-500' : getFieldStatus('motherName') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('motherName')}
                    </div>
                  </div>
                  {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth (जन्म तिथि) *</Label>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={errors.dateOfBirth ? 'border-red-500' : getFieldStatus('dateOfBirth') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('dateOfBirth')}
                    </div>
                  </div>
                  {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender (लिंग) *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={errors.gender ? 'border-red-500' : getFieldStatus('gender') === 'success' ? 'border-green-500' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (पुरुष)</SelectItem>
                      <SelectItem value="female">Female (महिला)</SelectItem>
                      <SelectItem value="other">Other (अन्य)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number (मोबाइल नंबर) *</Label>
                  <div className="relative">
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={errors.mobile ? 'border-red-500' : getFieldStatus('mobile') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('mobile')}
                    </div>
                  </div>
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (ईमेल पता) *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : getFieldStatus('email') === 'success' ? 'border-green-500' : ''}
                  />
                  <div className="absolute right-3 top-3">
                    {renderFieldIcon('email')}
                  </div>
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address Information (पता जानकारी)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address (पूरा पता) *</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="House no, Street, Area, Landmark"
                      className={errors.address ? 'border-red-500' : getFieldStatus('address') === 'success' ? 'border-green-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('address')}
                    </div>
                  </div>
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City (शहर) *</Label>
                    <div className="relative">
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        className={errors.city ? 'border-red-500' : getFieldStatus('city') === 'success' ? 'border-green-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('city')}
                      </div>
                    </div>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State (राज्य) *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className={errors.state ? 'border-red-500' : getFieldStatus('state') === 'success' ? 'border-green-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code (पिन कोड) *</Label>
                    <div className="relative">
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        className={errors.pincode ? 'border-red-500' : getFieldStatus('pincode') === 'success' ? 'border-green-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('pincode')}
                      </div>
                    </div>
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Aadhaar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number (आधार संख्या) *</Label>
                <div className="relative">
                  <Input
                    id="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                    className={errors.aadhaarNumber ? 'border-red-500' : getFieldStatus('aadhaarNumber') === 'success' ? 'border-green-500' : ''}
                  />
                  <div className="absolute right-3 top-3">
                    {renderFieldIcon('aadhaarNumber')}
                  </div>
                </div>
                {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber}</p>}
                <p className="text-xs text-gray-500">
                  Your Aadhaar number will be validated using the official algorithm
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Aadhaar Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AadhaarForm;

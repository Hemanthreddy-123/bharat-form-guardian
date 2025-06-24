
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PANFormData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobile: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  incomeSource: string;
  previousPAN: string;
  declaration: boolean;
}

const PANForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PANFormData>({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    mobile: '',
    aadhaarNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    incomeSource: '',
    previousPAN: '',
    declaration: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titles = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
  const incomeSourceOptions = [
    'Salary', 'Business', 'Professional', 'Capital Gains', 'Other Sources'
  ];

  const validatePAN = (pan: string): boolean => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'fatherFirstName':
      case 'fatherLastName':
        if (typeof value === 'string') {
          if (!value.trim()) return 'This field is required';
          if (!/^[a-zA-Z]+$/.test(value)) return 'Only letters allowed';
        }
        return '';
        
      case 'middleName':
      case 'fatherMiddleName':
        if (typeof value === 'string' && value && !/^[a-zA-Z]+$/.test(value)) {
          return 'Only letters allowed';
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
        
      case 'aadhaarNumber':
        if (typeof value === 'string') {
          if (!value) return 'Aadhaar number is required';
          if (!/^\d{12}$/.test(value)) return 'Aadhaar must be 12 digits';
        }
        return '';
        
      case 'previousPAN':
        if (typeof value === 'string' && value && !validatePAN(value)) {
          return 'Invalid PAN format (e.g., ABCDE1234F)';
        }
        return '';
        
      case 'declaration':
        if (typeof value === 'boolean' && !value) {
          return 'Declaration must be accepted';
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

    // Validate all required fields
    const newErrors: {[key: string]: string} = {};
    const requiredFields = [
      'title', 'firstName', 'lastName', 'fatherFirstName', 'fatherLastName',
      'dateOfBirth', 'gender', 'email', 'mobile', 'aadhaarNumber',
      'address', 'city', 'state', 'pincode', 'incomeSource', 'declaration'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof PANFormData]);
      if (error) newErrors[field] = error;
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
      description: "PAN card application submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof PANFormData];
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PAN Card Application</h1>
              <p className="text-gray-600">Apply for new PAN card</p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">PAN Card Application Form</CardTitle>
            <p className="text-center text-gray-600">All fields marked with * are mandatory</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Applicant Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Select value={formData.title} onValueChange={(value) => handleInputChange('title', value)}>
                      <SelectTrigger className={errors.title ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {titles.map(title => (
                          <SelectItem key={title} value={title}>{title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First name"
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('firstName')}
                      </div>
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Middle Name</Label>
                    <div className="relative">
                      <Input
                        value={formData.middleName}
                        onChange={(e) => handleInputChange('middleName', e.target.value)}
                        placeholder="Middle name"
                        className={errors.middleName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('middleName')}
                      </div>
                    </div>
                    {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Last name"
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('lastName')}
                      </div>
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              {/* Father's Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Father's Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Father's First Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.fatherFirstName}
                        onChange={(e) => handleInputChange('fatherFirstName', e.target.value)}
                        placeholder="Father's first name"
                        className={errors.fatherFirstName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('fatherFirstName')}
                      </div>
                    </div>
                    {errors.fatherFirstName && <p className="text-red-500 text-sm">{errors.fatherFirstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Father's Middle Name</Label>
                    <div className="relative">
                      <Input
                        value={formData.fatherMiddleName}
                        onChange={(e) => handleInputChange('fatherMiddleName', e.target.value)}
                        placeholder="Father's middle name"
                        className={errors.fatherMiddleName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('fatherMiddleName')}
                      </div>
                    </div>
                    {errors.fatherMiddleName && <p className="text-red-500 text-sm">{errors.fatherMiddleName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Father's Last Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.fatherLastName}
                        onChange={(e) => handleInputChange('fatherLastName', e.target.value)}
                        placeholder="Father's last name"
                        className={errors.fatherLastName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('fatherLastName')}
                      </div>
                    </div>
                    {errors.fatherLastName && <p className="text-red-500 text-sm">{errors.fatherLastName}</p>}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email address"
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

              {/* Address and Other Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Aadhaar Number *</Label>
                  <div className="relative">
                    <Input
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                      placeholder="12-digit Aadhaar number"
                      maxLength={12}
                      className={errors.aadhaarNumber ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('aadhaarNumber')}
                    </div>
                  </div>
                  {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Complete address"
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State"
                      className={errors.state ? 'border-red-500' : ''}
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>PIN Code *</Label>
                    <Input
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="6-digit PIN"
                      maxLength={6}
                      className={errors.pincode ? 'border-red-500' : ''}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Source of Income *</Label>
                  <Select value={formData.incomeSource} onValueChange={(value) => handleInputChange('incomeSource', value)}>
                    <SelectTrigger className={errors.incomeSource ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select income source" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeSourceOptions.map(source => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.incomeSource && <p className="text-red-500 text-sm">{errors.incomeSource}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Previous PAN Number (if any)</Label>
                  <div className="relative">
                    <Input
                      value={formData.previousPAN}
                      onChange={(e) => handleInputChange('previousPAN', e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className={errors.previousPAN ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('previousPAN')}
                    </div>
                  </div>
                  {errors.previousPAN && <p className="text-red-500 text-sm">{errors.previousPAN}</p>}
                </div>
              </div>

              {/* Declaration */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="declaration"
                    checked={formData.declaration}
                    onCheckedChange={(checked) => handleInputChange('declaration', checked as boolean)}
                    className={errors.declaration ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="declaration" className="text-sm leading-relaxed">
                    I declare that the information provided is true and correct to the best of my knowledge. 
                    I understand that providing false information may lead to rejection of application or cancellation of PAN.
                  </Label>
                </div>
                {errors.declaration && <p className="text-red-500 text-sm">{errors.declaration}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit PAN Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PANForm;

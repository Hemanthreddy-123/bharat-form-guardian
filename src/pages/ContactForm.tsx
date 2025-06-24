
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  primaryMobile: string;
  alternateMobile: string;
  whatsappNumber: string;
  otp: string;
}

const ContactForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    primaryMobile: '',
    alternateMobile: '',
    whatsappNumber: '',
    otp: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'This field is required';
        if (!/^[a-zA-Z]+$/.test(value)) return 'Only letters allowed';
        return '';
        
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        return '';
        
      case 'primaryMobile':
        if (!value) return 'Primary mobile is required';
        if (!/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit mobile number';
        return '';
        
      case 'alternateMobile':
        if (value && !/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit mobile number';
        if (value === formData.primaryMobile) return 'Alternate mobile should be different';
        return '';
        
      case 'whatsappNumber':
        if (value && !/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit WhatsApp number';
        return '';
        
      case 'otp':
        if (otpSent && !value) return 'OTP is required';
        if (value && !/^\d{6}$/.test(value)) return 'OTP must be 6 digits';
        return '';
        
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const sendOTP = async () => {
    const mobileError = validateField('primaryMobile', formData.primaryMobile);
    if (mobileError) {
      setErrors(prev => ({ ...prev, primaryMobile: mobileError }));
      return;
    }

    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
    
    toast({
      title: "OTP Sent",
      description: `OTP sent to ${formData.primaryMobile}`,
    });
  };

  const verifyOTP = async () => {
    const otpError = validateField('otp', formData.otp);
    if (otpError) {
      setErrors(prev => ({ ...prev, otp: otpError }));
      return;
    }

    // Simulate OTP verification (in real app, verify with backend)
    if (formData.otp === '123456') {
      setOtpVerified(true);
      toast({
        title: "OTP Verified",
        description: "Mobile number verified successfully",
      });
    } else {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!otpVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your mobile number first",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const newErrors: {[key: string]: string} = {};
    ['firstName', 'lastName', 'email', 'primaryMobile'].forEach(field => {
      const error = validateField(field, formData[field as keyof ContactFormData]);
      if (error) newErrors[field] = error;
    });

    // Validate optional fields if they have values
    ['alternateMobile', 'whatsappNumber'].forEach(field => {
      const value = formData[field as keyof ContactFormData];
      if (value) {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
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
      description: "Contact information submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof ContactFormData];
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
              <p className="text-gray-600">Verify your contact details</p>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Contact Verification Form</CardTitle>
            <p className="text-center text-gray-600">Please provide and verify your contact information</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('firstName')}
                      </div>
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <div className="relative">
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('lastName')}
                      </div>
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('email')}
                    </div>
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>

              {/* Mobile Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Mobile Number Verification</h3>
                
                <div className="space-y-2">
                  <Label>Primary Mobile Number *</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={formData.primaryMobile}
                        onChange={(e) => handleInputChange('primaryMobile', e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={errors.primaryMobile ? 'border-red-500' : ''}
                        disabled={otpVerified}
                      />
                      <div className="absolute right-3 top-3">
                        {otpVerified ? <CheckCircle className="h-5 w-5 text-green-500" /> : renderFieldIcon('primaryMobile')}
                      </div>
                    </div>
                    <Button 
                      type="button"
                      onClick={sendOTP}
                      disabled={!formData.primaryMobile || !!errors.primaryMobile || countdown > 0 || otpVerified}
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      {countdown > 0 ? `Wait ${countdown}s` : otpSent ? 'Resend OTP' : 'Send OTP'}
                    </Button>
                  </div>
                  {errors.primaryMobile && <p className="text-red-500 text-sm">{errors.primaryMobile}</p>}
                </div>

                {otpSent && !otpVerified && (
                  <div className="space-y-2">
                    <Label>Enter OTP *</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value={formData.otp}
                          onChange={(e) => handleInputChange('otp', e.target.value)}
                          placeholder="6-digit OTP"
                          maxLength={6}
                          className={errors.otp ? 'border-red-500' : ''}
                        />
                        <div className="absolute right-3 top-3">
                          {renderFieldIcon('otp')}
                        </div>
                      </div>
                      <Button 
                        type="button"
                        onClick={verifyOTP}
                        disabled={!formData.otp || !!errors.otp}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Verify
                      </Button>
                    </div>
                    {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                    <p className="text-xs text-gray-500">
                      For demo: Use OTP "123456" to verify
                    </p>
                  </div>
                )}

                {otpVerified && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700 font-medium">Mobile number verified successfully!</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Contact Information (Optional)</h3>
                
                <div className="space-y-2">
                  <Label>Alternate Mobile Number</Label>
                  <div className="relative">
                    <Input
                      value={formData.alternateMobile}
                      onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                      placeholder="10-digit alternate mobile"
                      maxLength={10}
                      className={errors.alternateMobile ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('alternateMobile')}
                    </div>
                  </div>
                  {errors.alternateMobile && <p className="text-red-500 text-sm">{errors.alternateMobile}</p>}
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <div className="relative">
                    <Input
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      placeholder="10-digit WhatsApp number"
                      maxLength={10}
                      className={errors.whatsappNumber ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        {renderFieldIcon('whatsappNumber')}
                      </div>
                    </div>
                  </div>
                  {errors.whatsappNumber && <p className="text-red-500 text-sm">{errors.whatsappNumber}</p>}
                  <p className="text-xs text-gray-500">
                    Leave empty if same as primary mobile number
                  </p>
                </div>
              </div>

              {/* Contact Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Summary:</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Primary Mobile:</span> {formData.primaryMobile} {otpVerified && '✓'}</p>
                  {formData.alternateMobile && <p><span className="font-medium">Alternate Mobile:</span> {formData.alternateMobile}</p>}
                  {formData.whatsappNumber && <p><span className="font-medium">WhatsApp:</span> {formData.whatsappNumber}</p>}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !otpVerified}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting Information...' : 'Submit Contact Information'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;

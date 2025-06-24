
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, CreditCard, Home, User, Phone, Building } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const formTypes = [
    {
      id: 'aadhaar',
      title: 'Aadhaar Registration',
      description: 'Register for new Aadhaar card with complete validation',
      icon: <User className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      route: '/aadhaar-form'
    },
    {
      id: 'pan',
      title: 'PAN Card Application',
      description: 'Apply for PAN card with income tax validation',
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      route: '/pan-form'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Complete address verification with PIN code validation',
      icon: <Home className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      route: '/address-form'
    },
    {
      id: 'business',
      title: 'Business Registration',
      description: 'Register your business with GST and other validations',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      route: '/business-form'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Verify contact details with OTP validation',
      icon: <Phone className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      route: '/contact-form'
    },
    {
      id: 'document',
      title: 'Document Upload',
      description: 'Upload and validate various government documents',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      route: '/document-form'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">भारत फॉर्म वैलिडेशन</h1>
                <p className="text-sm text-gray-600">India Form Validation Portal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">सुरक्षित • विश्वसनीय • तेज़</p>
              <p className="text-xs text-gray-500">Secure • Reliable • Fast</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced Form Validation
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              Made for India
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional form validation system with Indian standards. Validate Aadhaar, PAN, mobile numbers, 
            PIN codes, and more with real-time feedback and comprehensive error handling.
          </p>
        </div>
      </section>

      {/* Form Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Form Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formTypes.map((form) => (
              <Card key={form.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden">
                <div className={`h-2 ${form.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-4 rounded-full ${form.color} text-white mb-4 mx-auto`}>
                    {form.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{form.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {form.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => navigate(form.route)}
                    className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105"
                  >
                    Start Application
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Advanced Validation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Aadhaar Validation', desc: 'Real-time Aadhaar number format validation' },
              { title: 'PAN Verification', desc: 'Complete PAN card format checking' },
              { title: 'PIN Code Lookup', desc: 'Indian postal code validation & auto-fill' },
              { title: 'Mobile OTP', desc: 'SMS-based mobile number verification' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 India Form Validation Portal. Built with React & Advanced Validation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

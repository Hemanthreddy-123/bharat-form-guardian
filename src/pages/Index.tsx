
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, CreditCard, Home, User, Phone, Building, Mail, MapPin } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const formTypes = [
    {
      id: 'aadhaar',
      title: 'Identity Registration',
      description: 'Register for new identity card with complete validation',
      icon: <User className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-slate-600 to-gray-700',
      route: '/aadhaar-form'
    },
    {
      id: 'pan',
      title: 'Tax Card Application',
      description: 'Apply for tax identification card with income validation',
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-gray-600 to-slate-700',
      route: '/pan-form'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Complete address verification with postal code validation',
      icon: <Home className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-slate-500 to-gray-600',
      route: '/address-form'
    },
    {
      id: 'business',
      title: 'Business Registration',
      description: 'Register your business with tax and compliance validations',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-gray-700 to-slate-600',
      route: '/business-form'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Verify contact details with OTP validation',
      icon: <Phone className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-slate-600 to-gray-500',
      route: '/contact-form'
    },
    {
      id: 'document',
      title: 'Document Upload',
      description: 'Upload and validate various official documents',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-gray-600 to-slate-700',
      route: '/document-form'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-slate-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Professional Form Validation Portal</h1>
                <p className="text-sm text-gray-600">Enterprise Document Processing System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Secure • Reliable • Fast</p>
              <p className="text-xs text-gray-500">Professional Compliance Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced Form Validation
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent">
              Professional Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Enterprise-grade form validation system with Indian compliance standards. Validate identity cards, tax documents, mobile numbers, 
            postal codes, and more with real-time feedback and comprehensive error handling.
          </p>
        </div>
      </section>

      {/* Form Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Application Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formTypes.map((form) => (
              <Card key={form.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden bg-white">
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
                    className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg"
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
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Professional Validation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Identity Validation', desc: 'Real-time identity number format validation with algorithm check' },
              { title: 'Tax Verification', desc: 'Complete tax card format checking with compliance validation' },
              { title: 'Postal Code System', desc: 'Indian postal code validation with automatic location detection' },
              { title: 'OTP Security', desc: 'SMS-based mobile number verification with secure authentication' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-600 to-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-slate-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-slate-100">Forms Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-slate-100">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-slate-100">Secure Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h4>
              <p className="text-gray-600 mb-2">24/7 Customer Service</p>
              <p className="text-lg font-semibold text-slate-600">+91-11-4567-8900</p>
              <p className="text-lg font-semibold text-slate-600">+91-11-4567-8901</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Email Support</h4>
              <p className="text-gray-600 mb-2">Professional Assistance</p>
              <p className="text-lg font-semibold text-slate-600">support@formvalidation.in</p>
              <p className="text-lg font-semibold text-slate-600">help@formvalidation.in</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Office Address</h4>
              <p className="text-gray-600 mb-2">Corporate Headquarters</p>
              <p className="text-slate-600">123 Business District</p>
              <p className="text-slate-600">New Delhi - 110001, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Professional Form Portal</h4>
              <p className="text-slate-400 text-sm">Enterprise document validation platform for professional form processing and compliance management.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Identity Registration</li>
                <li>Tax Card Application</li>
                <li>Address Verification</li>
                <li>Business Registration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>System Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">&copy; 2024 Professional Form Validation Portal. Built with React & Enterprise Standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

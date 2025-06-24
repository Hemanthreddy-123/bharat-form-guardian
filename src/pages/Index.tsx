
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, CreditCard, Home, User, Phone, Building, Mail, MapPin, Shield, Clock, Award, Users, Globe, Zap, BarChart3, Headphones, Lock, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const formTypes = [
    {
      id: 'aadhaar',
      title: 'Identity Registration',
      description: 'Register for new identity card with complete validation',
      icon: <User className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      route: '/aadhaar-form'
    },
    {
      id: 'pan',
      title: 'Tax Card Application',
      description: 'Apply for tax identification card with income validation',
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-indigo-600 to-purple-700',
      route: '/pan-form'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Complete address verification with postal code validation',
      icon: <Home className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-purple-600 to-pink-700',
      route: '/address-form'
    },
    {
      id: 'business',
      title: 'Business Registration',
      description: 'Register your business with tax and compliance validations',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-pink-600 to-rose-700',
      route: '/business-form'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Verify contact details with OTP validation',
      icon: <Phone className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-rose-600 to-orange-700',
      route: '/contact-form'
    },
    {
      id: 'document',
      title: 'Document Upload',
      description: 'Upload and validate various official documents',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-orange-600 to-amber-700',
      route: '/document-form'
    }
  ];

  const newFeatures = [
    {
      title: 'Advanced Security',
      description: 'Multi-layer encryption and secure data processing',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Real-time Processing',
      description: 'Instant validation and immediate feedback',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting and data insights',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      icon: <Headphones className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Data Protection',
      description: 'Enterprise-grade privacy and compliance',
      icon: <Lock className="h-6 w-6" />,
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Premium Quality',
      description: 'Industry-leading accuracy and reliability',
      icon: <Award className="h-6 w-6" />,
      color: 'from-amber-500 to-yellow-600'
    },
    {
      title: 'Global Access',
      description: 'Worldwide availability and multi-language support',
      icon: <Globe className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Team Collaboration',
      description: 'Multi-user access and role-based permissions',
      icon: <Users className="h-6 w-6" />,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Fast Processing',
      description: 'Lightning-fast form validation and processing',
      icon: <Clock className="h-6 w-6" />,
      color: 'from-teal-500 to-blue-600'
    },
    {
      title: 'Premium Experience',
      description: 'Top-rated user experience and satisfaction',
      icon: <Star className="h-6 w-6" />,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-gradient-to-r from-purple-400/25 to-pink-600/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md shadow-2xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Professional Form Validation Portal</h1>
                <p className="text-blue-200">Enterprise Document Processing System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-200">Secure • Reliable • Fast</p>
              <p className="text-xs text-blue-300">Professional Compliance Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Advanced Form Validation
            <span className="block text-4xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Platform
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade form validation system with comprehensive compliance standards. Validate identity cards, tax documents, mobile numbers, 
            postal codes, and more with real-time feedback and advanced error handling capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              Get Started Now
            </Button>
            <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Form Cards Grid */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Choose Your Application Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formTypes.map((form) => (
              <Card key={form.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-0 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
                <div className={`h-1 ${form.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-4 rounded-full ${form.color} text-white mb-4 mx-auto shadow-lg`}>
                    {form.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{form.title}</CardTitle>
                  <CardDescription className="text-blue-200">
                    {form.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => navigate(form.route)}
                    className={`w-full ${form.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg`}
                  >
                    Start Application
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="relative z-10 py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Premium Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {newFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20 group hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm">{feature.title}</h4>
                <p className="text-blue-200 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Validation Features */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Professional Validation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Identity Validation', desc: 'Real-time identity number format validation with algorithm check', icon: <User className="h-8 w-8" /> },
              { title: 'Tax Verification', desc: 'Complete tax card format checking with compliance validation', icon: <CreditCard className="h-8 w-8" /> },
              { title: 'Postal Code System', desc: 'Comprehensive postal code validation with automatic location detection', icon: <MapPin className="h-8 w-8" /> },
              { title: 'OTP Security', desc: 'SMS-based mobile number verification with secure authentication', icon: <Shield className="h-8 w-8" /> }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20 group hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-white mb-3 text-lg">{feature.title}</h4>
                <p className="text-blue-200 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-blue-800/50 to-indigo-800/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">99.9%</div>
              <div className="text-blue-200">Accuracy Rate</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100K+</div>
              <div className="text-blue-200">Forms Processed</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">100%</div>
              <div className="text-blue-200">Secure Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Phone Support</h4>
              <p className="text-blue-200 mb-4">24/7 Customer Service</p>
              <p className="text-lg font-semibold text-blue-300">+91-11-4567-8900</p>
              <p className="text-lg font-semibold text-blue-300">+91-11-4567-8901</p>
            </div>
            
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Email Support</h4>
              <p className="text-blue-200 mb-4">Professional Assistance</p>
              <p className="text-lg font-semibold text-blue-300">support@formvalidation.in</p>
              <p className="text-lg font-semibold text-blue-300">help@formvalidation.in</p>
            </div>
            
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Office Address</h4>
              <p className="text-blue-200 mb-4">Corporate Headquarters</p>
              <p className="text-blue-300">123 Business District</p>
              <p className="text-blue-300">New Delhi - 110001, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-md text-white py-12 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4 text-blue-300">Professional Form Portal</h4>
              <p className="text-blue-200 text-sm leading-relaxed">Enterprise document validation platform for professional form processing and compliance management.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-300">Services</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Identity Registration</li>
                <li className="hover:text-white transition-colors cursor-pointer">Tax Card Application</li>
                <li className="hover:text-white transition-colors cursor-pointer">Address Verification</li>
                <li className="hover:text-white transition-colors cursor-pointer">Business Registration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-300">Support</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">System Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-blue-300">Legal</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition-colors cursor-pointer">Compliance</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-blue-200">&copy; 2024 Professional Form Validation Portal. Built with React & Enterprise Standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentFormData {
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  applicantName: string;
  purpose: string;
  declaration: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const DocumentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<DocumentFormData>({
    documentType: '',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    applicantName: '',
    purpose: '',
    declaration: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypes = [
    'Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID', 
    'Birth Certificate', 'Income Certificate', 'Caste Certificate', 
    'Domicile Certificate', 'Character Certificate'
  ];

  const purposeOptions = [
    'Government Job Application', 'Bank Account Opening', 'Loan Application',
    'Educational Admission', 'Visa Application', 'Property Registration',
    'Insurance Claim', 'Legal Proceedings', 'Other'
  ];

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'documentType':
        if (typeof value === 'string' && !value) return 'Document type is required';
        return '';
        
      case 'documentNumber':
        if (typeof value === 'string') {
          if (!value.trim()) return 'Document number is required';
          if (value.length < 5) return 'Document number must be at least 5 characters';
        }
        return '';
        
      case 'applicantName':
        if (typeof value === 'string') {
          if (!value.trim()) return 'Applicant name is required';
          if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        }
        return '';
        
      case 'issueDate':
        if (typeof value === 'string') {
          if (!value) return 'Issue date is required';
          const issueDate = new Date(value);
          const today = new Date();
          if (issueDate > today) return 'Issue date cannot be in future';
        }
        return '';
        
      case 'expiryDate':
        if (typeof value === 'string' && value) {
          const expiryDate = new Date(value);
          const issueDate = new Date(formData.issueDate);
          if (expiryDate <= issueDate) return 'Expiry date must be after issue date';
        }
        return '';
        
      case 'issuingAuthority':
        if (typeof value === 'string' && !value.trim()) return 'Issuing authority is required';
        return '';
        
      case 'purpose':
        if (typeof value === 'string' && !value) return 'Purpose is required';
        return '';
        
      case 'declaration':
        if (typeof value === 'boolean' && !value) return 'Declaration must be accepted';
        return '';
        
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload JPG, PNG, or PDF files only",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type
      };

      setUploadedFiles(prev => [...prev, newFile]);
    });

    // Clear input
    event.target.value = '';
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'expiryDate') { // expiry date is optional for some documents
        const error = validateField(key, formData[key as keyof DocumentFormData]);
        if (error) newErrors[key] = error;
      }
    });

    // Check if files are uploaded
    if (uploadedFiles.length === 0) {
      newErrors.files = 'Please upload at least one document';
    }

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
      description: "Document verification submitted successfully",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof DocumentFormData];
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
              <p className="text-gray-600">Upload and verify your documents</p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Document Verification Form</CardTitle>
            <p className="text-center text-gray-600">Upload your documents for verification and processing</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Document Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Document Type *</Label>
                    <Select value={formData.documentType} onValueChange={(value) => handleInputChange('documentType', value)}>
                      <SelectTrigger className={errors.documentType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.documentType && <p className="text-red-500 text-sm">{errors.documentType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Document Number *</Label>
                    <div className="relative">
                      <Input
                        value={formData.documentNumber}
                        onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                        placeholder="Enter document number"
                        className={errors.documentNumber ? 'border-red-500' : ''}
                      />
                      <div className="absolute right-3 top-3">
                        {renderFieldIcon('documentNumber')}
                      </div>
                    </div>
                    {errors.documentNumber && <p className="text-red-500 text-sm">{errors.documentNumber}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Applicant Name (as per document) *</Label>
                  <div className="relative">
                    <Input
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                      placeholder="Full name as per document"
                      className={errors.applicantName ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('applicantName')}
                    </div>
                  </div>
                  {errors.applicantName && <p className="text-red-500 text-sm">{errors.applicantName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date *</Label>
                    <Input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => handleInputChange('issueDate', e.target.value)}
                      className={errors.issueDate ? 'border-red-500' : ''}
                    />
                    {errors.issueDate && <p className="text-red-500 text-sm">{errors.issueDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Expiry Date (if applicable)</Label>
                    <Input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Issuing Authority *</Label>
                  <div className="relative">
                    <Input
                      value={formData.issuingAuthority}
                      onChange={(e) => handleInputChange('issuingAuthority', e.target.value)}
                      placeholder="e.g., Government of India, RTO Mumbai"
                      className={errors.issuingAuthority ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3">
                      {renderFieldIcon('issuingAuthority')}
                    </div>
                  </div>
                  {errors.issuingAuthority && <p className="text-red-500 text-sm">{errors.issuingAuthority}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Purpose of Verification *</Label>
                  <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                    <SelectTrigger className={errors.purpose ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposeOptions.map(purpose => (
                        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload Document Files
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          JPG, PNG, or PDF files up to 5MB each
                        </span>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600"
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Upload Guidelines:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload clear, readable copies of your documents</li>
                    <li>• Ensure all corners of the document are visible</li>
                    <li>• File formats: JPG, PNG, PDF only</li>
                    <li>• Maximum file size: 5MB per file</li>
                    <li>• Upload both front and back if applicable</li>
                  </ul>
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
                    I declare that the documents uploaded are genuine and belong to me. I understand that 
                    submitting fake or forged documents is a criminal offense and may result in legal action. 
                    I authorize the verification of these documents with the respective issuing authorities.
                  </Label>
                </div>
                {errors.declaration && <p className="text-red-500 text-sm">{errors.declaration}</p>}
              </div>

              {/* Verification Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Verification Summary:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <p><span className="font-medium">Document Type:</span> {formData.documentType || 'Not selected'}</p>
                  <p><span className="font-medium">Document Number:</span> {formData.documentNumber || 'Not entered'}</p>
                  <p><span className="font-medium">Applicant Name:</span> {formData.applicantName || 'Not entered'}</p>
                  <p><span className="font-medium">Purpose:</span> {formData.purpose || 'Not selected'}</p>
                  <p><span className="font-medium">Files Uploaded:</span> {uploadedFiles.length} file(s)</p>
                  <p><span className="font-medium">Declaration:</span> {formData.declaration ? 'Accepted' : 'Not accepted'}</p>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Submitting for Verification...' : 'Submit Document for Verification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentForm;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AadhaarForm from "./pages/AadhaarForm";
import PANForm from "./pages/PANForm";
import AddressForm from "./pages/AddressForm";
import BusinessForm from "./pages/BusinessForm";
import ContactForm from "./pages/ContactForm";
import DocumentForm from "./pages/DocumentForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aadhaar-form" element={<AadhaarForm />} />
          <Route path="/pan-form" element={<PANForm />} />
          <Route path="/address-form" element={<AddressForm />} />
          <Route path="/business-form" element={<BusinessForm />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/document-form" element={<DocumentForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

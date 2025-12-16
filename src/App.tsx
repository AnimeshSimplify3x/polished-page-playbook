import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { GlobalFilterProvider } from "@/contexts/GlobalFilterContext";
import ReconciliationDashboard from "./pages/ReconciliationDashboard";
import SKUMapping from "./pages/SKUMapping";
import OutletMapping from "./pages/OutletMapping";
import LicenseMapping from "./pages/LicenseMapping";
import OutletApprovals from "./pages/OutletApprovals";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GlobalFilterProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout><ReconciliationDashboard /></MainLayout>} />
            <Route path="/sku-mapping" element={<MainLayout><SKUMapping /></MainLayout>} />
            <Route path="/outlet-mapping" element={<MainLayout><OutletMapping /></MainLayout>} />
            <Route path="/license-mapping" element={<MainLayout><LicenseMapping /></MainLayout>} />
            <Route path="/outlet-approvals" element={<MainLayout><OutletApprovals /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><UserProfile /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GlobalFilterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

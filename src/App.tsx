import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import DistributorList from "./pages/DistributorList";
import DistributorProfile from "./pages/DistributorProfile";
import ETLHistory from "./pages/ETLHistory";
import TeamManagement from "./pages/TeamManagement";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/distributors" element={<MainLayout><DistributorList /></MainLayout>} />
          <Route path="/distributor/:id" element={<MainLayout><DistributorProfile /></MainLayout>} />
          <Route path="/etl-history" element={<MainLayout><ETLHistory /></MainLayout>} />
          <Route path="/team" element={<MainLayout><TeamManagement /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><UserProfile /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

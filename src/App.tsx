import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import TrackAsset from "./pages/TrackAsset";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AssetAccess from "./pages/AssetAccess";
import OtpVerify from "./pages/OtpVerify";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RequireOtp = ({ children }: { children: JSX.Element }) => {
  const { assetAccessGranted } = useAuth();

  if (!assetAccessGranted) {
    return <Navigate to="/vault/check" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/vault/check"
              element={
                <RequireAuth>
                  <AssetAccess />
                </RequireAuth>
              }
            />
            <Route
              path="/otp-verify"
              element={
                <RequireAuth>
                  <OtpVerify />
                </RequireAuth>
              }
            />
            <Route
              path="/track"
              element={
                <RequireAuth>
                  <RequireOtp>
                    <TrackAsset />
                  </RequireOtp>
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

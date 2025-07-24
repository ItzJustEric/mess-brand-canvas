import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Store from "./pages/Store";
import Lookbook from "./pages/Lookbook";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout';
import { Button } from './components/ui/button';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

const queryClient = new QueryClient();

const Confirmation = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
    <div className="p-8 rounded-xl shadow-lg bg-white/90 animate-fade-in text-center">
      <h2 className="text-3xl font-display font-bold mb-4">Order Confirmed!</h2>
      <p className="font-accent mb-2">Your order has been received. Check your email for details.</p>
      <Button className="mt-4 font-accent" onClick={() => window.location.href = '/'}>Back to Home</Button>
    </div>
  </div>
);

const App = () => (
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store" element={<Store />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </CartProvider>
);

export default App;

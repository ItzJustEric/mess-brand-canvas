import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const modeStyles = {
  monochrome: {
    bg: 'bg-mono-bg',
    fg: 'text-mono-fg',
    accent: 'bg-mono-accent text-mono-bg',
    border: 'border-mono-border',
    error: 'border-red-500',
    badge: 'bg-mono-muted text-mono-accent',
  },
  street: {
    bg: 'bg-street-bg',
    fg: 'text-street-fg',
    accent: 'bg-street-accent text-street-bg',
    border: 'border-street-accent',
    error: 'border-red-500',
    badge: 'bg-street-accent2 text-street-bg',
  },
  casual: {
    bg: 'bg-casual-bg',
    fg: 'text-casual-fg',
    accent: 'bg-casual-accent text-casual-bg',
    border: 'border-casual-accent',
    error: 'border-red-500',
    badge: 'bg-casual-accent2 text-casual-bg',
  },
};

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Other',
];

const Checkout = () => {
  const { items, mode, subtotal } = useCart();
  const styles = modeStyles[mode];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '',
  });
  const [errors, setErrors] = useState<any>({});

  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 100 ? 0 : 8;
  const total = subtotal + tax + shippingCost;

  // Validate shipping information only
  const validate = () => {
    const errs: any = {};
    if (!shipping.name) errs.name = true;
    if (!shipping.email || !/^[^@]+@[^@]+\.[^@]+$/.test(shipping.email)) errs.email = true;
    if (!shipping.phone) errs.phone = true;
    if (!shipping.address) errs.address = true;
    if (!shipping.city) errs.city = true;
    if (!shipping.state) errs.state = true;
    if (!shipping.zip) errs.zip = true;
    if (!shipping.country) errs.country = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Place Order button click - creates Stripe session and redirects
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      // Send cart items and customer info to backend to create Stripe session
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items,
          customerInfo: shipping // Pass customer info to prefill Stripe Checkout
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const data = await res.json();
      const stripe = await stripePromise;
      
      // Redirect to Stripe Checkout with session ID
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      setLoading(false);
      alert('Error starting checkout. Please try again.');
      console.error('Stripe checkout error:', err);
    }
  };

  return (
    <div className={`min-h-screen ${styles.bg} ${styles.fg} transition-all`}> 
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 animate-fade-in">
        {/* Cart Summary */}
        <div className="md:w-1/2 w-full space-y-6">
          <h2 className="text-2xl font-display font-bold mb-4">Cart Summary</h2>
          {items.length === 0 ? (
            <div className="p-6 rounded-lg bg-muted/50 text-center font-accent">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <Card key={item.id + (item.size || '') + (item.color || '')} className={`flex items-center gap-4 p-4 border ${styles.border} shadow-md`}>
                <img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-accent font-semibold uppercase ${styles.badge}`}>{item.style}</span>
                  </div>
                  <div className="font-display font-bold truncate text-lg">{item.name}</div>
                  <div className="text-sm font-accent opacity-70">
                    {item.size && <span>Size: {item.size} </span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold font-display text-base">${item.price.toFixed(2)}</span>
                  <span className="font-accent text-xs">Qty: {item.quantity}</span>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Shipping Information Form */}
        <form className="md:w-1/2 w-full space-y-8" onSubmit={handlePlaceOrder} autoComplete="off">
          {/* Shipping Info */}
          <div className="space-y-4 p-6 rounded-lg shadow-md border bg-white/80">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-green-600" />
              <h3 className="font-display text-xl font-bold">Shipping Information</h3>
            </div>
            
            <Input 
              placeholder="Full Name" 
              value={shipping.name} 
              onChange={e => setShipping(s => ({ ...s, name: e.target.value }))} 
              className={`font-accent ${errors.name ? styles.error : ''}`} 
            />
            
            <Input 
              placeholder="Email Address" 
              value={shipping.email} 
              onChange={e => setShipping(s => ({ ...s, email: e.target.value }))} 
              className={`font-accent ${errors.email ? styles.error : ''}`} 
            />
            
            <Input 
              placeholder="Phone Number" 
              value={shipping.phone} 
              onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))} 
              className={`font-accent ${errors.phone ? styles.error : ''}`} 
            />
            
            <Input 
              placeholder="Street Address" 
              value={shipping.address} 
              onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} 
              className={`font-accent ${errors.address ? styles.error : ''}`} 
            />
            
            <div className="flex gap-2">
              <Input 
                placeholder="City" 
                value={shipping.city} 
                onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} 
                className={`font-accent ${errors.city ? styles.error : ''}`} 
              />
              <Input 
                placeholder="State/Province" 
                value={shipping.state} 
                onChange={e => setShipping(s => ({ ...s, state: e.target.value }))} 
                className={`font-accent ${errors.state ? styles.error : ''}`} 
              />
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="ZIP/Postal Code" 
                value={shipping.zip} 
                onChange={e => setShipping(s => ({ ...s, zip: e.target.value }))} 
                className={`font-accent ${errors.zip ? styles.error : ''}`} 
              />
              <select 
                value={shipping.country} 
                onChange={e => setShipping(s => ({ ...s, country: e.target.value }))} 
                className={`font-accent rounded-md border px-3 py-2 ${errors.country ? styles.error : styles.border}`} 
                required
              >
                <option value="">Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 p-6 rounded-lg shadow-md border bg-white/80">
            <h3 className="font-display text-xl font-bold mb-2">Order Summary</h3>
            <div className="flex justify-between font-accent">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-accent">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-accent">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <Button 
              type="submit" 
              className={`w-full mt-4 font-accent ${styles.accent} shadow-lg hover:scale-105 transition-transform flex items-center justify-center`} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  Redirecting to Secure Checkout...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
            
            <p className="text-xs text-center mt-2 opacity-70">
              You'll be redirected to our secure payment processor to complete your purchase.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 
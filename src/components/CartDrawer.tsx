import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const modeStyles = {
  monochrome: {
    bg: 'bg-mono-bg',
    fg: 'text-mono-fg',
    accent: 'bg-mono-accent text-mono-bg',
    tag: 'bg-mono-muted text-mono-accent',
    border: 'border-mono-border',
  },
  street: {
    bg: 'bg-street-bg',
    fg: 'text-street-fg',
    accent: 'bg-street-accent text-street-bg',
    tag: 'bg-street-accent2 text-street-bg',
    border: 'border-street-accent',
  },
  casual: {
    bg: 'bg-casual-bg',
    fg: 'text-casual-fg',
    accent: 'bg-casual-accent text-casual-bg',
    tag: 'bg-casual-accent2 text-casual-bg',
    border: 'border-casual-accent',
  },
};

const CartDrawer = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const { items, mode, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const styles = modeStyles[mode];
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [quantityAnim, setQuantityAnim] = useState<{ [id: string]: boolean }>({});

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 300); // match fade-out duration
  };

  const handleQuantity = (id: string, newQty: number) => {
    setQuantityAnim((prev) => ({ ...prev, [id]: true }));
    updateQuantity(id, newQty);
    setTimeout(() => setQuantityAnim((prev) => ({ ...prev, [id]: false })), 200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`w-full max-w-md shadow-2xl transition-all duration-500 ${styles.bg} ${styles.fg} border-l ${styles.border} flex flex-col`}
      >
        <div className="flex items-center justify-between py-4 px-2 border-b border-opacity-20">
          <h2 className="text-2xl font-display font-bold tracking-wide">Your Bag</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center animate-fade-in">
              <span className="text-3xl mb-4">👜</span>
              <p className="font-accent text-lg mb-2">Nothing in your bag — but you’re full of taste.</p>
              <Button className={`mt-4 font-accent ${styles.accent}`} onClick={() => { onOpenChange(false); navigate('/store'); }}>
                Shop Now
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <Card
                key={item.id + (item.size || '') + (item.color || '')}
                className={`flex items-center gap-4 p-4 shadow-md border ${styles.border} animate-fade-in transition-all duration-300 ${removingId === item.id ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
              >
                <img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-accent font-semibold uppercase ${styles.tag}`}>{item.style}</span>
                  </div>
                  <div className="font-display font-bold truncate text-lg">{item.name}</div>
                  <div className="text-sm font-accent opacity-70">
                    {item.size && <span>Size: {item.size} </span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold font-display text-base">${(item.price * item.quantity).toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Decrease quantity"
                      onClick={() => handleQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span
                      className={`px-2 font-accent transition-transform duration-200 ${quantityAnim[item.id] ? 'scale-125' : ''}`}
                    >
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Increase quantity"
                      onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove item"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
        {/* Cart Summary */}
        <div className="border-t border-opacity-20 px-4 py-6 bg-opacity-80">
          <div className="flex justify-between items-center mb-4">
            <span className="font-accent text-lg">Subtotal</span>
            <span className="font-display font-bold text-xl">${subtotal.toFixed(2)}</span>
          </div>
          {/* Continue Shopping Button */}
          <Button
            variant="outline"
            className={`
              w-full mb-2 font-accent transition
              ${
                mode === 'street'
                  ? 'bg-white text-black border-black hover:bg-street-bg hover:text-street-fg'
                  : mode === 'casual'
                  ? 'bg-casual-accent text-casual-bg border-casual-accent hover:opacity-90'
                  : 'bg-black text-white border-black hover:opacity-90'
              }
            `}
            onClick={() => {
              onOpenChange(false);
              navigate('/store');
            }}
          >
            Continue Shopping
          </Button>
          {/* Checkout Button */}
          <Button
            className={`
              w-full font-accent mb-2 shadow-lg hover:scale-105 transition-transform
              ${
                mode === 'street'
                  ? 'bg-street-accent text-street-bg border-street-accent hover:bg-street-accent2 hover:text-street-bg'
                  : mode === 'casual'
                  ? 'bg-casual-accent text-casual-bg border-casual-accent hover:bg-casual-accent2'
                  : 'bg-black text-white border-black hover:opacity-90'
              }
            `}
            onClick={() => {
              onOpenChange(false);
              navigate('/checkout');
            }}
          >
            Checkout
          </Button>
          <p className="text-xs font-accent opacity-70 text-center mt-2">Shipping & taxes calculated at checkout</p>
          {items.length > 0 && (
            <Button variant="ghost" className="w-full mt-4 text-destructive font-accent" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
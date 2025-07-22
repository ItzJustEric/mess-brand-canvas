import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

interface NavigationProps {
  currentMode?: 'monochrome' | 'street' | 'casual';
}

const Navigation = ({ currentMode = 'monochrome' }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, setMode } = useCart();

  useEffect(() => {
    setMode(currentMode);
  }, [currentMode, setMode]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/store' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getModeClasses = () => {
    switch (currentMode) {
      case 'street':
        return 'bg-street-bg text-street-fg border-street-accent';
      case 'casual':
        return 'bg-casual-bg text-casual-fg border-casual-accent';
      default:
        return 'bg-mono-bg text-mono-fg border-mono-border';
    }
  };

  const getGlitchText = (text: string) => {
    if (currentMode === 'street') {
      return (
        <span className="glitch-effect text-gradient-street" data-text={text}>
          {text}
        </span>
      );
    }
    return text;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getModeClasses()} backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - always on left */}
          <NavLink to="/" className="flex items-center">
            <h1 className={`text-2xl font-display font-bold tracking-wider ${
              currentMode === 'street' ? 'text-gradient-street glitch-effect' : ''
            }`} data-text="MESS">
              MESS
            </h1>
          </NavLink>

          {/* Desktop Navigation - center with cart on right */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-accent font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? currentMode === 'street'
                        ? 'text-street-accent'
                        : currentMode === 'casual'
                        ? 'text-casual-accent'
                        : 'text-mono-accent'
                      : 'hover:opacity-80'
                  }`
                }
              >
                {getGlitchText(item.name)}
              </NavLink>
            ))}
            
            {/* Cart Icon - desktop only */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Button>
            <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Icon - mobile, outside hamburger */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 font-accent font-medium transition-all duration-300 ${
                      isActive
                        ? currentMode === 'street'
                          ? 'text-street-accent'
                          : currentMode === 'casual'
                          ? 'text-casual-accent'
                          : 'text-mono-accent'
                        : 'hover:opacity-80'
                    }`
                  }
                >
                  {getGlitchText(item.name)}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
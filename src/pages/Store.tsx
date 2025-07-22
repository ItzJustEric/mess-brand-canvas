import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

const Store = () => {
  const [activeMode, setActiveMode] = useState<'monochrome' | 'street' | 'casual'>('monochrome');
  const { addItem } = useCart();

  const modes = [
    {
      id: 'monochrome',
      title: 'Monochrome Mode',
      subtitle: 'Formalwear / Classic Fits / "Old Money"',
      description: 'Minimalist, clean, expensive vibes',
    },
    {
      id: 'street',
      title: 'Street Mode',
      subtitle: 'Streetwear / Hype / Raw / "Starboy"',
      description: 'Urban edge, creative chaos',
    },
    {
      id: 'casual',
      title: 'Casual Mode',
      subtitle: 'Softcore / Aesthetic',
      description: 'Pinterest-core x street softness',
    },
  ];

  const getModeClass = () => {
    switch (activeMode) {
      case 'street':
        return 'mode-street bg-gradient-street text-street-fg';
      case 'casual':
        return 'mode-casual bg-gradient-casual text-casual-fg';
      default:
        return 'mode-monochrome bg-gradient-mono text-mono-fg';
    }
  };

  // Dynamic product data (could be fetched from API)
  const products = Array.from({ length: 8 }).map((_, index) => ({
    id: `product-${activeMode}-${index}`,
    name: `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Piece #${index + 1}`,
    price: 199,
    style: activeMode,
    thumbnail: '', // Add real image if available
    // Optionally add size/color here if needed
  }));

  return (
    <div className={`min-h-screen transition-all duration-700 ${getModeClass()}`}>
      <Navigation currentMode={activeMode} />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mode Selector */}
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              {activeMode === 'street' ? (
                <span className="glitch-effect text-gradient-street" data-text="STORE">
                  STORE
                </span>
              ) : (
                'STORE'
              )}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {modes.map((mode) => (
                <Button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as any)}
                  variant={activeMode === mode.id ? "default" : "outline"}
                  className={`font-accent transition-all duration-300 hover:scale-105 ${
                    activeMode === mode.id
                      ? activeMode === 'street'
                        ? 'bg-street-accent text-street-bg border-street-accent shadow-street'
                        : activeMode === 'casual'
                        ? 'bg-casual-accent text-casual-bg border-casual-accent shadow-casual'
                        : 'bg-mono-accent text-mono-bg border-mono-accent shadow-mono'
                      : ''
                  }`}
                >
                  {mode.id === 'street' && activeMode === 'street' ? (
                    <span className="glitch-effect" data-text={mode.title}>
                      {mode.title}
                    </span>
                  ) : (
                    mode.title
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Mode Info */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              {modes.find(m => m.id === activeMode)?.subtitle}
            </h2>
            <p className="text-lg opacity-80 font-accent">
              {modes.find(m => m.id === activeMode)?.description}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`group hover:scale-105 transition-all duration-300 ${
                  activeMode === 'street'
                    ? 'bg-street-bg border-street-accent shadow-street hover:shadow-street'
                    : activeMode === 'casual'
                    ? 'bg-casual-bg border-casual-accent shadow-casual hover:shadow-casual'
                    : 'bg-mono-bg border-mono-border shadow-mono hover:shadow-mono'
                }`}
              >
                <CardContent className="p-6">
                  <div className={`h-48 mb-4 rounded-lg ${
                    activeMode === 'street'
                      ? 'bg-gradient-to-br from-street-accent/20 to-street-accent2/20'
                      : activeMode === 'casual'
                      ? 'bg-gradient-to-br from-casual-accent/20 to-casual-accent2/20'
                      : 'bg-gradient-to-br from-mono-muted to-mono-border'
                  }`}>
                    {/* Product image placeholder */}
                  </div>
                  <h3 className="font-accent font-semibold mb-2">
                    {activeMode === 'street' ? (
                      <span className="text-gradient-street">{product.name}</span>
                    ) : (
                      product.name
                    )}
                  </h3>
                  <p className="opacity-70 mb-4 text-sm">
                    Premium {activeMode} collection piece
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-lg">${product.price}</span>
                    <Button
                      size="sm"
                      variant={activeMode === 'street' ? 'default' : 'outline'}
                      className={`font-accent ${
                        activeMode === 'street'
                          ? 'bg-street-accent text-street-bg hover:bg-street-accent2'
                          : activeMode === 'casual'
                          ? 'border-casual-accent text-casual-accent hover:bg-casual-accent hover:text-casual-bg'
                          : 'border-mono-accent text-mono-accent hover:bg-mono-accent hover:text-mono-bg'
                      }`}
                      onClick={() => {
                        addItem(product);
                        toast({
                          title: 'Added to Cart',
                          description: `${product.name} added to your bag!`,
                        });
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
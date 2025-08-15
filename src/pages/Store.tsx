import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Eye, Filter, SortAsc, SortDesc } from 'lucide-react';

const Store = () => {
  const [activeMode, setActiveMode] = useState<'monochrome' | 'street' | 'casual'>('monochrome');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();

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

  // Enhanced product data with more realistic details
  const products = Array.from({ length: 12 }).map((_, index) => ({
    id: `product-${activeMode}-${index}`,
    name: `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Piece #${index + 1}`,
    price: Math.floor(Math.random() * 200) + 99, // Random price between 99-299
    style: activeMode,
    category: ['tops', 'bottoms', 'outerwear', 'accessories'][Math.floor(Math.random() * 4)],
    size: ['XS', 'S', 'M', 'L', 'XL'][Math.floor(Math.random() * 5)],
    color: ['Black', 'White', 'Navy', 'Gray', 'Beige'][Math.floor(Math.random() * 5)],
    description: `Premium ${activeMode} collection piece featuring high-quality materials and contemporary design. Perfect for those who appreciate sophisticated style and exceptional craftsmanship.`,
    thumbnail: '', // Add real image if available
  }));

  // Sorting function
  const getSortedProducts = () => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => parseInt(a.id.split('-')[2]) - parseInt(b.id.split('-')[2]));
      default:
        return sorted;
    }
  };

  // Filtering function
  const getFilteredProducts = () => {
    const sorted = getSortedProducts();
    if (filterBy === 'all') return sorted;
    return sorted.filter(product => product.category === filterBy);
  };

  const filteredProducts = getFilteredProducts();

  const openQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    // Add to recently viewed when quick view is opened
    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      price: product.price,
      style: product.style,
      category: product.category,
      size: product.size,
      color: product.color,
      description: product.description,
      thumbnail: product.thumbnail || '',
    });
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

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

          {/* Sort and Filter Controls */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 opacity-70" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className={`w-40 font-accent ${
                    activeMode === 'street'
                      ? 'bg-street-bg border-street-accent text-street-fg'
                      : activeMode === 'casual'
                      ? 'bg-casual-bg border-casual-accent text-casual-fg'
                      : 'bg-mono-bg border-mono-border text-mono-fg'
                  }`}>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 opacity-70" />
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className={`w-40 font-accent ${
                    activeMode === 'street'
                      ? 'bg-street-bg border-street-accent text-street-fg'
                      : activeMode === 'casual'
                      ? 'bg-casual-bg border-casual-accent text-casual-fg'
                      : 'bg-mono-bg border-mono-border text-mono-fg'
                  }`}>
                    <SelectValue placeholder="Filter by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm opacity-70 font-accent">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
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
                  <div className={`h-48 mb-4 rounded-lg relative ${
                    activeMode === 'street'
                      ? 'bg-gradient-to-br from-street-accent/20 to-street-accent2/20'
                      : activeMode === 'casual'
                      ? 'bg-gradient-to-br from-casual-accent/20 to-casual-accent2/20'
                      : 'bg-gradient-to-br from-mono-muted to-mono-border'
                  }`}>
                    {/* Quick View Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 text-black hover:bg-white font-accent"
                        onClick={() => openQuickView(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-accent font-semibold mb-2">
                    {activeMode === 'street' ? (
                      <span className="text-gradient-street">{product.name}</span>
                    ) : (
                      product.name
                    )}
                  </h3>
                  <p className="opacity-70 mb-2 text-sm">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>
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

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className={`max-w-2xl ${
          activeMode === 'street'
            ? 'bg-street-bg border-street-accent text-street-fg'
            : activeMode === 'casual'
            ? 'bg-casual-bg border-casual-accent text-casual-fg'
            : 'bg-mono-bg border-mono-border text-mono-fg'
        }`}>
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {quickViewProduct.name}
                </DialogTitle>
                <DialogDescription className="font-accent">
                  {quickViewProduct.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className={`h-80 rounded-lg ${
                  activeMode === 'street'
                    ? 'bg-gradient-to-br from-street-accent/20 to-street-accent2/20'
                    : activeMode === 'casual'
                    ? 'bg-gradient-to-br from-casual-accent/20 to-casual-accent2/20'
                    : 'bg-gradient-to-br from-mono-muted to-mono-border'
                }`}>
                  {/* Product image placeholder */}
                </div>
                
                {/* Product Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-semibold">Product Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="opacity-70">Category:</span>
                        <p className="font-accent">{quickViewProduct.category.charAt(0).toUpperCase() + quickViewProduct.category.slice(1)}</p>
                      </div>
                      <div>
                        <span className="opacity-70">Size:</span>
                        <p className="font-accent">{quickViewProduct.size}</p>
                      </div>
                      <div>
                        <span className="opacity-70">Color:</span>
                        <p className="font-accent">{quickViewProduct.color}</p>
                      </div>
                      <div>
                        <span className="opacity-70">Style:</span>
                        <p className="font-accent">{quickViewProduct.style.charAt(0).toUpperCase() + quickViewProduct.style.slice(1)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-3xl font-display font-bold mb-4">
                      ${quickViewProduct.price}
                    </div>
                    <Button
                      size="lg"
                      className={`w-full font-accent ${
                        activeMode === 'street'
                          ? 'bg-street-accent text-street-bg hover:bg-street-accent2'
                          : activeMode === 'casual'
                          ? 'bg-casual-accent text-casual-bg hover:bg-casual-accent2'
                          : 'bg-mono-accent text-mono-bg hover:bg-mono-accent2'
                      }`}
                      onClick={() => {
                        addItem(quickViewProduct);
                        toast({
                          title: 'Added to Cart',
                          description: `${quickViewProduct.name} added to your bag!`,
                        });
                        closeQuickView();
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Store;
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Eye } from 'lucide-react';

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-mono-bg text-mono-fg">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Recently Viewed
              </h1>
              {recentlyViewed.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={clearRecentlyViewed}
                  className="font-accent"
                >
                  Clear All
                </Button>
              )}
            </div>
            <p className="text-lg opacity-70 font-accent">
              Items you've recently viewed in our store
            </p>
          </div>

          {recentlyViewed.length === 0 ? (
            <div className="text-center py-16">
              <Eye className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <h2 className="text-xl font-accent font-semibold mb-2">
                No Recently Viewed Items
              </h2>
              <p className="opacity-70 mb-6">
                Items you quick view will appear here
              </p>
              <a 
                href="/store" 
                className="inline-flex items-center px-6 py-3 bg-mono-accent text-mono-bg font-accent font-medium rounded-md hover:bg-mono-accent2 transition-colors"
              >
                Browse Store
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recentlyViewed.map((product) => (
                <Card
                  key={`${product.id}-${product.viewedAt}`}
                  className="group hover:scale-105 transition-all duration-300 bg-mono-bg border-mono-border shadow-mono hover:shadow-mono"
                >
                  <CardContent className="p-6">
                    <div className="h-48 mb-4 rounded-lg relative bg-gradient-to-br from-mono-muted to-mono-border">
                      {/* Product image placeholder */}
                    </div>
                    <h3 className="font-accent font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="opacity-70 mb-2 text-sm">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>
                    <p className="opacity-70 mb-4 text-sm">
                      Viewed {new Date(product.viewedAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-lg">${product.price}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-accent border-mono-accent text-mono-accent hover:bg-mono-accent hover:text-mono-bg"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
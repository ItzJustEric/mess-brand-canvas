import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Package } from 'lucide-react';

const MyOrders = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-mono-bg text-mono-fg">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                My Orders
              </h1>
              <p className="text-lg opacity-70 font-accent">
                Track your purchases and order history
              </p>
            </div>

            <div className="bg-mono-muted rounded-lg p-12 border border-mono-border">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <h2 className="text-xl font-accent font-semibold mb-2">
                No Orders Yet
              </h2>
              <p className="opacity-70 mb-6">
                All of your orders will appear here since this account hasn't bought anything
              </p>
              <a 
                href="/store" 
                className="inline-flex items-center px-6 py-3 bg-mono-accent text-mono-bg font-accent font-medium rounded-md hover:bg-mono-accent2 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
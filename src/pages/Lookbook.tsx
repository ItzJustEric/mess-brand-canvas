import Navigation from '@/components/Navigation';

const Lookbook = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              LOOKBOOK
            </h1>
            <p className="text-xl font-accent max-w-2xl mx-auto opacity-80">
              Editorial-style gallery showcasing concept art, digital sketches, and styled shots.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div 
                key={index}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-muted to-border rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 transition-all duration-500">
                    {/* Lookbook image placeholder */}
                  </div>
                </div>
                <h3 className="font-accent font-medium mb-2">Editorial {index + 1}</h3>
                <p className="text-sm opacity-70">Concept art & styling</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
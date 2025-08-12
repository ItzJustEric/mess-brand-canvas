import Navigation from '@/components/Navigation';
import image1 from '@/images/0c84c2ba-8146-429f-9482-1f2e9e54e16a.jpg';
import image2 from '@/images/ChatGPT_Image_Jul_27_2025_05_37_21_PM.png';
import image3 from '@/images/IMG-20250724-WA0005.webp';
import image4 from '@/images/IMG-20250724-WA0007.webp';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Lookbook = () => {
  const lookbookImages = [
    {
      src: image1,
      title: "Evening Elegance",
      description: "A sophisticated black cocktail dress featuring a fitted bodice with delicate ruching details, flowing into a graceful A-line silhouette. The fabric drapes beautifully with subtle sheen, perfect for evening events and formal occasions."
    },
    {
      src: image2,
      title: "Casual Chic", 
      description: "A relaxed-fit dress in soft, breathable fabric with a comfortable stretch waistband and flattering V-neckline. The versatile design transitions seamlessly from day to evening, featuring side pockets and a modern midi length."
    }
  ];

  // Summer Breeze dress images (front and back views)
  const summerBreezeImages = [
    {
      src: image3,
      view: "Front View"
    },
    {
      src: image4,
      view: "Back View"
    }
  ];

  // Autoplay state for carousel
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

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
            {/* Real images */}
            {lookbookImages.map((image, index) => (
              <div 
                key={index}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-muted to-border rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-accent font-medium mb-2">{image.title}</h3>
                <p className="text-sm opacity-70">{image.description}</p>
              </div>
            ))}

            {/* Summer Breeze Carousel */}
            <div 
              className="group animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-muted to-border rounded-lg mb-4 overflow-hidden relative">
                <Carousel 
                  className="w-full h-full"
                  opts={{
                    loop: true,
                    align: "start",
                  }}
                  setApi={setApi}
                >
                  <CarouselContent>
                    {summerBreezeImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full h-full">
                          <img 
                            src={image.src} 
                            alt={`Summer Breeze - ${image.view}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 h-8 w-8" />
                  <CarouselNext className="right-2 h-8 w-8" />
                </Carousel>
              </div>
              <h3 className="font-accent font-medium mb-2">Summer Breeze</h3>
              <p className="text-sm opacity-70">
                A lightweight, flowy dress with an airy silhouette and adjustable drawstring waist. The breathable fabric features a subtle pattern and includes practical side pockets, making it ideal for warm weather and outdoor gatherings.
              </p>
            </div>
            
            {/* Remaining placeholder cards */}
            {[...Array(4)].map((_, index) => (
              <div 
                key={index + 3}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-muted to-border rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 transition-all duration-500">
                    {/* Lookbook image placeholder */}
                  </div>
                </div>
                <h3 className="font-accent font-medium mb-2">Editorial {index + 4}</h3>
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
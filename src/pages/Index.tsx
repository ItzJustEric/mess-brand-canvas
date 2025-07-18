import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import heroMonochrome from '@/assets/hero-monochrome.jpg';
import heroStreet from '@/assets/hero-street.jpg';
import heroCasual from '@/assets/hero-casual.jpg';

const slides = [
  {
    id: 'monochrome',
    title: 'MONOCHROME',
    subtitle: 'Old Money / Classic Fits',
    description: 'Minimalist elegance meets expensive sophistication',
    image: heroMonochrome,
    mode: 'monochrome' as const,
  },
  {
    id: 'street',
    title: 'STREET',
    subtitle: 'Raw / Hype / Starboy',
    description: 'Urban edge with creative chaos',
    image: heroStreet,
    mode: 'street' as const,
  },
  {
    id: 'casual',
    title: 'CASUAL',
    subtitle: 'Softcore / Aesthetic',
    description: 'Pinterest-core meets street softness',
    image: heroCasual,
    mode: 'casual' as const,
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const currentSlideData = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  const getModeClasses = () => {
    switch (currentSlideData.mode) {
      case 'street':
        return 'mode-street bg-street-bg text-street-fg';
      case 'casual':
        return 'mode-casual bg-casual-bg text-casual-fg';
      default:
        return 'mode-monochrome bg-mono-bg text-mono-fg';
    }
  };

  const getButtonVariant = () => {
    switch (currentSlideData.mode) {
      case 'street':
        return 'street';
      case 'casual':
        return 'casual';
      default:
        return 'mono';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 animate-mode-switch ${getModeClasses()}`}>
      <Navigation currentMode={currentSlideData.mode} />
      
      {/* Full-screen slideshow */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className={`absolute inset-0 ${
            currentSlideData.mode === 'street' 
              ? 'bg-street-bg/70' 
              : currentSlideData.mode === 'casual'
              ? 'bg-casual-bg/60'
              : 'bg-mono-bg/50'
          }`} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className={`text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6 ${
              currentSlideData.mode === 'street' 
                ? 'glitch-effect text-gradient-street' 
                : ''
            }`} data-text={currentSlideData.title}>
              {currentSlideData.title}
            </h1>
            
            <p className={`text-xl md:text-2xl font-accent font-medium mb-4 ${
              currentSlideData.mode === 'street' ? 'text-street-accent' : 'opacity-90'
            }`}>
              {currentSlideData.subtitle}
            </p>
            
            <p className="text-lg md:text-xl font-body mb-8 opacity-80 max-w-2xl mx-auto">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/store')}
                size="lg"
                className={`font-accent font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 ${
                  currentSlideData.mode === 'street'
                    ? 'bg-street-accent text-street-bg hover:bg-street-accent2 shadow-street'
                    : currentSlideData.mode === 'casual'
                    ? 'bg-casual-accent text-casual-bg hover:bg-casual-accent2 shadow-casual'
                    : 'bg-mono-accent text-mono-bg hover:bg-mono-fg shadow-mono'
                }`}
              >
                Shop {currentSlideData.title}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                onClick={() => navigate('/lookbook')}
                variant="outline"
                size="lg"
                className={`font-accent font-medium px-8 py-3 transition-all duration-300 hover:scale-105 ${
                  currentSlideData.mode === 'street'
                    ? 'border-street-accent text-street-accent hover:bg-street-accent hover:text-street-bg'
                    : currentSlideData.mode === 'casual'
                    ? 'border-casual-accent text-casual-accent hover:bg-casual-accent hover:text-casual-bg'
                    : 'border-mono-accent text-mono-accent hover:bg-mono-accent hover:text-mono-bg'
                }`}
              >
                View Lookbook
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="text-current hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? currentSlideData.mode === 'street'
                        ? 'bg-street-accent'
                        : currentSlideData.mode === 'casual'
                        ? 'bg-casual-accent'
                        : 'bg-mono-accent'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="text-current hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Brand tagline */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20 hidden lg:block">
          <div className="writing-mode-vertical text-sm font-accent tracking-widest opacity-70">
            MINIMAL MEETS MAYHEM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

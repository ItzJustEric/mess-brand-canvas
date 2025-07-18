import Navigation from '@/components/Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              ABOUT MESS
            </h1>
            <p className="text-xl font-accent opacity-80">
              Unfiltered, gritty intro to the brand
            </p>
          </div>

          <div className="space-y-12 animate-slide-up">
            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold mb-6">
                Mission
              </h2>
              <p className="text-lg font-body leading-relaxed">
                MESS isn't just clothing—it's a rebellion against the ordinary. We create pieces that blur the lines between chaos and elegance, raw and refined. Our mission is to give you the armor to express your unfiltered self.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold mb-6">
                Values
              </h2>
              <p className="text-lg font-body leading-relaxed">
                Authenticity over perfection. Expression over conformity. We believe in the beauty of controlled chaos—where minimalism meets mayhem, where expensive meets raw, where aesthetic meets street.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold mb-6">
                Creative Rebellion
              </h2>
              <p className="text-lg font-body leading-relaxed">
                MESS is for those who refuse to be categorized. Whether you're channeling old money elegance, street culture authenticity, or soft aesthetic vibes—we've got the pieces to match your mood, your day, your rebellion.
              </p>
            </div>

            <div className="text-center pt-8">
              <blockquote className="text-2xl font-display italic opacity-80">
                "Minimal meets mayhem. Expensive chaos. Bold but clean."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
import Navigation from '@/components/Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-mono text-foreground mode-transition">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1
              className="text-5xl md:text-7xl font-display font-bold mb-8 glitch-effect text-gradient-street"
              data-text="ABOUT MESS"
            >
              ABOUT MESS
            </h1>
            <p className="text-xl font-accent opacity-80">
              Unfiltered, gritty intro to the brand
            </p>
          </div>

          <div className="space-y-12 animate-slide-up">
            <div className="bg-card/80 shadow-mono rounded-xl p-8 border border-border hover:shadow-street transition-all duration-500 text-center">
              <h2 className="text-3xl font-display font-semibold mb-6 text-accent">
                Mission
              </h2>
              <p className="text-lg font-body leading-relaxed">
                MESS isn't just clothing—it's a rebellion against the ordinary. We
                create pieces that blur the lines between chaos and elegance, raw
                and refined. Our mission is to give you the armor to express your
                unfiltered self.
              </p>
            </div>

            <div className="bg-card/80 shadow-mono rounded-xl p-8 border border-border hover:shadow-street transition-all duration-500 text-center">
              <h2 className="text-3xl font-display font-semibold mb-6 text-accent">
                Values
              </h2>
              <p className="text-lg font-body leading-relaxed">
                Authenticity over perfection. Expression over conformity. We believe
                in the beauty of controlled chaos—where minimalism meets mayhem,
                where expensive meets raw, where aesthetic meets street.
              </p>
            </div>

            <div className="bg-card/80 shadow-mono rounded-xl p-8 border border-border hover:shadow-street transition-all duration-500 text-center">
              <h2 className="text-3xl font-display font-semibold mb-6 text-accent">
                Creative Rebellion
              </h2>
              <p className="text-lg font-body leading-relaxed">
                MESS is for those who refuse to be categorized. Whether you're
                channeling old money elegance, street culture authenticity, or soft
                aesthetic vibes—we've got the pieces to match your mood, your day,
                your rebellion.
              </p>
            </div>

            <div className="text-center pt-8">
              <blockquote className="text-2xl font-display italic opacity-80 animate-pulse text-gradient-street">
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
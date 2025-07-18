import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              CONTACT
            </h1>
            <p className="text-xl font-accent opacity-80">
              Let's create some beautiful chaos together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-accent font-medium mb-2">
                    Name
                  </label>
                  <Input placeholder="Your name" className="font-body" />
                </div>
                
                <div>
                  <label className="block text-sm font-accent font-medium mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" className="font-body" />
                </div>
                
                <div>
                  <label className="block text-sm font-accent font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your vision..." 
                    className="min-h-[120px] font-body" 
                  />
                </div>
                
                <Button className="w-full font-accent">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Email
                  </h3>
                  <p className="font-body">hello@mess-brand.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Social
                  </h3>
                  <div className="space-y-2 font-body">
                    <p>@mess.brand</p>
                    <p>@mess_official</p>
                    <p>/messbrand</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Collaborations
                  </h3>
                  <p className="font-body">
                    Interested in working with MESS? We're always looking for creative minds who share our vision of controlled chaos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
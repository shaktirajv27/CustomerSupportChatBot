import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  MessageSquare, 
  Sparkles, 
  Shield, 
  Zap, 
  ArrowRight, 
  Headphones, 
  User,
  ChevronDown,
  Bot,
  Brain,
  Lock,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant responses powered by advanced AI technology with sub-second latency.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are protected with end-to-end encryption and enterprise-grade security.',
    },
    {
      icon: Headphones,
      title: 'Voice Support',
      description: 'Speak naturally with voice input for hands-free assistance anytime, anywhere.',
    },
    {
      icon: Brain,
      title: 'Context Aware',
      description: 'Our AI remembers your conversation context for more relevant and helpful responses.',
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Communicate in your preferred language with support for 8+ languages.',
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'GDPR compliant with strict data protection policies and no data sharing.',
    },
  ];

  const faqs = [
    {
      question: 'How does SupportAI work?',
      answer: 'SupportAI uses advanced language models to understand your questions and provide accurate, helpful responses in real-time.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use end-to-end encryption and follow GDPR guidelines. Your conversations are never shared or used for training.',
    },
    {
      question: 'Can I use voice input?',
      answer: 'Yes! SupportAI supports voice input so you can speak your questions naturally instead of typing.',
    },
    {
      question: 'What languages are supported?',
      answer: 'We support English, Spanish, French, German, Hindi, Chinese, Japanese, and Portuguese.',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">SupportAI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105">Features</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105">FAQ</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/settings')}
                  className="text-muted-foreground hover:text-foreground hidden sm:flex transition-all hover:scale-105"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  onClick={() => navigate('/chat')}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  Open Chat
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="text-muted-foreground hover:text-foreground hidden sm:flex transition-all hover:scale-105"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur rounded-full mb-8 border border-border animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Your Intelligent
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Support Assistant
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Experience the future of customer support. Get instant, accurate answers 
              with voice input and context-aware AI that understands your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={() => navigate(user ? '/chat' : '/auth')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-lg gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 hover:scale-105"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/chat')}
                className="border-border text-foreground hover:bg-secondary rounded-full px-8 h-14 text-lg transition-all hover:scale-105"
              >
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight animate-fade-in">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Built with the latest AI technology to provide exceptional support experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 lg:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-accent/20 transition-all group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight animate-fade-in">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border [&[open]]:border-primary/30 transition-all duration-300 animate-fade-in-up [&[open]]:shadow-lg [&[open]]:shadow-primary/5"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-10 sm:p-14 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-3xl border border-border overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-float" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Ready to Transform Your Support?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
                Start using SupportAI today and experience the future of customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate(user ? '/chat' : '/auth')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 h-14 text-lg gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 hover:scale-105"
                >
                  {user ? 'Open Chat' : 'Get Started Free'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required. Free forever for personal use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform group-hover:scale-110">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SupportAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SupportAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

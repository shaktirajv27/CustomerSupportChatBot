import { Trash2, Home, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

interface ChatHeaderProps {
  isOnline?: boolean;
  onClearChat?: () => void;
  leftAction?: ReactNode;
}

export const ChatHeader = ({ isOnline = true, onClearChat, leftAction }: ChatHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border bg-card/95 backdrop-blur sticky top-0 z-40">
      <div className="flex items-center gap-2">
        {leftAction}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
              isOnline ? 'bg-green-500' : 'bg-muted-foreground'
            }`} />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-sm sm:text-base">SupportAI</h1>
            <p className="text-xs text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </Button>
        {onClearChat && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearChat}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
};
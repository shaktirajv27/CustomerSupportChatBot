import { Bot } from 'lucide-react';

export const BotAvatar = () => {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center ring-2 ring-accent/50">
        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
      </div>
    </div>
  );
};

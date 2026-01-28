import { BotAvatar } from './BotAvatar';

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-2 sm:gap-3 animate-fade-in">
      <BotAvatar />
      <div className="bg-chat-bot px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing-1" />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing-2" />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing-3" />
        </div>
      </div>
    </div>
  );
};

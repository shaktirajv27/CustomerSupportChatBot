import { ChatMessage as ChatMessageType } from '@/types/chat';
import { BotAvatar } from './BotAvatar';
import { UserAvatar } from './UserAvatar';
import { MessageContent } from './MessageContent';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const timeString = format(message.timestamp, 'HH:mm');

  return (
    <div 
      className={`flex items-start gap-2 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
    >
      <div className="flex-shrink-0">
        {isUser ? <UserAvatar /> : <BotAvatar />}
      </div>
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-chat-user text-chat-user-foreground rounded-tr-sm'
              : 'bg-chat-bot text-chat-bot-foreground rounded-tl-sm'
          }`}
        >
          <MessageContent content={message.content} isUser={isUser} />
        </div>
        <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 px-1">{timeString}</span>
      </div>
    </div>
  );
};

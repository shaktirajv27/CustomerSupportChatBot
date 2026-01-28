import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceInput } from '@/hooks/useVoiceInput';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, isSupported, transcript, startListening, stopListening, resetTranscript } = useVoiceInput();

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      resetTranscript();
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setInput('');
      startListening();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex items-end gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 border-t border-border bg-card">
      <div className="flex-1 flex items-end gap-2 bg-secondary rounded-xl px-3 sm:px-4 py-2 min-h-[44px]">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : "Type your message..."}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm resize-none max-h-[120px] py-1 leading-relaxed"
        />
        {isSupported && (
          <button 
            onClick={handleVoiceToggle}
            className={`p-1.5 transition-colors flex-shrink-0 self-center ${
              isListening 
                ? 'text-destructive animate-pulse' 
                : 'text-muted-foreground hover:text-accent'
            }`}
            aria-label={isListening ? "Stop recording" : "Start voice input"}
            type="button"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        )}
      </div>
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon"
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 w-11 flex-shrink-0 transition-all duration-200 disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

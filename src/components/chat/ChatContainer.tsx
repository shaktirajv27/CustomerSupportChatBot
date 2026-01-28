import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatHeader } from './ChatHeader';
import { TopicSelector } from './TopicSelector';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatSidebar } from './ChatSidebar';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage as ChatMessageType, SUPPORT_TOPICS } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/hooks/useSettings';
import { Menu } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  topic: string;
  updated_at: string;
}

const INITIAL_MESSAGE: ChatMessageType = {
  id: '1',
  role: 'assistant',
  content: 'Hello! How can I help you today? Please select a support topic above to get specialized assistance.',
  timestamp: new Date(),
};

export const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [selectedTopic, setSelectedTopic] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { settings, playSound } = useSettings();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N for new chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleNewChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadConversations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select('id, title, topic, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const loadConversationMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    if (data && data.length > 0) {
      const loadedMessages: ChatMessageType[] = data.map((msg) => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: new Date(msg.created_at),
      }));
      setMessages(loadedMessages);
    } else {
      setMessages([INITIAL_MESSAGE]);
    }

    // Load conversation topic
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      setSelectedTopic(conv.topic || 'general');
    }
  };

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    await loadConversationMessages(id);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setMessages([INITIAL_MESSAGE]);
    setSelectedTopic('general');
    setSidebarOpen(false);
    playSound('send');
  };

  const handleDeleteConversation = async (id: string) => {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) {
      playSound('error');
      toast({
        title: 'Error',
        description: 'Failed to delete conversation.',
        variant: 'destructive',
      });
      return;
    }

    setConversations(prev => prev.filter(c => c.id !== id));
    
    if (activeConversationId === id) {
      handleNewChat();
    }

    playSound('send');
    toast({
      title: 'Deleted',
      description: 'Conversation deleted successfully.',
    });
  };

  const handleRenameConversation = async (id: string, newTitle: string) => {
    const { error } = await supabase
      .from('conversations')
      .update({ title: newTitle })
      .eq('id', id);

    if (error) {
      playSound('error');
      toast({
        title: 'Error',
        description: 'Failed to rename conversation.',
        variant: 'destructive',
      });
      return;
    }

    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, title: newTitle } : c)
    );

    playSound('send');
    toast({
      title: 'Renamed',
      description: 'Conversation renamed successfully.',
    });
  };

  const handleExportConversation = async (id: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('role, content, created_at')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      playSound('error');
      toast({
        title: 'Error',
        description: 'Failed to export conversation.',
        variant: 'destructive',
      });
      return;
    }

    const conv = conversations.find(c => c.id === id);
    const title = conv?.title || 'Chat Export';
    
    let content = `# ${title}\n`;
    content += `Exported on: ${new Date().toLocaleString()}\n\n`;
    content += '---\n\n';

    data?.forEach((msg) => {
      const role = msg.role === 'user' ? 'You' : 'SupportAI';
      const time = new Date(msg.created_at).toLocaleString();
      content += `**${role}** (${time}):\n${msg.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    playSound('send');
    toast({
      title: 'Exported',
      description: 'Conversation exported as Markdown file.',
    });
  };

  const handleShareConversation = async (id: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      playSound('error');
      toast({
        title: 'Error',
        description: 'Failed to share conversation.',
        variant: 'destructive',
      });
      return;
    }

    const conv = conversations.find(c => c.id === id);
    let shareText = `${conv?.title || 'Chat'}\n\n`;
    
    data?.slice(0, 10).forEach((msg) => {
      const role = msg.role === 'user' ? 'Q' : 'A';
      shareText += `${role}: ${msg.content.slice(0, 100)}${msg.content.length > 100 ? '...' : ''}\n\n`;
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: conv?.title || 'SupportAI Chat',
          text: shareText,
        });
        playSound('send');
      } catch (err) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      playSound('send');
      toast({
        title: 'Copied',
        description: 'Conversation copied to clipboard.',
      });
    }
  };

  const createOrUpdateConversation = useCallback(async (userMessage: string): Promise<string | null> => {
    if (!user) return null;
    if (!settings.autoSave) return null;

    if (activeConversationId) {
      // Update existing conversation
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', activeConversationId);
      return activeConversationId;
    }

    // Create new conversation with first message as title
    const title = userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : '');
    
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title,
        topic: selectedTopic,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    setActiveConversationId(data.id);
    await loadConversations();
    return data.id;
  }, [user, activeConversationId, selectedTopic, settings.autoSave]);

  const saveMessage = async (conversationId: string, role: 'user' | 'assistant', content: string) => {
    if (!settings.autoSave) return;
    
    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
      });

    if (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    playSound('send');

    // Create or get conversation ID
    const conversationId = await createOrUpdateConversation(content);
    
    if (conversationId && user) {
      await saveMessage(conversationId, 'user', content);
    }

    try {
      // Prepare messages for API (exclude initial greeting for cleaner context)
      const apiMessages = [...messages, userMessage]
        .filter(m => m.id !== '1')
        .map(m => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: apiMessages,
          topic: selectedTopic
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response');
      }

      const botResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I could not process your request.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      playSound('receive');

      if (conversationId && user) {
        await saveMessage(conversationId, 'assistant', data.message);
      }
    } catch (error) {
      console.error('Chat error:', error);
      playSound('error');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicChange = async (topic: string) => {
    setSelectedTopic(topic);
    const topicLabel = SUPPORT_TOPICS.find(t => t.value === topic)?.label || topic;
    
    // Update conversation topic if active
    if (activeConversationId) {
      await supabase
        .from('conversations')
        .update({ topic })
        .eq('id', activeConversationId);
    }

    // Add a system message about topic change
    const topicChangeMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I've switched to **${topicLabel}** mode. I'll now focus on helping you with questions related to this topic. How can I assist you?`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, topicChangeMessage]);
    playSound('receive');
    
    toast({
      title: 'Topic Changed',
      description: `Now helping with: ${topicLabel}`,
    });
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    playSound('send');
    toast({
      title: 'Chat Cleared',
      description: 'Your conversation has been cleared.',
    });
  };

  return (
    <div className="flex h-[100dvh] bg-background">
      {/* Sidebar */}
      {user && (
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
          onRenameConversation={handleRenameConversation}
          onExportConversation={handleExportConversation}
          onShareConversation={handleShareConversation}
          onOpenSettings={() => navigate('/settings')}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader 
          isOnline={true} 
          onClearChat={handleClearChat}
          leftAction={user ? (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : undefined}
        />
        <TopicSelector value={selectedTopic} onChange={handleTopicChange} />
        
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6"
        >
          <div className="animate-stagger">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

import { SUPPORT_TOPICS } from '@/types/chat';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tag } from 'lucide-react';

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TopicSelector = ({ value, onChange }: TopicSelectorProps) => {
  const selectedTopic = SUPPORT_TOPICS.find(t => t.value === value);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 border-b border-border bg-card/50">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Tag className="w-4 h-4 text-accent" />
        <span className="whitespace-nowrap font-medium">Support Topic:</span>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-[350px] bg-secondary border-border text-foreground h-10">
          <SelectValue placeholder="Select a topic...">
            {selectedTopic?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-popover border-border max-h-[300px]">
          {SUPPORT_TOPICS.map((topic) => (
            <SelectItem 
              key={topic.id} 
              value={topic.value}
              className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer py-2.5"
            >
              {topic.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

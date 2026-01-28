import { User } from 'lucide-react';

export const UserAvatar = () => {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/50">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
      </div>
    </div>
  );
};

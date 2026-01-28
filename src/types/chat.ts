export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SupportTopic {
  id: string;
  label: string;
  value: string;
}

export const SUPPORT_TOPICS: SupportTopic[] = [
  { id: '1', label: 'General Support', value: 'general' },
  { id: '2', label: 'Education, Learning, Courses & Academic Help', value: 'education' },
  { id: '3', label: 'E-commerce: Shopping, Orders, Products & Delivery', value: 'ecommerce' },
  { id: '4', label: 'Technical Support & Troubleshooting', value: 'technical' },
  { id: '5', label: 'Billing & Payments', value: 'billing' },
];

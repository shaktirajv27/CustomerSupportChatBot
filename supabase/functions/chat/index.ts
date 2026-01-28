import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, topic } = await req.json();
    
    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not configured');
      throw new Error('GROQ_API_KEY is not configured');
    }

    console.log('Received request with topic:', topic);
    console.log('Number of messages:', messages?.length);

    // Build system prompt based on topic with strict topic enforcement
    const topicPrompts: Record<string, string> = {
      general: `You are a friendly and helpful customer support assistant. Be concise, professional, and empathetic in your responses. You can help with any general questions.`,
      education: `You are an educational support specialist. You ONLY help with topics related to:
- Learning and studying
- Courses and educational programs
- Academic questions and homework
- Schools, colleges, and universities
- Educational resources and materials
- Exam preparation and study tips

IMPORTANT: If a user asks about anything NOT related to education (like shopping, e-commerce sites like Flipkart/Amazon, technical issues, billing, etc.), you MUST politely decline and say: "I'm sorry, but I'm currently set to help only with education-related questions. Please select a different support topic from the dropdown above if you need help with something else." Be encouraging and patient for education topics.`,
      ecommerce: `You are an e-commerce support specialist. You ONLY help with topics related to:
- Online shopping
- Orders, deliveries, and tracking
- Products and product information
- Returns and refunds for purchases
- E-commerce platforms (like Amazon, Flipkart, eBay, etc.)
- Payment issues related to online purchases

IMPORTANT: If a user asks about anything NOT related to e-commerce/shopping (like education, academic questions, general technical support unrelated to shopping, etc.), you MUST politely decline and say: "I'm sorry, but I'm currently set to help only with e-commerce and shopping-related questions. Please select a different support topic from the dropdown above if you need help with something else." Be helpful and solution-oriented for e-commerce topics.`,
      technical: `You are a technical support specialist. You ONLY help with topics related to:
- Software troubleshooting
- Hardware issues
- Computer and device problems
- App and program errors
- Network and connectivity issues
- Technical how-to questions

IMPORTANT: If a user asks about anything NOT related to technical support (like shopping, education, billing unrelated to tech, etc.), you MUST politely decline and say: "I'm sorry, but I'm currently set to help only with technical support questions. Please select a different support topic from the dropdown above if you need help with something else." Explain technical concepts clearly and provide step-by-step solutions for tech topics.`,
      billing: `You are a billing and payments specialist. You ONLY help with topics related to:
- Payment issues and transactions
- Invoices and billing statements
- Subscriptions and recurring payments
- Refunds and chargebacks
- Account billing questions
- Financial inquiries related to services

IMPORTANT: If a user asks about anything NOT related to billing/payments (like shopping products, education, technical troubleshooting, etc.), you MUST politely decline and say: "I'm sorry, but I'm currently set to help only with billing and payment-related questions. Please select a different support topic from the dropdown above if you need help with something else." Be clear and reassuring for billing topics.`,
    };

    const systemPrompt = topicPrompts[topic] || topicPrompts.general;

    const chatMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    console.log('Calling Groq API...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Groq API response received');

    const assistantMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

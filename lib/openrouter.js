import axios from 'axios';
import { preprationOption } from '@/Service/PreparationData';

// 2. Environment Variables Issue

// This might be undefined in server context
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'deepseek/deepseek-v3-base';

export async function generateAIResponse(message, topic, preparationType) {
  try {
    // Find the matching preparation option
    const prepOption = preprationOption.find(option => option.name === preparationType) || preprationOption[0];
    
    // Replace placeholder in prompt
    const systemPrompt = prepOption.prompt.replace('{user_topic}', topic);
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://prepmate-ai-interview-coach.vercel.app',
          'X-Title': 'PrepMate AI Interview Coach'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw new Error('Failed to generate AI response');
  }
}
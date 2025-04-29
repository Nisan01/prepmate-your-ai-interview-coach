import { preprationOption } from "./PreparationData";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "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",
  dangerouslyAllowBrowser: true,
});

export const AIMODEL = async(preparationType, topic, msg) => {
  try {
    const prepOption = preprationOption.find(option => option.name === preparationType) || preprationOption[0];
    const systemPrompt = prepOption.prompt.replace('{user_topic}', topic);
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: 'user',
          content: `SYSTEM: ${systemPrompt}\n\nUSER: ${msg}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    if (completion && typeof completion === 'object') {
      if (completion.choices && Array.isArray(completion.choices) && completion.choices.length > 0) {
        const choice = completion.choices[0];
        if (choice.message && choice.message.content) {
          return choice.message.content;
        }
      }
    
      if (completion.content) {
        return completion.content;
      }
      
      // Check for text in response
      if (completion.text) {
        return completion.text;
      }
      return "I'm sorry, I couldn't generate a proper response due to API format issues.";
    } else {
      return "I'm sorry, I couldn't generate a response at this time.";
    }
  } catch (error) {
    return "Sorry, there was an error processing your request. Please try again.";
  }
};
    

export const AIMODELCONVER = async(preparationType, topic, msg) => {
  try {
    const prepOption = preprationOption.find(option => option.name === preparationType) || preprationOption[0];
    const systemPrompt = prepOption.prompt.replace('{user_topic}', topic);
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: 'user',
          content: `SYSTEM: ${systemPrompt}\n\nUSER: ${msg}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    if (completion && typeof completion === 'object') {
      if (completion.choices && Array.isArray(completion.choices) && completion.choices.length > 0) {
        const choice = completion.choices[0];
        if (choice.message && choice.message.content) {
          return choice.message.content;
        }
      }
    
      if (completion.content) {
        return completion.content;
      }
      
      // Check for text in response
      if (completion.text) {
        return completion.text;
      }
      return "I'm sorry, I couldn't generate a proper response due to API format issues.";
    } else {
      return "I'm sorry, I couldn't generate a response at this time.";
    }
  } catch (error) {
    return "Sorry, there was an error processing your request. Please try again.";
  }
};
    
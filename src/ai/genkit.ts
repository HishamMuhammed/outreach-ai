import OpenAI from 'openai';

export const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Using a stable text model on OpenRouter for all these prompts
export const DEFAULT_MODEL = 'arcee-ai/trinity-large-preview:free';

export async function generateText(prompt: string): Promise<string> {
  const response = await ai.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0]?.message?.content || '';
}

export async function generateStructuredText<T>(prompt: string, schema: string): Promise<T> {
  const systemPrompt = `You must output only valid, stringifed JSON. Do not include markdown formatting like \`\`\`json. Match this exact JSON schema structure:\n\n${schema}`;

  const response = await ai.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    // Force JSON mode if the model supports it on OpenRouter
    // response_format: { type: 'json_object' } 
  });

  const content = response.choices[0]?.message?.content || '{}';

  // Try to parse, stripping out potential markdown if the model ignores the system prompt
  try {
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanContent) as T;
  } catch (error) {
    console.error("Failed to parse structured JSON from LLM: ", content);
    throw new Error('AI returned malformed JSON.');
  }
}

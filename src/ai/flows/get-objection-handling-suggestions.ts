
import { z } from 'zod';
import { generateText } from '../genkit';

export const ObjectionHandlingInputSchema = z.object({
    productInfo: z.string(),
    typicalObjections: z.string().optional(),
});

export async function getObjectionHandlingSuggestions(input: z.infer<typeof ObjectionHandlingInputSchema>): Promise<string> {
    const { productInfo, typicalObjections } = ObjectionHandlingInputSchema.parse(input);

    const prompt = `
    Generate objection handling suggestions for the following product.
    
    Product Info: ${productInfo}
    ${typicalObjections ? `Typical Objections Mentioned: ${typicalObjections}` : ''}
    
    Provide 3 common or likely objections and a concise, persuasive response for each.
    Format as Markdown.
  `;

    return generateText(prompt);
}

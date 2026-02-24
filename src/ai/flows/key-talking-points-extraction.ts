
import { z } from 'zod';
import { generateText } from '../genkit';

export const KeyTalkingPointsInputSchema = z.object({
    analysis: z.string(),
    productInfo: z.string(),
    clientContext: z.string().optional(),
});

export async function keyTalkingPointsExtraction(input: z.infer<typeof KeyTalkingPointsInputSchema>): Promise<string> {
    const { analysis, productInfo, clientContext } = KeyTalkingPointsInputSchema.parse(input);

    const prompt = `
    Based on the lead analysis and product info, generate a list of 3-5 key talking points.
    
    Lead Analysis: ${analysis}
    Product Info: ${productInfo}
    ${clientContext ? `Additional Context: ${clientContext}` : ''}
    
    Format the output as a Markdown list of bullet points. Each point should be a strong value proposition or conversation starter.
  `;

    return generateText(prompt);
}

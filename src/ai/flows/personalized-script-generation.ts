
import { z } from 'zod';
import { generateStructuredText } from '../genkit';

export const PersonalizedScriptGenerationInputSchema = z.object({
  leadName: z.string(),
  leadCompany: z.string(),
  analysis: z.string(),
  productInfo: z.string(),
  outreachGoals: z.string(),
  tone: z.enum(['Friendly', 'Formal', 'Aggressive', 'Concise']),
});

export type MultiChannelScriptOutput = {
  emailScript: string;
  linkedinScript: string;
  callScript: string;
};

const ResponseSchema = `
{
    "emailScript": "The markdown formatted email body including 3-5 subject lines at the top.",
    "linkedinScript": "A highly concise, conversational direct message specifically designed for LinkedIn constraints.",
    "callScript": "A cold call/voicemail script that feels natural when spoken aloud, including pauses."
}
`;

export async function personalizedScriptGeneration(input: z.infer<typeof PersonalizedScriptGenerationInputSchema>): Promise<MultiChannelScriptOutput> {
  const { leadName, leadCompany, analysis, productInfo, outreachGoals, tone } = PersonalizedScriptGenerationInputSchema.parse(input);

  const prompt = `
    Generate three distinct personalized sales outreach scripts based on the following context.
    
    Lead: ${leadName} at ${leadCompany}
    Analysis of Lead: ${analysis}
    My Product/Offer: ${productInfo}
    Goal of Outreach: ${outreachGoals}
    Desired Tone: ${tone}
    
    1. **Email Script**: Write a compelling email addressing the lead's potential needs based on the analysis. Include 3 to 5 catchy subject line options at the top.
    2. **LinkedIn Script**: Write a highly concise, high-impact direct message connecting point A to B. It must be short.
    3. **Call Script**: Write a conversational cold call or voicemail script. It must sound natural when spoken aloud.
  `;

  return generateStructuredText<MultiChannelScriptOutput>(prompt, ResponseSchema);
}

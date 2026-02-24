
import { z } from 'zod';
import { generateText } from '../genkit';

export const LeadDataAnalysisInputSchema = z.object({
    leadName: z.string(),
    leadCompany: z.string(),
    leadData: z.string(),
});

export async function leadDataAnalysis(input: z.infer<typeof LeadDataAnalysisInputSchema>): Promise<string> {
    const { leadName, leadCompany, leadData } = LeadDataAnalysisInputSchema.parse(input);
    const prompt = `
    Analyze the following lead data for ${leadName} from ${leadCompany}.
    Extract key insights, professional background, and potential pain points.
    
    Lead Data:
    ${leadData}
    
    Provide a concise analysis designed to help a sales representative understand this lead.
  `;

    return generateText(prompt);
}

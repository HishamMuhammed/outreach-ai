
'use server';

import { z } from 'zod';
import { leadDataAnalysis } from '@/ai/flows/lead-data-analysis';
import { personalizedScriptGeneration } from '@/ai/flows/personalized-script-generation';
import { keyTalkingPointsExtraction } from '@/ai/flows/key-talking-points-extraction';
import { backgroundResearchSummary } from '@/ai/flows/background-research-summary';
import { getObjectionHandlingSuggestions } from '@/ai/flows/get-objection-handling-suggestions';

// Form Schema reused for validation here (ideally shared)
const FormDataSchema = z.object({
    leadName: z.string().min(1, 'Lead name is required'),
    leadCompany: z.string().min(1, 'Company name is required'),
    leadData: z.string().min(10, 'Please provide more context about the lead'),
    productInfo: z.string().min(10, 'Product info is required'),
    clientContext: z.string().optional(),
    outreachGoals: z.string().min(1, 'Outreach goals are required'),
    typicalObjections: z.string().optional(),
    tone: z.enum(['Friendly', 'Formal', 'Aggressive', 'Concise']),
});

export type OutreachResults = {
    emailScript: string;
    linkedinScript: string;
    callScript: string;
    talkingPoints: string;
    research: string;
    objections: string;
    analysis: string;
};

import { createClient } from '@/utils/supabase/server';

export async function generateOutreach(formData: z.infer<typeof FormDataSchema>): Promise<OutreachResults> {
    // Validate input
    const validatedData = FormDataSchema.parse(formData);
    const { leadName, leadCompany, leadData, productInfo, clientContext, outreachGoals, typicalObjections, tone } = validatedData;

    try {
        // 1. Run independent flows in parallel with Analysis
        // We need analysis for the next step, but we can run research and objections now.
        const [analysisResult, researchResult, objectionsResult] = await Promise.all([
            leadDataAnalysis({ leadName, leadCompany, leadData }),
            backgroundResearchSummary({ leadCompany }),
            getObjectionHandlingSuggestions({ productInfo, typicalObjections }),
        ]);

        // 2. Run dependent flows in parallel (requires analysis)
        const [scriptResult, talkingPointsResult] = await Promise.all([
            personalizedScriptGeneration({
                leadName,
                leadCompany,
                analysis: analysisResult,
                productInfo,
                outreachGoals,
                tone,
            }),
            keyTalkingPointsExtraction({
                analysis: analysisResult,
                productInfo,
                clientContext,
            }),
        ]);

        const payload = {
            emailScript: scriptResult.emailScript,
            linkedinScript: scriptResult.linkedinScript,
            callScript: scriptResult.callScript,
            talkingPoints: talkingPointsResult,
            research: researchResult,
            objections: objectionsResult,
            analysis: analysisResult,
        };

        // 3. Save to Supabase History Database
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error: dbError } = await supabase.from('outreach_campaigns').insert({
                user_id: user.id,
                lead_name: leadName,
                lead_company: leadCompany,
                product_info: productInfo,
                email_script: payload.emailScript,
                linkedin_script: payload.linkedinScript,
                call_script: payload.callScript,
                talking_points: payload.talkingPoints,
                research: payload.research,
                analysis: payload.analysis,
                objections: payload.objections
            });

            if (dbError) {
                console.error('Failed to save campaign to history:', dbError);
                // We do not throw here to ensure the user still gets their generated text even if DB save fails
            }
        }

        return payload;
    } catch (error) {
        console.error('Error generating outreach:', error);
        throw new Error('Failed to generate outreach assets. Please try again.');
    }
}

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteCampaign(campaignId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('outreach_campaigns')
        .delete()
        // RLS prevents deleting someone else's campaign, but explicitly checking user_id adds a layer of safety
        .eq('id', campaignId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Failed to delete campaign:', error);
        throw new Error('Failed to delete campaign');
    }

    revalidatePath('/history');
    redirect('/history');
}

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CampaignViewer } from '@/components/CampaignViewer';
import { DeleteCampaignButton } from '@/components/DeleteCampaignButton';
import { format } from 'date-fns';
import type { OutreachResults } from '@/app/actions';

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const resolvedParams = await params;

    // Fetch the specific campaign. RLS naturally prevents fetching someone else's ID.
    const { data: campaign, error } = await supabase
        .from('outreach_campaigns')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

    if (error || !campaign) {
        console.error('Error fetching campaign or campaign not found:', error);
        redirect('/history');
    }

    // Map DB columns back to the structure expected by CampaignViewer
    const mappedResults: OutreachResults = {
        emailScript: campaign.email_script || campaign.script || '', // fallback to generic script if old data
        linkedinScript: campaign.linkedin_script || '',
        callScript: campaign.call_script || '',
        talkingPoints: campaign.talking_points || '',
        research: campaign.research || '',
        objections: campaign.objections || '',
        analysis: campaign.analysis || '',
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-emerald-900 via-black to-teal-900">
            <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Navigation */}
                <div className="flex items-start justify-between">
                    <div>
                        <Link href="/history" className="text-sm text-gray-500 hover:text-white transition-colors mb-2 block">
                            ← Back to History
                        </Link>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            {campaign.lead_name}
                            <span className="text-gray-500 font-normal text-xl hidden sm:inline-block">@ {campaign.lead_company}</span>
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Generated on {format(new Date(campaign.created_at), 'MMMM do, yyyy h:mm a')}
                        </p>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <DeleteCampaignButton campaignId={campaign.id} />
                    </div>
                </div>

                {/* The Extracted Viewer Component */}
                <CampaignViewer results={mappedResults} />
            </div>
        </div>
    );
}

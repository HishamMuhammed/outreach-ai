import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { GlassCard } from '@/components/GlassCard';
import { FileText, Calendar, Building2, User } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default async function HistoryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: campaigns, error } = await supabase
        .from('outreach_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching campaigns:', error);
    }

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-emerald-900 via-black to-teal-900">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                            Outreach History
                        </h1>
                        <p className="text-gray-400 mt-2">View and manage your past AI-generated campaign assets.</p>
                    </div>
                    <Link href="/generate">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20">
                            New Campaign
                        </button>
                    </Link>
                </div>

                {(!campaigns || campaigns.length === 0) ? (
                    <GlassCard className="p-12 text-center">
                        <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">No Campaigns Yet</h3>
                        <p className="text-gray-400 mb-6">You haven't generated any outreach assets yet.</p>
                        <Link href="/generate">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Generate Your First Campaign
                            </button>
                        </Link>
                    </GlassCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map((campaign) => (
                            <GlassCard key={campaign.id} className="p-6 flex flex-col hover:border-white/20 transition-colors group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                        <FileText className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true })}
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center text-gray-300">
                                        <User className="h-4 w-4 mr-2 text-gray-500" />
                                        <span className="font-medium truncate">{campaign.lead_name}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                        <span className="truncate">{campaign.lead_company}</span>
                                    </div>
                                </div>

                                {/* Link to dynamic specific campaign route */}
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <Link
                                        href={`/history/${campaign.id}`}
                                        className="block w-full text-center text-sm font-medium text-emerald-400 hover:text-white hover:bg-emerald-500/20 py-2 rounded-lg transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

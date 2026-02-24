'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { ResultCard } from '@/components/ResultCard';
import { Bot, FileText, MessageSquare, Search, BarChart } from 'lucide-react';
import type { OutreachResults } from '@/app/actions';

interface CampaignViewerProps {
    results: OutreachResults;
}

export function CampaignViewer({ results }: CampaignViewerProps) {
    const [activeTab, setActiveTab] = React.useState<'script' | 'talkingPoints' | 'research' | 'objections' | 'analysis'>('script');
    const [activeScriptType, setActiveScriptType] = React.useState<'email' | 'linkedin' | 'call'>('email');

    // We don't want to pass setters down in a true viewer to save changes unless we add an overarching 'Save' button,
    // so we handle edits locally or just disable edits in history. For now, we'll keep it simple and just display.
    const [localResults, setLocalResults] = React.useState<OutreachResults>(results);

    return (
        <GlassCard className="min-h-[600px] flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 border-r border-white/10 bg-black/10 p-4 space-y-2">
                {[
                    { id: 'script', label: 'Script', icon: FileText },
                    { id: 'talkingPoints', label: 'Talking Points', icon: MessageSquare },
                    { id: 'research', label: 'Research', icon: Search },
                    { id: 'objections', label: 'Objections', icon: Bot },
                    { id: 'analysis', label: 'Analysis', icon: BarChart },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                            : 'hover:bg-white/10 text-gray-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 bg-white/5 dark:bg-black/20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="h-full"
                    >
                        {activeTab === 'script' && (
                            <div className="flex flex-col h-full space-y-4">
                                <div className="flex gap-2 p-1 bg-black/20 rounded-lg w-fit">
                                    {['email', 'linkedin', 'call'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveScriptType(type as any)}
                                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeScriptType === type
                                                ? 'bg-emerald-600 text-white shadow-md'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {activeScriptType === 'email' && (
                                    <ResultCard
                                        title="Email Outreach Script"
                                        content={localResults.emailScript}
                                        icon={FileText}
                                        editable={true}
                                        emailSubject={`Outreach to ${localResults.analysis.split('\n')[0]}`}
                                        onContentChange={(newText) => setLocalResults({ ...localResults, emailScript: newText })}
                                    />
                                )}
                                {activeScriptType === 'linkedin' && (
                                    <ResultCard
                                        title="LinkedIn Direct Message"
                                        content={localResults.linkedinScript}
                                        icon={FileText}
                                        editable={true}
                                        onContentChange={(newText) => setLocalResults({ ...localResults, linkedinScript: newText })}
                                    />
                                )}
                                {activeScriptType === 'call' && (
                                    <ResultCard
                                        title="Cold Call / Voicemail Script"
                                        content={localResults.callScript}
                                        icon={FileText}
                                        editable={true}
                                        onContentChange={(newText) => setLocalResults({ ...localResults, callScript: newText })}
                                    />
                                )}
                            </div>
                        )}
                        {activeTab === 'talkingPoints' && (
                            <ResultCard title="Key Talking Points" content={localResults.talkingPoints} icon={MessageSquare} />
                        )}
                        {activeTab === 'research' && (
                            <ResultCard title="Company Research" content={localResults.research} icon={Search} />
                        )}
                        {activeTab === 'objections' && (
                            <ResultCard title="Objection Handling" content={localResults.objections} icon={Bot} />
                        )}
                        {activeTab === 'analysis' && (
                            <ResultCard title="Lead Analysis" content={localResults.analysis} icon={BarChart} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </GlassCard>
    );
}


'use client';

import * as React from 'react';
import { Copy, Download, Check, Edit2, Mail, Save, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
    title: string;
    content: string;
    icon: React.ElementType;
    editable?: boolean;
    onContentChange?: (content: string) => void;
    emailSubject?: string;
}

export function ResultCard({ title, content, icon: Icon, editable = false, onContentChange, emailSubject = 'Outreach' }: ResultCardProps) {
    const [copied, setCopied] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedContent, setEditedContent] = React.useState(content);

    // Sync local state when props change
    React.useEffect(() => {
        setEditedContent(content);
    }, [content]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(isEditing ? editedContent : content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const textToSave = isEditing ? editedContent : content;
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSendEmail = () => {
        const textToSend = isEditing ? editedContent : content;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(textToSend)}`;
        window.location.href = mailtoLink;
    };

    const handleSave = () => {
        setIsEditing(false);
        if (onContentChange) {
            onContentChange(editedContent);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedContent(content); // Revert changes
    };

    return (
        <GlassCard className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Icon className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <div className="flex gap-2">
                    {editable && !isEditing && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-emerald-400"
                                title="Edit Content"
                            >
                                <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleSendEmail}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-emerald-400"
                                title="Send via Email"
                            >
                                <Mail className="h-5 w-5" />
                            </button>
                        </>
                    )}

                    {isEditing && (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 hover:bg-green-500/20 rounded-lg transition-colors text-green-400"
                                title="Save Changes"
                            >
                                <Save className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                                title="Cancel"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </>
                    )}

                    <div className="w-px h-6 bg-white/10 self-center mx-1" />

                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Download as .txt"
                    >
                        <Download className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col">
                {isEditing ? (
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-1 w-full bg-transparent resize-none outline-none leading-relaxed text-sm font-mono whitespace-pre-wrap text-inherit"
                        spellCheck={false}
                    />
                ) : (
                    <div className="prose dark:prose-invert max-w-none text-sm">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

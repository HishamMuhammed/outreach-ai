'use client';

import * as React from 'react';
import { Trash2 } from 'lucide-react';
import { deleteCampaign } from '@/app/actions';

export function DeleteCampaignButton({ campaignId }: { campaignId: string }) {
    const [isConfirming, setIsConfirming] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        try {
            setIsDeleting(true);
            await deleteCampaign(campaignId);
        } catch (error) {
            console.error('Failed to delete:', error);
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isConfirming
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-1 ring-red-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-red-400'
                    }`}
            >
                <Trash2 className={`h-4 w-4 ${isDeleting ? 'animate-pulse' : ''}`} />
                {isDeleting ? 'Deleting...' : isConfirming ? 'Are you sure?' : 'Delete Campaign'}
            </button>

            {/* Backdrop to cancel confirmation when clicking outside */}
            {isConfirming && !isDeleting && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsConfirming(false)}
                />
            )}
        </div>
    );
}

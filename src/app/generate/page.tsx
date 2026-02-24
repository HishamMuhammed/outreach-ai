
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { generateOutreach, type OutreachResults } from '@/app/actions';
import { GlassCard } from '@/components/GlassCard';
import { ProgressBar } from '@/components/ProgressBar';
import { ResultCard } from '@/components/ResultCard';
import { CampaignViewer } from '@/components/CampaignViewer';
import {
    Bot,
    FileText,
    MessageSquare,
    Search,
    BarChart,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Send
} from 'lucide-react';
import Link from 'next/link';

// Schema (must match server action)
const formSchema = z.object({
    leadName: z.string().min(1, 'Lead name is required'),
    leadCompany: z.string().min(1, 'Company name is required'),
    leadData: z.string().min(10, 'Please provide more context about the lead (at least 10 chars)'),
    productInfo: z.string().min(10, 'Product info is required (at least 10 chars)'),
    clientContext: z.string().optional(),
    outreachGoals: z.string().min(1, 'Outreach goals are required'),
    typicalObjections: z.string().optional(),
    tone: z.enum(['Friendly', 'Formal', 'Aggressive', 'Concise']),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
    { id: 1, title: "Lead Info" },
    { id: 2, title: "Context" },
    { id: 3, title: "Your Offer" },
    { id: 4, title: "Goals" },
    { id: 5, title: "Tone" },
];

export default function GeneratePage() {
    const [step, setStep] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState<OutreachResults | null>(null);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isValid },
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            tone: 'Friendly',
        },
    });

    const nextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];
        if (step === 1) fieldsToValidate = ['leadName', 'leadCompany'];
        if (step === 2) fieldsToValidate = ['leadData'];
        if (step === 3) fieldsToValidate = ['productInfo'];
        if (step === 4) fieldsToValidate = ['outreachGoals'];

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) setStep((s) => Math.min(s + 1, STEPS.length));
    };

    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setResults(null);
        try {
            const result = await generateOutreach(data);
            setResults(result);
        } catch (error) {
            console.error(error);
            alert('Failed to generate outreach. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (results) {
        return (
            <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/history">
                            <button className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                View History
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setResults(null);
                                setStep(1);
                            }}
                            className="text-sm px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-white"
                        >
                            Generate New
                        </button>
                    </div>
                </div>

                <CampaignViewer results={results} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors mb-4 block">
                        ← Back to Home
                    </Link>
                    <ProgressBar currentStep={step} totalSteps={STEPS.length} />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>Step {step} of {STEPS.length}</span>
                        <span>{STEPS[step - 1].title}</span>
                    </div>
                </div>

                <GlassCard className="p-8 relative overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
                            <Loader2 className="h-12 w-12 animate-spin mb-4 text-emerald-500" />
                            <p className="text-lg font-medium animate-pulse">Generating your outreach assets...</p>
                            <p className="text-sm text-gray-400 mt-2">This usually takes 10-20 seconds.</p>
                        </div>
                    )}

                    <form>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Who are we reaching out to?</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Lead Name</label>
                                            <input
                                                {...register('leadName')}
                                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                                                placeholder="e.g. John Doe"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        nextStep();
                                                    }
                                                }}
                                            />
                                            {errors.leadName && <span className="text-red-400 text-sm">{errors.leadName.message}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Company Name</label>
                                            <input
                                                {...register('leadCompany')}
                                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                                                placeholder="e.g. Acme Corp"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        nextStep();
                                                    }
                                                }}
                                            />
                                            {errors.leadCompany && <span className="text-red-400 text-sm">{errors.leadCompany.message}</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Add some context</h2>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Lead Data / LinkedIn Bio</label>
                                        <textarea
                                            {...register('leadData')}
                                            rows={6}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                                            placeholder="Paste their LinkedIn bio, recent post, or any notes you have..."
                                        />
                                        {errors.leadData && <span className="text-red-400 text-sm">{errors.leadData.message}</span>}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">What are you offering?</h2>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Product / Service Info</label>
                                        <textarea
                                            {...register('productInfo')}
                                            rows={4}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                                            placeholder="Describe your product and its key value proposition..."
                                        />
                                        {errors.productInfo && <span className="text-red-400 text-sm">{errors.productInfo.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Additional Context (Optional)</label>
                                        <textarea
                                            {...register('clientContext')}
                                            rows={2}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                                            placeholder="Any specific context about your company or relationship?"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Outreach Strategy</h2>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Goal of Outreach</label>
                                        <textarea
                                            {...register('outreachGoals')}
                                            rows={3}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                                            placeholder="e.g. Schedule a demo, get a reply, introduce a new feature..."
                                        />
                                        {errors.outreachGoals && <span className="text-red-400 text-sm">{errors.outreachGoals.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Typical Objections (Optional)</label>
                                        <textarea
                                            {...register('typicalObjections')}
                                            rows={2}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none"
                                            placeholder="What do leads usually push back on?"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Set the Tone</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Friendly', 'Formal', 'Aggressive', 'Concise'].map((tone) => (
                                            <label
                                                key={tone}
                                                className={`cursor-pointer p-4 rounded-xl border transition-all ${watch('tone') === tone
                                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value={tone}
                                                    {...register('tone')}
                                                    className="sr-only"
                                                />
                                                <span className="font-medium">{tone}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'hover:bg-white/10'
                                    }`}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Back
                            </button>

                            {step < STEPS.length ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center bg-white text-black dark:bg-white dark:text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    className="flex items-center bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
                                >
                                    Generate Outreach
                                    <Send className="h-4 w-4 ml-2" />
                                </button>
                            )}
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}

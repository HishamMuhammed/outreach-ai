'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signInAction, signUpAction } from './actions';
import { GlassCard } from '@/components/GlassCard';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isSignUp, setIsSignUp] = React.useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    setIsLoading(false);
                    return;
                }
                const formData = new FormData();
                formData.append('fullName', fullName);
                formData.append('email', email);
                formData.append('password', password);

                const result = await signUpAction(formData);
                if (result.error) throw new Error(result.error);

                setError('Check your email for the confirmation link!');
            } else {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const result = await signInAction(formData);
                if (result.error) throw new Error(result.error);

                router.push('/generate');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-900 via-black to-teal-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <GlassCard className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {isSignUp ? 'Sign up to start saving your outreach.' : 'Sign in to access your outreach history.'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none text-white"
                                    placeholder="Jane Doe"
                                    required={isSignUp}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none text-white"
                                placeholder="you@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none text-white"
                                    placeholder="••••••••"
                                    required={isSignUp}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : isSignUp ? (
                                <>
                                    <UserPlus className="h-5 w-5 mr-2" /> Sign Up
                                </>
                            ) : (
                                <>
                                    <LogIn className="h-5 w-5 mr-2" /> Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}

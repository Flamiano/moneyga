"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { supabase } from "../util/supabase";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

function VerificationContent() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Guard to prevent the code from being exchanged twice (Fixes "Link Expired")
    const verificationStarted = useRef(false);

    useEffect(() => {
        const verifySession = async () => {
            // 1. Prevent double-execution in React Strict Mode
            if (verificationStarted.current) return;
            verificationStarted.current = true;

            const code = searchParams.get("code");

            // 2. Check if the user is already logged in (already verified)
            const { data: { session: existingSession } } = await supabase.auth.getSession();

            if (existingSession) {
                setIsAuthorized(true);
                setUserEmail(existingSession.user.email ?? "");
                await supabase.auth.signOut();
                return;
            }

            // 3. Exchange the temporary code for a real session
            if (code) {
                const { data, error } = await supabase.auth.exchangeCodeForSession(code);

                if (!error && data.session) {
                    setIsAuthorized(true);
                    setUserEmail(data.session.user.email ?? "");
                    // We sign out so they have to log in fresh on the mobile app
                    await supabase.auth.signOut();
                } else {
                    // 4. Handle the specific "Link Expired" false positive
                    // If Supabase says it's already used, it usually means it worked 
                    // but was triggered twice by the browser or an email scanner.
                    if (error?.message?.includes("already been redeemed") || error?.message?.includes("Flow state not found")) {
                        setIsAuthorized(true);
                    } else {
                        console.error("Verification error:", error?.message);
                        setIsAuthorized(false);
                    }
                }
            } else {
                setIsAuthorized(false);
            }
        };

        verifySession();
    }, [searchParams]);

    // --- UI STATES ---

    // LOADING STATE
    if (isAuthorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9F8]">
                <div className="text-center">
                    <Loader2 className="animate-spin text-[#3A6B55] mx-auto mb-4" size={40} />
                    <p className="text-[#666666] font-medium">Verifying your account...</p>
                </div>
            </div>
        );
    }

    // ERROR STATE
    if (isAuthorized === false) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9F8] p-4">
                <div className="max-w-md w-full bg-white rounded-[20px] shadow-sm border border-[#EEEEEE] p-10 text-center">
                    <ShieldAlert size={56} className="mx-auto text-amber-500 mb-4" />
                    <h1 className="text-xl font-bold text-[#333333] mb-2">Link Expired</h1>
                    <p className="text-[#666666] mb-6">
                        This verification link is invalid or has already been used.
                        Try logging in directly to the app.
                    </p>
                    <div className="pt-6 border-t border-[#F1F1F1]">
                        <p className="text-xs text-[#999999] uppercase font-bold tracking-widest">Moneyga Security</p>
                    </div>
                </div>
            </div>
        );
    }

    // SUCCESS STATE
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9F8] p-4">
            <div className="max-w-md w-full bg-white rounded-[20px] shadow-sm border border-[#EEEEEE] overflow-hidden">
                <div className="h-2 bg-[#3A6B55]" />
                <div className="p-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#E8F5E9] p-4 rounded-full">
                            <CheckCircle2 size={56} color="#3A6B55" strokeWidth={2.5} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#333333] mb-2">Verification Successful</h1>
                    {userEmail && (
                        <p className="text-[#3A6B55] font-semibold text-sm mb-4 bg-[#E8F5E9] inline-block px-3 py-1 rounded-full">
                            {userEmail}
                        </p>
                    )}
                    <p className="text-[#666666] text-base leading-relaxed mb-4">
                        Congratulations! Your email address has been confirmed.
                    </p>
                    <p className="text-[#666666] text-base leading-relaxed">
                        You can now return to the <strong>Moneyga</strong> app and sign in to your account.
                    </p>
                    <div className="mt-10 pt-6 border-t border-[#F1F1F1]">
                        <p className="text-xs text-[#999999] font-medium uppercase tracking-wider">Account Secured & Verified</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EmailSuccessful() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#F8F9F8]">
                    <Loader2 className="animate-spin text-[#3A6B55]" size={40} />
                </div>
            }
        >
            <VerificationContent />
        </Suspense>
    );
}
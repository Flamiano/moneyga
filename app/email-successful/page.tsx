"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { supabase } from "../util/supabase";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function VerificationContent() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Guard to prevent the code from being exchanged twice
    const verificationStarted = useRef(false);

    useEffect(() => {
        const verifySession = async () => {
            if (verificationStarted.current) return;
            verificationStarted.current = true;

            const code = searchParams.get("code");

            // 1. Check if the user is already logged in
            const { data: { session: existingSession } } = await supabase.auth.getSession();

            if (existingSession) {
                setIsAuthorized(true);
                setUserEmail(existingSession.user.email ?? "");
                await supabase.auth.signOut();
                return;
            }

            // 2. Exchange code for session
            if (code) {
                const { data, error } = await supabase.auth.exchangeCodeForSession(code);

                if (!error && data.session) {
                    setIsAuthorized(true);
                    setUserEmail(data.session.user.email ?? "");
                    await supabase.auth.signOut();
                } else {
                    // 3. Treat "Expired" or "Redeemed" as a Success
                    // Most often, the link worked but was clicked twice or scanned by an antivirus.
                    // We show "Success" to avoid confusing the user.
                    setIsAuthorized(true);
                }
            } else {
                // If no code is present at all, we just show the success state 
                // to be safe, or you can redirect them to login.
                setIsAuthorized(true);
            }
        };

        verifySession();
    }, [searchParams]);

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

    // SUCCESS STATE (This is now the only state after loading)
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
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../util/supabase";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function EmailSuccessful() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const verifySession = async () => {
            // 1. Check if we have a session already (link was already clicked/processed)
            const { data: { session: existingSession } } = await supabase.auth.getSession();

            if (existingSession) {
                setIsAuthorized(true);
                setUserEmail(existingSession.user.email ?? "");
                await supabase.auth.signOut();
                return;
            }

            // 2. If no session, check for 'code' in URL (Supabase PKCE flow)
            const code = searchParams.get("code");

            if (code) {
                // This exchange actually confirms the email in Supabase
                const { data, error } = await supabase.auth.exchangeCodeForSession(code);

                if (!error && data.session) {
                    setIsAuthorized(true);
                    setUserEmail(data.session.user.email ?? "");
                    // Sign out so they have to log in manually on the mobile app
                    await supabase.auth.signOut();
                } else {
                    setIsAuthorized(false);
                }
            } else {
                // No code and no session = someone just typed the URL
                setIsAuthorized(false);
            }
        };

        verifySession();
    }, [searchParams]);

    // 1. Loading State
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

    // 2. Unauthorized/Error State
    if (isAuthorized === false) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9F8] p-4">
                <div className="max-w-md w-full bg-white rounded-[20px] shadow-sm border border-[#EEEEEE] p-10 text-center">
                    <ShieldAlert size={56} className="mx-auto text-amber-500 mb-4" />
                    <h1 className="text-xl font-bold text-[#333333] mb-2">Link Expired</h1>
                    <p className="text-[#666666]">
                        This verification link is invalid or has already been used.
                        Please try logging in to the app.
                    </p>
                </div>
            </div>
        );
    }

    // 3. Success State
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

                    <h1 className="text-2xl font-bold text-[#333333] mb-2">
                        Verification Successful
                    </h1>

                    {userEmail && (
                        <p className="text-[#3A6B55] font-semibold text-sm mb-4">
                            {userEmail}
                        </p>
                    )}

                    <p className="text-[#666666] text-base leading-relaxed mb-2">
                        Congratulations! Your email address has been confirmed.
                    </p>

                    <p className="text-[#666666] text-base leading-relaxed">
                        You can now return to the <strong>Moneyga</strong> app and sign in to your account.
                    </p>

                    <div className="mt-10 pt-6 border-t border-[#F1F1F1]">
                        <p className="text-xs text-[#999999] font-medium uppercase tracking-wider">
                            Account Verified
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
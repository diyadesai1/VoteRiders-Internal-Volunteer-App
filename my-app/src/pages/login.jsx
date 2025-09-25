import React, { useState } from "react";
import { signInWithGoogleAndAllowlist } from "../core/firebase"; // adjust path if needed
import { Loader2, LogIn } from "lucide-react";

export default function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogleAndAllowlist();
      onLoginSuccess && onLoginSuccess();
    } catch (e) {
      setError(e.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 sm:px-6 py-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed">
      {/* Card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white/15 backdrop-blur-md border border-white/10 shadow-2xl p-8 sm:mx-4 opacity-0 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-blue-500 text-white font-extrabold text-lg">V</div>
            <div className="font-bold text-white text-2xl tracking-tight">VOTERIDERS</div>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold text-white">Welcome Back</h1>
          <p className="mt-2 text-base text-slate-300">Sign in with your authorized Google account</p>
        </div>

        {/* Google Sign-In Only */}
        <div className="mt-8 space-y-5">
          {error && (
            <div role="alert" className="text-sm text-red-300 text-center">
              {error}
            </div>
          )}

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-slate-900 font-semibold shadow-md disabled:opacity-60 hover:bg-slate-100 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  <span>Sign in with Google</span>
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          <p className="text-xs text-center text-slate-400">Only pre-approved emails can access this application.</p>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-slate-300">
        Copyright © 2025. VoteRiders is a 501(c)(3) nonpartisan nonprofit organization.
      </div>
      <style>{`
          @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
          .animate-fade-in { animation: fade-in 1s ease-in-out forwards; }
        `}</style>
    </div>
  );
}

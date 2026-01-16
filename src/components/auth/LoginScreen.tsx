import { motion } from "framer-motion";
import { useState } from "react";
import { signInWithGoogleAndAllowlist } from "../../firebase";

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogleAndAllowlist();
      onLoginSuccess && onLoginSuccess();
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e && typeof (e as any).message === "string"
          ? (e as any).message
          : "Sign-in failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F9F7' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="heading-primary tracking-tight mb-2" style={{ 
            color: '#191919',
            fontSize: '3.5rem'
          }}>
            VoteRiders
          </h1>
          <p style={{ color: '#6B6B6B', fontSize: '1.125rem' }}>Volunteer Dashboard</p>
        </motion.div>

        {/* Sign In Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl p-8 space-y-6"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            border: '2px solid rgba(25, 25, 25, 0.1)'
          }}
        >
          <div className="text-center space-y-2">
            <h2 className="heading-secondary" style={{ color: '#191919', fontSize: '1.875rem' }}>
              Welcome
            </h2>
            <p style={{ color: '#6B6B6B' }}>Sign in to access your volunteer dashboard</p>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full rounded-3xl py-6 transition-all duration-300 flex items-center justify-center gap-3 font-config cta-text"
              style={{
                backgroundColor: '#F7F9F7',
                color: '#191919',
                border: '2px solid rgba(25, 25, 25, 0.2)',
                fontSize: '0.875rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' as const : 'pointer'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? 'Signing in…' : 'Sign in with Google'}
            </button>
          </div>

          <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(25, 25, 25, 0.1)' }}>
            <p className="text-sm" style={{ color: '#6B6B6B' }}>
              Need help? Contact{" "}
              <a href="mailto:support@voteriders.org" style={{ color: '#0362FF' }} className="hover:underline">
                support@voteriders.org
              </a>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm" style={{ color: '#6B6B6B' }}>
            © 2025 VoteRiders. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginScreen;
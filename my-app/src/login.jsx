import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic client-side validation
  function validate() {
    if (!username.trim()) return "Please enter your username.";
    if (!password) return "Please enter your password.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await fakeLoginApi(username, password);
      onLoginSuccess(); // Trigger the success callback
      navigate("/helpline"); // Navigate to helpline screen
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  // Demo stub for an async login call.
  function fakeLoginApi(u, p) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // demo: only accept user 'demo' and pass 'demo'
        if (u === "ID_assist" && p === "July2026") resolve();
        else reject(new Error("Incorrect username or password"));
      }, 900);
    });
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 sm:px-6 py-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed">

      {/* card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white/15 backdrop-blur-md border border-white/10 shadow-2xl p-8 sm:mx-4 opacity-0 animate-fade-in">
        {/* Header: logo, brand, titles */}
        <div className="flex flex-col items-center text-center">
          {/* logo mark: colored rounded square with V (you can replace with an SVG file) */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-blue-500 text-white font-extrabold text-lg">
              V
            </div>
            <div className="font-bold text-white text-2xl tracking-tight">VOTERIDERS</div>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold text-white">Welcome Back</h1>
          <p className="mt-2 text-base text-slate-300">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-base font-bold text-slate-100 mb-0.5 text-left px-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-slate-400" />
              </span>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-invalid={Boolean(error && !username)}
                aria-describedby={error && !username ? "username-error" : undefined}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-base font-bold text-slate-100 mb-0.5 text-left px-1">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-slate-400" />
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3 rounded-lg bg-white/5 border border-white/8 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-invalid={Boolean(error && !password)}
                aria-describedby={error && !password ? "password-error" : undefined}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-slate-300" /> : <Eye className="w-5 h-5 text-slate-300" />}
              </button>
            </div>
          </div>

          {/* error area (general) */}
          {error ? (
            <div id="form-error" role="alert" className="text-sm text-red-300">
              {error}
            </div>
          ) : null}

          {/* submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Change password link (center) */}
          <div className="text-center">
            <a href="#" className="text-sm underline text-slate-300">
              Change Password
            </a>
          </div>
        </form>
      </div>
      {/* Footer now outside the card */}
      <div className="mt-6 text-center text-sm text-slate-300">
        Copyright © 2025. VoteRiders is a 501(c)(3) nonpartisan nonprofit organization.
      </div>

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
}
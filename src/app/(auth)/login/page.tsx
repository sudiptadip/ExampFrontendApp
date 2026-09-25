"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Clock, 
  Award, 
  Users, 
  Star, 
  Headphones, 
  ShieldCheck, 
  Key,
  MessageSquare
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (authMode === "otp") {
      setError("Mobile OTP service is currently sent to registered email in demo mode. Please log in using Email & Password below.");
      setAuthMode("password");
      setLoading(false);
      return;
    }

    const res = await login({ email, password });
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.message || "Invalid credentials. Please check email and password.");
    }
  };

  return (
    <div className="w-full bg-[#F8F9FF] text-[#0B1C30] min-h-[calc(100vh-5rem)] py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Mock Ticker Strip */}
        <div className="w-full mb-8 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-3.5 px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD651E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FD651E]"></span>
            </span>
            <span className="px-2.5 py-0.5 bg-[#0B1C30] text-white text-[10px] font-extrabold tracking-wider uppercase rounded">
              Live Exam Radar
            </span>
            <p className="text-xs sm:text-sm text-[#0B1C30] truncate">
              <strong className="font-extrabold">SSC CGL Tier 1 All-India Mock #14:</strong>{" "}
              <span className="text-[#FD651E] font-bold">43,180 aspirants</span> actively competing right now.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#45464D] font-bold shrink-0">
            <Clock className="h-4 w-4 text-[#FD651E]" />
            <span>Window closes at 11:59 PM IST</span>
          </div>
        </div>

        {/* Split 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Trust Architecture & Value Stack */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Heading Group */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF4FF] border border-[#DCE9FF] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FD651E]"></span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1C30]">
                  ASPIRANT LOGIN PORTAL
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0B1C30] tracking-tight leading-[1.18]">
                Resume Your Mission to <br className="hidden sm:block" />
                <span className="text-[#FD651E]">AIR Rank &amp; Daily Cockpit</span>.
              </h1>
              <p className="text-sm sm:text-base text-[#45464D] max-w-xl leading-relaxed font-medium">
                Join India&apos;s most focused aspirants in targeted mock cycles, sectional diagnostics, and AI-driven precision time-management.
              </p>
            </div>

            {/* Value Proposition Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#76777D] mb-4">
                BENCHMARK EXAM PLATFORM METRICS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9FF] border border-[#EFF4FF]">
                  <div className="w-9 h-9 rounded-lg bg-[#E5EEFF] flex items-center justify-center shrink-0 text-[#0B1C30]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1C30]">4.8M+ Registered Aspirants</h3>
                    <p className="text-xs text-[#45464D] mt-0.5 leading-relaxed">
                      National-level competitive cohort across all 28 states.
                    </p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9FF] border border-[#EFF4FF]">
                  <div className="w-9 h-9 rounded-lg bg-[#FFDBCE] flex items-center justify-center shrink-0 text-[#FD651E]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1C30]">98.4% Real TCS-iON Pattern</h3>
                    <p className="text-xs text-[#45464D] mt-0.5 leading-relaxed">
                      Exact time-countdown &amp; negative marking simulator.
                    </p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9FF] border border-[#EFF4FF]">
                  <div className="w-9 h-9 rounded-lg bg-[#E5EEFF] flex items-center justify-center shrink-0 text-[#0B1C30]">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1C30]">AI Mistake Notebook</h3>
                    <p className="text-xs text-[#45464D] mt-0.5 leading-relaxed">
                      Sectional diagnostics and real-time AIR percentile ranking.
                    </p>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9FF] border border-[#EFF4FF]">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF1FF] flex items-center justify-center shrink-0 text-[#009668]">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1C30]">1,200+ Selections in 2024</h3>
                    <p className="text-xs text-[#45464D] mt-0.5 leading-relaxed">
                      Toppers in SSC CGL, SBI/IBPS PO, Railways RRB NTPC.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Testimonial Spotlight Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-600 text-white font-black text-base flex items-center justify-center border-2 border-white shadow-sm">
                    VM
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-[#FD651E] text-white p-0.5 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0B1C30]">Vikas Meena</span>
                      <span className="px-2 py-0.5 rounded bg-[#EFF4FF] text-[11px] font-extrabold text-[#0B1C30]">
                        AIR 72 • SSC CGL &apos;23
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#45464D] italic leading-relaxed">&quot;The mock test interface is a 100% replica of the actual exam hall. CrackGov2&apos;s negative-marking penalty alert and time-per-question simulator prevented me from panic.&quot;</p>
                  <div className="mt-2 text-[11px] font-extrabold text-[#FD651E] uppercase tracking-wider">
                    NOW: INSPECTOR OF INCOME TAX (CBDT, NEW DELHI)
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#0B1C30]">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> TCS-iON Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#0B1C30]">
                <Shield className="h-4 w-4 text-indigo-600" /> 100% Verified Keys
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#0B1C30]">
                <Headphones className="h-4 w-4 text-rose-600" /> 24/7 Helpline
              </span>
            </div>

          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative">
              
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-[#0B1C30] tracking-tight">
                    Welcome Back Aspirant
                  </h2>
                  <p className="text-xs text-[#45464D] mt-1 font-medium">
                    Enter registered details to access your mock test cockpit.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#EFF4FF] text-[#0B1C30] border border-[#DCE9FF] rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-600" /> Encrypted
                </span>
              </div>

              {/* Login Tabs / Switcher */}
              <div className="p-1 bg-[#EFF4FF] rounded-xl grid grid-cols-2 gap-1 mb-5 text-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthMode("password")}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === "password"
                      ? "bg-white text-[#0B1C30] shadow-sm font-extrabold"
                      : "text-[#45464D] hover:text-[#0B1C30]"
                  }`}
                >
                  <Key className="h-3.5 w-3.5 text-[#FD651E]" />
                  <span>Via Password</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("otp")}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === "otp"
                      ? "bg-white text-[#0B1C30] shadow-sm font-extrabold"
                      : "text-[#45464D] hover:text-[#0B1C30]"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#FD651E]" />
                  <span>Via OTP</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                {authMode === "password" ? (
                  <>
                    <div>
                      <label className="block text-xs font-extrabold text-[#0B1C30] mb-1.5">
                        Email Address / Registration ID
                      </label>
                      <div className="flex items-center rounded-xl border border-[#DCE9FF] bg-[#F8F9FF] px-3 focus-within:ring-2 focus-within:ring-[#FD651E] focus-within:border-transparent transition-all">
                        <Mail className="h-4 w-4 text-[#76777D] mr-2 shrink-0" />
                        <input
                          type="email"
                          placeholder="e.g. ssc.aspirant2026@crackgov.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent py-2.5 text-sm text-[#0B1C30] font-medium placeholder:text-[#76777D] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-extrabold text-[#0B1C30]">
                          Password
                        </label>
                        <a href="#" className="text-[11px] font-bold text-[#FD651E] hover:underline">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="relative flex items-center rounded-xl border border-[#DCE9FF] bg-[#F8F9FF] px-3 focus-within:ring-2 focus-within:ring-[#FD651E] focus-within:border-transparent transition-all">
                        <Lock className="h-4 w-4 text-[#76777D] mr-2 shrink-0" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-transparent py-2.5 text-sm text-[#0B1C30] font-medium placeholder:text-[#76777D] focus:outline-none pr-8"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-[#76777D] hover:text-[#0B1C30]"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#0B1C30] mb-1.5">
                        Mobile Number
                      </label>
                      <div className="flex rounded-xl border border-[#DCE9FF] bg-[#F8F9FF] overflow-hidden focus-within:ring-2 focus-within:ring-[#FD651E] focus-within:border-transparent transition-all">
                        <div className="px-3 py-2.5 bg-[#EFF4FF] border-r border-[#DCE9FF] flex items-center gap-1.5 text-xs font-bold text-[#0B1C30] select-none">
                          <span>🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter 10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent px-3 py-2.5 text-sm text-[#0B1C30] font-medium placeholder:text-[#76777D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#0B1C30] mb-1.5">
                        One-Time Password (OTP)
                      </label>
                      <div className="grid grid-cols-4 gap-2.5">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const newOtp = [...otp];
                              newOtp[idx] = e.target.value;
                              setOtp(newOtp);
                            }}
                            className="h-12 text-center text-lg font-extrabold text-[#0B1C30] bg-[#F8F9FF] border border-[#DCE9FF] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#FD651E] focus:border-transparent outline-none transition-all"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Primary Submit CTA Button (Vibrant Primary Orange) */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-6 bg-[#FD651E] hover:bg-[#e45512] text-white rounded-xl font-bold text-sm sm:text-base shadow-[0_4px_14px_rgba(253,101,30,0.35)] hover:shadow-[0_6px_20px_rgba(253,101,30,0.45)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify &amp; Enter Student Cockpit</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="w-full h-px bg-[#E2E8F0]"></div>
                <span className="absolute bg-white px-3 text-[11px] font-extrabold text-[#76777D] uppercase tracking-wider">
                  Or Continue With
                </span>
              </div>

              {/* Social Quick Auth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert("Google SSO Integration - Select Google Account")}
                  className="py-2.5 px-3 bg-[#F8F9FF] hover:bg-[#EFF4FF] border border-[#DCE9FF] rounded-xl text-xs font-extrabold text-[#0B1C30] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                    <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("WhatsApp Instant Verification Requested")}
                  className="py-2.5 px-3 bg-[#F8F9FF] hover:bg-[#EFF4FF] border border-[#DCE9FF] rounded-xl text-xs font-extrabold text-[#0B1C30] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Bottom Redirect Link */}
              <div className="mt-5 text-center">
                <p className="text-xs text-[#45464D] font-medium">
                  New to CrackGov2?{" "}
                  <Link
                    href="/register"
                    className="text-[#FD651E] font-extrabold hover:underline inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>Create free account</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </p>
              </div>

              {/* Security Badge Footer */}
              <div className="mt-4 p-2.5 bg-[#F8F9FF] border border-[#EFF4FF] rounded-xl flex items-center justify-center gap-1.5 text-[11px] text-[#45464D] font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#009668]" />
                <span>256-Bit SSL Encrypted • Official TCS-iON Partner</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

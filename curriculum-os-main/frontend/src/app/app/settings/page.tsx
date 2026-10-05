"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, Shield, CheckCircle, Lock } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("curriculumos_byok");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("curriculumos_byok", apiKey.trim());
    } else {
      localStorage.removeItem("curriculumos_byok");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Workspace Settings
        </h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-xl">
          Manage your account, billing, and API integrations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* BYOK Section */}
        <div className="bg-white border border-border/80 rounded-3xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
              <Key size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-foreground">Bring Your Own Key (BYOK)</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Bypass platform token limits by using your own OpenAI API key. Keys are securely saved locally in your browser via <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">localStorage</code> and routed directly to the Vercel AI Gateway.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full bg-secondary/30 border border-border/80 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-mono"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="bg-foreground text-background px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-foreground/90 transition-colors flex items-center gap-2 shadow-sm"
              >
                Save API Key
              </button>
              {saved && (
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
                  <CheckCircle size={16} /> Saved securely
                </span>
              )}
            </div>
          </form>

          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-amber-700">
            <Shield size={20} className="flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Security Notice:</strong> We do not store this key in our database. It is passed via HTTP Headers (<code>x-byok-key</code>) directly to our Vercel AI Gateway and proxy.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

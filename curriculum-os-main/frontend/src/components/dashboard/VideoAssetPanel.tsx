"use client";

import { Video, Download, Play, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function VideoAssetPanel({ curriculumId, initialStatus = "idle" }: { curriculumId: string, initialStatus?: "idle" | "queued" | "rendering" | "complete" }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoStatus, setVideoStatus] = useState(initialStatus);
  const [mp4Url, setMp4Url] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/video/status?curriculumId=${curriculumId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'completed' || data.status === 'complete') {
            setVideoStatus('complete');
            setIsGenerating(false);
            setMp4Url(data.mp4_url);
          } else if (data.status === 'queued' || data.status === 'rendering') {
            setVideoStatus('rendering');
            setIsGenerating(true);
          }
        }
      } catch (err) {}
    };

    fetchStatus();
    if (isGenerating || videoStatus === 'rendering') {
      interval = setInterval(fetchStatus, 3000);
    }
    return () => clearInterval(interval);
  }, [curriculumId, isGenerating, videoStatus]);

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setVideoStatus("rendering");
    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curriculumId: curriculumId,
          content: "Generating video payload"
        })
      });
      // Polling will handle the rest
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={handleGenerateVideo}
          disabled={isGenerating || videoStatus === "complete"}
          className="ap-btn ap-btn--primary disabled:opacity-50"
        >
          <span className="ap-btn__bg hidden"></span>
          {isGenerating ? (
            <><Loader2 size={16} className="animate-spin" /> Rendering MP4...</>
          ) : videoStatus === "complete" ? (
            <><CheckCircle2 size={16} /> Video Ready</>
          ) : (
            <><Video size={16} /> Generate Video Asset</>
          )}
        </button>
      </div>

      <div className="ap-card !bg-[var(--ap-dark)] !text-white !border-0 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Video size={140} className="rotate-12 text-white" />
        </div>
        
        <h3 className="font-sans font-bold text-[22px] mb-2 relative z-10 tracking-tight">Programmatic Video</h3>
        <p className="font-sans text-[var(--ap-mute)] text-sm mb-8 relative z-10">
          Turn this curriculum into a branded, fully narrated 1080p MP4. Powered by Monarch Engine.
        </p>

        {videoStatus === "idle" && (
          <div className="w-full aspect-video bg-[#0E0C09] rounded-xl border border-[rgba(255,255,255,0.06)] flex items-center justify-center relative z-10 shadow-inner">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ap-mute)]">No video generated yet</span>
          </div>
        )}

        {videoStatus === "rendering" && (
          <div className="w-full aspect-video bg-[#0E0C09] rounded-xl border border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-center relative z-10 gap-4 shadow-inner">
            <Loader2 size={24} className="animate-spin text-[var(--ap-accent)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ap-mute)]">Intake &rarr; Storyboard &rarr; TTS &rarr; Render</span>
          </div>
        )}

        {videoStatus === "complete" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-video bg-black rounded-xl border border-[var(--ap-accent)] flex items-center justify-center relative z-10 group cursor-pointer overflow-hidden shadow-2xl"
          >
            {mp4Url ? (
              <video src={mp4Url} controls className="w-full h-full object-cover relative z-20" />
            ) : (
              <>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="w-14 h-14 rounded-full bg-[var(--ap-accent)] flex items-center justify-center group-hover:scale-110 transition-transform z-10 shadow-lg">
                  <Play size={22} fill="white" className="ml-1" />
                </div>
              </>
            )}
          </motion.div>
        )}
        
        {videoStatus === "complete" && (
          <a href={mp4Url || "#"} download className="w-full mt-6 ap-btn !bg-white !text-[var(--ap-ink)] justify-center relative z-10 no-underline">
            <span className="ap-btn__bg hidden"></span>
            <Download size={16} /> Download Final MP4
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [showCooldown, setShowCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).toLowerCase();
    
    // --- IDENTITY BLOCK ---
    const reservedEmails = ["cedricksantiago07@gmail.com", "dedrickdgreat27@gmail.com"];
    if (reservedEmails.includes(email)) {
      setRemainingTime(0); // No timer needed for identity block
      setShowCooldown(true);
      return;
    }
    // -----------------------

    const now = Date.now();
    const COOLDOWN_MS = 30 * 60 * 1000;
    const lastTransmission = Number(localStorage.getItem("last_transmission") || 0);

    if (now - lastTransmission < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastTransmission)) / 60000);
      setRemainingTime(remaining);
      setShowCooldown(true);
      return;
    }

    setStatus("sending");
    
    const serviceId = "service_puvgmyb";
    const templateId = "template_1pp6khl";
    const publicKey = "iW2v8Md-bZ321vmL_";

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: `${formData.get("first_name")} ${formData.get("last_name")}`,
        from_email: formData.get("email"),
        message: formData.get("message"),
      }
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.setItem("last_transmission", Date.now().toString());
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("idle");
        alert("Transmission failed. Please verify your EmailJS credentials.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Network error. Transmission aborted.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* Custom Cooldown Modal */}
      <AnimatePresence>
        {showCooldown && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCooldown(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
              
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Error.Code_429</span>
                  </div>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {remainingTime === 0 ? "Identity Reserved" : "System Lock"}
                  </h4>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {remainingTime === 0 
                    ? "This transmission address is registered to a primary administrator. Spoofing or unauthorized identity usage is prohibited by protocol."
                    : "Daily transmission frequency exceeded. The communication relay is currently recharging to prevent overflow."
                  }
                </p>

                {remainingTime > 0 && (
                  <div className="p-6 bg-zinc-950 border border-zinc-800 flex flex-col items-center gap-4">
                    <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest">Recharge_Remaining</span>
                    <span className="text-5xl font-black text-white font-mono">{remainingTime}m</span>
                  </div>
                )}

                <button 
                  onClick={() => setShowCooldown(false)}
                  className="w-full py-4 border border-zinc-700 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                >
                  Acknowledge_Error
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Anti-Spam Honeypot */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">First_Name.sys</label>
            <input
              required
              name="first_name"
              type="text"
              placeholder="Enter First Name"
              className="w-full bg-white/5 border border-zinc-800 p-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-400 transition-all duration-300 rounded-sm"
            />
          </div>
          <div className="space-y-3">
            <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Last_Name.sys</label>
            <input
              required
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
              className="w-full bg-white/5 border border-zinc-800 p-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-400 transition-all duration-300 rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Email_Address.sys</label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter Email"
            className="w-full bg-white/5 border border-zinc-800 p-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-400 transition-all duration-300 rounded-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Message_Body.sys</label>
          <textarea
            required
            name="message"
            rows={6}
            placeholder="Write a Message..."
            className="w-full bg-white/5 border border-zinc-800 p-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-400 transition-all duration-300 rounded-sm resize-none"
          />
        </div>

        <div className="space-y-4">
          <button
            disabled={status !== "idle"}
            type="submit"
            className="w-full py-6 bg-zinc-50 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.05)] active:scale-[0.98]"
          >
            {status === "idle" && (
              <>
                <Send className="w-3.5 h-3.5" />
                Send
              </>
            )}
            {status === "sending" && (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            )}
            {status === "success" && (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Transmission_Complete
              </>
            )}
          </button>

          {status === "success" && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[10px] font-mono text-green-500 uppercase tracking-[0.2em]"
            >
              [STATUS]: System locked for recharge. Next transmission window: 30m.
            </motion.p>
          )}

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="text-zinc-600 font-mono text-[8px] uppercase tracking-widest">Protocol.V4</span>
            </div>
            <span className="text-zinc-600 font-mono text-[8px] uppercase tracking-widest">System_Cooldown: 30m</span>
          </div>
        </div>
      </form>
    </div>
  );
}

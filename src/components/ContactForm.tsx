"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const today = new Date().toDateString();

    const localData = JSON.parse(localStorage.getItem("transmission_quota") || "{}");
    const userQuota = localData[email] || { count: 0, date: today };

    if (userQuota.date !== today) {
      userQuota.count = 0;
      userQuota.date = today;
    }

    if (userQuota.count >= 3) {
      alert("[QUOTA_EXCEEDED]: Daily transmission limit reached for this address.");
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
        from_email: email,
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
        userQuota.count += 1;
        localData[email] = userQuota;
        localStorage.setItem("transmission_quota", JSON.stringify(localData));

        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await response.text();
        console.error("EmailJS Error:", errorData);
        setStatus("idle");
        alert("Transmission failed. Please verify your EmailJS credentials.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("idle");
      alert("Network error. Transmission aborted.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
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
      </form>
    </div>
  );
}

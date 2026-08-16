"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Get In <span className="text-orange-500">Touch</span>
        </motion.h2>

    

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            {/* INFO BOXES */}
            <div className="space-y-6">
              <InfoBox
                icon={<Mail />}
                title="Email"
                value="shankarjangid550@gmail.com"
              />
              <InfoBox
                icon={<Phone />}
                title="Phone"
                value="+91 9310433267"
              />
              <InfoBox
                icon={<MapPin />}
                title="Location"
                value="Delhi, India"
              />
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-10">
              <p className="text-sm text-zinc-400 mb-4">
                Connect with me
              </p>
              <div className="flex gap-4">
                <SocialIcon
                  href="https://www.linkedin.com/in/shankar-07jangid/"
                  icon={<Linkedin />}
                />
                <SocialIcon
                  href="https://github.com/Shankar-0707"
                  icon={<Github />}
                />
                <SocialIcon
                  href="https://www.instagram.com/shankar_jangid_07/"
                  icon={<Instagram />}
                />
                <SocialIcon
                  href="mailto:shankarjangid550@gmail.com"
                  icon={<Mail />}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" required />
              </div>

              <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell me about your project..."
                className="contact-input resize-none"
                required
              />

              {status === "success" && (
                <p className="text-sm font-medium text-green-500 bg-green-500/10 py-2.5 px-3 rounded-xl border border-green-500/20 text-center">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              
              {status === "error" && (
                <p className="text-sm font-medium text-red-500 bg-red-500/10 py-2.5 px-3 rounded-xl border border-red-500/20 text-center">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`
                  w-full py-3 rounded-full text-white font-medium transition
                  ${status === "loading" ? "bg-orange-500/50 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(255,138,0,0.6)]"}
                `}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-white/10 pt-6 text-center text-sm text-zinc-500"
        >
          © {new Date().getFullYear()} Shankar Jangid 
        </motion.div>

      </div>
    </section>
  );
}

function InfoBox({ icon, title, value }) {
  return (
    <div className="glass-card flex items-center gap-5 p-6 hover:border-orange-500/60 transition">
      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400">{title}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      className="
        w-11 h-11 rounded-full
        border border-white/20
        flex items-center justify-center
        text-white
        transition
        hover:border-orange-500
        hover:text-orange-500
        hover:shadow-[0_0_20px_rgba(255,138,0,0.5)]
        hover:-translate-y-1
      "
    >
      {icon}
    </a>
  );
}

function Input({ placeholder, ...props }) {
  return (
    <input
      placeholder={placeholder}
      className="contact-input"
      {...props}
    />
  );
}

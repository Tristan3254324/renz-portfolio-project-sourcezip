import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { apiUrl } from '@/lib/api';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Transmission failed. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono inline-flex items-center justify-center gap-2 sm:gap-4 w-full">
            <div className="h-[1px] bg-border flex-1 max-w-[60px] sm:max-w-[100px] md:max-w-[200px]" />
            <span><span className="text-primary">08.</span> TRANSMISSION</span>
            <div className="h-[1px] bg-border flex-1 max-w-[60px] sm:max-w-[100px] md:max-w-[200px]" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-5xl mx-auto">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Establish Connection</h3>
              <p className="text-muted-foreground">Ready to optimize your operations or scale your business? Open a channel.</p>
            </div>

            <div className="space-y-6">
              <a href={`mailto:${resumeData.personal.email}`} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group">
                <div className="bg-primary/10 p-3 rounded group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={24} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground font-mono mb-1">EMAIL</div>
                  <div className="text-foreground break-all">{resumeData.personal.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="bg-primary/10 p-3 rounded">
                  <Phone className="text-primary" size={24} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground font-mono mb-1">COMMS</div>
                  <div className="text-foreground">{resumeData.personal.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="bg-primary/10 p-3 rounded">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground font-mono mb-1">COORDINATES</div>
                  <div className="text-foreground">{resumeData.personal.location}</div>
                </div>
              </div>

              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-[#0077B5]/30 hover:border-[#0077B5]/70 hover:bg-[#0077B5]/5 transition-colors group"
              >
                <div className="bg-[#0077B5]/10 p-3 rounded group-hover:bg-[#0077B5]/20 transition-colors">
                  <FaLinkedin className="text-[#0077B5]" size={24} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground font-mono mb-1">LINKEDIN</div>
                  <div className="text-foreground">linkedin.com/in/tristan00</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-6 bg-card/50 border border-primary/30 p-8 rounded-lg backdrop-blur-sm text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <div>
                  <p className="font-mono text-primary text-lg font-bold mb-2">TRANSMISSION SUCCESSFUL</p>
                  <p className="text-muted-foreground text-sm">Your message has been encrypted and delivered to Renz. Expect a response within 24–48 hours.</p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 border border-primary/40 text-primary font-mono text-sm rounded hover:bg-primary/10 transition-colors"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card/50 border border-border p-4 sm:p-8 rounded-lg backdrop-blur-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground">IDENTIFIER</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'sending'}
                      className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-sans text-foreground disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground">RETURN_ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'sending'}
                      className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-sans text-foreground disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-sans text-foreground disabled:opacity-50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground">PAYLOAD</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={status === 'sending'}
                    className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-sans text-foreground resize-none disabled:opacity-50"
                    placeholder="Enter your message..."
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 rounded bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {errorMsg || 'Transmission failed. Please try again.'}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-primary text-primary-foreground font-medium font-mono py-4 rounded hover:bg-primary/90 transition-all flex items-center justify-center gap-2 glow-box disabled:opacity-60 disabled:cursor-not-allowed"
                  data-testid="button-submit-contact"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader size={18} className="animate-spin" /> TRANSMITTING…
                    </>
                  ) : (
                    <>
                      TRANSMIT <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

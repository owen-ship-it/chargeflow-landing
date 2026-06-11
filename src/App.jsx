import { useState, useEffect, useRef } from "react";

const FEATURES = [
  { icon: "⭐", title: "Automatic review requests", desc: "Every completed installation triggers a personalised review request — sent automatically so you never have to remember to ask." },
  { icon: "📱", title: "SMS and email together", desc: "Every customer gets a review request by both SMS and email, maximising the chance they see it and respond." },
  { icon: "🔁", title: "Smart follow-up sequence", desc: "If they don't leave a review first time, a gentle follow-up fires automatically. No chasing, no awkward asking." },
  { icon: "🛑", title: "Stops when they respond", desc: "The moment a customer leaves a review or asks not to be contacted, the sequence stops immediately. Never pushy, always professional." },
  { icon: "📊", title: "Monthly results report", desc: "A simple report lands in your inbox every month showing reviews sent, reviews received, and your current Google rating." },
  { icon: "⚡", title: "Part of a complete automation suite", desc: "Google reviews are just the start. Swyft also automates lead response, appointment reminders, and more for EV charger installers." },
];

const STATS = [
  { value: "5–8", label: "New reviews per month on average" },
  { value: "30s", label: "Setup time per job for the installer" },
  { value: "0", label: "Hours of manual work required from you" },
];

const FAQS = [
  { q: "How does it know when a job is complete?", a: "After every installation, you fill in a simple 30-second form on your phone with the customer's name and contact details. That's it — Swyft handles everything else automatically." },
  { q: "What does the customer receive?", a: "A personalised SMS and email thanking them for choosing your business and asking them to leave a Google review. If they don't respond, a gentle follow-up is sent automatically." },
  { q: "Will it make us look spammy?", a: "No — the messages are warm, personalised, and branded to your business. Customers see it as great customer service, not spam. The sequence stops the moment they respond or leave a review." },
  { q: "Do I need a website?", a: "No — Swyft works independently of your website. All you need is a Google Business Profile with a review link, which most installers already have." },
  { q: "What does it cost?", a: "We're currently onboarding our first group of EV charger installers at a founding member rate. Join the waitlist to lock in early pricing." },
];

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.id]: true })); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    try {
      await fetch("https://hook.eu1.make.com/epzrvnb1ra23iqk5j7v6p3emqohomav7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phone || "", date_submitted: new Date().toISOString(), status: "New" })
      });
    } catch (err) {
      console.error("Webhook error:", err);
    }
  }

  const fadeUp = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#06080f", fontFamily: "'DM Sans', sans-serif", color: "#e8e6e0", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 2px; }
        .form-input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 13px 16px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: rgba(59,130,246,0.5); }
        .form-input::placeholder { color: rgba(255,255,255,0.3); }
        .waitlist-btn { width: 100%; background: linear-gradient(135deg, #1d4ed8, #3b82f6); border: none; border-radius: 10px; padding: 14px 24px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 20px rgba(59,130,246,0.35); margin-top: 4px; }
        .waitlist-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(59,130,246,0.5); }
        .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 24px; transition: all 0.2s; }
        .feature-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(59,130,246,0.2); transform: translateY(-2px); }
        .faq-btn { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 18px 20px; color: #e8e6e0; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
        .faq-btn:hover { background: rgba(255,255,255,0.05); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .nav-waitlist-btn { background: linear-gradient(135deg,#1d4ed8,#3b82f6); border: none; border-radius: 8px; padding: 8px 18px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; }
        .nav-link { color: rgba(232,230,224,0.5); font-size: 14px; cursor: pointer; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #e8e6e0; }
      `}</style>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 24px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", background: scrolled ? "rgba(6,8,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontSize: 10, background: "rgba(59,130,246,0.2)", color: "#60a5fa", padding: "2px 8px", borderRadius: 20, letterSpacing: "0.06em", fontWeight: 600 }}>BETA</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, color: "#fff", letterSpacing: "-0.01em" }}>Swyft</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "flex-end" }}>
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#faq">FAQ</a>
          <button className="nav-waitlist-btn" onClick={() => document.getElementById("waitlist-form").scrollIntoView({ behavior: "smooth" })}>Join Waitlist</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: "radial-gradient(circle,rgba(29,78,216,0.2) 0%,transparent 70%)", top: "10%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 70%)", bottom: "20%", right: "10%", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, width: "100%", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 32, fontSize: 13, color: "rgba(134,239,172,0.9)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
            Now accepting early access applications for EV charger installers
          </div>

          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(42px,8vw,76px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", marginBottom: 24 }}>
            More Google reviews.<br />
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>Zero extra effort.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "rgba(232,230,224,0.6)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px", fontWeight: 300 }}>
            Swyft automatically asks every EV charger installation customer for a Google review — by SMS and email — so you build your reputation on autopilot while you focus on the job.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,4vw,48px)", marginBottom: 48, flexWrap: "wrap" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(24px,4vw,36px)", color: "#60a5fa", fontWeight: 400, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(232,230,224,0.4)", marginTop: 4, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div id="waitlist-form" style={{ maxWidth: 440, margin: "0 auto" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input className="form-input" type="text" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="form-input" type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="form-input" type="tel" placeholder="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button type="submit" className="waitlist-btn">Join the Waitlist →</button>
                <div style={{ fontSize: 12, color: "rgba(232,230,224,0.3)", textAlign: "center" }}>
                  Join a growing list of EV installers getting early access · No spam, ever
                </div>
              </form>
            ) : (
              <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: "24px 32px" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 6 }}>You're on the list</div>
                <div style={{ fontSize: 14, color: "rgba(232,230,224,0.5)", lineHeight: 1.6 }}>We'll be in touch shortly with early access details.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div data-id="problem" style={{ ...fadeUp("problem"), background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 20, padding: "40px 36px" }}>
          <div style={{ fontSize: 13, color: "rgba(252,165,165,0.8)", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>THE PROBLEM</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px,4vw,38px)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>
            You do great work.<br />
            <span style={{ fontStyle: "italic", color: "#fca5a5" }}>But nobody knows it.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20 }}>
            {[
              { icon: "😬", text: "Asking customers for reviews feels awkward — so most installers never do it consistently" },
              { icon: "📉", text: "Without a steady stream of reviews your Google ranking drops and competitors get the calls" },
              { icon: "⏰", text: "By the time you remember to follow up, the customer has moved on and the moment is gone" },
              { icon: "📋", text: "You're too busy on the tools to spend time chasing reviews manually after every job" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                <span style={{ fontSize: 14, color: "rgba(232,230,224,0.6)", lineHeight: 1.6 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div data-id="feat-title" style={{ ...fadeUp("feat-title"), textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: "rgba(96,165,250,0.8)", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 12 }}>WHAT SWYFT DOES</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px,4vw,44px)", color: "#fff", lineHeight: 1.15 }}>
            Reviews on autopilot.<br />
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>You just do the installs.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {FEATURES.map((f, i) => (
            <div key={i} data-id={`feat-${i}`} style={{ ...fadeUp(`feat-${i}`, i * 0.08) }} className="feature-card">
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "rgba(232,230,224,0.5)", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto" }}>
        <div data-id="how-title" style={{ ...fadeUp("how-title"), textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: "rgba(96,165,250,0.8)", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px,4vw,44px)", color: "#fff" }}>Up and running in 48 hours</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { n: "01", title: "Join the waitlist", desc: "Tell us about your business and we'll be in touch within 24 hours to get you set up." },
            { n: "02", title: "We connect everything", desc: "We set up your review request system using your Google Business Profile link. You don't touch the technology." },
            { n: "03", title: "Fill in a 30-second form after each job", desc: "After every installation, fill in a simple form on your phone with the customer's name and contact details. That's your only job." },
            { n: "04", title: "Reviews start coming in", desc: "Swyft sends personalised review requests by SMS and email automatically. Reviews build up every month without you lifting a finger." },
          ].map((s, i) => (
            <div key={i} data-id={`step-${i}`} style={{ ...fadeUp(`step-${i}`, i * 0.1), display: "flex", gap: 24, padding: "28px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: "rgba(59,130,246,0.3)", flexShrink: 0, lineHeight: 1, width: 48 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "rgba(232,230,224,0.5)", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 24px", maxWidth: 680, margin: "0 auto" }}>
        <div data-id="faq-title" style={{ ...fadeUp("faq-title"), textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: "rgba(96,165,250,0.8)", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 12 }}>FAQ</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px,4vw,40px)", color: "#fff" }}>Common questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => (
            <div key={i} data-id={`faq-${i}`} style={fadeUp(`faq-${i}`, i * 0.05)}>
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <span style={{ color: "#60a5fa", fontSize: 18, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px 20px", fontSize: 14, color: "rgba(232,230,224,0.6)", lineHeight: 1.7 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 24px 120px", textAlign: "center" }}>
        <div data-id="cta" style={{ ...fadeUp("cta"), maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px,5vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Ready to start getting<br />
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>more reviews?</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(232,230,224,0.5)", marginBottom: 36, lineHeight: 1.6 }}>
            Join a growing list of EV charger installers getting early access to Swyft.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 440, margin: "0 auto" }}>
              <input className="form-input" type="text" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className="form-input" type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="form-input" type="tel" placeholder="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <button type="submit" className="waitlist-btn">Join Now →</button>
            </form>
          ) : (
            <div style={{ fontSize: 16, color: "#22c55e", fontWeight: 500 }}>✓ You're on the list — we'll be in touch soon.</div>
          )}
          <div style={{ marginTop: 14, fontSize: 13, color: "rgba(232,230,224,0.25)" }}>No commitment. No spam. Cancel anytime.</div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px", textAlign: "center", fontSize: 12, color: "rgba(232,230,224,0.25)" }}>
        © 2026 Swyft · Built for EV charger installers
      </div>
    </div>
  );
}

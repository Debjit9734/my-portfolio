import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "Python", level: 92 },
  { name: "FastAPI", level: 85 },
  { name: "Django / DRF", level: 88 },
  { name: "PostgreSQL", level: 82 },
  { name: "MongoDB", level: 75 },
  { name: "AWS EC2 / S3", level: 78 },
  { name: "Celery & Redis", level: 72 },
  { name: "JWT / AES Encryption", level: 80 },
  { name: "REST APIs", level: 90 },
  { name: "DSA / OOP", level: 76 },
];

const PROJECTS = [
  {
    title: "Life Vault",
    year: "2025",
    tags: ["Django", "AWS S3", "Celery", "Redis", "AES Encryption", "JWT"],
    description:
      "A secure digital vault platform for storing sensitive documents with encrypted storage and automated nominee-based access handover.",
    bullets: [
      "Inactivity detection via Celery + Redis triggers automated notifications & secure document handover",
      "AWS S3 encrypted file storage with full EC2 deployment",
      "PostgreSQL schema designed for encryption, nominee access & inactivity workflows",
    ],
    accent: "#00ffe0",
    icon: "🔐",
  },
  {
    title: "Society Service Management",
    year: "2024",
    tags: ["Django REST Framework", "PostgreSQL", "JWT", "Role-Based Auth"],
    description:
      "A housing society management system for complaint registration, service assignment, and resident communication.",
    bullets: [
      "RESTful APIs with JWT authentication for secure access control",
      "Normalized PostgreSQL DB in 3NF for residents, complaints & providers",
      "Role-based dashboards for residents, admins, and service providers",
    ],
    accent: "#ff6b35",
    icon: "🏢",
  },
];

const CERTS = [
  { title: "Deloitte Technology Job Simulation", org: "Forage" },
  { title: "Python for Beginners", org: "Simplilearn" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedBar({ level, color, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ width: "100%", background: "#1a1a2e", borderRadius: 4, height: 6, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: inView ? `${level}%` : "0%",
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        borderRadius: 4,
        transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        boxShadow: inView ? `0 0 12px ${color}66` : "none",
      }} />
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => setBig(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div style={{
      position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, pointerEvents: "none",
      transform: `translate(-50%,-50%) scale(${big ? 2.2 : 1})`,
      transition: "transform 0.2s ease",
      width: 14, height: 14,
      borderRadius: "50%",
      background: "transparent",
      border: "2px solid #00ffe0",
      mixBlendMode: "difference",
    }} />
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const accentGreen = "#00ffe0";
  const accentOrange = "#ff6b35";

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#050510",
      color: "#e0e0f0",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: #00ffe066; border-radius: 2px; }

        .nav-link {
          color: #888;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-link:hover, .nav-link.active { color: #00ffe0; border-bottom-color: #00ffe0; }

        .tag {
          display: inline-block;
          border: 1px solid #ffffff18;
          border-radius: 3px;
          padding: 3px 10px;
          font-size: 11px;
          color: #aaa;
          letter-spacing: 0.05em;
        }

        .project-card {
          border: 1px solid #ffffff10;
          border-radius: 8px;
          padding: 36px;
          background: #0a0a1a;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .project-card:hover { transform: translateY(-4px); }
        .project-card:hover::before { opacity: 1; }

        .skill-row {
          display: grid;
          grid-template-columns: 160px 1fr 40px;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
        }

        .glow-btn {
          background: transparent;
          border: 1px solid #00ffe066;
          color: #00ffe0;
          padding: 14px 36px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.1em;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .glow-btn:hover {
          background: #00ffe010;
          box-shadow: 0 0 24px #00ffe044;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 100vh;
          align-items: center;
          padding: 100px 40px 60px;
          max-width: 900px;
          margin: 0 auto;
        }

        section { max-width: 900px; margin: 0 auto; padding: 100px 40px; }

        .section-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          color: #00ffe0;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 48px;
          line-height: 1.1;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1s infinite; }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @media (max-width: 640px) {
          section { padding: 80px 24px; }
          .hero-grid { padding: 100px 24px 60px; }
          .skill-row { grid-template-columns: 120px 1fr 36px; }
          .project-card { padding: 24px; }
        }
      `}</style>

      <Cursor />

      {/* Noise overlay */}
      <div className="noise" />

      {/* Animated background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(#00ffe008 1px, transparent 1px), linear-gradient(90deg, #00ffe008 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        animation: "grid-move 8s linear infinite",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "fixed", top: "-20%", right: "-10%", width: "600px", height: "600px",
        borderRadius: "50%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(circle, #00ffe010 0%, transparent 70%)",
      }} />
      <div style={{
        position: "fixed", bottom: "10%", left: "-10%", width: "400px", height: "400px",
        borderRadius: "50%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(circle, #ff6b3510 0%, transparent 70%)",
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40 ? "#050510ee" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid #ffffff08" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "0.02em" }}>
          DD<span style={{ color: accentGreen }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map(l => (
            <span key={l} className={`nav-link${active === l ? " active" : ""}`}
              onClick={() => { setActive(l); scrollTo(l); }} data-hover>
              {l}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-grid">
          <div>
            <FadeIn delay={0}>
              <div style={{ fontSize: 12, letterSpacing: "0.3em", color: accentGreen, marginBottom: 24, textTransform: "uppercase" }}>
                ▶ Backend Engineer
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 style={{
                fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(48px, 10vw, 88px)",
                lineHeight: 1.0, color: "#fff", marginBottom: 8,
              }}>
                Debjit<br />
                <span style={{ color: "transparent", WebkitTextStroke: "1px #ffffff30" }}>Das</span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p style={{ color: "#555", fontSize: 13, letterSpacing: "0.05em", marginBottom: 40, lineHeight: 1.8, maxWidth: 480 }}>
                Final-year B.Tech CSE student @ Sanaka. Currently an R&D Engineering Intern at{" "}
                <span style={{ color: accentGreen }}>Xempla</span>, building Decision Graph Engines with{" "}
                <span style={{ color: accentOrange }}>FastAPI</span> & MongoDB.
                Based in Durgapur, targeting{" "}
                <span style={{ color: "#fff" }}>Kolkata</span>.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="glow-btn"
                  onClick={() => {
                    setActive("Contact");
                    scrollTo("Contact");
                  }}
                  data-hover
                >
                  Get in touch
                </button>
                <a href="https://www.linkedin.com/in/debjit-das-9a135b238" target="_blank" rel="noreferrer"
                  style={{ ...{}, color: "#555", border: "1px solid #ffffff12", padding: "14px 28px", borderRadius: 4, fontSize: 13, letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.borderColor = "#ffffff44"; }}
                  onMouseLeave={e => { e.target.style.color = "#555"; e.target.style.borderColor = "#ffffff12"; }}
                  data-hover>
                  LinkedIn ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Floating code block */}
          <FadeIn delay={500} style={{ marginTop: 60 }}>
            <div style={{
              background: "#0a0a1e", border: "1px solid #ffffff0e",
              borderRadius: 8, padding: "28px 32px",
              fontFamily: "DM Mono", fontSize: 13, lineHeight: 2,
              color: "#555",
              maxWidth: 480,
              animation: "float 5s ease-in-out infinite",
            }}>
              <div><span style={{ color: "#666" }}>01</span>  <span style={{ color: "#569cd6" }}>from</span> <span style={{ color: accentOrange }}>fastapi</span> <span style={{ color: "#569cd6" }}>import</span> <span style={{ color: "#dcdcaa" }}>FastAPI</span></div>
              <div><span style={{ color: "#666" }}>02</span>  </div>
              <div><span style={{ color: "#666" }}>03</span>  <span style={{ color: "#4ec9b0" }}>app</span> <span style={{ color: "#d4d4d4" }}>=</span> <span style={{ color: "#dcdcaa" }}>FastAPI</span><span style={{ color: "#d4d4d4" }}>()</span></div>
              <div><span style={{ color: "#666" }}>04</span>  </div>
              <div><span style={{ color: "#666" }}>05</span>  <span style={{ color: "#c586c0" }}>@app</span><span style={{ color: "#d4d4d4" }}>.</span><span style={{ color: "#dcdcaa" }}>get</span><span style={{ color: "#d4d4d4" }}>(</span><span style={{ color: "#ce9178" }}>"/debjit"</span><span style={{ color: "#d4d4d4" }}>)</span></div>
              <div><span style={{ color: "#666" }}>06</span>  <span style={{ color: "#569cd6" }}>def</span> <span style={{ color: "#dcdcaa" }}>get_developer</span><span style={{ color: "#d4d4d4" }}>();</span></div>
              <div><span style={{ color: "#666" }}>07</span>    <span style={{ color: "#569cd6" }}>return</span> <span style={{ color: "#d4d4d4" }}>{`{`}</span><span style={{ color: "#ce9178" }}>"status"</span><span style={{ color: "#d4d4d4" }}>:</span> <span style={{ color: "#ce9178" }}>"available"</span><span style={{ color: "#d4d4d4" }}>{`}`}</span><span className="cursor-blink" style={{ color: accentGreen }}>▌</span></div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div style={{ textAlign: "center", color: "#333", fontSize: 11, letterSpacing: "0.2em", marginBottom: 40, textTransform: "uppercase" }}>
          scroll to explore ↓
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ position: "relative", zIndex: 2 }}>
        <FadeIn>
          <div className="section-label">// 01. About</div>
          <div className="section-title">Who I Am</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <FadeIn delay={100}>
            <p style={{ color: "#888", lineHeight: 2, fontSize: 14 }}>
              I'm a backend-focused developer passionate about building scalable, secure systems. My work spans RESTful API design, cloud infrastructure, async task management, and database engineering.
            </p>
            <p style={{ color: "#888", lineHeight: 2, fontSize: 14, marginTop: 20 }}>
              At Xempla, I'm contributing to an R&D Decision Graph Engine — a complex system at the intersection of data modeling and intelligent automation. I thrive in environments where architecture decisions matter.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["CGPA", "7.57 / 10"],
                ["Graduation", "June 2026"],
                ["Location", "Durgapur → Kolkata"],
                ["Email", "debjit2145@gmail.com"],
                ["Phone", "+91-7865961244"],
                ["Languages", "English, Hindi, Bengali"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ffffff08", paddingBottom: 12 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#444", textTransform: "uppercase" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "#ccc" }}>{v}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 2 }}>
        <FadeIn>
          <div className="section-label">// 02. Skills</div>
          <div className="section-title">Technical Arsenal</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
          {SKILLS.map((s, i) => (
            <FadeIn key={s.name} delay={i * 50}>
              <div className="skill-row">
                <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.05em" }}>{s.name}</span>
                <AnimatedBar level={s.level} color={i % 3 === 0 ? accentGreen : i % 3 === 1 ? accentOrange : "#7c6af7"} delay={i * 60} />
                <span style={{ fontSize: 11, color: "#444", textAlign: "right" }}>{s.level}%</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Core subjects */}
        <FadeIn delay={300}>
          <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["DSA", "OOP", "Operating Systems", "Computer Networking", "DBMS"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ position: "relative", zIndex: 2 }}>
        <FadeIn>
          <div className="section-label">// 03. Experience</div>
          <div className="section-title">Where I've Worked</div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{
            border: "1px solid #ffffff10", borderRadius: 8,
            padding: "36px", background: "#0a0a1a",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
              background: `linear-gradient(180deg, ${accentGreen}, transparent)`,
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                  R&D Engineering Intern
                </div>
                <div style={{ color: accentGreen, fontSize: 13, letterSpacing: "0.08em" }}>Xempla</div>
              </div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", padding: "6px 14px", border: "1px solid #ffffff10", borderRadius: 20 }}>
                Feb 2026 – Present
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Working on a Decision Graph Engine as part of R&D initiatives",
                "Building backend systems with FastAPI, MongoDB, and Python",
                "Participating in architectural decisions for intelligent graph-based automation",
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 12, color: "#888", fontSize: 13, lineHeight: 1.7 }}>
                  <span style={{ color: accentGreen, marginTop: 2, flexShrink: 0 }}>→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["FastAPI", "MongoDB", "Python", "R&D"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={200}>
          <div style={{ marginTop: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", marginBottom: 24 }}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "B.Tech in Computer Science", org: "Sanaka Educational Trust's Group of Institutions", loc: "Durgapur", grade: "CGPA: 7.57", period: "2022 – 2026" },
                { title: "Higher Secondary (12th)", org: "Karkai Vivekananda Vidyapith", loc: "Pingla", grade: "90%", period: "2022" },
                { title: "Secondary (10th)", org: "Karkai Vivekananda Vidyapith", loc: "Pingla", grade: "83%", period: "2020" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 24, paddingBottom: 28, borderLeft: "1px solid #ffffff10", marginLeft: 8, paddingLeft: 28, position: "relative" }}>
                  <div style={{ position: "absolute", left: -5, top: 4, width: 10, height: 10, borderRadius: "50%", background: "#050510", border: `2px solid ${i === 0 ? accentGreen : "#333"}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: "#fff", fontWeight: 500, marginBottom: 4 }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{e.org} · {e.loc}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: accentGreen }}>{e.grade}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>{e.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position: "relative", zIndex: 2 }}>
        <FadeIn>
          <div className="section-label">// 04. Projects</div>
          <div className="section-title">Things I've Built</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 150}>
              <div className="project-card" style={{ borderColor: "#ffffff10" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = p.accent + "44"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ffffff10"}
                data-hover>
                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ fontSize: 32 }}>{p.icon}</div>
                  <span style={{ fontSize: 11, color: "#444", letterSpacing: "0.15em" }}>{p.year}</span>
                </div>
                <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>{p.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: 12, color: "#888", fontSize: 13, lineHeight: 1.6 }}>
                      <span style={{ color: p.accent, flexShrink: 0, marginTop: 2 }}>▸</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} className="tag" style={{ borderColor: p.accent + "30", color: p.accent + "cc" }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 2, paddingBottom: 120 }}>
        <FadeIn>
          <div className="section-label">// 05. Contact</div>
          <div className="section-title">Let's Connect</div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{
            border: "1px solid #ffffff10", borderRadius: 8, padding: "48px",
            background: "#0a0a1a", textAlign: "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>✉</div>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 2, marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
              I'm actively looking for backend developer roles in Kolkata and across India as a 2026 fresher. If you have an opportunity or just want to talk tech, reach out.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <a href="mailto:debjit2145@gmail.com" className="glow-btn" data-hover>
                debjit2145@gmail.com
              </a>
              <a href="tel:+917865961244" className="glow-btn" style={{ borderColor: "#ff6b3566", color: "#ff6b35" }} data-hover>
                +91-7865961244
              </a>
            </div>

            {/* Certs */}
            <div style={{ borderTop: "1px solid #ffffff08", paddingTop: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#333", textTransform: "uppercase", marginBottom: 20 }}>Certifications</div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                {CERTS.map(c => (
                  <div key={c.title} style={{ padding: "12px 24px", border: "1px solid #ffffff10", borderRadius: 6, textAlign: "left" }}>
                    <div style={{ fontSize: 13, color: "#ccc" }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 4, letterSpacing: "0.1em" }}>{c.org}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #ffffff08", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, color: "#fff" }}>
          DD<span style={{ color: accentGreen }}>.</span>
        </div>
        <div style={{ fontSize: 11, color: "#333", letterSpacing: "0.1em" }}>
          DEBJIT DAS · 2026
        </div>
      </div>
    </div>
  );
}

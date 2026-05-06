import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" }
];

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [swapSpin, setSwapSpin] = useState(false);
  const [typing, setTyping] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  // ---------- Sand particle system ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle class
    class SandParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseHue: number;
      hueShift: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8 + 0.3; // wind drift right
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.2; // slight downward
        this.baseHue = Math.random() * 40 + 25; // range 25–65 (warm desert)
        this.hueShift = Math.random() * 2 - 1; // slow hue change
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update() {
        // Wind: drag particles right and slightly down
        this.x += this.speedX;
        this.y += this.speedY;

        // Turbulence (random small perturbation)
        this.speedX += (Math.random() - 0.5) * 0.02;
        this.speedY += (Math.random() - 0.5) * 0.01;

        // Clamp speed
        this.speedX = Math.max(-1, Math.min(1, this.speedX));
        this.speedY = Math.max(-1, Math.min(1, this.speedY));

        // Wrap around screen edges (simulate infinite sandstorm)
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;

        // Slowly shift hue to create color change
        this.baseHue += this.hueShift * 0.1;
        if (this.baseHue > 65 || this.baseHue < 25) this.hueShift *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const lightness = 70 + Math.sin(Date.now() * 0.001 + this.x) * 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.baseHue}, 80%, ${lightness}%, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create 150 particles
    const particles: SandParticle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new SandParticle());
    }
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a warm desert gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f5d6b3');
      gradient.addColorStop(0.5, '#e8c8a0');
      gradient.addColorStop(1, '#d4b08c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ---------- Translation logic ----------
  const swapLanguages = () => {
    setSwapSpin(true);
    setTimeout(() => setSwapSpin(false), 400);
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(output);
    setOutput(input);
  };

  const translateText = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTyping(false);
    try {
      const response = await axios.post(
        "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        { q: input, source: sourceLang, target: targetLang },
        {
          headers: {
            "x-rapidapi-key": "b3717b74e3msh4264333bfc24c44p1e7809jsna2db0a915c11",
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
            "Content-Type": "application/json"
          }
        }
      );
      setOutput(response.data.data.translations.translatedText);
      setTyping(true);
    } catch {
      setOutput("Error: limit reached.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (output && typing) {
      const timer = setTimeout(() => setTyping(false), output.length * 50 + 500);
      return () => clearTimeout(timer);
    }
  }, [output, typing]);

  // ---------- Glassmorphism card styles ----------
  const glassCard = {
    background: 'rgba(255, 245, 230, 0.25)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 225, 200, 0.4)',
    boxShadow: '0 8px 40px rgba(120, 60, 20, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: 640,
    position: 'relative',
    zIndex: 10,
    animation: 'fadeInUp 0.8s ease-out',
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,200,150,0.2); }
          50% { box-shadow: 0 0 0 10px rgba(255,200,150,0.1); }
        }
        .glass-select {
          background: rgba(255, 245, 230, 0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,225,200,0.6);
          border-radius: 12px;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          outline: none;
          color: #5a3e2b;
          cursor: pointer;
          transition: all 0.2s;
        }
        .glass-select:hover {
          background: rgba(255,245,230,0.6);
        }
        .glass-textarea {
          background: rgba(255,245,230,0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,225,200,0.6);
          border-radius: 14px;
          padding: 1rem;
          width: 100%;
          font-size: 1.05rem;
          resize: none;
          outline: none;
          color: #5a3e2b;
          box-sizing: border-box;
          transition: all 0.3s;
        }
        .glass-textarea:focus {
          background: rgba(255,245,230,0.6);
          border-color: rgba(255,180,120,0.8);
          animation: glowPulse 1.5s infinite;
        }
        .btn-ripple {
          position: relative;
          overflow: hidden;
        }
        .btn-ripple::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          transform: translate(-50%, -50%) scale(0);
          animation: rippleEffect 0.6s ease-out;
        }
        @keyframes rippleEffect {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes swapSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes progressGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 5,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: '1rem',
      }}>
        <div style={glassCard}>
          {/* Title */}
          <div style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#5a3e2b',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            🌪️ SandTalk
          </div>

          {/* Language row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <select className="glass-select" style={{ flex: 1 }} value={sourceLang} onChange={e => setSourceLang(e.target.value)}>
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <button
              onClick={swapLanguages}
              style={{
                background: 'rgba(255,245,230,0.4)',
                border: '1px solid rgba(255,225,200,0.6)',
                borderRadius: '50%',
                width: 44,
                height: 44,
                fontSize: '1.4rem',
                color: '#7a5a3a',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                transform: swapSpin ? 'rotate(360deg)' : 'rotate(90deg)',
                animation: swapSpin ? 'swapSpin 0.4s ease' : 'none',
              }}
              title="Swap"
            >
              ⇆
            </button>
            <select className="glass-select" style={{ flex: 1 }} value={targetLang} onChange={e => setTargetLang(e.target.value)}>
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
          </div>

          {/* Textareas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <textarea className="glass-textarea" placeholder="Type text…" value={input} onChange={e => setInput(e.target.value)} style={{ height: 120 }} />
            <textarea className="glass-textarea" placeholder="Translation…" value={output} readOnly style={{ height: 120, color: '#7a5a3a' }} />
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'rgba(255,225,200,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{
              height: '100%',
              width: loading ? '100%' : '0%',
              background: 'linear-gradient(90deg, #e8b88a, #d49a6a, #c08050)',
              backgroundSize: '200% 100%',
              transition: 'width 0.3s ease',
              borderRadius: 4,
              animation: loading ? 'progressGlow 1.5s infinite linear' : 'none',
            }} />
          </div>

          {/* Translate button */}
          <button
            onClick={translateText}
            disabled={loading || !input}
            className="btn-ripple"
            style={{
              width: '100%',
              padding: '0.9rem',
              border: '1px solid rgba(255,225,200,0.6)',
              background: 'rgba(255,245,230,0.35)',
              backdropFilter: 'blur(4px)',
              borderRadius: '14px',
              color: '#5a3e2b',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: loading || !input ? 'not-allowed' : 'pointer',
              opacity: loading || !input ? 0.5 : 1,
              transition: 'background 0.2s, transform 0.1s',
              boxShadow: '0 4px 12px rgba(120,60,20,0.05)',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { if (!loading && input) { e.currentTarget.style.background = 'rgba(255,245,230,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,245,230,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            onMouseDown={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', (e.clientX - rect.left) + 'px');
              e.currentTarget.style.setProperty('--y', (e.clientY - rect.top) + 'px');
            }}
          >
            {loading ? 'Translating…' : 'Translate'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
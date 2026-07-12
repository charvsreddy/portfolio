// ============================================================
//  Homepage sections
// ============================================================

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 48, paddingBottom: 80 }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '-12% -10% auto -10%', height: 620, pointerEvents: 'none',
        background: 'radial-gradient(46% 60% at 24% 26%, rgba(233,160,120,0.20), transparent 70%), radial-gradient(42% 52% at 78% 16%, rgba(150,170,210,0.15), transparent 70%), radial-gradient(40% 50% at 60% 82%, rgba(220,150,160,0.12), transparent 72%)',
        filter: 'blur(6px)'
      }}></div>

      <div className="container" style={{ position: 'relative' }}>
        <div className="pill" style={{ marginBottom: 40, whiteSpace: 'nowrap' }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#1f8a5b' }}></span>
          Product Management and Digital Consulting
        </div>

        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.45fr 0.85fr', gap: 48, alignItems: 'end' }}>
          <div>
            <h1 className="display" style={{ fontSize: "100px" }}>Hi!<br />I'm Charvi<span style={{ color: 'var(--c40)' }}>.</span></h1>
            <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
              <a className="btn btn--primary" href="mailto:charvi_21@outlook.com">Get in touch <Icon name="arrow-right" size={17} /></a>
              <a className="btn btn--ghost" href="Projects.html">See my work</a>
            </div>
          </div>

          <div style={{ alignSelf: 'stretch' }}>
            <image-slot id="hero-image" src="images/hero.jpg" style={{ width: '100%', height: '100%', display: 'block', background: WARM_GRADIENTS[0] }}
            shape="rounded" radius="12" placeholder="Drop a portrait"></image-slot>
          </div>
        </div>
      </div>
    </section>);

}

function LogoStrip() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div style={{ paddingBottom: 40 }}>
      <div className="container" style={{ marginBottom: 22 }}>
        <p className="small" style={{ textAlign: 'center' }}>Where I've worked and what I've built</p>
      </div>
      <div className="logo-strip">
        <div className="logo-track">
          {row.map((l, i) =>
          <span className="logo-chip" key={i}>{l}</span>
          )}
        </div>
      </div>
    </div>);

}

function AboutStats() {
  return (
    <section id="about" style={{ height: "850px" }}>
      <div className="container">
        <div className="section-head">
          <div style={{ maxWidth: 560 }}>
            <div className="eyebrow" style={{ marginBottom: 16, fontSize: "18px" }}>THE KEY SKILLS I LEVERAGE</div>
            <h2 className="h2"></h2>
          </div>
          <p className="small" style={{ maxWidth: 300 }}></p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 48, alignItems: 'stretch' }}>
          <image-slot id="about-feature" src="images/about.jpg" style={{ width: '100%', minHeight: 420, display: 'block', background: WARM_GRADIENTS[2] }}
          shape="rounded" radius="12" placeholder="Drop a working photo"></image-slot>

          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 0 }}>
            <div style={{ padding: '8px 0 32px', borderBottom: '1px solid var(--light-cream)', height: "200px" }}>
              <div className="eyebrow" style={{ marginBottom: 12, fontSize: "16px" }}>MASTER PLANNER & ORGANISER</div>
              <p className="body" style={{ color: 'var(--charcoal)', maxWidth: 280, fontSize: "16px" }}>I'm obsessed with structure and clarity. I create plans, roadmaps and workflows that keep projects on track, teams aligned and deadlines met</p>
            </div>
            <div style={{ padding: '32px 0 8px', height: "200px" }}>
              <div className="eyebrow" style={{ marginBottom: 12, fontSize: "16px" }}>GENERALIST AT HEART</div>
              <p className="body" style={{ color: 'var(--charcoal)', maxWidth: 280, fontSize: "16px" }}>From the first conversation to the final outcome, I stay across the full picture. Switching between strategist, coordinator, and executor depending on what the moment needs.</p>
            </div>
          </div>
        </div>

        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 56,
          borderTop: '1px solid var(--light-cream)', borderBottom: '1px solid var(--light-cream)', padding: '40px 0' }}>
          {STATS.map((s, i) =>
          <div key={i}>
              <div className="stat-n" style={{ fontSize: 'clamp(34px,3vw,48px)' }}>{s.n}</div>
              <div className="small" style={{ marginTop: 10 }}>{s.l}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function HomePage() {
  useReveal();
  return (
    <React.Fragment>
      <Nav current="Home" />
      <Hero />
      <LogoStrip />
      <hr className="divider" />
      <AboutStats />
      <Footer />
    </React.Fragment>);

}
ReactDOM.createRoot(document.getElementById('root')).render(<HomePage />);

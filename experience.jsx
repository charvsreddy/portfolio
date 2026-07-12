// ============================================================
//  Experience page
// ============================================================

function ExpHeader() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 64 }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '-12% -10% auto -10%', height: 480, pointerEvents: 'none',
        background: 'radial-gradient(44% 56% at 28% 24%, rgba(233,160,120,0.16), transparent 70%), radial-gradient(40% 50% at 80% 18%, rgba(150,170,210,0.12), transparent 72%)',
        filter: 'blur(6px)'
      }}></div>
      <div className="container" style={{ position: 'relative' }}>
        <div className="pill" style={{ marginBottom: 32 }}><Icon name="history" size={15} /> Experience</div>
        <div className="exp-intro-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr', gap: 48, alignItems: 'end' }}>
          <h1 className="h1" style={{ maxWidth: 760 }}>Let me take you through my journey over the last 10 years. </h1>
          <p className="body-lg" style={{ maxWidth: 340 }}>

          </p>
        </div>
      </div>
    </section>);

}

function Timeline() {
  return (
    <section style={{ paddingTop: 24, paddingBottom: 40 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span className="eyebrow">Career timeline</span>
          <span style={{ flex: 1, height: 1, background: 'var(--light-cream)' }}></span>
        </div>
        <div>
          {EXPERIENCE.map((e, i) =>
          <div className="tl-row" key={i}>
              <div style={{ maxWidth: 640 }}>
                <h3 className="h3" style={{ fontSize: 24, marginBottom: 4 }}>{e.role}</h3>
                <div className="serif-ital" style={{ fontStyle: 'italic', fontSize: 17, color: 'var(--muted)', marginBottom: 12 }}>{e.tag}</div>
                <div className="small" style={{ marginBottom: 14, color: 'var(--charcoal)', fontWeight: 500 }}>{e.company}</div>
                <p className="body" style={{ maxWidth: 560, margin: 0 }}>{e.body}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
                <div className="tl-years">{e.years}</div>
                <image-slot id={'tl-img-' + i} src={['images/exp-junior.jpg','images/exp-deloitte.jpg','images/exp-qantas.jpg'][i]} style={{ display: 'block', background: WARM_GRADIENTS[i % WARM_GRADIENTS.length], width: "200px", height: "150px" }} shape="rounded" radius="10" placeholder="Drop an image"></image-slot>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function ExperiencePage() {
  useReveal();
  return (
    <React.Fragment>
      <Nav current="Experience" />
      <ExpHeader />
      <Timeline />
      <SiteCTA />
      <Footer />
    </React.Fragment>);

}
ReactDOM.createRoot(document.getElementById('root')).render(<ExperiencePage />);
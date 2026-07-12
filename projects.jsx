// ============================================================
//  Projects page — filterable grid + case-study modal
// ============================================================

function categoryOf(p){ return p.tag.split('·')[0].trim(); }

function ProjHeader() {
  return (
    <section style={{ position:'relative', overflow:'hidden', paddingTop:56, paddingBottom:56 }}>
      <div aria-hidden="true" style={{
        position:'absolute', inset:'-12% -10% auto -10%', height:480, pointerEvents:'none',
        background:'radial-gradient(44% 56% at 26% 24%, rgba(220,150,160,0.14), transparent 70%), radial-gradient(40% 50% at 78% 18%, rgba(233,160,120,0.14), transparent 72%)',
        filter:'blur(6px)'
      }}></div>
      <div className="container" style={{ position:'relative' }}>
        <div className="pill" style={{ marginBottom:32 }}><Icon name="folder-open" size={15} /> Portfolio</div>
        <div className="exp-intro-grid" style={{ display:'grid', gridTemplateColumns:'1.5fr 0.9fr', gap:48, alignItems:'end' }}>
          <h1 className="h1" style={{ maxWidth:760 }}>A look at the products I've built and the problems behind them.</h1>
          <p className="body-lg" style={{ maxWidth:340 }}>
            From a self-service bag drop rolled out across eight airports to personal passion projects. Open any one to read the problem, my role, and how it came together.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectsGrid({ onOpen }) {
  const cats = ['All', ...Array.from(new Set(PROJECTS.map(categoryOf)))];
  const [filter, setFilter] = useState('All');
  const shown = PROJECTS.filter(p=>filter==='All'||categoryOf(p)===filter);
  const idxOf = (p)=>PROJECTS.findIndex(x=>x.id===p.id);

  return (
    <section style={{ paddingTop:8 }}>
      <div className="container">
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:36 }}>
          {cats.map(c=>(
            <button key={c} className={'pill'+(filter===c?' ':'')} onClick={()=>setFilter(c)}
              style={{ cursor:'pointer',
                background: filter===c?'var(--charcoal)':'var(--cream)',
                color: filter===c?'var(--off-white)':'var(--charcoal)',
                borderColor: filter===c?'var(--charcoal)':'var(--light-cream)' }}>{c}</button>
          ))}
        </div>

        <div className="port-grid">
          {shown.map((p)=>{
            const idx = idxOf(p);
            return (
              <article key={p.id} className={'port-card'+(p.span?' span2':'')}>
                <image-slot id={'proj-'+p.id} src={{'bagdrop':'images/proj-bagdrop.jpg','pacha':'images/proj-pacha.jpg','event':'images/proj-event.jpg','datavis':'images/proj-datavis.jpg'}[p.id]} style={{ width:'100%', height:p.span?320:300, display:'block', borderRadius:0, border:'none', background:WARM_GRADIENTS[idx%WARM_GRADIENTS.length] }}
                  shape="rect" placeholder="Drop project visual"></image-slot>
                <span style={{ position:'absolute', top:16, right:16, zIndex:4, whiteSpace:'nowrap', fontSize:12, fontWeight:600, background:'var(--cream)', border:'1px solid var(--light-cream)', borderRadius:9999, padding:'5px 12px' }}>{p.metric}</span>
                <div style={{ padding:'22px 24px 24px', borderTop:'1px solid var(--light-cream)' }}>
                  <div className="small" style={{ marginBottom:8 }}>{p.tag}</div>
                  <h3 className="h3" style={{ fontSize:22, marginBottom:8 }}>{p.title}</h3>
                  <p className="small" style={{ marginBottom:18 }}>{p.summary}</p>
                  {p.inProgress ? (
                    <span className="btn btn--ghost btn--sm" style={{ cursor:'default', opacity:0.7 }}>Coming soon <Icon name="clock" size={15} /></span>
                  ) : (
                    <button className="btn btn--ghost btn--sm" onClick={()=>onOpen(p)}>Read case study <Icon name="arrow-up-right" size={15} /></button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ item, onClose }) {
  useEffect(()=>{
    if(!item) return;
    const onKey=(e)=>{ if(e.key==='Escape') onClose(); };
    document.body.style.overflow='hidden';
    window.addEventListener('keydown', onKey);
    return ()=>{ document.body.style.overflow=''; window.removeEventListener('keydown', onKey); };
  },[item]);
  if(!item) return null;
  const idx = PROJECTS.findIndex(w=>w.id===item.id);
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(28,28,28,0.34)',
         backdropFilter:'blur(3px)', display:'flex', justifyContent:'center', alignItems:'flex-start', overflowY:'auto', padding:'48px 20px' }}>
      <div onClick={(e)=>e.stopPropagation()} style={{ background:'var(--cream)', border:'1px solid var(--light-cream)',
           borderRadius:16, maxWidth:780, width:'100%', overflow:'hidden', boxShadow:'rgba(0,0,0,0.12) 0 12px 40px' }}>
        <div style={{ position:'relative', height:260, borderBottom:'1px solid var(--light-cream)' }}>
          <image-slot id={'proj-modal-'+item.id} src={{'bagdrop':'images/proj-bagdrop.jpg','pacha':'images/proj-pacha.jpg','event':'images/proj-event.jpg','datavis':'images/proj-datavis.jpg'}[item.id]} style={{ width:'100%', height:'100%', display:'block', borderRadius:0, border:'none', background:WARM_GRADIENTS[idx%WARM_GRADIENTS.length] }}
            shape="rect" placeholder="Drop a project image"></image-slot>
          <button className="icon-pill" onClick={onClose} style={{ position:'absolute', top:16, right:16, zIndex:5 }} aria-label="Close"><Icon name="x" /></button>
        </div>
        <div style={{ padding:'38px 44px 46px' }}>
          <div className="small" style={{ marginBottom:12 }}>{item.tag}</div>
          <h2 className="h2" style={{ fontSize:34, marginBottom:14 }}>{item.title}</h2>
          <div className="pill" style={{ marginBottom:32 }}><Icon name="trending-up" size={15} /> {item.metric}</div>

          <div className="eyebrow" style={{ marginBottom:10 }}>The problem</div>
          <p className="body" style={{ fontSize:17, lineHeight:1.6, marginBottom:30 }}>{item.problem}</p>

          {item.role && (
            <React.Fragment>
              <div className="eyebrow" style={{ marginBottom:10 }}>My role</div>
              <p className="body" style={{ fontSize:17, lineHeight:1.6, marginBottom:30 }}>{item.role}</p>
            </React.Fragment>
          )}

          {item.process && item.process.length>0 && (
            <React.Fragment>
              <div className="eyebrow" style={{ marginBottom:16 }}>How I approached it</div>
              <div style={{ marginBottom:34 }}>
                {item.process.map((s,i)=>(
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:18, padding:'16px 0', borderTop:'1px solid var(--light-cream)' }}>
                    <span style={{ width:30, height:30, borderRadius:9999, border:'1px solid var(--light-cream)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:600, color:'var(--muted)' }}>{i+1}</span>
                    <div>
                      <h3 className="h3" style={{ fontSize:17, marginBottom:6 }}>{s.step}</h3>
                      <p className="small">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}

          {item.outcomes && item.outcomes.length>0 && (
            <React.Fragment>
              <div className="eyebrow" style={{ marginBottom:16 }}>Outcomes</div>
              <div style={{ display:'grid', gridTemplateColumns:item.outcomes.length>1?'1fr 1fr':'1fr', gap:14, marginBottom:34 }}>
                {item.outcomes.map((o,i)=>(
                  <div key={i} className="card" style={{ padding:22 }}>
                    <h3 className="h3" style={{ fontSize:17, marginBottom:8 }}>{o.t}</h3>
                    <p className="small">{o.b}</p>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}

          <button className="btn btn--ghost btn--sm" onClick={onClose}><Icon name="arrow-left" size={15} /> Back to portfolio</button>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  useReveal();
  const [active, setActive] = useState(null);
  return (
    <React.Fragment>
      <Nav current="Projects" />
      <ProjHeader />
      <ProjectsGrid onOpen={setActive} />
      <Footer />
      <CaseStudy item={active} onClose={()=>setActive(null)} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProjectsPage />);

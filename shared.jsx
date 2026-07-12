// ============================================================
//  Charvi portfolio — shared components + content
//  Loaded on every page. Exposes Icon, Nav, Footer, SiteCTA + data.
// ============================================================
const { useEffect, useState, useRef } = React;

// --- Lucide icon (re-hydrates after each render) ---
function Icon({ name, size, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current });
  });
  return React.createElement('span', { ref, style: { display: 'inline-flex', ...(style || {}) } },
  React.createElement('i', { 'data-lucide': name, width: size || 18, height: size || 18 }));
}

// --- scroll-reveal helper ---
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {if (en.isIntersecting) {en.target.classList.add('in');io.unobserve(en.target);}});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => els.forEach((el) => el.classList.add('in')), 1400);
    return () => {io.disconnect();clearTimeout(failsafe);};
  }, []);
}

// ---------- content ----------
const WARM_GRADIENTS = [
'radial-gradient(120% 120% at 20% 10%, #f1cfb4 0%, #f5ddd2 40%, #f7f4ed 78%)',
'radial-gradient(120% 120% at 80% 20%, #e3d6b6 0%, #eee2cd 42%, #f7f4ed 80%)',
'radial-gradient(120% 120% at 30% 80%, #e6cfc9 0%, #efddd5 44%, #f7f4ed 82%)',
'radial-gradient(120% 120% at 70% 70%, #d2dcd6 0%, #e4e8df 46%, #f7f4ed 84%)',
'radial-gradient(120% 120% at 50% 30%, #ecd9c0 0%, #f2e6d6 44%, #f7f4ed 82%)',
'radial-gradient(120% 120% at 15% 60%, #ddd3c0 0%, #ebe3d3 44%, #f7f4ed 82%)'];


const NAV_LINKS = [
['Home', 'Home.html'], ['Experience', 'Experience.html'],
['Projects', 'Projects.html']];


const STATS = [
{ n: '6+ yrs', l: 'Product and Project Delivery' },
{ n: '101', l: 'Duty travel flights taken' },
{ n: '34', l: 'Half-marathons ran (too many)' }];


// real organisations Charvi has worked with
const LOGOS = ['Qantas', 'Deloitte Digital', 'Adobe', 'CSIRO', 'UNSW'];

const SERVICES = [
{ icon: 'search', title: '', body: '' },
{ icon: 'route', title: '', body: '', feature: true },
{ icon: 'plane', title: 'Operations & rollout', body: 'Shipping releases at scale — coordinating testing, vendors, and multi-site rollouts that hold up under real conditions.' },
{ icon: 'sparkles', title: '0→1 & brand building', body: 'Building things from scratch — from supplier negotiations to brand and storefront. I know what it takes to make something real.' }];


const EXPERIENCE = [
{ role: 'Junior Experience', company: 'CSIRO · Adobe · Deloitte · UNSW Digital', years: '2017 — 2021', tag: 'Where it all started',
  body: 'I learned the fundamentals of research, analysis, testing, and how good products are actually built. Internships at CSIRO, Adobe, and Deloitte grounded me in the tech, while my work at the UNSW Digital Experience team taught me structure, discipline, and how to deliver reliably.' },
{ role: 'Deloitte Digital', company: 'Technical BA · Service Designer · Functional Consultant', years: '2021 — 2023', tag: 'Consulting accelerated everything',
  body: 'I learned to solve messy problems fast, turn ambiguity into clarity, and deliver scalable solutions. I worked across multiple industries and roles. Technical BA, Service Designer, and Functional Consultant, which strengthened my versatility and product thinking.' },
{ role: 'Qantas Tech', company: 'Product & Operations', years: '2023 — Now', tag: 'A true product operator',
  body: 'I own products, lead end-to-end delivery, and work across engineering, cyber, and operations. I ship products that impact domestic and international staff, millions of customers annually, and the airport experience at scale.' }];


const PROJECTS = [
{ id: 'bagdrop', tag: 'Qantas Tech · Product', title: 'Self-Service Experience', summary: 'Replaced end-of-life bag-drop and kiosk units with a faster, vendor-built app rolled out across eight airports.', metric: '2m35s → 48s', span: true,
  problem: "Qantas' existing bag-drop and kiosk units had reached end of life, and the check-in experience was fragmented across the legacy apps and hardware causing slow transaction times, operational inefficiencies at peak times, and increased staff workload with inconsistent service quality.",
  role: 'Owned the end-to-end product development of a new self-service products with a new partner vendor with the goal of improving the operational experience for staff and customers',
  process: [
  { step: 'Plan', body: 'Analysed qualitative and quantitative data, operational constraints, and customer pain points to shape the roadmap for Releases 1–3. Prioritised features by impact and feasibility, aligned with stakeholders, and defined a clear strategy.' },
  { step: 'Design', body: 'Translated the roadmap into detailed requirements. Collaborated with designers to refine UX/UI, ran workshops to validate concepts early, and conducted usability reviews to ensure clarity, speed, and error-proofing.' },
  { step: 'Build', body: 'Partnered closely with the vendor (Elenium), developers, PM, and engineers to refine edge cases, align on technical constraints, and ensure correct implementation across scanning, weighing, and error-state flows.' },
  { step: 'Test', body: 'Coordinated testing with QA, the hardware lead, and airport operations to validate hardware–software interoperability and performance under real conditions. Ensured readiness through iterative fixes and regression testing.' },
  { step: 'Release', body: 'Managed airport rollouts across DRW, MKY, ZQN, AKL, MEL, PER, CBR, and SYD. Monitored live performance, gathered operational and customer feedback, resolved issues quickly, and drove continuous optimisation.' }],

  outcomes: [
  { t: 'Reduced transaction time', b: 'Average transaction time fell from 2 min 35 seconds to 48 seconds, along with a reduction in overall baggage errors.' },
  { t: 'Lowered staff intervention', b: 'Freed staff to focus on customers who genuinely needed assistance instead of routine bag-drop interactions.' },
  { t: 'Improved an immature vendor process', b: 'Refined the build, testing, and rollout process for a new vendor so that both teams benefit.' },
  { t: 'Built for longevity and change', b: 'Built requirements with the flexibility to support fast, inevitable changes in aviation.' }]
},


{ id: 'event', tag: 'Personal · Experience design', title: 'Event Planning', summary: 'Unapologetically extra, detail-obsessed, and done with a lot of love.', metric: 'Made with love',
  problem: "Outside of work, I'm a sucker for hosting and planning events for my nearest and dearest. It's something I've loved for as long as I can remember — there's just something about planning an event and then watching it come to life that genuinely lights me up.",
  role: 'Designing every detail end-to-end — from concept and theme down to the smallest finishing touch.',
  process: [
  { step: 'The detail', body: 'My most recent event was especially meaningful: my birthday. I leaned fully into a theme and designed every detail myself, from custom menus and handwritten place cards to linen envelopes with personal thank-you notes for each guest.' },
  { step: 'The extra mile', body: "To take it one step further (because I can't help myself), I created a custom wax seal with my initials and built a QR-code form for the table, where friends received individualised video messages, and another tool that allowed them to design a sketch that would be printed onto custom tote bags." }],

  outcomes: [
  { t: 'Why it matters', b: "It might be a little extra, but it's a fundamental part of who I am. This love of thoughtful planning, experience design, and end-to-end execution shows up everywhere — both in my work and in the things I build for the people I care about." }]
},

{ id: 'datavis', tag: 'In progress', title: 'Data Vis for Everyone', summary: 'A project still in progress — check back soon.', metric: 'Coming soon', inProgress: true,
  problem: "This one's still being written. Check back soon.",
  role: '', process: [], outcomes: [] }];


const PULL_QUOTE = 'Reducing friction for users and driving operational impact for the business.';

// ---------- Nav ----------
function Nav({ current }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);f();
    window.addEventListener('scroll', f);return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className="nav-wrap" style={{
      background: scrolled ? 'rgba(247,244,237,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--light-cream)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74 }}>
        <a href="Home.html" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
          <span style={{ width: 11, height: 11, borderRadius: 9999, background: 'var(--charcoal)' }}></span>
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.7px' }}>Charvi's Portfolio</span>
        </a>
        <nav className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {NAV_LINKS.map(([label, href]) =>
          <a key={href} href={href} className={'nav-link' + (current === label ? ' active' : '')}>{label}</a>
          )}
          <a className="btn btn--primary btn--sm" href="mailto:charvi_21@outlook.com">Get in touch</a>
        </nav>
        <button className="icon-pill mobile-toggle" style={{ display: 'none' }} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </div>
      {open &&
      <div className="container" style={{ paddingBottom: 18, display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid var(--light-cream)', paddingTop: 14 }}>
          {NAV_LINKS.map(([label, href]) =>
        <a key={href} href={href} style={{ fontSize: 18, textDecoration: 'none', padding: '8px 0', color: current === label ? 'var(--charcoal)' : 'var(--c82)' }}>{label}</a>
        )}
        </div>
      }
    </header>);

}

// ---------- shared dark CTA band ----------
function SiteCTA() {
  return (
    <section style={{ paddingBottom: 48, height: "450px", fontWeight: "400", padding: "20px 0px 49px" }}>
      <div className="container" style={{ height: "400px", padding: "25px 40px 0px" }}>
        <div className="cta-dark" style={{ padding: '72px 64px', height: "350px" }}>
          <div className="glow"></div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 620 }}>
              <div className="eyebrow" style={{ color: 'rgba(252,251,248,0.55)', marginBottom: 22 }}>WHAT CAME OUT OF THIS JOURNEY?</div>
              <h2 className="display" style={{ color: 'var(--off-white)', fontSize: 'clamp(48px,7vw,92px)', letterSpacing: '-2.5px', lineHeight: 0.95 }}>Explore my<br />projects.</h2>
            </div>
            <div style={{ maxWidth: 340 }}>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(252,251,248,0.75)', marginBottom: 26 }}>If you want to learn more about my professional and personal work in greater detail explore my projects.

              </p>
              <a className="btn btn--cream" href="Projects.html">Projects <Icon name="arrow-up-right" size={17} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Footer ----------
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--light-cream)' }}>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 40, height: "300px" }}>
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, width: "900px" }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 11, height: 11, borderRadius: 9999, background: 'var(--charcoal)' }}></span>
              <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.7px' }}>Charvi</span>
            </div>
            <p className="small" style={{ marginBottom: 18, width: "500px" }}>Random Fact: I've been a Parkrun volunteer/runner for 15 years showing up nearly every month, rain or shine, because I love running and I love community and Parkrun combines the two perfectly.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['LinkedIn', 'https://www.linkedin.com/in/charvireddy/']].map(([label, href]) =>
              <a key={label} className="pill" href={href} style={{ cursor: 'pointer', textDecoration: 'none' }}>{label}</a>
              )}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 11, alignContent: 'start' }}>
            <span className="eyebrow" style={{ marginBottom: 2 }}>Get in touch</span>
            <a className="foot-link" href="mailto:charvi_21@outlook.com">charvi_21@outlook.com</a>
            <span className="small">Sydney, Australia</span>
            <span className="small"></span>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 22, borderTop: '1px solid var(--light-cream)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span className="small">© 2026 Charvi Reddy. All rights reserved.</span>
          <span className="small">Built with AI!</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Icon, useReveal, WARM_GRADIENTS, NAV_LINKS, STATS, LOGOS, SERVICES, EXPERIENCE, PROJECTS, PULL_QUOTE, Nav, SiteCTA, Footer });

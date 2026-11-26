import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {ArrowRight, Menu, X, Target, Layers, Megaphone, Monitor, Video, TrendingUp, Users, Handshake, BarChart3, Rocket, CheckCircle2, Mail, Phone, MapPin, Play, ChevronDown, Instagram, Linkedin, Facebook} from 'lucide-react';
import './style.css';
const img={hero:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=85',meeting:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1300&q=85',consult:'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1300&q=85',strategy:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',video:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',digital:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',website:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',growth:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'};
const services=[{name:'Business Strategy & Consulting',short:'Clarity, direction, and a practical plan for your next stage of growth.',icon:Target,image:img.strategy},{name:'Video Production & Storytelling',short:'Compelling visuals that make your brand memorable.',icon:Video,image:img.video},{name:'Digital Marketing & Social Media',short:'Reach the right people with meaningful digital campaigns.',icon:Megaphone,image:img.digital},{name:'Website Development & Optimization',short:'Fast, modern websites designed to convert visitors into customers.',icon:Monitor,image:img.website},{name:'Business Growth & Performance',short:'Measure what matters and improve your results over time.',icon:TrendingUp,image:img.growth}];
function Brand({onClick}){return <a className="brand" href="#home" onClick={onClick} aria-label="One Sun Solution home"><span className="sun-arc"/><span className="brand-main">One Sun</span><span className="brand-sub">S O L U T I O N</span></a>}
const navItems = [
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'solutions', label: 'Solutions'},
  {id: 'results', label: 'Success Stories'},
  {id: 'contact', label: 'Contact'},
];

function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const headerRef = useRef(null);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const sections = navItems.map(({id}) => document.getElementById(id));
    let frame = null;

    function updateActiveSection() {
      frame = null;
      // Use the last section whose start has reached the sticky header.
      const boundary = headerRef.current.getBoundingClientRect().bottom + 2;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > boundary) break;
        current = section;
      }
      const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
      if (scrollHeight > clientHeight && scrollHeight - clientHeight - scrollTop <= 1) {
        current = sections[sections.length - 1];
      }
      setActiveId(current.id);
    }

    function scheduleUpdate() {
      if (frame === null) frame = requestAnimationFrame(updateActiveSection);
    }

    function onHashChange() {
      setOpen(false);
      scheduleUpdate();
    }

    updateActiveSection();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.querySelector('main'));
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', onHashChange);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container nav">
        <Brand onClick={closeMenu}/>
        <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'nav-links open' : 'nav-links'}>
          {navItems.map(({id, label}) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeId === id ? 'active' : undefined}
              aria-current={activeId === id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a className="btn btn-gold nav-cta" href="#contact-form" onClick={closeMenu}>
            Book a Strategy Call <ArrowRight size={17}/>
          </a>
        </nav>
        <button
          type="button"
          className="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X/> : <Menu/>}
        </button>
      </div>
    </header>
  );
}

function Footer(){return <footer className="footer"><div className="container footer-grid"><div><Brand/><p>Turning great ideas into meaningful business growth through strategy, creativity, and digital innovation.</p></div><div><h4>Explore</h4><a href="#about">About Us</a><a href="#solutions">Our Solutions</a><a href="#results">Success Stories</a><a href="#contact">Contact</a></div><div><h4>Our Services</h4>{services.slice(0,4).map(s=><a href="#solutions" key={s.name}>{s.name}</a>)}</div><div><h4>Let's connect</h4><a href="mailto:info@onesunsolution.ch">info@onesunsolution.ch</a><a href="tel:+41565551234">+41 56 555 12 34</a><span>Aargau, Switzerland</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} One Sun Solution. All rights reserved.</span><span>Built for brighter business growth.</span></div></footer>}
function Reveal({children,className=''}){return <motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55}}>{children}</motion.div>}
function SectionTitle({eyebrow,title,description}){return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
function Home(){return <><section id="home" className="hero" tabIndex={-1}><div className="hero-bg" style={{backgroundImage:`linear-gradient(90deg,rgba(2,31,24,.98) 0%,rgba(2,31,24,.92) 42%,rgba(2,31,24,.32) 100%),url('${img.hero}')`}}/><div className="container hero-inner"><Reveal><span className="hero-kicker">BUSINESS DEVELOPMENT PARTNER</span><h1>From Idea to<br/>Business <em>Growth.</em></h1><p>We help businesses build a strong brand, reach more customers, and grow sustainably — with strategy, content, digital marketing, and high-performing websites, all in one place.</p><div className="hero-actions"><a className="btn btn-gold" href="#contact-form">Get a Free Consultation <ArrowRight size={19}/></a><a className="btn btn-outline" href="#solutions"><Play size={18}/> Explore Our Solutions</a></div></Reveal><div className="growth-panel"><div className="panel-top"><span>YOUR BUSINESS GROWTH</span><TrendingUp size={20}/></div><strong>Grow with confidence.</strong><div className="chart-bars">{[24,34,44,51,63,76,92].map((n,i)=><span key={i} style={{height:`${n}%`}}/>)}</div><div className="panel-foot"><span>Strategy</span><span>Visibility</span><span>Results</span></div></div></div><div className="container hero-features">{[{icon:Target,label:'Strategy & Business Development'},{icon:Layers,label:'Branding & Positioning'},{icon:Video,label:'Content & Video Production'},{icon:Megaphone,label:'Digital Marketing & Growth'},{icon:Monitor,label:'Website Development'}].map(x=><div key={x.label}><x.icon size={29}/><span>{x.label}</span></div>)}</div></section><section className="goal-strip"><div className="container goal-content"><div className="goal-title"><TrendingUp size={45}/><h2>Our Goal:<br/>Your Business <em>Growth.</em></h2></div><div><Rocket/><span>Attract<br/>More Customers</span></div><div><BarChart3/><span>Increase<br/>Sales</span></div><div><Users/><span>Build a<br/>Stronger Brand</span></div><div><Target/><span>Grow<br/>Long-Term</span></div></div></section><section className="section"><div className="container split"><Reveal><span className="eyebrow">ABOUT ONE SUN SOLUTION</span><h2>More Than a Service Provider — <span className="green">Your Growth Partner.</span></h2><p>We are a team of strategists, creators and digital experts who help businesses turn ideas into real growth. We listen, understand your challenges and build solutions designed around your goals.</p><div className="value-grid">{[{icon:Target,text:'Focused on Your Goals'},{icon:Users,text:'Experienced Team'},{icon:BarChart3,text:'Results-Driven'},{icon:Handshake,text:'Long-Term Partnership'}].map(v=><div key={v.text}><v.icon/><strong>{v.text}</strong></div>)}</div><a className="btn btn-dark" href="#about">Get to Know Us <ArrowRight size={17}/></a></Reveal><Reveal className="image-wrap"><img src={img.meeting} alt="Team discussing a business strategy" loading="lazy"/></Reveal></div></section><section className="section cream"><div className="container"><SectionTitle eyebrow="WHAT WE DO" title={<>Everything You Need to <span className="green">Grow Your Business.</span></>} description="Connected business solutions, built to strengthen your brand, attract customers, and support long-term success."/><div className="service-grid">{services.map((s,i)=><Reveal className="service-card" key={s.name}><img src={s.image} alt="" loading="lazy"/><div className="service-overlay"><s.icon size={27}/><h3>{s.name}</h3><p>{s.short}</p></div></Reveal>)}</div><div className="center"><a className="btn btn-gold" href="#solutions">Explore All Solutions <ArrowRight size={18}/></a></div></div></section><section className="section dark-section"><div className="container split"><Reveal><span className="eyebrow gold-text">WHY CHOOSE US</span><h2>Real Solutions.<br/><span className="gold-text">Meaningful Growth.</span></h2><p>We combine creative thinking, business strategy and practical execution to help you move forward with confidence.</p><div className="check-list">{['A clear plan tailored to your business','One partner for strategy, creative and digital','Transparent communication and collaboration','Focus on measurable, sustainable progress'].map(t=><div key={t}><CheckCircle2 size={20}/>{t}</div>)}</div><a className="btn btn-gold" href="#results">Our Approach <ArrowRight size={18}/></a></Reveal><Reveal className="image-wrap"><img src={img.consult} alt="Business professionals collaborating" loading="lazy"/></Reveal></div></section><section className="section cta-section"><div className="container"><Reveal><span className="eyebrow">LET'S BUILD SOMETHING GREAT</span><h2>Ready to Grow Your Business?</h2><p>Tell us what you're working toward. We'll help you find the next step.</p><a className="btn btn-gold" href="#contact-form">Book a Free Consultation <ArrowRight size={18}/></a></Reveal></div></section></>}
function PageHero({id,eyebrow,title,description}){return <section id={id} className="page-hero" tabIndex={-1}><div className="container"><span className="eyebrow gold-text">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div></section>}
function About(){return <><PageHero id="about" eyebrow="ABOUT US" title="Your Partner in Business Growth" description="A collaborative team that connects strategic thinking, creative storytelling and digital execution."/><section className="section"><div className="container split"><Reveal><span className="eyebrow">WHO WE ARE</span><h2>More Than a Service Provider — <span className="green">Your Growth Partner.</span></h2><p>We help businesses turn ideas into real growth. Our approach starts with listening: understanding your ambitions, your customers, and the challenges standing in your way.</p><p>Then we bring the right blend of strategy, content, marketing and technology together to create practical, purposeful solutions.</p><div className="value-grid">{[{icon:Target,text:'Focused on Your Goals'},{icon:Users,text:'Collaborative Team'},{icon:BarChart3,text:'Results-Driven'},{icon:Handshake,text:'Long-Term Partnership'}].map(v=><div key={v.text}><v.icon/><strong>{v.text}</strong></div>)}</div></Reveal><Reveal className="image-wrap"><img src={img.meeting} alt="Colleagues working together"/></Reveal></div></section><section className="section cream"><div className="container"><SectionTitle eyebrow="OUR PHILOSOPHY" title="Built Around Your Ambition"/><div className="three-grid">{[{icon:Target,title:'Understand',text:'We learn about your business, goals and audience before recommending a direction.'},{icon:Layers,title:'Create',text:'We connect smart strategy with clear messaging and thoughtful creative execution.'},{icon:TrendingUp,title:'Grow',text:'We review performance, learn what works and keep improving.'}].map(s=><div className="info-card" key={s.title}><s.icon/><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></div></section></>}
function Solutions(){return <><PageHero id="solutions" eyebrow="OUR SOLUTIONS" title="Everything You Need to Grow" description="Practical, connected services to build your brand, strengthen your digital presence and reach more customers."/><section className="section"><div className="container detailed-services">{services.map((s,i)=><Reveal className={`service-detail ${i%2?'reverse':''}`} key={s.name}><img src={s.image} alt={s.name}/><div><span className="eyebrow">SOLUTION 0{i+1}</span><s.icon className="detail-icon" size={33}/><h2>{s.name}</h2><p>{s.short} We tailor every project to your goals, audience and business priorities.</p><a className="btn btn-dark" href="#contact-form">Discuss This Service <ArrowRight size={17}/></a></div></Reveal>)}</div></section></>}
function Stories(){return <><PageHero id="results" eyebrow="SUCCESS STORIES" title="Real Solutions. Meaningful Progress." description="Our approach is built around business outcomes, strong partnerships and measurable improvement."/><section className="section"><div className="container"><SectionTitle eyebrow="OUR APPROACH TO RESULTS" title="Progress You Can Understand" description="We define goals together, agree on relevant metrics, and review performance to guide better decisions."/><div className="three-grid">{[{icon:Users,title:'Brand Visibility',text:'Reach the audiences that matter and build stronger recognition.'},{icon:Megaphone,title:'Customer Engagement',text:'Create experiences and campaigns that encourage real conversations.'},{icon:TrendingUp,title:'Business Growth',text:'Track meaningful indicators and refine the strategy over time.'}].map(x=><div className="info-card" key={x.title}><x.icon/><h3>{x.title}</h3><p>{x.text}</p></div>)}</div><div className="case-note"><h3>Client case studies coming soon</h3><p>Verified testimonials and performance metrics will appear here once approved for publication. No sample figures are presented as real results.</p><a className="btn btn-gold" href="#contact-form">Discuss Your Goals <ArrowRight size={18}/></a></div></div></section></>}
function Contact(){const [status,setStatus]=useState('');const [form,setForm]=useState({name:'',business:'',email:'',phone:'',message:'',interests:[]});function update(e){setForm(f=>({...f,[e.target.name]:e.target.value}))}function submit(e){e.preventDefault();setStatus('Your email app will open with your inquiry ready to send. Please send the email to complete your request.');const subject=encodeURIComponent(`Business inquiry from ${form.name}`);const body=encodeURIComponent(`Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterested in: ${form.interests.join(', ')}\n\nMessage:\n${form.message}`);window.location.href=`mailto:info@onesunsolution.ch?subject=${subject}&body=${body}`;}return <><PageHero id="contact" eyebrow="GET IN TOUCH" title="Let's Talk About Your Business Goals" description="Every business has unique opportunities and challenges. Let's explore the right solutions for yours."/><section className="section"><div className="container contact-grid"><Reveal><span className="eyebrow">CONTACT INFORMATION</span><h2>Let's Start a <span className="green">Conversation.</span></h2><p>Share a few details about your project. We're ready to listen and help you plan the next step.</p><div className="contact-info"><a href="tel:+41565551234"><Phone/> +41 56 555 12 34</a><a href="mailto:info@onesunsolution.ch"><Mail/> info@onesunsolution.ch</a><div><MapPin/> Aargau, Switzerland</div></div><img className="contact-image" src={img.consult} alt="Business consultation"/></Reveal><div id="contact-form" tabIndex={-1}><Reveal><form className="contact-form" onSubmit={submit}><h3>Tell Us About Your Project</h3><p>Complete the details below to prepare your inquiry.</p><div className="form-grid"><label>Full Name *<input name="name" value={form.name} onChange={update} required placeholder="Your full name"/></label><label>Business Name<input name="business" value={form.business} onChange={update} placeholder="Your company"/></label><label>Email Address *<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com"/></label><label>Phone Number<input name="phone" value={form.phone} onChange={update} placeholder="+41 ..."/></label></div><fieldset><legend>I'm interested in:</legend><div className="checkbox-grid">{services.map(s=><label key={s.name}><input type="checkbox" checked={form.interests.includes(s.name)} onChange={e=>setForm(f=>({...f,interests:e.target.checked?[...f.interests,s.name]:f.interests.filter(x=>x!==s.name)}))}/>{s.name}</label>)}</div></fieldset><label>Your Message *<textarea name="message" value={form.message} onChange={update} required rows="5" placeholder="Tell us about your goals, challenges or project details..."/></label><button className="btn btn-gold" type="submit">Prepare Email <ArrowRight size={18}/></button>{status&&<p className="form-status" role="status">{status}</p>}<small>Submitting opens your email app. A backend is required for direct form delivery.</small></form></Reveal></div></div></section></>}
function App() {
  useLayoutEffect(() => {
    // A direct fragment URL can be parsed before React has mounted its target.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({behavior: 'instant'});
  }, []);

  return (
    <>
      <Header/>
      <main>
        <Home/>
        <About/>
        <Solutions/>
        <Stories/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App/>);

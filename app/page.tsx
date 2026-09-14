'use client'

import dynamic from 'next/dynamic'
import { ArrowUpRight, Check, CircleDot, LockKeyhole, Orbit, PlugZap, ShieldCheck, Sparkles, Workflow } from 'lucide-react'

const AgentScene = dynamic(()=>import('@/components/AgentScene'),{ssr:false})

const workers = [
  ['INBOX WORKER','Reads, sorts, drafts, follows up and keeps the important things from vanishing.'],
  ['SALES WORKER','Researches prospects, prepares outreach, tracks replies and nudges the pipeline forward.'],
  ['EXECUTIVE WORKER','Prepares meetings, watches calendars, gathers context and keeps a running brief.'],
  ['CUSTOM WORKER','We map the repetitive parts of your actual job and build around those, not a template.']
]

const stack = [
  ['01','Isolated','Your agent gets its own gateway, storage and credentials. No shared customer brain.'],
  ['02','Connected','You choose the accounts it may use. Gmail, Drive, calendar, CRM, Shopify and more.'],
  ['03','Guarded','The AI can decide what to do. Deterministic rules decide what it is allowed to do.'],
  ['04','Managed','We watch health, logs, automations and broken connections so you do not become its IT department.']
]

function Reveal({children,delay=0}:{children:React.ReactNode,delay?:number}){
  return <div className="reveal" style={{animationDelay:`${delay}s`}}>{children}</div>
}

export default function Home(){
  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top"><span className="mark">C</span>CLAWHOUSE</a>
      <div className="nav-links"><a href="#workers">Workers</a><a href="#how">How it works</a><a href="#pricing">Pricing</a></div>
      <a className="nav-cta" href="mailto:hello@studiobeasophia.com?subject=Build%20my%20AI%20worker">Build mine <ArrowUpRight size={15}/></a>
    </nav>

    <section id="top" className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><CircleDot size={13}/> PRIVATE AI, ACTUALLY WORKING</div>
          <h1>Your quietest<br/>employee <em>never</em><br/>clocks off.</h1>
          <p className="lede">We install a private AI worker around the way your business already works. It reads, researches, organises, follows up and keeps going after you close the laptop.</p>
          <div className="hero-actions">
            <a className="button primary" href="mailto:hello@studiobeasophia.com?subject=Build%20my%20AI%20worker">Build my worker <ArrowUpRight size={17}/></a>
            <a className="text-link" href="#how">See the system ↓</a>
          </div>
          <div className="proofline"><span><ShieldCheck size={15}/> isolated per customer</span><span><LockKeyhole size={15}/> you own the credentials</span><span><Orbit size={15}/> runs continuously</span></div>
        </div>
        <div className="hero-visual"><AgentScene/><div className="visual-caption"><span>AGENT STATUS</span><b>ONLINE</b></div></div>
      </div>
    </section>

    <section className="marquee" aria-label="capabilities"><div>GMAIL <i>✦</i> CALENDAR <i>✦</i> RESEARCH <i>✦</i> SALES <i>✦</i> DRIVE <i>✦</i> CRM <i>✦</i> SHOPIFY <i>✦</i> YOUR WORKFLOW <i>✦</i></div></section>

    <section id="workers" className="section shell">
      <Reveal><div className="section-head"><p className="kicker">NOT A CHATBOT</p><h2>Give it a job,<br/>not a conversation.</h2><p>Most AI waits for you to ask a question. Yours gets standing orders, scheduled work, tools and a memory of what it is responsible for.</p></div></Reveal>
      <div className="worker-grid">
        {workers.map((w,i)=><Reveal key={w[0]} delay={i*.06}><article className="worker-card"><span>0{i+1}</span><div className="worker-icon">{i===0?<Sparkles/>:i===1?<Workflow/>:i===2?<PlugZap/>:<Orbit/>}</div><h3>{w[0]}</h3><p>{w[1]}</p><div className="card-rule"/></article></Reveal>)}
      </div>
    </section>

    <section id="how" className="section dark-band">
      <div className="shell">
        <Reveal><div className="section-head light"><p className="kicker">THE PRIVATE CONTROL PLANE</p><h2>One business.<br/>One isolated brain.</h2><p>Every customer gets their own agent boundary. We never build a giant shared machine with everybody’s keys rattling around inside it.</p></div></Reveal>
        <div className="architecture">
          <div className="arch-core"><span>YOUR<br/>BUSINESS</span></div>
          <div className="arch-line"/>
          <div className="arch-gateway"><span>PRIVATE GATEWAY</span><b>24 / 7</b></div>
          <div className="arch-line"/>
          <div className="arch-tools"><span>TOOLS</span><span>RULES</span><span>MEMORY</span><span>JOBS</span></div>
        </div>
        <div className="stack-grid">{stack.map(([n,t,d])=><div className="stack-item" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>

    <section className="section shell outcome">
      <Reveal><p className="giant-quote">“Tell us the repetitive parts of your job. <span>We build the employee.</span>”</p></Reveal>
      <div className="outcome-grid">
        <div><p className="metric">24/7</p><p>standing automations can keep moving while your laptop is shut</p></div>
        <div><p className="metric">1:1</p><p>isolated customer environments rather than a shared agent free-for-all</p></div>
        <div><p className="metric">BYOK</p><p>bring your own model key, or start with free-tier model routing where appropriate</p></div>
      </div>
    </section>

    <section id="pricing" className="section pricing shell">
      <Reveal><div className="section-head"><p className="kicker">START SMALL</p><h2>Less software.<br/>More finished work.</h2></div></Reveal>
      <div className="price-grid">
        <article className="price-card"><p className="plan">SOLO</p><h3>£99 <small>setup</small></h3><p className="monthly">from £39 / month</p><ul><li><Check/>one private worker</li><li><Check/>core integrations</li><li><Check/>managed updates</li><li><Check/>health monitoring</li></ul><a href="mailto:hello@studiobeasophia.com?subject=Solo%20AI%20worker">Start with Solo <ArrowUpRight size={16}/></a></article>
        <article className="price-card featured"><div className="popular">BEST PLACE TO BEGIN</div><p className="plan">SMALL BUSINESS</p><h3>£300 <small>setup</small></h3><p className="monthly">from £149 / month</p><ul><li><Check/>private managed gateway</li><li><Check/>multiple workflows</li><li><Check/>custom standing orders</li><li><Check/>priority maintenance</li></ul><a href="mailto:hello@studiobeasophia.com?subject=Small%20business%20AI%20worker">Build my worker <ArrowUpRight size={16}/></a></article>
        <article className="price-card"><p className="plan">CUSTOM EMPLOYEE</p><h3>£750+ <small>setup</small></h3><p className="monthly">from £250 / month</p><ul><li><Check/>workflow mapping</li><li><Check/>bespoke tools</li><li><Check/>advanced guardrails</li><li><Check/>ongoing optimisation</li></ul><a href="mailto:hello@studiobeasophia.com?subject=Custom%20AI%20employee">Scope the job <ArrowUpRight size={16}/></a></article>
      </div>
      <p className="pricing-note">Pilot pricing. Model/API usage or paid third-party services are separate where required.</p>
    </section>

    <footer className="footer"><div className="shell"><div><div className="brand invert"><span className="mark">C</span>CLAWHOUSE</div><h2>What would you<br/>stop doing tomorrow?</h2></div><div className="footer-right"><p>Tell us the dull, repetitive, easy-to-forget work. We’ll tell you what can be handed over.</p><a className="button acid" href="mailto:hello@studiobeasophia.com?subject=Build%20my%20AI%20worker">BUILD MY WORKER <ArrowUpRight size={17}/></a><small>A Studio Bea Sophia experiment in useful AI.</small></div></div></footer>
  </main>
}

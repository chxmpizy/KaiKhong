"use client";

import { FormEvent, useCallback, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Crosshair,
  FileText,
  Handshake,
  Lightbulb,
  Menu,
  Megaphone,
  Package,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { TurnstileWidget } from "@/components/security/turnstile-widget";
import { trackEvent } from "@/lib/posthog/client";

const departments = [
  {
    name: "Product",
    Icon: Package,
    tone: "product",
    description: "ช่วยคุณค้นหาโอกาส พัฒนา Product และเข้าใจลูกค้ามากขึ้น",
    tasks: ["Customer research", "Product research", "Competitor analysis", "Product ideas"],
  },
  {
    name: "Marketing",
    Icon: Megaphone,
    tone: "marketing",
    description: "ช่วยวางแผนและค้นหาโอกาสในการเติบโตของธุรกิจ",
    tasks: ["Marketing strategy", "Content", "SEO & GEO", "Brand messaging"],
  },
  {
    name: "Sales",
    Icon: Handshake,
    tone: "sales",
    description: "ช่วยคุณค้นหาและเข้าถึงลูกค้าที่มีโอกาสซื้อ",
    tasks: ["Customer research", "Lead discovery", "Sales opportunities", "Outreach support"],
  },
];

const faqs = [
  ["KaiKhong.ai เหมาะกับใคร?", "สำหรับเจ้าของธุรกิจเล็ก, solo founder, freelancer และคนที่กำลังสร้างธุรกิจโดยยังไม่มีทีมประจำครบทุกด้าน."],
  ["KaiKhong.ai ใช้งานได้แล้วหรือยัง?", "ตอนนี้เรากำลังสร้าง KaiKhong.ai อยู่ ผู้ที่อยู่ใน waitlist จะเป็นกลุ่มแรกที่ได้รับข่าวสารและโอกาสทดลองใช้ early access."],
  ["นี่คือ AI chatbot อีกตัวหรือเปล่า?", "ไม่ใช่ เรากำลังออกแบบ KaiKhong ให้เป็น workspace ที่ช่วยให้ Product, Marketing และ Sales ทำงานจากบริบทธุรกิจเดียวกัน ไม่ใช่แค่ตอบคำถามทีละครั้ง."],
  ["ทีม AI จะช่วยเรื่องอะไรได้บ้าง?", "ตั้งแต่การค้นหาปัญหาลูกค้าและคู่แข่ง ไปจนถึงไอเดีย content, โอกาสทางการตลาด, customer segment และสิ่งที่ควรทำต่อไป."],
  ["Early access จะเปิดเมื่อไหร่?", "เราจะอัปเดตผู้ที่อยู่ใน waitlist ก่อนทันทีที่รอบ early access พร้อมเปิดให้ทดลองใช้."],
];

function Logo() {
  return (
    <a href="#top" className="brand" aria-label="KaiKhong.ai home">
      <span className="brand-mark"><span /></span>
      <span>KaiKhong<span>.ai</span></span>
    </a>
  );
}

function SectionIntro({ eyebrow, title, copy, centered = true }: { eyebrow: string; title: React.ReactNode; copy?: string; centered?: boolean }) {
  return (
    <div className={`section-intro ${centered ? "centered" : ""}`}>
      <p className="eyebrow"><Sparkles size={14} /> {eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function DepartmentDots() {
  return <div className="avatar-stack"><span className="avatar product-dot"><Package size={13} /></span><span className="avatar marketing-dot"><Megaphone size={13} /></span><span className="avatar sales-dot"><Handshake size={13} /></span></div>;
}

function TeamPreview() {
  return (
    <div className="team-preview" aria-label="Preview of KaiKhong AI Team workspace">
      <div className="preview-topbar"><div className="topbar-brand"><span className="brand-mark mini"><span /></span> KaiKhong</div><span className="live-chip"><i /> Live workspace</span></div>
      <div className="preview-layout">
        <aside className="preview-side">
          <span className="side-label">WORKSPACE</span>
          <span className="side-active"><CircleDot size={14} /> Overview</span>
          <span><Package size={14} /> Product</span><span><Megaphone size={14} /> Marketing</span><span><Handshake size={14} /> Sales</span>
          <div className="side-bottom"><span className="side-label">TEAM</span><DepartmentDots /><small>3 agents active</small></div>
        </aside>
        <div className="preview-main">
          <div className="preview-heading"><div><p>Friday, 03 Oct</p><h3>Your AI team is at work.</h3></div><button className="mock-button">View tasks <ArrowRight size={14} /></button></div>
          <div className="agent-grid">
            <AgentCard type="Product" detail="Researching customer problems" status="Working" Icon={Package} />
            <AgentCard type="Marketing" detail="Finding content opportunities" status="Working" Icon={Megaphone} />
            <AgentCard type="Sales" detail="Mapping customer segments" status="Ready" Icon={Handshake} />
          </div>
          <div className="activity-card"><div className="activity-head"><span>Recent activity</span><span>Today</span></div>
            <Activity icon={<Search size={14} />} text="Competitor research completed" time="Just now" />
            <Activity icon={<Lightbulb size={14} />} text="3 product opportunities found" time="12m ago" />
            <Activity icon={<FileText size={14} />} text="Marketing ideas generated" time="28m ago" />
          </div>
        </div>
      </div>
      <div className="floating-insight"><span className="insight-icon"><Sparkles size={15} /></span><div><small>New insight</small><strong>Customer pain point identified</strong></div><Check size={16} /></div>
    </div>
  );
}

function AgentCard({ type, detail, status, Icon }: { type: string; detail: string; status: string; Icon: typeof Package }) {
  const className = type.toLowerCase();
  return <div className={`agent-card ${className}`}><div className="agent-card-top"><span className="agent-icon"><Icon size={16} /></span><span className={`status ${status === "Working" ? "working" : "ready"}`}><i /> {status}</span></div><strong>{type}</strong><p>{detail}</p><div className="agent-progress"><span /></div></div>;
}

function Activity({ icon, text, time }: { icon: React.ReactNode; text: string; time: string }) {
  return <div className="activity"><span className="activity-icon">{icon}</span><span>{text}</span><small>{time}</small></div>;
}

function Dashboard() {
  return <div className="dashboard-shell" aria-label="KaiKhong dashboard mockup">
    <aside className="dash-sidebar"><Logo /><nav><span className="dash-nav active"><CircleDot size={16} /> Overview</span><span className="dash-nav"><Package size={16} /> Product</span><span className="dash-nav"><Megaphone size={16} /> Marketing</span><span className="dash-nav"><Handshake size={16} /> Sales</span><span className="dash-nav"><Check size={16} /> Tasks</span><span className="dash-nav"><Lightbulb size={16} /> Insights</span></nav><div className="team-online"><DepartmentDots /><span><b>AI team</b><small>3 members online</small></span></div></aside>
    <div className="dash-content"><header><div><p>Friday, 03 October</p><h3>Good morning <span>👋</span></h3></div><div className="dash-status"><i /> Your team is working</div></header>
      <p className="dash-subtitle">นี่คือสิ่งที่ทีม AI ของคุณพบสำหรับธุรกิจในวันนี้</p>
      <div className="opportunity-grid"><Opportunity number="03" label="Product opportunities" icon={<Package size={19} />} color="green" /><Opportunity number="05" label="Marketing opportunities" icon={<Megaphone size={19} />} color="blue" /><Opportunity number="08" label="Sales segments" icon={<Crosshair size={19} />} color="orange" /></div>
      <div className="dash-lower"><section className="priority-list"><div className="dash-section-head"><h4>Priority for you</h4><button>See all</button></div><div className="priority-row"><span className="priority-num">01</span><div><b>Review customer pain point</b><small>Product agent found a recurring issue</small></div><span className="review-pill">Ready to review</span></div><div className="priority-row"><span className="priority-num">02</span><div><b>Choose this week&apos;s content topic</b><small>Marketing agent prepared 5 options</small></div><span className="review-pill">Ready to review</span></div></section>
        <section className="mini-feed"><div className="dash-section-head"><h4>Team activity</h4><span className="pulse-dot" /></div><Activity icon={<Megaphone size={14} />} text="Found 5 content opportunities" time="8m" /><Activity icon={<Package size={14} />} text="New customer signal" time="21m" /><Activity icon={<Handshake size={14} />} text="Mapped 8 segments" time="35m" /></section></div>
    </div>
  </div>;
}

function Opportunity({ number, label, icon, color }: { number: string; label: string; icon: React.ReactNode; color: string }) {
  return <article className={`opportunity ${color}`}><span className="opportunity-icon">{icon}</span><strong>{number}</strong><p>{label}</p><span className="tiny-arrow">View <ArrowRight size={12} /></span></article>;
}

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), business_type: form.get("businessType"), pain_point: form.get("helpWith"), source: "landing_page", turnstile_token: turnstileToken }) });
    if (response.ok) { trackEvent("waitlist_signup_success"); setSubmitted(true); } else { const data = await response.json(); trackEvent("waitlist_signup_failed"); setError(data.error?.message || "Something went wrong. Please try again."); }
    setSubmitting(false);
  }

  if (submitted) return <div className="form-success" role="status"><span className="success-mark"><Check size={30} /></span><h3>You&apos;re on the list 🎉</h3><p>ขอบคุณที่ร่วมสร้าง KaiKhong.ai<br />เราจะแจ้งให้คุณทราบเมื่อ early access พร้อมแล้ว</p></div>;
  return <form className="waitlist-form" onSubmit={submit} onFocus={() => trackEvent("waitlist_form_started")}><label>อีเมล<input required type="email" name="email" placeholder="you@business.com" /></label><label>ประเภทธุรกิจ<input name="businessType" placeholder="เช่น ร้านค้าออนไลน์, Agency, Freelancer" /></label><label>อยากให้ KaiKhong ช่วยธุรกิจของคุณเรื่องอะไร?<textarea name="helpWith" rows={3} placeholder="เล่าให้เราฟังสั้นๆ ได้เลย" /></label><TurnstileWidget onToken={onTurnstileToken} />{error && <p className="form-error">{error}</p>}<button className="button button-primary form-submit" disabled={submitting}>{submitting ? "Joining..." : <>Join the Waitlist <ArrowRight size={17} /></>}</button><p className="form-note">No spam. We&apos;ll only contact you about KaiKhong.ai and early access.</p></form>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <main id="top">
    <nav className="site-nav"><Logo /><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#product" onClick={() => setMenuOpen(false)}>Product</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#why" onClick={() => setMenuOpen(false)}>Why KaiKhong</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a className="mobile-wait" href="#waitlist" onClick={() => { trackEvent("hero_cta_clicked", { location: "mobile_navigation" }); setMenuOpen(false); }}>Join Waitlist <ArrowRight size={15} /></a></div><a className="button button-primary nav-cta" href="#waitlist" onClick={() => trackEvent("hero_cta_clicked", { location: "navigation" })}>Join Waitlist <ArrowRight size={15} /></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></nav>

    <section className="hero"><div className="hero-glow glow-one" /><div className="hero-glow glow-two" /><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> AI Business Team for Small Businesses</p><h1>ไม่ต้องทำธุรกิจ<br /><em>ทุกอย่างคนเดียว</em>อีกต่อไป</h1><p className="hero-description">เรากำลังสร้างทีม AI ที่ช่วยคุณดูแล <b>Product, Marketing และ Sales</b> — เพื่อให้เจ้าของธุรกิจมีเวลาไปโฟกัสกับสิ่งที่สำคัญจริงๆ</p><div className="hero-actions"><a className="button button-primary button-large" href="#waitlist" onClick={() => trackEvent("hero_cta_clicked", { location: "hero" })}>Join the Waitlist <ArrowRight size={18} /></a><a className="text-link" href="#how-it-works">ดูวิธีการทำงาน <span>↓</span></a></div><p className="status-line"><i /> Currently building <span /> Early access coming soon</p></div><div className="hero-visual"><TeamPreview /></div></section>

    <section className="problem-section"><SectionIntro eyebrow="THE REALITY OF RUNNING A SMALL BUSINESS" title={<>คุณไม่ได้ไม่มีไอเดีย<br /><span>คุณแค่ไม่มีคนช่วยทำ</span></>} copy="หลายสิ่งที่สำคัญต่อการเติบโตยังรอให้คุณจัดการอยู่ — ในขณะที่คุณต้องดูแลธุรกิจทุกวัน" />
      <div className="problem-grid"><article><span className="problem-num">01</span><h3>ต้องทำทุกอย่างเอง</h3><p>Product, Marketing, Sales, Research — สุดท้ายเจ้าของต้องลงมือเองแทบทุกอย่าง</p></article><article><span className="problem-num">02</span><h3>AI มีเยอะเกินไป</h3><p>มีเครื่องมือ AI เต็มไปหมด แต่คุณยังต้องคอยสั่งงานและเชื่อมทุกอย่างเข้าด้วยกัน</p></article><article><span className="problem-num">03</span><h3>ทีมเต็มรูปแบบแพงเกินไป</h3><p>ธุรกิจเล็กอาจยังไม่พร้อมจ้าง Product, Marketing และ Sales แบบเต็มทีม</p></article><article><span className="problem-num">04</span><h3>รู้ว่าควรทำอะไร แต่ไม่มีเวลา</h3><p>ทุกวันมีงานด่วนเข้ามา จนสิ่งที่ช่วยให้ธุรกิจโตถูกเลื่อนไปก่อนเสมอ</p></article></div>
    </section>

    <section className="team-section" id="product"><SectionIntro eyebrow="MEET KAIKHONG" title={<>Meet Your <span>AI Business Team</span></>} copy="KaiKhong.ai กำลังสร้างทีม AI ที่ไม่ได้มีไว้แค่ตอบคำถาม แต่ถูกออกแบบมาเพื่อช่วยคุณทำงานของธุรกิจ" />
      <div className="department-grid">{departments.map(({ name, Icon, tone, description, tasks }) => <article className={`department-card ${tone}`} key={name}><div className="department-head"><span className="department-icon"><Icon size={23} /></span><span className="agent-label"><i /> AI AGENT</span></div><h3>{name}</h3><p>{description}</p><ul>{tasks.map((task) => <li key={task}><Check size={14} /> {task}</li>)}</ul><span className="department-footer">Part of your AI Business Team <ArrowRight size={14} /></span></article>)}</div>
    </section>

    <section className="difference-section"><div className="difference-copy"><p className="eyebrow"><Sparkles size={14} /> THE DIFFERENCE</p><h2>ไม่ใช่แค่ AI<br /><span>หลายตัวมารวมกัน</span></h2><p>สิ่งที่เรากำลังสร้าง คือทีมที่ทำงานจาก <b>บริบทธุรกิจเดียวกัน</b> รู้ว่าอะไรสำคัญก่อน และส่งต่อสิ่งที่ค้นพบให้กันได้</p><div className="context-note"><span><Lightbulb size={19} /></span><p><b>One business context</b><br />ทุกทีมเห็นภาพเดียวกันของธุรกิจคุณ</p></div></div>
      <div className="flow-comparison"><div className="flow-card old-flow"><span className="flow-label">GENERIC AI</span><div className="flow-step"><span>You</span><i>↓</i></div><div className="flow-step"><span>Ask AI</span><i>↓</i></div><div className="flow-step"><span>Get answer</span><i>↓</i></div><div className="flow-step dim"><span>You figure out what&apos;s next</span></div></div><div className="flow-card new-flow"><span className="flow-label">KAIKHONG.AI</span><div className="new-flow-start">Your business</div><i className="flow-arrow">↓</i><div className="business-context"><Search size={15} /> Business context</div><i className="flow-arrow">↓</i><div className="flow-team"><span><Package size={15} /> Product</span><span><Megaphone size={15} /> Marketing</span><span><Handshake size={15} /> Sales</span></div><i className="flow-arrow">↓</i><div className="flow-result"><Check size={15} /> Tasks & recommendations</div><div className="review-note">You review & take action</div></div></div>
    </section>

    <section className="how-section" id="how-it-works"><SectionIntro eyebrow="HOW IT WORKS" title={<>จากข้อมูลธุรกิจ<br />สู่ <span>สิ่งที่ควรทำต่อไป</span></>} copy="เริ่มต้นจากธุรกิจของคุณ แล้วให้ทีม AI ช่วยจัดการงานที่ควรเกิดขึ้น" />
      <div className="steps-line" /><div className="steps-grid"><article><span className="step-number">01</span><span className="step-icon"><FileText size={20} /></span><h3>Tell us about your business</h3><p>เล่าให้เราฟังว่าคุณทำธุรกิจอะไร ลูกค้าคือใคร และกำลังโฟกัสเรื่องไหน</p><div className="step-preview inputs-preview"><i /><i /><i /></div></article><article><span className="step-number">02</span><span className="step-icon"><Search size={20} /></span><h3>KaiKhong understands</h3><p>AI เริ่มทำความเข้าใจบริบท จุดแข็ง และโอกาสของธุรกิจคุณ</p><div className="step-preview context-preview"><span>Business context</span><i /><i /><i /></div></article><article><span className="step-number">03</span><span className="step-icon"><Sparkles size={20} /></span><h3>Your AI team works</h3><p>Product, Marketing และ Sales ทำงานกับ task ที่เหมาะกับธุรกิจคุณ</p><div className="step-preview agents-preview"><span><Package size={12} /></span><span><Megaphone size={12} /></span><span><Handshake size={12} /></span></div></article><article><span className="step-number">04</span><span className="step-icon"><Check size={20} /></span><h3>You review & act</h3><p>คุณเห็นสิ่งที่ทีมพบ เลือกสิ่งสำคัญ และตัดสินใจได้เร็วขึ้น</p><div className="step-preview done-preview"><Check size={18} /><span>Ready to review</span></div></article></div>
    </section>

    <section className="dashboard-section"><div className="dashboard-heading"><div><p className="eyebrow"><Sparkles size={14} /> A BUSINESS WORKSPACE, NOT A CHAT</p><h2>Your business.<br /><span>One AI team.</span></h2></div><p>เห็นภาพรวมของ Product, Marketing และ Sales ในที่เดียว พร้อมเรื่องที่ทีม AI อยากให้คุณตัดสินใจ</p></div><Dashboard /></section>

    <section className="why-section" id="why"><SectionIntro eyebrow="WHY KAIKHONG" title={<>สร้างเพื่อให้ธุรกิจเล็ก<br /><span>ไปได้ไกลขึ้น</span></>} /><div className="why-grid"><article><span><Search size={21} /></span><h3>Built around your business</h3><p>AI เข้าใจบริบทธุรกิจคุณ ไม่ต้องเริ่มใหม่จากศูนย์ทุกครั้ง</p></article><article><span><DepartmentDots /></span><h3>One team, multiple jobs</h3><p>Product, Marketing และ Sales ทำงานจากภาพเดียวกัน</p></article><article><span><Sparkles size={21} /></span><h3>Made for small businesses</h3><p>ออกแบบมาสำหรับธุรกิจที่ยังไม่มีทีมขนาดใหญ่</p></article><article><span>🇹🇭</span><h3>Thai-first</h3><p>สร้างโดยคิดถึงภาษา ธุรกิจ และวิธีทำงานของตลาดไทยตั้งแต่ต้น</p></article></div></section>

    <section className="waitlist-section" id="waitlist"><div className="waitlist-card"><div className="waitlist-decoration d-one" /><div className="waitlist-decoration d-two" /><div className="waitlist-intro"><p className="eyebrow"><Sparkles size={14} /> HELP SHAPE KAIKHONG</p><h2>อยากให้ KaiKhong<br /><span>ช่วยธุรกิจของคุณเรื่องอะไร?</span></h2><p>เรากำลังสร้าง KaiKhong.ai และอยากให้ Early Users มีส่วนช่วยกำหนด Product ตั้งแต่วันแรก</p><div className="early-note"><span><Check size={15} /></span><p><b>Early access, when it&apos;s ready</b><br />สมัครไว้ก่อน แล้วเราจะติดต่อคุณ</p></div></div><div className="form-wrap"><WaitlistForm /></div></div></section>

    <section className="faq-section" id="faq"><SectionIntro eyebrow="FAQ" title={<>คำถามที่คนกำลัง<br /><span>สร้างธุรกิจถามเรา</span></>} /><div className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item ${openFaq === index ? "active" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={20} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>

    <section className="final-cta"><div className="final-grid" /><span className="final-orb one" /><span className="final-orb two" /><div className="final-content"><p className="eyebrow light"><Sparkles size={14} /> KAIKHONG.AI IS COMING</p><h2>ธุรกิจของคุณไม่ควร<br />ต้องพึ่งคุณแค่คนเดียว</h2><p>Join the early access list for KaiKhong.ai.</p><a className="button button-light button-large" href="#waitlist">Join the Waitlist <ArrowRight size={18} /></a></div><div className="final-mini-ui"><div><span className="pulse-dot" /> AI Team</div><p>Finding the next opportunity</p><div className="mini-ui-line"><span /><span /><span /></div></div></section>

    <footer><div className="footer-top"><div><Logo /><p>Your AI Business Team</p></div><div className="footer-links"><a href="#product">Product</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a><a href="mailto:hello@kaikhong.ai">Contact</a></div><div className="social-links"><a href="#top" aria-label="KaiKhong on X">𝕏</a><a href="#top" aria-label="KaiKhong on LinkedIn">in</a></div></div><div className="footer-bottom"><span>Built in Thailand 🇹🇭</span><span>© {new Date().getFullYear()} KaiKhong.ai</span></div></footer>
  </main>;
}

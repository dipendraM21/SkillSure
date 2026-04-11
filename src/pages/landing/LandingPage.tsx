import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './landing.css'

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } }
const fadeRight = { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } }
const fadeLeft = { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } }
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } }

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

/* ------------------------------------------------------------------ */
/*  Scroll-reveal section wrapper                                      */
/* ------------------------------------------------------------------ */

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Small shared UI                                                    */
/* ------------------------------------------------------------------ */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="gradient-border inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-5 py-1.5 text-[11px] font-semibold tracking-widest text-violet-300 uppercase backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,.6)]" />
      {children}
    </span>
  )
}

function GlowButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'ghost' }) {
  const base = 'glow-btn relative z-10 inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-400'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-600/20'
      : 'bg-white/[0.04] text-violet-200 border border-white/10 hover:border-violet-500/40'
  return <Link to={href} className={`${base} ${styles}`}>{children}</Link>
}

function SectionTitle({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="mx-auto max-w-2xl text-center">
      <Badge>{badge}</Badge>
      <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

function Navbar() {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#08080f]/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-black text-white shadow-lg shadow-violet-500/30">S</span>
          <span className="gradient-text">SkillSure</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <GlowButton href="/login">Get Started Free</GlowButton>
      </div>
    </motion.header>
  )
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="blob-animate absolute -top-[30%] -left-[10%] h-[700px] w-[700px] rounded-full bg-violet-600/[0.12] blur-[140px]" />
      <div className="blob-animate-slow absolute top-[10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
      <div className="blob-animate absolute bottom-[-20%] left-[30%] h-[600px] w-[600px] rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      <div className="blob-animate-slow absolute top-[50%] right-[20%] h-[300px] w-[300px] rounded-full bg-emerald-500/[0.06] blur-[100px]" />

      {/* Grid overlay */}
      <div className="landing-grid absolute inset-0" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.1),transparent)]" />
    </div>
  )
}

function FloatingCards() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-12 rounded-3xl bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/8 blur-3xl" />

      {/* Card 1 – Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="glass-card relative w-60 rounded-2xl p-5"
      >
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
          <p className="text-[10px] font-bold tracking-widest text-violet-400 uppercase">Candidates this month</p>
          <p className="mt-1 text-4xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>412</p>
          <p className="mt-1 text-xs text-emerald-400">&uarr; 24% vs last month</p>
        </motion.div>
      </motion.div>

      {/* Card 2 – Score bars */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="glass-card relative -mt-4 ml-16 w-72 rounded-2xl p-5"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Assessment Results</p>
          <div className="mt-3 space-y-2.5">
            {[
              { label: 'Financial Acctg', pct: 82, color: 'from-violet-500 to-indigo-500' },
              { label: 'Tax Compliance', pct: 71, color: 'from-cyan-400 to-emerald-400' },
              { label: 'Payroll & Ops', pct: 90, color: 'from-emerald-400 to-cyan-400' },
              { label: 'Ind. Accounting', pct: 65, color: 'from-indigo-500 to-violet-500' },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-slate-400">{r.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 1.4, delay: 1.0, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${r.color}`}
                  />
                </div>
                <span className="w-7 text-right font-semibold text-white">{r.pct}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {['Manufacturing', 'Tally ERP'].map((t) => (
              <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-slate-500">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Card 3 – Skill band */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="glass-card relative -mt-2 ml-4 w-52 rounded-2xl p-4"
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Skill Band</span>
          </div>
          <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Advanced</p>
          <p className="text-xs text-slate-500">Top 15% nationally</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-28 pb-24 lg:pt-40 lg:pb-32">
      <HeroBackground />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left */}
        <motion.div initial="hidden" animate="visible" variants={fadeRight} transition={{ duration: 0.8 }}>
          <Badge>India&apos;s #1 Accountant Assessment Platform</Badge>

          <h1 className="mt-7 text-[2.75rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">Hire accountants</span>
            <br />
            <span className="text-white">you can truly </span>
            <span className="gradient-text-hero">trust.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            SkillSure delivers verified, industry-profiled skill assessments for accountants at Indian SMEs. Free for candidates. Powerful for employers.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <GlowButton href="/login">Take Free Assessment</GlowButton>
            <GlowButton href="#how-it-works" variant="ghost">View Sample Report &rarr;</GlowButton>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {['PM', 'RS', 'AJ', 'KR', 'HD'].map((init, i) => (
                <span
                  key={init}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a12] text-[10px] font-bold text-white shadow-lg"
                  style={{
                    background: ['linear-gradient(135deg,#7c3aed,#6366f1)', 'linear-gradient(135deg,#06b6d4,#10b981)', 'linear-gradient(135deg,#f4c84b,#f59e0b)', 'linear-gradient(135deg,#ef4444,#f97316)', 'linear-gradient(135deg,#3b82f6,#8b5cf6)'][i],
                    zIndex: 5 - i,
                  }}
                >
                  {init}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-500">
              <span className="text-amber-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>{' '}
              Trusted by <span className="font-semibold text-white">840+ SMEs</span> across India
            </div>
          </div>
        </motion.div>

        {/* Right – floating glass cards */}
        <FloatingCards />
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080f] to-transparent" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  TRUST BAR                                                          */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const logos = ['Tata Steel', 'Reliance', 'Infosys', 'Wipro', 'HCL', 'HDFC']
  return (
    <Section className="border-y border-white/[0.04] py-12">
      <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-600 uppercase">Trusted by industry leaders</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
          {logos.map((l) => (
            <span key={l} className="text-lg font-bold text-slate-700/60 transition-colors duration-300 hover:text-slate-400">{l}</span>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  { num: '01', title: 'Register with OTP', desc: 'Sign up instantly with phone or email. Verify with a one-time password and receive your unique SkillSure ID.', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' },
  { num: '02', title: 'Complete Your Profile', desc: 'Tell us about your experience, qualifications, and industry. We tailor the assessment to your financial profile.', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  { num: '03', title: 'Take the Assessment', desc: '40 questions in 75 minutes — MCQ, situational judgment, chain scenarios, and data interpretation.', icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z' },
  { num: '04', title: 'Get Instant Results', desc: 'View your score, skill band, and dimension breakdown immediately. Employers see verified results.', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
]

function HowItWorks() {
  return (
    <Section className="relative py-28" id="how-it-works">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06),transparent)]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle badge="Simple 4-step process" title={<>How <span className="gradient-text">SkillSure</span> Works</>} subtitle="From registration to verified results in under 90 minutes." />

        <div className="relative mt-20 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="pointer-events-none absolute top-12 left-[calc(12.5%+1rem)] hidden h-px w-[calc(75%-2rem)] bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-emerald-500/30 lg:block" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-7"
            >
              <span className="absolute -top-px left-6 rounded-b-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-violet-600/20">{s.num}</span>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 text-violet-400 transition-colors group-hover:from-violet-500/20 group-hover:to-cyan-500/20 group-hover:text-white">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  FEATURES                                                           */
/* ------------------------------------------------------------------ */

const FEATURES = [
  { title: 'Industry-Profiled Questions', desc: 'Assessments mapped to 6 financial profiles — Manufacturing, Trading, Services, and more — so scores reflect real-world relevance.', gradient: 'from-violet-500 to-indigo-500' },
  { title: '9 Competency Dimensions', desc: 'Financial Accounting to GST Compliance, Payroll, Costing — each dimension scored independently with clear band labels.', gradient: 'from-cyan-400 to-emerald-400' },
  { title: 'Instant Verified Results', desc: 'Candidates see scores immediately. Employers get a verified dashboard with integrity flags and percentile rankings.', gradient: 'from-amber-400 to-orange-500' },
  { title: 'Locked-Browser Integrity', desc: 'Fullscreen lockdown, tab-switch detection, and violation logging ensure assessment integrity without being intrusive.', gradient: 'from-indigo-500 to-violet-500' },
  { title: 'Free for Candidates', desc: 'Candidates take the assessment at no cost and receive a SkillSure ID — a portable credential for their accounting career.', gradient: 'from-emerald-400 to-cyan-400' },
  { title: 'Employer Analytics', desc: 'Filter candidates, compare cohort performance, export CSV reports, and identify weakest competency areas across your hires.', gradient: 'from-rose-400 to-violet-500' },
]

function Features() {
  return (
    <Section className="relative py-28" id="features">
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle badge="Platform Features" title={<>Everything you need to <span className="gradient-text">hire with confidence</span></>} subtitle="Comprehensive assessment infrastructure built for Indian accounting teams." />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-7"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg`} style={{ boxShadow: `0 8px 24px rgba(124,58,237,0.15)` }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{f.desc}</p>

              {/* Corner glow on hover */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-violet-500/0 transition-all duration-500 group-hover:bg-violet-500/10 group-hover:blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  PRODUCT PREVIEW / VALUE                                            */
/* ------------------------------------------------------------------ */

function ProductPreview() {
  return (
    <Section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-violet-600/[0.06] blur-[140px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div variants={fadeRight} transition={{ duration: 0.7 }}>
          <Badge>For Employers</Badge>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stop guessing.<br /><span className="gradient-text">Start measuring.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Traditional interviews miss 60% of competency gaps. SkillSure gives you objective, dimension-level data — so you can hire the right accountant the first time.
          </p>
          <ul className="mt-7 space-y-3.5">
            {[
              'Filter candidates by score, band, or competency',
              'See integrity flags for every assessment',
              'Export results as CSV for your hiring pipeline',
              'Cohort analytics when 5+ candidates are assessed',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <GlowButton href="/login">Try Employer Dashboard</GlowButton>
          </div>
        </motion.div>

        {/* Mock dashboard */}
        <motion.div variants={fadeLeft} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-violet-600/8 via-transparent to-cyan-500/6 blur-2xl" />
          <div className="gradient-border glass-card relative overflow-hidden rounded-2xl p-7">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h3 className="text-sm font-bold text-white">Employer Dashboard</h3>
              <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.2)]">Live</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Total Assessed', value: '127', trend: '+18%' },
                { label: 'Avg. Score', value: '74', trend: '+3 pts' },
                { label: 'Advanced Band', value: '42%', trend: '+7%' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center">
                  <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
                  <p className="text-[10px] text-slate-600">{s.label}</p>
                  <p className="text-[10px] font-semibold text-emerald-400">{s.trend}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: 'Priya Sharma', score: '88', band: 'Advanced' },
                { name: 'Ravi Patel', score: '72', band: 'Intermediate' },
                { name: 'Ananya Joshi', score: '91', band: 'Expert' },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between rounded-lg border border-white/[0.03] bg-white/[0.02] px-4 py-2.5 text-xs">
                  <span className="text-slate-300">{row.name}</span>
                  <span className="font-semibold text-white">{row.score}</span>
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-violet-400">{row.band}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'CFO, ManufactureTech Pvt Ltd', text: 'SkillSure completely changed how we hire accountants. The dimension-level breakdown showed us exactly where candidates excelled and where they didn\'t.' },
  { name: 'Priya Menon', role: 'HR Head, ServicePro India', text: 'We reduced our bad hires by 40% in 3 months. The integrity flags give us confidence that the scores are genuine.' },
  { name: 'Amit Patel', role: 'Founder, TradeEasy Solutions', text: 'As a growing SME, we can\'t afford hiring mistakes. SkillSure\'s free-for-candidate model let us assess everyone without budget constraints.' },
]

function Testimonials() {
  return (
    <Section className="relative py-28" id="reviews">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/[0.05] blur-[140px]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle badge="What People Say" title={<>Trusted by hiring teams <span className="gradient-text">across India</span></>} subtitle="Real feedback from employers using SkillSure to find accountants they trust." />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-7"
            >
              <div className="flex gap-0.5 text-amber-400">{'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}</div>
              <p className="mt-5 text-sm leading-relaxed text-slate-300 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.04] pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white shadow-lg">{t.name.split(' ').map((n) => n[0]).join('')}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              <div className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-violet-500/0 transition-all duration-500 group-hover:bg-violet-500/8 group-hover:blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const FAQS = [
  { q: 'Is SkillSure really free for candidates?', a: 'Yes — candidates take the assessment at no cost and receive a SkillSure ID and full score breakdown.' },
  { q: 'How long does the assessment take?', a: '75 minutes for 40 questions. The test covers 9 competency dimensions relevant to Indian accounting roles.' },
  { q: 'What question types are included?', a: 'MCQ, situational judgment, chain scenarios, and data interpretation — all mapped to real-world accounting tasks.' },
  { q: 'How do employers access results?', a: 'Employers get a secure dashboard showing scores, integrity flags, and analytics for consenting candidates.' },
]

function FAQ() {
  return (
    <Section className="relative py-28" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle badge="FAQ" title="Frequently asked questions" subtitle="Everything you need to know about SkillSure." />

        <div className="mt-14 space-y-4">
          {FAQS.map((f, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className="glass-card group rounded-2xl px-7 py-5 transition-all open:bg-white/[0.04]"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white">
                {f.q}
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-violet-400 transition-all group-open:rotate-45 group-open:border-violet-500/30 group-open:bg-violet-500/10">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA BANNER                                                         */
/* ------------------------------------------------------------------ */

function CtaBanner() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-cyan-500/10 px-8 py-20 text-center backdrop-blur-xl sm:px-16">
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-violet-500/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-cyan-500/15 blur-[80px]" />

          <motion.h2 variants={fadeUp} transition={{ duration: 0.7 }} className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Start your hiring{' '}<span className="gradient-text">journey today</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ delay: 0.1 }} className="relative mt-5 mx-auto max-w-lg text-base leading-relaxed text-slate-400">
            Join 840+ Indian SMEs using SkillSure to find accountants they can trust. It takes less than 2 minutes to get started.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ delay: 0.2 }} className="relative mt-9 flex flex-wrap justify-center gap-4">
            <GlowButton href="/login">Get Started Free</GlowButton>
            <GlowButton href="#how-it-works" variant="ghost">Learn More</GlowButton>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 text-[9px] font-black text-white">S</span>
          <span className="gradient-text">SkillSure</span>
        </Link>
        <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} SkillSure. All rights reserved.</p>
        <div className="flex gap-7 text-xs text-slate-600">
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a key={l} href="#" className="transition-colors hover:text-violet-400">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="landing-dark noise-overlay min-h-screen bg-[#08080f] font-body text-slate-300" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <ProductPreview />
      <Testimonials />
      <FAQ />
      <CtaBanner />
      <Footer />
    </div>
  )
}

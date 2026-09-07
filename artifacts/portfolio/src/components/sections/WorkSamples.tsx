import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  BriefcaseBusiness,
  FileSearch,
  Gauge,
  LineChart,
  Megaphone,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type Category = 'Finance & Compliance' | 'Operations & Admin' | 'Marketing & Growth' | 'Tech & Innovation' | 'Creative & Freelance';
type Sample = {
  id: string;
  category: Category;
  title: string;
  role: string;
  company: string;
  description: string;
  period: string;
  icon: typeof ShieldCheck;
  accent: string;
  metrics: { label: string; value: string }[];
  preview: 'compliance' | 'funnel' | 'research' | 'analytics' | 'kanban' | 'ai' | 'finance' | 'brief' | 'feasibility';
  details: string[];
};

const categories: Array<'All works' | Category> = ['All works', 'Finance & Compliance', 'Operations & Admin', 'Marketing & Growth', 'Tech & Innovation', 'Creative & Freelance'];

const samples: Sample[] = [
  {
    id: 'predictive-growth', category: 'Marketing & Growth', title: 'Driving Predictive, AI-Powered Growth for FMCG E-Commerce', role: 'Digital Marketing Lead', company: 'Confidential FMCG E-Commerce', period: 'October 2025 – July 2026', icon: LineChart, accent: 'cyan',
    description: 'A performance growth system connecting campaign signals, creative testing, and budget decisions into one operating rhythm.',
    metrics: [{ label: 'Increase ROAS', value: '+20%' }, { label: 'Reduce CPA', value: '-15%' }, { label: 'Engine', value: 'Integrated Digital Marketing' }], preview: 'funnel',
    details: ['Integrated paid media, audience signals, creative iteration, and reporting into a single growth loop.', 'Defined a predictive testing plan to surface high-intent segments before budget is scaled.', 'Targets are presented as planning goals; client identifiers and live performance data remain protected.'],
  },
  {
    id: 'trade-compliance', category: 'Finance & Compliance', title: 'Trade Finance Client Compliance Report', role: 'Trade Finance Executive', company: 'Euro Exim Bank', period: 'Nov 2023 – Oct 2024', icon: ShieldCheck, accent: 'amber',
    description: 'A sample-safe review surface for international trade clients, translating AML, KYC, and CTF checks into a clear decision trail.',
    metrics: [{ label: 'AML status', value: 'Cleared' }, { label: 'KYC tier', value: 'Tier 2' }, { label: 'Risk level', value: 'Low' }], preview: 'compliance',
    details: ['Reviewed client information against AML, KYC, and CTF requirements for trade finance instruments.', 'Organized risk signals so stakeholders could move from evidence to a documented decision.', 'Illustrative values only: Agri-Exports, Philippines, $2.4M trade value.'],
  },
  {
    id: 'tropical-treats', category: 'Operations & Admin', title: 'Feasibility Study — The Tropical Treats ft. Purple Bliss Cheeseball', role: 'Group Lead / Research Analyst', company: 'Prophema Applied Research', period: 'Mar 2024 – Dec 2024', icon: FileSearch, accent: 'violet',
    description: 'A six-chapter feasibility study that moved a food concept from idea to evidence-backed business case, capped by a defense presentation.',
    metrics: [{ label: 'Chapters', value: '06' }, { label: 'Lead role', value: 'Group lead' }, { label: 'Output', value: 'Defense deck' }], preview: 'feasibility',
    details: ['Covered market feasibility, technical feasibility, survey design, and data analysis.', 'Documented registration and testing requirements alongside financial stability and operating considerations.', 'Coordinated the group, consolidated research, and presented the findings in a formal defense.'],
  },
  {
    id: 'social-analytics', category: 'Marketing & Growth', title: 'Social Media Analytics Report', role: 'Social Media Manager', company: 'Most Viral', period: 'Aug 2019 – Jan 2023', icon: BarChart3, accent: 'cyan',
    description: 'A platform-by-platform performance readout that turns reach and engagement signals into a repeatable content planning input.',
    metrics: [{ label: 'Reach', value: '2.4M' }, { label: 'Engagements', value: '312K' }, { label: 'Avg rate', value: '4.8%' }], preview: 'analytics',
    details: ['Tracked content performance across Instagram, Facebook, and TikTok.', 'Built reporting around reach, engagement, and weekly trend movement.', 'The supplied 1.2M engagement increase is reflected in the broader experience record; this preview uses anonymized sample-safe values.'],
  },
  {
    id: 'influencer-database', category: 'Marketing & Growth', title: 'Influencer Contact Database', role: 'Virtual Assistant', company: 'Clicks Talent', period: 'Oct 2025 – Jul 2026', icon: Users, accent: 'lime',
    description: 'A structured outreach tracker designed to make discovery, qualification, and follow-up visible across a distributed team.',
    metrics: [{ label: 'Records', value: '120+' }, { label: 'Fields', value: '12' }, { label: 'Status', value: 'Live workflow' }], preview: 'research',
    details: ['Researched influencers, partners, and stakeholders against requested niches and platforms.', 'Maintained contact details, follower bands, qualification notes, and outreach status.', 'Designed for fast handoff: the next action is visible without exposing personal contact data.'],
  },
  {
    id: 'crm-alignment', category: 'Operations & Admin', title: 'CRM Profile Alignment Report', role: 'Client Success Intern', company: 'CrewBloom', period: 'May 2024 – Oct 2024', icon: Network, accent: 'blue',
    description: 'An operations audit showing how CRM records, project folders, and client status stay in sync across two workspaces.',
    metrics: [{ label: 'Systems', value: '02' }, { label: 'Inquiries resolved', value: '58' }, { label: 'State', value: 'In sync' }], preview: 'kanban',
    details: ['Aligned company profiles in CrewHub and HubSpot with accurate, consistent information.', 'Maintained project states and organized shared-drive structures for reliable retrieval.', 'Resolved 58 customer inquiries with escalation where needed.'],
  },
  {
    id: 'ai-xr-outreach', category: 'Tech & Innovation', title: 'AI & XR for Academic Excellence', role: 'Spatial AI Entrepreneur Intern', company: 'EON Reality', period: 'Jul 2024 – Aug 2024', icon: Sparkles, accent: 'violet',
    description: 'A GPT-assisted outreach narrative connecting immersive learning, curriculum generation, and industry-academia alignment.',
    metrics: [{ label: 'Audience', value: 'Academic' }, { label: 'Pillars', value: '03' }, { label: 'Format', value: 'Pitch slide' }], preview: 'ai',
    details: ['Identified academic users who could benefit from AI and XR technology.', 'Crafted tailored emails and presentations with GPT-assisted research and messaging.', 'Connected spatial computing value to practical curriculum and employability outcomes.'],
  },
  {
    id: 'ap-summary', category: 'Finance & Compliance', title: 'Accounts Payable Summary', role: 'Accounting Intern', company: 'Scrubbed.net Global Services', period: 'Dec 2023 – May 2024', icon: CircleDollarSign, accent: 'amber',
    description: 'A weekly settlement view that makes vendor status, exceptions, and outstanding exposure easy to review.',
    metrics: [{ label: 'Teams coordinated', value: '15' }, { label: 'Open value', value: '$12,230' }, { label: 'Cadence', value: 'Weekly' }], preview: 'finance',
    details: ['Verified data accuracy while supporting accounts payable and day-to-day finance responsibilities.', 'Coordinated with 15 teams inside assigned squads to keep operating context current.', 'Values shown are anonymized sample-safe figures from the supplied visualized deliverables.'],
  },
  {
    id: 'squad-report', category: 'Tech & Innovation', title: 'Squad Progress Report', role: 'Business Development Team Leader', company: 'GAOTek Inc.', period: 'Jun 2023 – Sep 2023', icon: Gauge, accent: 'lime',
    description: 'A lightweight team-health dashboard for reviewing task progress, blockers, and the next weekly intervention.',
    metrics: [{ label: 'Completion', value: '82%' }, { label: 'Interns', value: '08' }, { label: 'Issues', value: '02' }], preview: 'brief',
    details: ['Coordinated assigned interns and scheduled weekly squad reviews.', 'Trained new interns against operating guidelines and monitored engagement.', 'Used concise status signals to help leaders focus feedback where it mattered.'],
  },
  {
    id: 'suspicious-activity', category: 'Finance & Compliance', title: 'Suspicious Activity Flag Report', role: 'Anti-Money Laundering Analyst', company: 'Open NFT', period: 'Jul 2022 – Aug 2023', icon: ShieldCheck, accent: 'amber',
    description: 'A review queue for suspicious transaction flows, keeping high-risk signals legible without exposing underlying wallet identities.',
    metrics: [{ label: 'Flagged', value: '03' }, { label: 'Risk score', value: '78/100' }, { label: 'State', value: 'Under review' }], preview: 'compliance',
    details: ['Monitored transactions and documented suspicious activity for further investigation.', 'Supported AML compliance reviews and KYC due diligence in a digital asset environment.', 'Wallet strings and values are intentionally truncated or anonymized in this showcase.'],
  },
  {
    id: 'lead-generation', category: 'Marketing & Growth', title: 'Lead Generation Campaign Report', role: 'Growth Specialist', company: 'August 99', period: 'Nov 2023 – May 2024', icon: Megaphone, accent: 'cyan',
    description: 'A funnel readout connecting sourced prospects to qualification and appointments across social and direct outreach channels.',
    metrics: [{ label: 'Leads sourced', value: '340' }, { label: 'Qualified', value: '87' }, { label: 'Appointments', value: '24' }], preview: 'funnel',
    details: ['Researched and sourced prospects across LinkedIn, email, Instagram, Facebook, and forums.', 'Qualified leads by interest, need, and budget before setting appointments and follow-up.', 'Maintained accurate prospect data and reported lead-generation movement to management.'],
  },
  {
    id: 'campaign-tracker', category: 'Marketing & Growth', title: 'Client Campaign Tracker', role: 'Client Success VA', company: 'HypeHive', period: 'Jun 2023 – Jul 2024', icon: ClipboardList, accent: 'lime',
    description: 'A kanban-style campaign view that makes planning, in-progress work, and completed launches visible at a glance.',
    metrics: [{ label: 'Workflow', value: 'Kanban' }, { label: 'Focus', value: 'Campaigns' }, { label: 'Mode', value: 'Active' }], preview: 'kanban',
    details: ['Supported lead generation, social publishing, audience engagement, and appointment setting.', 'Kept campaign stages clear for fast coordination across local and international real-estate clients.', 'Used simple status language to keep handoffs unambiguous.'],
  },
  {
    id: 'legal-briefing', category: 'Creative & Freelance', title: 'Legal Deposition Briefing Sheet', role: 'Legal Deposition Interpreter', company: 'The Language Doctors', period: 'Dec 2023 – Jan 2024', icon: FileSearch, accent: 'violet',
    description: 'A focused interpreter reference sheet for deposition context, jurisdiction, parties, and essential bilingual terminology.',
    metrics: [{ label: 'Language pair', value: 'EN ↔ TL' }, { label: 'Jurisdiction', value: 'Maryland' }, { label: 'Format', value: 'Briefing sheet' }], preview: 'brief',
    details: ['Prepared structured references for English and Tagalog/Ilonggo legal communication.', 'Worked alongside attorneys and a presiding judge in a formal legal context.', 'Case identifiers are redacted; the preview demonstrates document structure only.'],
  },
  {
    id: 'trip-itinerary', category: 'Creative & Freelance', title: 'Group Trip Itinerary', role: 'ProTripLeader', company: 'JoinMyTrip', period: 'Jul 2023 – Oct 2023', icon: BriefcaseBusiness, accent: 'blue',
    description: 'A day-by-day operating plan that turns a destination idea into confirmed logistics, pacing, and a clear group experience.',
    metrics: [{ label: 'Duration', value: '07 days' }, { label: 'Capacity', value: '8/10' }, { label: 'State', value: 'Confirmed' }], preview: 'brief',
    details: ['Planned international trips in high-demand locations and secured suitable accommodations.', 'Coordinated daily activities, logistics, and group capacity.', 'Promoted trips in collaboration with the JoinMyTrip marketing team.'],
  },
  {
    id: 'crypto-portfolio', category: 'Finance & Compliance', title: 'Crypto Investment Portfolio Summary', role: 'Customer Service Representative', company: 'OTC JKE British Trading & Investment', period: 'Jul 2022 – Nov 2023', icon: CircleDollarSign, accent: 'amber',
    description: 'A client-facing snapshot of asset distribution, return movement, and compliance status for investment conversations.',
    metrics: [{ label: 'Total value', value: '$18,400' }, { label: 'Monthly return', value: '+12.4%' }, { label: 'Status', value: 'KYC verified' }], preview: 'finance',
    details: ['Maintained client relationships and delivered personalized financial guidance.', 'Documented financial updates and kept regulatory considerations visible.', 'Portfolio allocation is an anonymized sample-safe illustration.'],
  },
  {
    id: 'difx-brief', category: 'Finance & Compliance', title: 'DIFX Campaign Brief', role: 'DIFX Ambassador', company: 'DIFX – Digital Financial Exchange', period: 'Aug 2023 – Nov 2023', icon: Megaphone, accent: 'cyan',
    description: 'A compact campaign brief aligning brand awareness, workshops, influencer activity, and user acquisition targets.',
    metrics: [{ label: 'New signups', value: '500' }, { label: 'Workshops', value: '03' }, { label: 'Mentions', value: '12' }], preview: 'funnel',
    details: ['Promoted events, workshops, and campaigns across LinkedIn, Twitter, and Telegram.', 'Supported community growth through online outreach and social engagement.', 'Targets are presented as campaign-brief values, not private platform analytics.'],
  },
  {
    id: 'research-sync', category: 'Operations & Admin', title: 'Project Status & Meeting Agenda', role: 'Management Intern', company: 'Prophema Applied Research', period: 'Apr 2024 – Aug 2024', icon: ClipboardList, accent: 'violet',
    description: 'A weekly operating document that keeps research decisions, owners, and cross-functional deliverables moving together.',
    metrics: [{ label: 'Cadence', value: 'Weekly' }, { label: 'Agenda items', value: '04' }, { label: 'Mode', value: 'Remote sync' }], preview: 'brief',
    details: ['Coordinated projects, meetings, and events while preparing reports and presentations.', 'Supported research and data analysis for business decisions.', 'Maintained records and helped identify process improvements across teams.'],
  },
];

function MiniPreview({ sample }: { sample: Sample }) {
  const bars = [42, 68, 54, 82, 72, 94, 76];
  if (sample.preview === 'compliance') return <div className="grid grid-cols-2 gap-2 text-[10px] font-mono"><div className="col-span-2 flex items-center justify-between border-b border-primary/20 pb-2"><span className="text-muted-foreground">ID: CR-8942-A</span><span className="text-emerald-300">CLEARED</span></div><span className="text-muted-foreground">KYC TIER<br /><b className="text-foreground">Tier 2 Verified</b></span><span className="text-muted-foreground">CTF CHECK<br /><b className="text-foreground">PASSED</b></span><div className="col-span-2 mt-1 rounded bg-primary/10 px-2 py-2 text-primary">$2.4M <span className="text-muted-foreground">trade value · low risk</span></div></div>;
  if (sample.preview === 'funnel') return <div className="space-y-3"><div className="flex items-end gap-1 h-20">{bars.slice(0, 6).map((height, i) => <div key={i} className="flex-1 rounded-t bg-primary/70" style={{ height: `${height}%` }} />)}</div><div className="grid grid-cols-3 gap-2 font-mono text-[9px]"><span className="border-l-2 border-primary pl-2">SIGNALS<br /><b className="text-foreground">LIVE</b></span><span className="border-l-2 border-primary/50 pl-2">ROAS<br /><b className="text-foreground">+20%</b></span><span className="border-l-2 border-primary/30 pl-2">CPA<br /><b className="text-foreground">−15%</b></span></div></div>;
  if (sample.preview === 'analytics') return <div><div className="flex items-end gap-1 h-24 border-b border-l border-primary/30 px-2">{bars.map((height, i) => <div key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: `${height}%` }} />)}</div><div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground"><span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span></div></div>;
  if (sample.preview === 'research') return <div className="space-y-1 font-mono text-[10px]"><div className="grid grid-cols-4 border-b border-primary/20 pb-1 text-muted-foreground"><span>NAME</span><span>PLAT.</span><span>NICHE</span><span>STATUS</span></div>{[['@alex…','IG','Tech','Contacted'],['@sam_x','TT','Life','Qualified'],['cryptoJ','X','Fin','Pending'],['@luna9','IG','Life','Responded']].map((row, i) => <div key={i} className="grid grid-cols-4 py-1.5"><span>{row[0]}</span><span className="text-primary">{row[1]}</span><span>{row[2]}</span><span className="text-muted-foreground">{row[3]}</span></div>)}</div>;
  if (sample.preview === 'kanban') return <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">{[['ACTIVE','Profile sync'],['PAID','Inquiry resolved'],['INACTIVE','Folder review']].map(([label, item]) => <div key={label} className="rounded border border-primary/20 p-2"><span className="text-primary">{label}</span><div className="mt-3 rounded bg-primary/10 p-2 text-foreground">{item}</div><div className="mt-2 h-1 rounded bg-primary/40" /></div>)}</div>;
  if (sample.preview === 'ai') return <div className="space-y-2 text-[10px]"><div className="text-primary font-mono">EON REALITY / ACADEMIC PITCH</div>{['Immersive learning environments','AI-powered training modules','Industry–academia bridge'].map((item, i) => <div key={item} className="flex gap-2 rounded border border-primary/20 bg-primary/5 p-2"><span className="font-mono text-primary">0{i + 1}</span><span>{item}</span></div>)}</div>;
  if (sample.preview === 'finance') return <div className="space-y-1 font-mono text-[10px]"><div className="grid grid-cols-4 border-b border-primary/20 pb-1 text-muted-foreground"><span>VENDOR</span><span>INV</span><span>AMOUNT</span><span>STATUS</span></div>{[['CloudHost','102','$1,240','Paid'],['LegalSvcs','089','$4,500','Pend'],['OfficeEqp','110','$850','Paid'],['ConsultX','042','$3,200','Late']].map((row, i) => <div key={i} className="grid grid-cols-4 py-1.5"><span>{row[0]}</span><span className="text-muted-foreground">{row[1]}</span><span>{row[2]}</span><span className={row[3] === 'Paid' ? 'text-emerald-300' : 'text-amber-300'}>{row[3]}</span></div>)}<div className="mt-2 text-right text-primary">TOTAL OUTSTANDING: $12,230</div></div>;
  if (sample.preview === 'feasibility') return <div className="grid grid-cols-3 gap-2 font-mono text-[9px]">{[['01','Market'],['02','Technical'],['03','Survey'],['04','Data analysis'],['05','Registration'],['06','Financial']].map(([num, label]) => <div key={num} className="rounded border border-primary/20 p-2"><span className="text-primary">CH. {num}</span><br /><span className="text-foreground">{label}</span><div className="mt-2 h-1 bg-primary/40" /></div>)}</div>;
  return <div className="space-y-2 font-mono text-[10px]"><div className="flex justify-between border-b border-primary/20 pb-2"><span className="text-muted-foreground">SQUAD ALPHA</span><span className="text-primary">82% COMPLETE</span></div>{['Data clean','API setup','UI build','Documentation'].map((item, i) => <div key={item} className="flex items-center justify-between py-1"><span>{item}</span><span className={i < 2 ? 'text-emerald-300' : 'text-amber-300'}>{i < 2 ? 'ON TRACK' : 'REVIEW'}</span></div>)}</div>;
}

export function WorkSamples() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All works');
  const [selected, setSelected] = useState<Sample | null>(null);
  const filtered = useMemo(() => activeCategory === 'All works' ? samples : samples.filter((sample) => sample.category === activeCategory), [activeCategory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return <section id="work-samples" className="relative overflow-hidden py-24 lg:py-32">
    <div className="container mx-auto px-6 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }} className="mb-12 max-w-4xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.24em] text-primary"><span className="h-px w-10 bg-primary" /> FIELD NOTES / 04 YEARS / 05 INDUSTRIES</div>
        <div className="grid gap-7 lg:grid-cols-[1fr_280px] lg:items-end"><h2 className="font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">Work, made <span className="text-primary glow-text">visible.</span></h2><p className="max-w-sm text-sm leading-6 text-muted-foreground">A working archive of systems, reports, research, and growth instruments — translated into the kind of evidence a hiring team can scan.</p></div>
      </motion.div>

      <div className="mb-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter work samples">
        {categories.map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} data-testid={`button-filter-${category.toLowerCase().replace(/[^a-z]+/g, '-')}`} className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${activeCategory === category ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/20 bg-card/40 text-muted-foreground hover:border-primary/60 hover:text-primary'}`}>{category}</button>)}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-testid="grid-work-samples">
        <AnimatePresence mode="popLayout">
          {filtered.map((sample, index) => { const Icon = sample.icon; return <motion.article layout key={sample.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.35, delay: index * 0.035 }} data-testid={`card-work-sample-${sample.id}`} className="group flex min-h-[390px] flex-col rounded-sm border border-primary/15 bg-card/70 p-5 transition-colors hover:border-primary/60 hover:bg-card">
            <div className="mb-6 flex items-start justify-between"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-sm border border-primary/25 bg-primary/10 text-primary"><Icon size={18} /></span><div><div className="font-mono text-[10px] uppercase tracking-wider text-primary">{sample.category}</div><div className="mt-1 text-[11px] text-muted-foreground">{sample.period}</div></div></div><span className="font-mono text-[10px] text-muted-foreground">/{String(index + 1).padStart(2, '0')}</span></div>
            <h3 className="max-w-[28rem] text-xl font-semibold leading-tight text-foreground">{sample.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{sample.description}</p>
            <div className="my-5 flex-1 rounded-sm border border-primary/15 bg-background/60 p-4"><MiniPreview sample={sample} /></div>
            <div className="grid grid-cols-3 gap-2 border-t border-primary/15 pt-4">{sample.metrics.map((metric) => <div key={metric.label}><div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{metric.label}</div><div className="mt-1 truncate text-sm font-medium text-foreground">{metric.value}</div></div>)}</div>
            <button type="button" onClick={() => setSelected(sample)} data-testid={`button-view-sample-${sample.id}`} className="mt-5 flex items-center justify-between border-t border-primary/15 pt-4 text-left font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:text-foreground"><span>View sample details</span><ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          </motion.article>; })}
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-between border-t border-primary/15 pt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>{filtered.length} deliverables surfaced</span><span className="hidden sm:inline-flex items-center gap-2"><Check size={13} className="text-primary" /> anonymized / sample-safe</span></div>
    </div>

    <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }} className="fixed inset-0 z-[70] grid place-items-center bg-background/85 p-4 backdrop-blur-sm"><motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} role="dialog" aria-modal="true" aria-labelledby="sample-dialog-title" data-testid={`dialog-work-sample-${selected.id}`} className="max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-sm border border-primary/30 bg-card p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{selected.category} / {selected.period}</div><h3 id="sample-dialog-title" className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-4xl">{selected.title}</h3><p className="mt-3 font-mono text-xs text-muted-foreground">{selected.role} · {selected.company}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close sample details" data-testid="button-close-sample-dialog" className="rounded-sm border border-primary/20 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"><X size={18} /></button></div><div className="my-8 rounded-sm border border-primary/15 bg-background/70 p-5"><MiniPreview sample={selected} /></div><div className="grid gap-8 sm:grid-cols-[1fr_190px]"><div><div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">What this shows</div><ul className="space-y-3 text-sm leading-6 text-muted-foreground">{selected.details.map((detail) => <li key={detail} className="flex gap-3"><ChevronRight size={16} className="mt-1 shrink-0 text-primary" />{detail}</li>)}</ul></div><div className="grid h-fit grid-cols-1 gap-3">{selected.metrics.map((metric) => <div key={metric.label} className="border-l-2 border-primary/50 pl-3"><div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{metric.label}</div><div className="mt-1 text-lg text-foreground">{metric.value}</div></div>)}</div></div></motion.div></motion.div>}</AnimatePresence>
  </section>;
}

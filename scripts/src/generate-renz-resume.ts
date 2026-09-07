import fs from "node:fs";
import path from "node:path";
import { jsPDF } from "jspdf";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 32;
const CONTENT_W = PAGE_W - MARGIN * 2;
const TARGET_BOTTOM = PAGE_H - MARGIN;

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

type ResumeData = {
  name: string;
  headline: string;
  contact: string;
  summary: string;
  skills: { category: string; items: string }[];
  experience: Experience[];
  additionalExperience: string;
  projects: { name: string; period: string; detail: string }[];
  certifications: { issuer: string; items: string }[];
  education: string;
  languages: string;
  achievements: string[];
};

const resume: ResumeData = {
  name: "Renz Tristan F. Diaz",
  headline: "Virtual Assistant | Data Entry Specialist | Automation & Systems Administration",
  contact:
    "Pangasinan, Philippines  |  +63 945 501 0597  |  renztristanfernandezdiaz@gmail.com\n" +
    "optimavirtualsolutions.replit.app  |  linkedin.com/in/tristan00",
  summary:
    "Technology-driven operations professional with 4+ years of experience supporting remote teams across administration, data operations, client success, finance, compliance, marketing, and research. Known for accurate records, clear communication, structured reporting, and practical use of automation and AI tools to keep business systems organized and moving.",
  skills: [
    { category: "Administrative Operations", items: "Virtual assistance, data entry, inbox and calendar management, document preparation, meeting coordination, research, reporting" },
    { category: "CRM & Sales Operations", items: "HubSpot, Salesforce, Zoho, Apollo, Sales Navigator, Snov.io, ZoomInfo, lead qualification, database hygiene" },
    { category: "Marketing & Growth", items: "Meta Business Suite, Canva, Klaviyo, social media management, content calendars, campaign tracking, analytics, outreach" },
    { category: "Finance & Compliance", items: "Xero, QuickBooks, Odoo, accounts payable, AML, KYC, CTF, client checks, financial reporting" },
    { category: "AI, Automation & Web", items: "ChatGPT, Claude, Gemini, Groq, Replit, Google Apps Script, Shopify, Wix, GoDaddy, workflow improvement" },
    { category: "Collaboration & Productivity", items: "Microsoft Excel, Word, Google Sheets, ClickUp, Slack, Microsoft Teams, Discord, Otter.ai, Zoom, WhatsApp" },
  ],
  experience: [
    {
      role: "Virtual Assistant",
      company: "Clicks Talent",
      location: "Netherlands | Remote",
      period: "Oct 2025 – Jul 2026",
      bullets: [
        "Conducted business research and maintained accurate spreadsheets, databases, documents, and contact records.",
        "Supported managers with calendars, meetings, reports, presentations, deadlines, and influencer communication.",
        "Organized data for reliable access and handoff across distributed teams.",
      ],
    },
    {
      role: "Client Success Intern / Client Specialist",
      company: "CrewBloom",
      location: "New York, USA | Remote",
      period: "May 2024 – Oct 2024",
      bullets: [
        "Resolved 58 customer inquiries with timely collaboration and escalation of issues when needed.",
        "Aligned company profiles and contact records in CrewHub and HubSpot while maintaining project statuses and shared-drive structure.",
      ],
    },
    {
      role: "Trade Finance Executive",
      company: "Euro Exim Bank",
      location: "Rodney Bay, Gros-Islet | On-site",
      period: "Nov 2023 – Oct 2024",
      bullets: [
        "Generated and qualified exporter/importer prospects for LC, SBLC, and bank-guarantee services.",
        "Built client relationships and reviewed trade-finance information against AML, KYC, and CTF requirements.",
      ],
    },
    {
      role: "Growth Marketing Intern / Growth Specialist",
      company: "August 99",
      location: "Ortigas, Pasig, Philippines | Remote",
      period: "Nov 2023 – May 2024",
      bullets: [
        "Sourced and qualified leads through email, LinkedIn, Facebook, Instagram, forums, and competitor research.",
        "Managed social profiles, maintained prospect data, supported targeted campaigns, and reported lead-generation metrics.",
      ],
    },
    {
      role: "Social Media Manager",
      company: "Most Viral",
      location: "Manila, Philippines",
      period: "Aug 2019 – Jan 2023",
      bullets: [
        "Managed social strategy, content calendars, publishing, audience engagement, and analytics reporting.",
        "Increased total engagements by 1.2M across managed platforms.",
      ],
    },
  ],
  additionalExperience:
    "Spatial AI Entrepreneur Intern — EON Reality (Jul–Aug 2024); Management Intern — Prophema Applied Research (Apr–Aug 2024); Accounting Intern — Scrubbed.net Global Services (Dec 2023–May 2024); Legal Deposition Interpreter — The Language Doctors (Dec 2023–Jan 2024); Virtual Assistant — HypeHive (Jun 2023–Jul 2024); DIFX Ambassador — DIFX (Aug–Nov 2023); Business Development Team Leader & Intern — GAOTek Inc. (Jun–Sep 2023); ProTripLeader — JoinMyTrip (Jul–Oct 2023); Customer Service Representative — OTC JKE British Trading & Investment (Jul 2022–Nov 2023); Anti-Money Laundering Analyst — Open NFT (Jul 2022–Aug 2023).",
  projects: [
    {
      name: "Driving Predictive, AI-Powered Growth for FMCG E-Commerce",
      period: "Jul 2026 – Present",
      detail:
        "Developed an integrated digital marketing growth approach with planning targets to increase ROAS by 20% and reduce CPA by 15%, connecting audience signals, creative testing, budget decisions, and reporting.",
    },
    {
      name: "Feasibility Study — The Tropical Treats ft. Purple Bliss Cheeseball",
      period: "Mar 2024 – Dec 2024",
      detail:
        "Led the group through a six-chapter study covering market, technical, survey, data analysis, registration/testing, and financial stability, then consolidated and presented the defense deck.",
    },
  ],
  certifications: [
    { issuer: "Google", items: "Google Ads Search & Video Professional Certification (2026); AI-Powered Performance Ads Certification" },
    { issuer: "HubSpot", items: "Inbound; Inbound Marketing; Social Media Marketing II; Email Marketing; Digital Advertising; Digital Marketing; Sales Management; Marketing Hub Software; Frictionless Sales; Social Media" },
    { issuer: "LinkedIn", items: "Marketing Solutions Fundamentals; Marketing Strategy; Content & Creative Design; Certified Marketing Insider" },
    { issuer: "Xero / QuickBooks", items: "Xero Advisor Certified; QuickBooks Online Certification" },
    { issuer: "ClickUp / Six Sigma", items: "ClickUp Build Your First Workflow (Intermediate); ClickUp Novice; Lean Six Sigma White Belt; Six Sigma Problem Solving" },
    { issuer: "AI, Cloud & Operations", items: "Microsoft Azure Cloud (AZ-104); Scrum Fundamentals Certified; OPSWAT ICIP; Klaviyo Deliverability & Practitioner; Konnect Insights Academy" },
    { issuer: "Advertising & Media", items: "X Ads Manager; X Flight School Video; X Video Ads Specialist; Snapchat Essentials; Snapchat Cross-Border Advertising; Reuters Digital Journalism" },
    { issuer: "Other Credentials", items: "GAOTek Business Development & Digital Marketing Training; Cornerstone Project Management Essentials; ACLS & PALS; EF SET English Certificate 61/100 (C1 Advanced); Master Digital Marketing; Digital Marketing & AI Certified" },
  ],
  education: "Bachelor of Science in Business Administration, Marketing Management — Universidad De Dagupan, Pangasinan, Philippines | 2021–2025",
  languages: "English — C1 Advanced (EF SET 61/100) | Filipino/Tagalog — professional interpretation | Ilonggo — professional interpretation",
  achievements: [
    "Guinness World Records™ participant: Most Users in an Artificial Intelligence Video Lesson — 14,075 participants, July 15, 2026.",
    "Delivered a 1.2M increase in total social-media engagements at Most Viral.",
    "Resolved 58 customer inquiries at CrewBloom and coordinated operations across 15 teams at Scrubbed.net.",
  ],
};

type PdfStyle = {
  body: number;
  small: number;
  section: number;
  line: number;
  gap: number;
  bulletGap: number;
};

function split(doc: jsPDF, text: string, width: number): string[] {
  return doc.splitTextToSize(text, width) as string[];
}

function renderPdf(doc: jsPDF, data: ResumeData, scale: number): number {
  const style: PdfStyle = {
    body: 8.45 * scale,
    small: 7.25 * scale,
    section: 9.2 * scale,
    line: 9.8 * scale,
    gap: 3.5 * scale,
    bulletGap: 1.8 * scale,
  };
  let y = MARGIN;

  const textBlock = (text: string, size = style.body, leading = style.line, x = MARGIN, width = CONTENT_W) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = split(doc, text, width);
    for (const line of lines) {
      doc.text(line, x, y);
      y += leading;
    }
    return lines.length;
  };

  const section = (title: string) => {
    y += style.gap;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(style.section);
    doc.setTextColor(22, 76, 99);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 2.5;
    doc.setDrawColor(75, 163, 187);
    doc.setLineWidth(0.55);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += style.line;
    doc.setTextColor(28, 35, 42);
  };

  const bulletList = (items: string[], width = CONTENT_W - 10) => {
    for (const item of items) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(style.body);
      const lines = split(doc, item, width);
      doc.text("•", MARGIN + 1, y);
      doc.text(lines[0], MARGIN + 9, y);
      y += style.line;
      for (const line of lines.slice(1)) {
        doc.text(line, MARGIN + 9, y);
        y += style.line;
      }
      y += style.bulletGap;
    }
  };

  doc.setTextColor(12, 26, 36);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20 * scale);
  doc.text(data.name, PAGE_W / 2, y + 4, { align: "center" });
  y += 16.5 * scale;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5 * scale);
  doc.setTextColor(22, 76, 99);
  doc.text(data.headline, PAGE_W / 2, y, { align: "center" });
  y += 11 * scale;
  doc.setFontSize(style.small);
  doc.setTextColor(72, 82, 92);
  for (const line of data.contact.split("\n")) {
    doc.text(line, PAGE_W / 2, y, { align: "center" });
    y += 8.5 * scale;
  }
  y += 1.5 * scale;
  doc.setDrawColor(75, 163, 187);
  doc.setLineWidth(0.7);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  doc.setTextColor(28, 35, 42);
  y += 8.5 * scale;

  textBlock(data.summary, style.body, style.line);

  section("Core Skills");
  for (const skill of data.skills) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(style.small);
    doc.text(`${skill.category}:`, MARGIN, y);
    const labelWidth = doc.getTextWidth(`${skill.category}: `);
    doc.setFont("helvetica", "normal");
    const lines = split(doc, skill.items, CONTENT_W - labelWidth);
    doc.text(lines[0], MARGIN + labelWidth, y);
    y += style.line;
    for (const line of lines.slice(1)) {
      doc.text(line, MARGIN, y);
      y += style.line;
    }
    y += 0.8 * scale;
  }

  section("Professional Experience");
  for (const role of data.experience) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(style.body);
    doc.setTextColor(12, 26, 36);
    doc.text(`${role.role} — ${role.company}`, MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(style.small);
    doc.setTextColor(72, 82, 92);
    doc.text(`${role.location} | ${role.period}`, PAGE_W - MARGIN, y, { align: "right" });
    y += style.line + 0.5 * scale;
    doc.setTextColor(28, 35, 42);
    bulletList(role.bullets);
    y += 1.2 * scale;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(style.small);
  doc.setTextColor(12, 26, 36);
  doc.text("Additional experience: ", MARGIN, y);
  const prefixWidth = doc.getTextWidth("Additional experience: ");
  doc.setFont("helvetica", "normal");
  const additionalLines = split(doc, data.additionalExperience, CONTENT_W - prefixWidth);
  doc.text(additionalLines[0], MARGIN + prefixWidth, y);
  y += style.line;
  for (const line of additionalLines.slice(1)) {
    doc.text(line, MARGIN, y);
    y += style.line;
  }

  section("Selected Projects");
  for (const project of data.projects) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(style.body);
    doc.text(project.name, MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(style.small);
    doc.setTextColor(72, 82, 92);
    doc.text(project.period, PAGE_W - MARGIN, y, { align: "right" });
    y += style.line;
    doc.setTextColor(28, 35, 42);
    textBlock(project.detail, style.small, style.line);
    y += 1 * scale;
  }

  section("Certifications & Credentials");
  for (const cert of data.certifications) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(style.small);
    doc.text(`${cert.issuer}:`, MARGIN, y);
    const issuerWidth = doc.getTextWidth(`${cert.issuer}: `);
    doc.setFont("helvetica", "normal");
    const certLines = split(doc, cert.items, CONTENT_W - issuerWidth);
    doc.text(certLines[0], MARGIN + issuerWidth, y);
    y += style.line;
    for (const line of certLines.slice(1)) {
      doc.text(line, MARGIN, y);
      y += style.line;
    }
  }

  section("Education");
  textBlock(data.education, style.small, style.line);

  section("Languages");
  textBlock(data.languages, style.small, style.line);

  section("Awards & Achievements");
  bulletList(data.achievements);

  return y;
}

function createPdf(data: ResumeData, outputDir: string): { filePath: string; finalY: number; scale: number } {
  let scale = 1;
  let probe = new jsPDF({ unit: "pt", format: "letter" });
  let finalY = renderPdf(probe, data, scale);
  while (finalY > TARGET_BOTTOM && scale > 0.82) {
    scale -= 0.03;
    probe = new jsPDF({ unit: "pt", format: "letter" });
    finalY = renderPdf(probe, data, scale);
  }
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  finalY = renderPdf(doc, data, scale);
  const filePath = path.join(outputDir, "renz-tristan-f-diaz-resume.pdf");
  fs.writeFileSync(filePath, Buffer.from(doc.output("arraybuffer")));
  return { filePath, finalY, scale };
}

function ptToHalfPoint(pt: number): number {
  return Math.round(pt * 2);
}

function ptToTwip(pt: number): number {
  return Math.round(pt * 20);
}

function makeDocx(data: ResumeData): Document {
  const body = (text: string, bold = false, size = 17) =>
    new TextRun({ text, bold, size: ptToHalfPoint(size), font: "Arial", color: "1C232A" });
  const heading = (text: string) =>
    new Paragraph({
      spacing: { before: ptToTwip(7), after: ptToTwip(3) },
      border: { bottom: { color: "4BA3BB", style: BorderStyle.SINGLE, size: 5, space: 2 } },
      children: [new TextRun({ text, bold: true, size: ptToHalfPoint(10), font: "Arial", color: "164C63" })],
    });
  const paragraph = (children: TextRun[], after = 2) =>
    new Paragraph({ spacing: { after: ptToTwip(after), line: ptToTwip(10) }, children });
  const bullet = (text: string) =>
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: ptToTwip(1), line: ptToTwip(10) },
      children: [body(text, false, 8.5)],
    });

  const children: Paragraph[] = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: ptToTwip(2) }, children: [new TextRun({ text: data.name, bold: true, size: ptToHalfPoint(20), font: "Arial", color: "0C1A24" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: ptToTwip(2) }, children: [new TextRun({ text: data.headline, size: ptToHalfPoint(9.5), font: "Arial", color: "164C63" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: ptToTwip(1) }, children: [new TextRun({ text: data.contact.replace("\n", "  |  "), size: ptToHalfPoint(7.5), font: "Arial", color: "48525C" })] }),
    heading("PROFESSIONAL SUMMARY"),
    paragraph([body(data.summary, false, 8.5)], 2),
    heading("CORE SKILLS"),
    ...data.skills.map((skill) => paragraph([body(`${skill.category}: `, true, 8), body(skill.items, false, 8)], 1)),
    heading("PROFESSIONAL EXPERIENCE"),
  ];

  for (const role of data.experience) {
    children.push(paragraph([body(`${role.role} — ${role.company}`, true, 8.5), body(`  |  ${role.location}  |  ${role.period}`, false, 7.5)], 1));
    children.push(...role.bullets.map(bullet));
  }
  children.push(heading("ADDITIONAL EXPERIENCE"));
  children.push(paragraph([body(data.additionalExperience, false, 7.5)], 1));
  children.push(heading("SELECTED PROJECTS"));
  for (const project of data.projects) {
    children.push(paragraph([body(`${project.name}  |  ${project.period}`, true, 8)], 1));
    children.push(paragraph([body(project.detail, false, 7.5)], 1));
  }
  children.push(heading("CERTIFICATIONS & CREDENTIALS"));
  children.push(...data.certifications.map((cert) => paragraph([body(`${cert.issuer}: `, true, 7.5), body(cert.items, false, 7.5)], 1)));
  children.push(heading("EDUCATION"));
  children.push(paragraph([body(data.education, false, 8)], 1));
  children.push(heading("LANGUAGES"));
  children.push(paragraph([body(data.languages, false, 8)], 1));
  children.push(heading("AWARDS & ACHIEVEMENTS"));
  children.push(...data.achievements.map(bullet));

  return new Document({
    sections: [{
      properties: {
        page: { size: { width: ptToTwip(PAGE_W), height: ptToTwip(PAGE_H) }, margin: { top: ptToTwip(MARGIN), bottom: ptToTwip(MARGIN), left: ptToTwip(MARGIN), right: ptToTwip(MARGIN) } },
      },
      children,
    }],
  });
}

async function main() {
  const outputDir = path.resolve(process.cwd(), "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const pdf = createPdf(resume, outputDir);
  const docx = await Packer.toBuffer(makeDocx(resume));
  const docxPath = path.join(outputDir, "renz-tristan-f-diaz-resume.docx");
  fs.writeFileSync(docxPath, docx);
  const jsonPath = path.join(outputDir, "renz-tristan-f-diaz-resume-data.json");
  fs.writeFileSync(jsonPath, JSON.stringify({ ...resume, pdfFinalY: pdf.finalY, pdfScale: pdf.scale }, null, 2));
  console.log(JSON.stringify({ pdf: pdf.filePath, docx: docxPath, json: jsonPath, finalY: pdf.finalY, scale: pdf.scale }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
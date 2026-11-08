/* =========================================================
   GideonOS — window manager, phone shell and app content
   ========================================================= */
(() => {
"use strict";

/* ---------------- DATA (from CV) ---------------- */
const CV_URL = "assets/resume/Gideon_Atoyah_CV.pdf";
const EMAIL = "gideonatoyah@gmail.com";
const LINKS = {
  linkedin: "https://www.linkedin.com/in/gideon-atoyah-aa206a241/",
  github: "https://github.com/Gatoyah",
  x: "https://x.com/g_hebbron20",
  kaggle: "https://www.kaggle.com/gideonatoyah",
};

const PROJECTS = [
  {
    id: "thr",
    title: "Synthetic X-ray Generation & Deep Learning Segmentation for THR Assessment",
    short: "Synthetic X-rays → U-Net implant segmentation",
    period: "Jan 2026 – Present",
    kind: "Independent Research",
    status: ["live", "Ongoing · model training"],
    visual: "xray",
    tags: ["Python", "PyTorch", "DeepDRR", "3D Slicer", "U-Net", "HRNet", "TCIA"],
    summary: "Clinical X-rays of total hip replacements are scarce and expensive to label. I generate realistic, perfectly-labelled radiographs from CT instead — then teach a network to find the implant in real ones.",
    bullets: [
      "Built a synthetic X-ray pipeline: inserted 3D implant models into TCIA CT volumes (3D Slicer) and rendered synthetic X-rays via DeepDRR.",
      "Wrote a custom tool to randomize noise, sharpness and blur so the model sees the variability of real clinical imaging.",
      "Training a U-Net segmentation model on the synthetic data and testing generalization on OrthoNet (real clinical X-rays).",
      "Next phase adds HRNet for landmark detection and computation of clinical parameters.",
    ],
    flow: ["TCIA CT volumes", "Implant insertion · 3D Slicer", "DRR rendering · DeepDRR", "Noise / blur / sharpness randomizer", "U-Net segmentation", "Test on OrthoNet (real X-rays)", { next: "HRNet landmarks → clinical parameters" }],
    links: [{ label: "Kaggle notebook (DeepDRR pipeline)", url: "https://www.kaggle.com/code/gideonatoyah/deepdrr-final-version" }],
  },
  {
    id: "fsr",
    title: "FSR-Based In-Cast Pressure Monitoring System",
    short: "Final-year thesis · real-time 3D pressure map",
    period: "2024 – 2025",
    kind: "Final-Year Thesis (BME 497/498) · Supervisor: Dr Isaac Acquah · Group Leader",
    status: ["done", "Defended · 83% / 84%"],
    visual: "heat",
    tags: ["Force-sensitive resistors", "Arduino Nano", "Bluetooth", "FastAPI", "PyQt5", "Python"],
    summary: "Casts can cause pressure sores, and clinicians usually can’t see what’s happening under them. This system measures cast-induced skin pressure objectively and shows it live.",
    bullets: [
      "Designed a system to objectively measure cast-induced skin pressure using 8 FSR sensors, an Arduino Nano signal chain, Bluetooth transfer and a FastAPI backend.",
      "Built a PyQt5 desktop app visualizing pressure as a real-time 3D heat-map.",
      "Defended before a panel; BME 497/498 graded 83% and 84%.",
      "Presented as a poster at KNUST Technology Week (TWEEK), Aug 2025.",
    ],
    flow: ["8 × FSR sensors under the cast", "Arduino Nano signal chain", "Bluetooth transfer", "FastAPI backend", "PyQt5 real-time 3D heat-map"],
    links: [{ label: "Thesis paper (PDF)", url: "https://drive.google.com/file/d/1Ihjj4UtXsLaWBCMQl6hGLEN6A8Ot6qAt/view?usp=sharing" }],
  },
  {
    id: "cleft",
    title: "National Cleft Registry System",
    short: "Offline-first patient registry across hospitals",
    period: "2026",
    kind: "Independent Software Project · solo-built",
    status: ["done", "Packaged for deployment"],
    visual: "net",
    tags: ["Next.js", "TypeScript", "SQLite", "Offline-first sync", "Windows packaging"],
    summary: "A two-hub system for tracking cleft lip and palate patients across Ghanaian hospitals — designed to keep working when the internet doesn’t.",
    bullets: [
      "Built a two-hub (Next.js / TypeScript / SQLite) system for tracking cleft lip/palate patients across Ghanaian hospitals.",
      "Offline-first sync to a central hub at Komfo Anokye Teaching Hospital.",
      "Independently fixed critical bugs — data loss, broken sync and unauthenticated endpoints.",
      "Packaged the system for Windows hospital deployment.",
    ],
    flow: ["Hospital hub · local SQLite", "Offline-first capture", "Sync engine", "Central hub · Komfo Anokye Teaching Hospital"],
    links: [{ label: "Source code (GitHub)", url: "https://github.com/Gatoyah/national-cleft-register" }],
  },
  {
    id: "dispenser",
    title: "Smart Drug Delivery Dispenser",
    short: "Arduino prototype for supervised dosing",
    period: "2023",
    kind: "Group Course Project · COE 381 Microprocessors (84%) · Lead Programmer",
    status: ["done", "Prototype · demoed"],
    visual: "cycle",
    tags: ["Arduino", "C", "LCD", "Ultrasonic sensor", "Embedded systems"],
    summary: "A prototype medication dispenser that won’t stop reminding you until you physically show up for your dose.",
    bullets: [
      "Built from an Arduino microcontroller, LCD, ultrasonic distance sensor, push buttons and a cardboard housing, to support timed, supervised drug intake.",
      "The user sets the dosing time; at that time an alarm sounds continuously until the user moves within range of the ultrasonic sensor, which releases the dose and restarts the timer.",
      "Solely responsible for programming the entire system — timer logic, user interface, alarm control and sensor-triggered dispensing.",
    ],
    flow: ["Set dose time (buttons + LCD)", "Timer counts down", "Alarm sounds", "Patient steps into range", "Dose released", "Timer restarts"],
    loop: true,
    links: [{ label: "Demonstration video", url: "https://drive.google.com/file/d/13737OK-5fknL-LAh-0qhKzXwoQpZAZQT/view?usp=sharing" }],
  },
];

const MARKS = [
  ["C Programming", 95], ["Object-Oriented Programming", 93], ["Semiconductor Devices", 91],
  ["Bioinstrumentation I", 88], ["Digital Signal Processing", 88], ["Biomedical Engineering Design I", 88],
  ["Biomedical Engineering Design II", 88], ["Microprocessors", 84], ["Project II", 84], ["Project I", 83],
  ["Medical Device Regulation", 80],
];
const MARK = Object.fromEntries(MARKS);

const TRACKS = {
  "Imaging & Signals": ["Medical Imaging I", "Medical Imaging II", "Biosignal Processes and Analysis", "Digital Signal Processing", "Signals and Systems", "Biomedical Optics"],
  "Instrumentation & Embedded": ["Bioinstrumentation I", "Bioinstrumentation II", "Embedded Systems", "Microprocessors", "Semiconductor Devices"],
  "Biomechanics & Materials": ["Biomechanics I", "Biomechanics II", "Biomaterials I", "Biomaterials II"],
  "Maths & Research": ["Numerical Methods", "Probability and Statistics", "Research Methods"],
  "Design & Regulation": ["Biomedical Engineering Design I", "Biomedical Engineering Design II", "Medical Device Regulation", "Project I", "Project II"],
  "Programming": ["C Programming", "Object-Oriented Programming"],
};

const SKILLS = [
  { t: "Deep learning & imaging", ico: "brain", g: "g-violet", d: "Synthetic data generation and segmentation model training.", items: ["Python", "PyTorch", "DeepDRR", "3D Slicer", "U-Net", "HRNet"], used: "THR segmentation research" },
  { t: "Programming & software", ico: "code", g: "g-blue", d: "Full-stack development and deployment.", items: ["Python", "TypeScript", "C", "FastAPI", "SQLite", "InfluxDB", "Next.js", "PyQt5", "ReportLab"], used: "Cleft Registry · In-cast monitor · PM protocols" },
  { t: "Instrumentation & CAD", ico: "chip", g: "g-teal", d: "Sensor and circuit design, embedded systems, 3D modelling and FEA.", items: ["Sensor / circuit design", "EasyEDA", "Proteus", "Arduino", "SolidWorks", "FEA"], used: "In-cast monitor · Drug dispenser" },
  { t: "Clinical equipment", ico: "hospital", g: "g-rose", d: "Maintenance, calibration and installation in teaching hospitals.", items: ["Patient monitors", "Ventilators", "Anaesthesia machines", "Dialysis machines", "C-arms", "Infusion pumps", "Oxygen plants"], used: "Komfo Anokye · Tamale · Holy Family Berekum" },
];

const EXPERIENCE = [
  { date: "Sep 2026 — Present", now: true, role: "Biomedical Engineer", org: "GS Medikals & Birim Energy", pts: [
    "Building an oxygen production room and pipe integration at Holy Family Catholic Hospital, Berekum.",
    "Installing oxygen production equipment, bed head units and ceiling pendants at Tamale Teaching Hospital and Komfo Anokye Teaching Hospital.",
  ]},
  { date: "Nov 2025 — Aug 2026", role: "National Service Personnel", org: "Komfo Anokye Teaching Hospital", pts: [
    "Supported hands-on installation of patient monitors, C-arms, dialysis machines, ventilators and anaesthesia machines alongside manufacturer engineers (Iberica, Nivaansh).",
    "Performed theatre preparation, device calibration and preventive maintenance.",
    "Generated standardized PM protocol documentation (ReportLab) and delivered an internal presentation on ventilators and anaesthesia machines.",
  ]},
  { date: "Aug 2025", role: "Poster Presentation — FSR-Based In-Cast Pressure Monitoring System", org: "Technology Week (TWEEK), Dept. of Computer Engineering, KNUST", pts: [
    "Presented my final-year thesis poster to students and business partners at the department-hosted technology week.",
  ]},
  { date: "Sep–Dec 2022 & Sep–Dec 2023", role: "Intern", org: "Komfo Anokye Teaching Hospital", pts: [
    "Diagnosed and resolved faults in BP apparatus, suction machines, glucometers and infusion pumps.",
    "Developed proficiency fixing power-related issues in AC-powered medical devices.",
  ]},
];

const CERTS = [
  { group: "Imaging & machine learning", items: [
    ["Introduction to Machine Learning", "Coursera"], ["Fundamentals of Biomedical Imaging 1", "Coursera"], ["Medical Image Processing", "Coursera"],
    ["Introduction to AI", "ALX · 2024"], ["AI and Machine Learning", "Dr Isaac Acquah · 2024"],
  ]},
  { group: "Biomechanics & robotics", items: [
    ["Musculoskeletal Anatomy", "Coursera"], ["Anthropometry, Biomechanics, and Motor Skills in User Design", "Coursera"],
    ["Theoretical Bases of Health and Injury Management", "Coursera"], ["Modern Robotics", "Coursera"],
  ]},
  { group: "Engineering, clinical & software", items: [
    ["SOLIDWORKS Essential Training & FEA Simulation", "LinkedIn Learning · 2026"], ["Project Management — Healthcare Projects, Asana", "LinkedIn Learning / PMI · 2026"],
    ["Dialysis Training", "Dr Isaac Acquah · 2024"], ["Python Programming", "Udemy · 2024–2025"], ["Frontend Development", "CodTech IT Solutions · 2024"],
  ]},
];

/* ---------------- ICONS ---------------- */
const GLYPH = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
  flask: '<path d="M9 3h6M10 3v6L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9V3"/><path d="M7.5 15h9"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  hospital: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M12 10.5v6M9 13.5h6"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  term: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  pulse: '<path d="M2 12h5l2-5 4 10 2-5h7"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  in: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v7M8 7v.01M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7"/>',
  gh: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  xlogo: '<path d="M4 4l16 16M20 4 4 20"/>',
  k: '<path d="M7 3v18M17 4l-8 8 8 8M10 11l7-7"/>',
  chev: '<path d="m15 5-7 7 7 7"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  min: '<path d="M5 12h14"/>',
  max: '<path d="M7 17 17 7M9 7h8v8"/>',
};
const G = {
  "g-teal": "linear-gradient(145deg,#2dd4bf,#0f766e)",
  "g-violet": "linear-gradient(145deg,#a78bfa,#5b21b6)",
  "g-blue": "linear-gradient(145deg,#60a5fa,#1d4ed8)",
  "g-amber": "linear-gradient(145deg,#fcd34d,#d97706)",
  "g-rose": "linear-gradient(145deg,#fb7185,#be123c)",
  "g-green": "linear-gradient(145deg,#4ade80,#15803d)",
  "g-slate": "linear-gradient(145deg,#475569,#0f172a)",
  "g-ink": "linear-gradient(145deg,#1f2937,#030712)",
  "g-sky": "linear-gradient(145deg,#38bdf8,#0369a1)",
  "g-white": "linear-gradient(145deg,#f8fafc,#cbd5e1)",
};
const svg = (name, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${GLYPH[name]}</svg>`;
const ico = (name, g) => `<span class="ico" style="--g:${G[g] || g}">${svg(name)}</span>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* X-ray illustration (stylised, not real patient data) */
const xraySVG = (opts = {}) => `
<div class="xray ${opts.noisy ? "noisy" : ""}">
  ${opts.label ? `<span class="lbl">${opts.label}</span>` : ""}
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <path class="bone" d="M8 30 C20 14 42 12 52 22 C60 30 58 40 50 44 C40 48 30 44 22 46 C14 48 6 42 8 30Z"/>
    <path class="bone" d="M44 40 C52 34 64 36 66 46 L70 96 L52 96 L54 58 C50 54 44 50 44 40Z"/>
    <circle class="implant" cx="50" cy="34" r="8"/>
    <path class="implant" d="M52 40 L60 44 L62 92 L57 92 L55 52 Z"/>
    ${opts.mask === false ? "" : `<circle class="mask" cx="50" cy="34" r="9"/><path class="mask" d="M51 39 L61 43 L63 93 L56 93 L54 52 Z"/>`}
  </svg>
  ${opts.scan === false ? "" : '<div class="scan"></div>'}
</div>`;

/* ---------------- APPS ---------------- */
const APPS = {
  about:      { name: "About Me",     icon: "user",     g: "g-teal",   w: 760, h: 620, render: renderAbout },
  research:   { name: "Research",     icon: "flask",    g: "g-violet", w: 940, h: 640, render: renderResearch, mount: mountResearch },
  courses:    { name: "Courses",      icon: "cap",      g: "g-blue",   w: 860, h: 640, render: renderCourses, mount: mountCourses },
  skills:     { name: "Skills",       icon: "chip",     g: "g-amber",  w: 780, h: 580, render: renderSkills },
  experience: { name: "Experience",   icon: "hospital", g: "g-rose",   w: 720, h: 620, render: renderExperience },
  certs:      { name: "Certificates", icon: "award",    g: "g-green",  w: 720, h: 600, render: renderCerts },
  cv:         { name: "CV.pdf",       icon: "doc",      g: "g-white",  w: 760, h: 760, render: renderCV },
  terminal:   { name: "Terminal",     icon: "term",     g: "g-ink",    w: 680, h: 440, render: renderTerminal, mount: mountTerminal },
  mail:       { name: "Contact",      icon: "mail",     g: "g-sky",    w: 640, h: 620, render: renderMail, mount: mountMail },
  settings:   { name: "Settings",     icon: "sliders",  g: "g-slate",  w: 520, h: 460, render: renderSettings, mount: mountSettings },
};
// white CV icon needs dark glyph
const iconFor = (id) => {
  const a = APPS[id];
  return id === "cv" ? `<span class="ico" style="--g:${G["g-white"]};color:#0f172a">${svg(a.icon)}</span>` : ico(a.icon, a.g);
};

function renderAbout() {
  return `<div class="pad">
    <div class="about-hero">
      <div class="portrait"><img src="images/gideonnn.png" alt="Portrait of Gideon Atoyah"></div>
      <div>
        <div class="eyebrow">Hello, I’m</div>
        <h1 class="h1" style="font-size:38px">Gideon <em>Atoyah</em></h1>
        <p class="lead">Biomedical Engineering graduate (<b>First Class Honours, KNUST</b>) with hospital clinical engineering experience and independent research in sensor-based medical devices, embedded systems, health software and deep learning for medical imaging.</p>
        <p class="lead" style="margin-top:10px">I’m currently developing a synthetic-data pipeline and segmentation model for orthopaedic implant localization in X-ray imaging, and I’m <b>seeking PhD and research-based graduate study</b>.</p>
        <div class="row-btns">
          <button class="btn primary sm" data-open="research">${svg("flask")}See my research</button>
          <button class="btn ghost sm" data-open="cv">${svg("doc")}CV</button>
          <button class="btn ghost sm" data-open="mail">${svg("mail")}Get in touch</button>
        </div>
      </div>
    </div>
    <div class="facts">
      <div class="fact"><span>Degree</span><b>BSc Biomedical Eng.</b></div>
      <div class="fact"><span>Classification</span><b>First Class · 74.35</b></div>
      <div class="fact"><span>University</span><b>KNUST, 2021–2025</b></div>
      <div class="fact"><span>Currently</span><b>Biomedical Engineer</b></div>
    </div>
    <h2 class="h2">Research interests</h2>
    <div class="interests">
      <div class="interest">${ico("pulse", "g-violet")}<div><b>Medical imaging</b><span>Synthetic radiographs, DRRs, segmentation</span></div></div>
      <div class="interest">${ico("brain", "g-blue")}<div><b>ML for healthcare</b><span>Deep learning on clinical data, generalization</span></div></div>
      <div class="interest">${ico("chip", "g-teal")}<div><b>Bioinstrumentation</b><span>Sensors, signal chains, embedded devices</span></div></div>
      <div class="interest">${ico("user", "g-rose")}<div><b>Biomechanics</b><span>Orthopaedics, pressure, musculoskeletal design</span></div></div>
    </div>
    <h2 class="h2">Education</h2>
    <div class="grid" style="gap:10px">
      <div class="card edu"><img src="images/knustlogo.png" alt="KNUST logo"><div><b>BSc Biomedical Engineering — First Class Honours</b><span>Kwame Nkrumah University of Science and Technology · Kumasi · 2021 – 2025</span></div></div>
      <div class="card edu"><img src="images/sthubertlogo.png" alt="St Hubert Seminary logo"><div><b>W.A.S.S.C.E — General Science</b><span>St Hubert Seminary Senior High School · Kumasi · 2018 – 2021</span></div></div>
    </div>
    <h2 class="h2">Leadership</h2>
    <ul class="bul">
      <li><b>Group Leader</b> — FSR-Based In-Cast Pressure Monitoring System (final-year thesis, BME 497/498)</li>
      <li><b>Secretary</b> — Presbyterian Church Choir</li>
    </ul>
  </div>`;
}

function projectVisual(p) {
  if (p.visual === "xray") return `<div class="visual"><div class="big-xray">
      ${xraySVG({ label: "1 · DRR", mask: false, scan: false })}
      ${xraySVG({ label: "2 · AUGMENTED", noisy: true, mask: false, scan: false })}
      ${xraySVG({ label: "3 · U-NET MASK" })}
    </div><span class="cap">Stylised illustration of the pipeline stages</span></div>`;
  if (p.visual === "heat") return `<div class="visual"><div class="heat" data-heat>${Array.from({ length: 8 }, (_, i) => `<i>FSR ${i + 1}</i>`).join("")}</div><span class="cap">Illustration · 8-sensor pressure array</span></div>`;
  if (p.visual === "net") {
    const nodes = [[70, 50, "Hospital A"], [80, 150, "Hospital B"], [530, 45, "Hospital C"], [520, 155, "Hospital D"]];
    return `<div class="visual"><svg class="net" viewBox="0 0 600 200">
      ${nodes.map(([x, y]) => `<path class="link" d="M${x} ${y} Q300 ${y < 100 ? 40 : 160} 300 100"/>`).join("")}
      ${nodes.map(([x, y, t]) => `<circle class="node" cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y + (y < 100 ? -16 : 26)}" text-anchor="middle">${t}</text>`).join("")}
      <circle class="hub" cx="300" cy="100" r="16"/><text x="300" y="136" text-anchor="middle">Central hub · KATH</text>
    </svg><span class="cap">Offline-first hubs syncing to the centre</span></div>`;
  }
  if (p.visual === "cycle") return `<div class="visual"><div class="cycle" data-cycle>${p.flow.map((s, i) => `<div><b>0${i + 1}</b>${esc(s)}</div>`).join("")}</div></div>`;
  return "";
}

function renderProject(p) {
  const flow = p.flow.map((s) => typeof s === "string" ? `<span class="step">${esc(s)}</span>` : `<span class="step next">Next: ${esc(s.next)}</span>`).join('<span class="arr">→</span>');
  return `<div class="pad">
    <div class="proj-head"><span class="badge ${p.status[0]}">${p.status[1]}</span><span class="chip">${p.period}</span></div>
    <h1 class="h1">${esc(p.title)}</h1>
    <p class="proj-meta">${esc(p.kind)}</p>
    <p class="lead" style="margin-bottom:18px">${esc(p.summary)}</p>
    ${projectVisual(p)}
    <h2 class="h2">${p.loop ? "How it works" : "Pipeline"}</h2>
    <div class="flow ${p.loop ? "loop" : ""}">${flow}</div>
    <h2 class="h2">What I did</h2>
    <ul class="bul">${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    <h2 class="h2">Tools</h2>
    <div class="chips">${p.tags.map((t) => `<span class="chip acc">${esc(t)}</span>`).join("")}</div>
    <div class="row-btns">${p.links.map((l) => `<a class="btn primary sm" href="${l.url}" target="_blank" rel="noopener">${svg("ext")}${esc(l.label)}</a>`).join("")}</div>
  </div>`;
}

function renderResearch() {
  return `<div class="split">
    <aside class="side">
      <div class="side-h">Research & projects</div>
      ${PROJECTS.map((p, i) => `<button class="side-item ${i === 0 ? "on" : ""}" data-proj="${i}"><b>${esc(p.title.replace(/\s*\(.*\)/, ""))}</b><span>${p.period} · ${esc(p.short)}</span></button>`).join("")}
    </aside>
    <div class="detail" data-detail>${renderProject(PROJECTS[0])}</div>
  </div>`;
}
function mountResearch(root, opts = {}) {
  let timers = [];
  const show = (i) => {
    timers.forEach(clearInterval); timers = [];
    root.querySelectorAll(".side-item").forEach((b) => b.classList.toggle("on", +b.dataset.proj === i));
    const d = root.querySelector("[data-detail]");
    d.innerHTML = renderProject(PROJECTS[i]);
    d.scrollTop = 0;
    const scroller = root.closest(".win-body, .sheet-body");
    if (scroller && root.closest(".narrow")) { /* keep sidebar visible on phone */ }
    const heat = d.querySelector("[data-heat]");
    if (heat) {
      const cells = [...heat.children];
      const tick = () => cells.forEach((c, k) => c.style.setProperty("--h", Math.round(220 - (0.5 + 0.5 * Math.sin(Date.now() / 900 + k * 1.3)) * 220)));
      tick(); timers.push(setInterval(tick, 1000));
    }
    const cyc = d.querySelector("[data-cycle]");
    if (cyc) {
      let k = 0; const cells = [...cyc.children];
      const step = () => { cells.forEach((c, j) => c.classList.toggle("on", j === k)); k = (k + 1) % cells.length; };
      step(); timers.push(setInterval(step, 1100));
    }
  };
  root.addEventListener("click", (e) => { const b = e.target.closest("[data-proj]"); if (b) show(+b.dataset.proj); });
  root._select = show;
  show(opts.project ?? 0);
  return () => timers.forEach(clearInterval);
}

function renderCourses() {
  const tabs = ["All", ...Object.keys(TRACKS)];
  return `<div class="pad">
    <div class="eyebrow">Academic transcript · KNUST</div>
    <h1 class="h1">BSc Biomedical Engineering, <em>First Class</em></h1>
    <div class="statband" style="margin-top:16px">
      <div class="card stat"><b>74.35<small>/100</small></b><span>Cumulative weighted average</span></div>
      <div class="card stat"><b>152</b><span>Credit hours</span></div>
      <div class="card stat"><b>80.81</b><span>Best semester · Y4 S2</span></div>
      <div class="card stat"><b>95</b><span>Top mark · C Programming</span></div>
    </div>
    <h2 class="h2">Trajectory</h2>
    <div class="traj card">
      <div class="traj-bar">
        <div class="first" title="First Class threshold (70)"></div>
        <div class="fill" style="--from:${scale(67.63)}%" data-to="${scale(74.35) - scale(67.63)}"></div>
        <div class="mk dn" style="left:${scale(67.63)}%"><span>Year 1 · <b>67.63</b></span></div>
        <div class="mk up" style="left:${scale(74.35)}%"><span>Final CWA · <b>74.35</b></span></div>
        <div class="mk up sem" style="left:${scale(80.48)}%;opacity:.55"><span>Y2 S1 · <b>80.48</b></span></div>
        <div class="mk dn sem" style="left:${scale(80.81)}%;opacity:.55"><span>Y4 S2 · <b>80.81</b></span></div>
      </div>
      <p class="muted" style="font-size:12.5px">Scale 60 → 85. Dashed line marks the First Class threshold (70). Cumulative average rose from 67.63 (Year 1) to 74.35; faded markers are the best semesters (80.48 in Y2 S1, 80.81 in Y4 S2).</p>
    </div>
    <h2 class="h2">Highest marks</h2>
    <div class="marks">${MARKS.map(([n, m]) => `<div class="mark"><span>${n}</span><div class="bar"><i data-w="${m}"></i></div><b>${m}</b></div>`).join("")}</div>
    <h2 class="h2">Relevant coursework</h2>
    <div class="tabs">${tabs.map((t, i) => `<button class="tab ${i ? "" : "on"}" data-track="${t}">${t}</button>`).join("")}</div>
    <div class="courses" data-courses></div>
  </div>`;
}
function scale(v) { return ((v - 60) / 25) * 100; }
function mountCourses(root) {
  const list = root.querySelector("[data-courses]");
  const draw = (track) => {
    const entries = track === "All" ? Object.entries(TRACKS).flatMap(([t, cs]) => cs.map((c) => [c, t])) : TRACKS[track].map((c) => [c, track]);
    list.innerHTML = entries.map(([c, t], i) => `<div class="course" style="animation-delay:${i * 22}ms"><div><b>${c}</b><span>${t}</span></div>${MARK[c] ? `<em>${MARK[c]}</em>` : ""}</div>`).join("");
  };
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-track]"); if (!b) return;
    root.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t === b)); draw(b.dataset.track);
  });
  draw("All");
  requestAnimationFrame(() => setTimeout(() => {
    root.querySelectorAll("[data-w]").forEach((i) => (i.style.width = i.dataset.w + "%"));
    const f = root.querySelector(".traj-bar .fill"); f.style.width = f.dataset.to + "%";
  }, 120));
}

function renderSkills() {
  return `<div class="pad">
    <div class="eyebrow">Toolbox</div>
    <h1 class="h1">From the <em>bench</em> to the GPU.</h1>
    <p class="lead">Skills grounded in real projects — every tool below was used in research, coursework or a hospital.</p>
    <div class="grid g2" style="margin-top:20px">
      ${SKILLS.map((s) => `<div class="card skillcard">
        <header>${ico(s.ico, s.g)}<div><h3>${s.t}</h3><p>${s.d}</p></div></header>
        <div class="chips">${s.items.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        <div class="used">Used in: <b>${s.used}</b></div>
      </div>`).join("")}
    </div>
  </div>`;
}

function renderExperience() {
  return `<div class="pad">
    <div class="eyebrow">Clinical engineering & presentations</div>
    <h1 class="h1">Hands on <em>real</em> hospital equipment.</h1>
    <p class="lead" style="margin-bottom:24px">Theatre prep, calibration, installation and repair across Ghana’s teaching hospitals — the context my research is built for.</p>
    <div class="tl">${EXPERIENCE.map((x) => `<div class="tl-item ${x.now ? "now" : ""}">
      <div class="tl-date">${x.date}</div><h3>${x.role}</h3><div class="tl-org">${x.org}</div>
      <ul class="bul">${x.pts.map((p) => `<li>${p}</li>`).join("")}</ul></div>`).join("")}
    </div>
  </div>`;
}

function renderCerts() {
  return `<div class="pad">
    <div class="eyebrow">Beyond the degree</div>
    <h1 class="h1">Certifications & <em>online coursework</em></h1>
    ${CERTS.map((g) => `<h2 class="h2">${g.group}</h2><div class="cert-group">${g.items.map(([t, s]) => `<div class="cert"><span class="seal">${svg("check")}</span><div><b>${t}</b><span>${s}</span></div></div>`).join("")}</div>`).join("")}
  </div>`;
}

function renderCV() {
  const btns = `<a class="btn primary sm" href="${CV_URL}" download>${svg("download")}Download</a><a class="btn ghost sm" href="${CV_URL}" target="_blank" rel="noopener">${svg("ext")}Open</a>`;
  if (isPhone()) return `<div class="cv-phone"><div class="cv-doc">${"<i></i>".repeat(12)}</div><h1 class="h1">Gideon_Atoyah_CV.pdf</h1><p class="muted">2 pages · updated 2026</p><div class="row-btns" style="justify-content:center">${btns}</div></div>`;
  return `<div class="cv-wrap"><div class="cv-bar"><span class="muted">Gideon_Atoyah_CV.pdf — 2 pages</span>${btns}</div><iframe class="cv-frame" src="${CV_URL}#view=FitH" title="Gideon Atoyah CV"></iframe></div>`;
}

function renderMail() {
  return `<div class="pad">
    <div class="eyebrow">Supervisors, labs & admissions</div>
    <h1 class="h1">Let’s <em>talk research.</em></h1>
    <p class="lead" style="margin-bottom:18px">I’m looking for PhD and research-based graduate positions in medical imaging, ML for healthcare, bioinstrumentation and biomechanics.</p>
    <form class="mail" data-mail>
      <label>To<input value="${EMAIL}" readonly></label>
      <label>From<input name="from" placeholder="Your name, lab or university" required></label>
      <label>Subject<input name="subject" placeholder="PhD position / collaboration" required></label>
      <textarea name="body" placeholder="Write your message…" required></textarea>
      <div><button class="btn primary sm" type="submit">${svg("mail")}Send message</button></div>
    </form>
    <h2 class="h2">Elsewhere</h2>
    <div class="contacts">
      <a class="contact" href="mailto:${EMAIL}">${ico("mail", "g-sky")}<div><b>Email</b><span>${EMAIL}</span></div></a>
      <a class="contact" href="${LINKS.linkedin}" target="_blank" rel="noopener">${ico("in", "g-blue")}<div><b>LinkedIn</b><span>Gideon Atoyah</span></div></a>
      <a class="contact" href="${LINKS.github}" target="_blank" rel="noopener">${ico("gh", "g-ink")}<div><b>GitHub</b><span>@Gatoyah</span></div></a>
      <a class="contact" href="${LINKS.kaggle}" target="_blank" rel="noopener">${ico("k", "g-sky")}<div><b>Kaggle</b><span>@gideonatoyah</span></div></a>
      <a class="contact" href="${LINKS.x}" target="_blank" rel="noopener">${ico("xlogo", "g-slate")}<div><b>X</b><span>@g_hebbron20</span></div></a>
    </div>
  </div>`;
}
function mountMail(root) {
  root.querySelector("[data-mail]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get("body")}\n\n— ${f.get("from")}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(body)}`;
    toast("Opening your mail app…");
  });
}

function renderSettings() {
  return `<div class="pad">
    <h1 class="h1" style="font-size:24px">Settings</h1>
    <div class="set-row"><div><b>Appearance</b><span>Dark, light or follow your device</span></div>
      <div class="seg" data-seg="theme">${["dark", "light", "system"].map((t) => `<button data-v="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div></div>
    <div class="set-row"><div><b>Accent</b><span>Tint for highlights and charts</span></div>
      <div class="swatches">${[["teal", "#5eead4"], ["violet", "#a78bfa"], ["amber", "#fbbf24"], ["blue", "#60a5fa"]].map(([n, c]) => `<button class="swatch" data-accent="${n}" style="background:${c}" aria-label="${n}"></button>`).join("")}</div></div>
    <div class="set-row"><div><b>Calm mode</b><span>Turn off background animation</span></div>
      <div class="seg" data-seg="calm"><button data-v="off">Off</button><button data-v="on">On</button></div></div>
    <div class="set-row" style="border:0"><div><b>About GideonOS</b><span>Version 26 · Biomedical Edition</span></div>
      <button class="btn ghost sm" data-reboot>Restart</button></div>
  </div>`;
}
function mountSettings(root) {
  const sync = () => {
    root.querySelectorAll('[data-seg="theme"] button').forEach((b) => b.classList.toggle("on", b.dataset.v === prefs.theme));
    root.querySelectorAll('[data-seg="calm"] button').forEach((b) => b.classList.toggle("on", b.dataset.v === (prefs.calm ? "on" : "off")));
    root.querySelectorAll("[data-accent]").forEach((b) => b.classList.toggle("on", b.dataset.accent === prefs.accent));
  };
  root.addEventListener("click", (e) => {
    const t = e.target.closest('[data-seg="theme"] button'); if (t) setPref("theme", t.dataset.v);
    const c = e.target.closest('[data-seg="calm"] button'); if (c) setPref("calm", c.dataset.v === "on");
    const a = e.target.closest("[data-accent]"); if (a) setPref("accent", a.dataset.accent);
    if (e.target.closest("[data-reboot]")) { try { sessionStorage.removeItem("booted"); } catch {} location.reload(); }
    sync();
  });
  sync();
}

/* ---------------- TERMINAL ---------------- */
function renderTerminal() {
  return `<div class="term"><div class="out" data-out></div><div class="line"><span class="c">gideon@atoyah-os</span><span class="m">~</span><span>$</span><input data-in aria-label="Terminal input" autocomplete="off" spellcheck="false"></div></div>`;
}
const NEOFETCH = `<span class="c">   ╱╲      </span>  <span class="c">gideon</span>@<span class="c">atoyah-os</span>
<span class="c">  ╱  ╲ ╱╲  </span>  ─────────────────────
<span class="c">──    ╲╱  ─</span>  <span class="v">OS</span>        GideonOS 26 (Biomedical Edition)
<span class="c">           </span>  <span class="v">Degree</span>    BSc Biomedical Eng. · First Class (KNUST)
<span class="c">           </span>  <span class="v">CWA</span>       74.35 / 100 over 152 credits
<span class="c">           </span>  <span class="v">Research</span>  Medical imaging · ML for healthcare
<span class="c">           </span>  <span class="v">Stack</span>     Python · PyTorch · DeepDRR · 3D Slicer
<span class="c">           </span>  <span class="v">Now</span>       Training U-Net on synthetic X-rays
<span class="c">           </span>  <span class="v">Seeking</span>   PhD / research graduate study
`;
const CMDS = {
  help: () => `Available commands:
  <span class="c">whoami</span>      short bio            <span class="c">research</span>   list research projects
  <span class="c">grades</span>      transcript summary   <span class="c">courses</span>    relevant coursework
  <span class="c">skills</span>      toolbox              <span class="c">contact</span>    how to reach me
  <span class="c">neofetch</span>    system info          <span class="c">cv</span>         open my CV
  <span class="c">open</span> &lt;app&gt;  about | research | courses | skills | experience | certs | mail
  <span class="c">clear</span>       clear the screen`,
  whoami: () => "Gideon Atoyah — Biomedical Engineer (First Class, KNUST).\nI work on deep learning for medical imaging and sensor-based medical devices.\nSeeking PhD and research-based graduate study.",
  neofetch: () => NEOFETCH,
  research: () => PROJECTS.map((p, i) => `<span class="y">[${i + 1}]</span> ${esc(p.title)}\n    <span class="m">${p.period} · ${p.status[1]}</span>`).join("\n") + `\n\nType <span class="c">open research</span> for details.`,
  grades: () => `CWA <span class="c">74.35</span>/100 · 152 credit hours · <span class="v">First Class</span>\nYear 1 cumulative 67.63 → final 74.35\nBest semesters: 80.48 (Y2 S1), 80.81 (Y4 S2)\nTop marks: ${MARKS.slice(0, 5).map(([n, m]) => `${n} ${m}`).join(" · ")}`,
  courses: () => Object.entries(TRACKS).map(([t, cs]) => `<span class="v">${t}</span>\n  ${cs.join(", ")}`).join("\n"),
  skills: () => SKILLS.map((s) => `<span class="v">${s.t}</span>: ${s.items.join(", ")}`).join("\n"),
  contact: () => `email     <a href="mailto:${EMAIL}">${EMAIL}</a>\nlinkedin  <a href="${LINKS.linkedin}" target="_blank" rel="noopener">Gideon Atoyah</a>\ngithub    <a href="${LINKS.github}" target="_blank" rel="noopener">@Gatoyah</a>`,
  cv: () => { openApp("cv"); return "Opening CV.pdf…"; },
  ls: () => "about/  research/  courses/  skills/  experience/  certs/  CV.pdf",
  pwd: () => "/home/gideon",
  date: () => new Date().toString(),
  sudo: (a) => a.join(" ").includes("hire") ? `<span class="c">✓ Permission granted.</span> Great choice — opening contact…${(setTimeout(() => openApp("mail"), 600), "")}` : "gideon is not in the sudoers file. This incident will be reported. 😉",
  echo: (a) => esc(a.join(" ")),
};
function mountTerminal(root) {
  const out = root.querySelector("[data-out]"), inp = root.querySelector("[data-in]");
  const hist = []; let hi = 0;
  const print = (html) => { out.insertAdjacentHTML("beforeend", html + "\n"); root.closest(".win-body, .sheet-body").scrollTop = 1e9; };
  print(`${NEOFETCH}\n<span class="m">Type</span> <span class="c">help</span> <span class="m">to see commands. Try</span> <span class="c">sudo hire gideon</span>`);
  root.addEventListener("click", () => inp.focus({ preventScroll: true }));
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") { if (hi > 0) inp.value = hist[--hi]; e.preventDefault(); return; }
    if (e.key === "ArrowDown") { inp.value = hist[++hi] ?? ""; if (hi > hist.length) hi = hist.length; e.preventDefault(); return; }
    if (e.key !== "Enter") return;
    const raw = inp.value.trim(); inp.value = "";
    print(`<span class="c">gideon@atoyah-os</span><span class="m"> ~</span> $ ${esc(raw)}`);
    if (!raw) return;
    hist.push(raw); hi = hist.length;
    const [cmd, ...args] = raw.split(/\s+/);
    const c = cmd.toLowerCase();
    if (c === "clear") { out.innerHTML = ""; return; }
    if (c === "open") { const id = args[0] === "contact" ? "mail" : args[0]; if (APPS[id]) { openApp(id); print(`Opening ${APPS[id].name}…`); } else print(`open: no such app '${esc(args[0] || "")}'`); return; }
    print(CMDS[c] ? CMDS[c](args) : `command not found: ${esc(cmd)} — try <span class="c">help</span>`);
  });
  if (!isPhone()) setTimeout(() => inp.focus({ preventScroll: true }), 50);
}

/* ---------------- PREFERENCES ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("gos." + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("gos." + k, JSON.stringify(v)); } catch {} },
};
const prefs = { theme: store.get("theme", "dark"), accent: store.get("accent", "teal"), calm: store.get("calm", false) };
const mqDark = matchMedia("(prefers-color-scheme: dark)");
function applyPrefs() {
  const t = prefs.theme === "system" ? (mqDark.matches ? "dark" : "light") : prefs.theme;
  document.documentElement.dataset.theme = t;
  document.documentElement.dataset.accent = prefs.accent;
  document.documentElement.classList.toggle("calm", !!prefs.calm);
  document.querySelector('meta[name="theme-color"]').content = t === "dark" ? "#05070d" : "#eef1f6";
}
function setPref(k, v) { prefs[k] = v; store.set(k, v); applyPrefs(); }
mqDark.addEventListener?.("change", applyPrefs);
applyPrefs();

/* ---------------- HELPERS ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const phoneMQ = matchMedia("(max-width: 760px)");
const isPhone = () => phoneMQ.matches;
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200); }

// shared SVG defs (gradients / filters)
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--accent)"/><stop offset="1" style="stop-color:var(--accent-2)"/></linearGradient>
  <filter id="xblur"><feGaussianBlur stdDeviation="1.6"/></filter></defs></svg>`);

/* ---------------- WIDGETS ---------------- */
const widgetProfile = () => `<button class="widget" data-open="about"><div class="w-profile"><div class="avatar"><img src="images/gideonnn.png" alt=""></div><div><b>Gideon Atoyah</b><span>BSc Biomedical Engineering<br>First Class · KNUST ’25</span></div></div></button>`;
const widgetNow = () => `<button class="widget" data-open="research" data-project="0"><div class="w-label"><span class="live"></span>Now · since Jan 2026</div>
  <div class="w-now">${xraySVG()}<p>Teaching a U-Net to find hip implants in X-rays<small>Synthetic DRRs → real clinical images (OrthoNet)</small></p></div></button>`;
const C = 2 * Math.PI * 32;
const widgetCWA = () => `<button class="widget" data-open="courses"><div class="w-label">CWA</div>
  <div class="ring"><svg viewBox="0 0 76 76"><circle class="track" cx="38" cy="38" r="32"/><circle class="val" cx="38" cy="38" r="32" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-ring="${C * (1 - 0.7435)}"/></svg><b>74.35</b></div>
  <div class="w-caption">First Class Honours</div></button>`;
const widgetProjects = () => `<button class="widget" data-open="research"><div class="w-label">Projects</div><div class="w-big">4 <span>built</span></div>
  <div class="w-caption" style="text-align:left;margin-top:8px">Imaging · devices · health software</div></button>`;

function fillRings(root) { setTimeout(() => root.querySelectorAll("[data-ring]").forEach((c) => (c.style.strokeDashoffset = c.dataset.ring)), 400); }

/* ---------------- DESKTOP ---------------- */
const DOCK = ["about", "research", "courses", "skills", "experience", "certs", "|", "terminal", "mail", "cv", "settings"];
const DESK = ["research", "courses", "experience", "cv", "terminal", "mail"];
const WM = { z: 200, wins: new Map(), offset: 0 };

function buildDesktop() {
  $("#deskIcons").innerHTML = DESK.map((id) => `<button class="desk-icon" data-open="${id}">${iconFor(id)}<span>${APPS[id].name}</span></button>`).join("");
  $("#widgets").innerHTML = widgetProfile() + widgetNow() + `<div class="w-row">${widgetCWA()}${widgetProjects()}</div>`;
  $("#dock").innerHTML = DOCK.map((id) => id === "|" ? '<span class="dock-sep"></span>' : `<button class="dock-item" data-open="${id}" data-dock="${id}" aria-label="${APPS[id].name}">${iconFor(id)}<span class="tip">${APPS[id].name}</span></button>`).join("");
  fillRings($("#widgets"));

  // dock magnification
  const dock = $("#dock"), items = [...dock.querySelectorAll(".dock-item")];
  dock.addEventListener("mousemove", (e) => {
    if (prefs.calm) return;
    items.forEach((it) => {
      const r = it.getBoundingClientRect(); const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = Math.max(50, 78 - d * 0.28); it.style.width = it.style.height = s + "px";
    });
  });
  dock.addEventListener("mouseleave", () => items.forEach((it) => (it.style.width = it.style.height = "")));
}

function openWindow(id, opts = {}) {
  const app = APPS[id];
  let w = WM.wins.get(id);
  if (w) {
    w.el.classList.remove("minimized"); focusWin(w);
    if (opts.project != null && w.body._select) w.body._select(opts.project);
    return;
  }
  const area = $("#windows").getBoundingClientRect();
  const W = Math.min(app.w, area.width - 40), H = Math.min(app.h, area.height - 100);
  const n = WM.offset++ % 6;
  const x = Math.max(10, (area.width - W) / 2 + (n - 2) * 28), y = Math.max(8, (area.height - 84 - H) / 2 + (n - 2) * 22);
  const el = document.createElement("section");
  el.className = "win"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", app.name);
  el.style.cssText = `left:${x}px;top:${y}px;width:${W}px;height:${H}px`;
  el.innerHTML = `<div class="titlebar"><div class="lights">
      <button class="l-close" aria-label="Close">${svg("close")}</button><button class="l-min" aria-label="Minimize">${svg("min")}</button><button class="l-max" aria-label="Maximize">${svg("max")}</button>
    </div><div class="win-title">${iconFor(id)}${app.name}</div></div><div class="win-body"></div>`;
  const bodyWrap = el.querySelector(".win-body");
  const body = document.createElement("div"); body.style.height = "100%"; body.innerHTML = app.render();
  bodyWrap.appendChild(body);
  $("#windows").appendChild(el);
  w = { id, el, body, cleanup: null };
  WM.wins.set(id, w);
  w.cleanup = app.mount?.(body, opts) || null;
  // narrow layout when window is small
  const ro = new ResizeObserver(() => el.classList.toggle("narrow", el.offsetWidth < 640));
  ro.observe(el); w.ro = ro;

  el.addEventListener("pointerdown", () => focusWin(w));
  el.querySelector(".l-close").onclick = (e) => { e.stopPropagation(); closeWindow(id); };
  el.querySelector(".l-min").onclick = (e) => { e.stopPropagation(); el.classList.add("minimized"); el.classList.remove("focused"); updateChrome(); };
  el.querySelector(".l-max").onclick = (e) => { e.stopPropagation(); el.classList.toggle("maxed"); };
  const tb = el.querySelector(".titlebar");
  tb.addEventListener("dblclick", (e) => { if (!e.target.closest(".lights")) el.classList.toggle("maxed"); });
  tb.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".lights") || e.button !== 0) return;
    if (el.classList.contains("maxed")) return;
    const sx = e.clientX - el.offsetLeft, sy = e.clientY - el.offsetTop;
    tb.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    const move = (ev) => {
      el.style.left = Math.min(Math.max(ev.clientX - sx, -el.offsetWidth + 120), area.width - 120) + "px";
      el.style.top = Math.min(Math.max(ev.clientY - sy, 0), innerHeight - 120) + "px";
    };
    const up = () => { tb.removeEventListener("pointermove", move); tb.removeEventListener("pointerup", up); el.style.transition = ""; };
    tb.addEventListener("pointermove", move); tb.addEventListener("pointerup", up);
  });
  focusWin(w);
  const di = $(`[data-dock="${id}"]`); if (di) { di.classList.remove("bounce"); void di.offsetWidth; di.classList.add("bounce"); }
}
function focusWin(w) {
  WM.wins.forEach((o) => { o.el.classList.toggle("inactive", o !== w); o.el.classList.toggle("focused", o === w); });
  w.el.style.zIndex = ++WM.z;
  updateChrome();
}
function closeWindow(id) {
  const w = WM.wins.get(id); if (!w) return;
  WM.wins.delete(id); w.cleanup?.(); w.ro?.disconnect();
  w.el.classList.add("closing"); setTimeout(() => w.el.remove(), 200);
  const rest = [...WM.wins.values()].filter((o) => !o.el.classList.contains("minimized")).sort((a, b) => b.el.style.zIndex - a.el.style.zIndex);
  if (rest[0]) focusWin(rest[0]); else updateChrome();
}
function updateChrome() {
  document.querySelectorAll("[data-dock]").forEach((d) => d.classList.toggle("running", WM.wins.has(d.dataset.dock)));
  const f = [...WM.wins.values()].find((o) => o.el.classList.contains("focused") && !o.el.classList.contains("minimized"));
  $("#mbApp").textContent = f ? APPS[f.id].name : "Desktop";
}

/* ---------------- PHONE ---------------- */
const PH_GRID = ["about", "research", "courses", "skills", "experience", "certs", "cv", "terminal", "settings"];
const PH_DOCK = ["about", "research", "courses", "mail"];
let sheet = null;
function buildPhone() {
  $("#phWidgets").innerHTML = `
    <button class="widget wide" data-open="about"><div class="ph-hero"><div class="avatar"><img src="images/gideonnn.png" alt=""></div>
      <div><h2>Gideon <em>Atoyah</em></h2><p>Biomedical Engineer · First Class, KNUST<br><span style="color:#22c55e">●</span> Open to PhD positions</p></div></div></button>
    ${widgetNow().replace('class="widget"', 'class="widget wide"')}
    ${widgetCWA()}${widgetProjects()}`;
  $("#phGrid").innerHTML = PH_GRID.map((id) => `<button class="ph-app" data-open="${id}">${iconFor(id)}<span>${APPS[id].name.replace(".pdf", "")}</span></button>`).join("");
  $("#phDock").innerHTML = PH_DOCK.map((id) => `<button class="ph-app" data-open="${id}">${iconFor(id)}<span>${APPS[id].name}</span></button>`).join("");
  fillRings($("#phWidgets"));
}
function openSheet(id, opts = {}, origin) {
  if (sheet) closeSheet(true);
  const app = APPS[id];
  const el = document.createElement("section");
  el.className = "sheet narrow";
  if (origin) { const r = origin.getBoundingClientRect(); el.style.setProperty("--ox", r.left + r.width / 2 + "px"); el.style.setProperty("--oy", r.top + r.height / 2 + "px"); }
  el.innerHTML = `<header class="sheet-head"><button class="sheet-back">${svg("chev")}Home</button><div class="sheet-title">${app.name}</div></header><div class="sheet-body"></div>`;
  const body = document.createElement("div"); body.innerHTML = app.render();
  el.querySelector(".sheet-body").appendChild(body);
  $("#sheets").appendChild(el);
  $("#home").classList.add("behind");
  sheet = { id, el, cleanup: app.mount?.(body, opts) || null };
  el.querySelector(".sheet-back").onclick = () => closeSheet();
  // swipe down on header to close
  let sy = null;
  el.querySelector(".sheet-head").addEventListener("touchstart", (e) => (sy = e.touches[0].clientY), { passive: true });
  el.querySelector(".sheet-head").addEventListener("touchend", (e) => { if (sy != null && e.changedTouches[0].clientY - sy > 60) closeSheet(); sy = null; });
}
function closeSheet(instant) {
  if (!sheet) return;
  const s = sheet; sheet = null; s.cleanup?.();
  $("#home").classList.remove("behind");
  if (instant) return s.el.remove();
  s.el.classList.add("closing"); setTimeout(() => s.el.remove(), 330);
}

/* ---------------- ROUTER ---------------- */
function openApp(id, opts = {}, origin) {
  if (!APPS[id]) return;
  closeSpotlight();
  if (isPhone()) openSheet(id, opts, origin); else openWindow(id, opts);
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-open]");
  if (!t) return;
  e.preventDefault();
  const opts = {};
  if (t.dataset.project != null) opts.project = +t.dataset.project;
  openApp(t.dataset.open, opts, t.querySelector(".ico") || t);
});

/* ---------------- SPOTLIGHT ---------------- */
const INDEX = [
  ...Object.entries(APPS).map(([id, a]) => ({ t: a.name, s: "Application", kind: "App", id, icon: iconFor(id) })),
  ...PROJECTS.map((p, i) => ({ t: p.title, s: `${p.period} · ${p.short}`, kind: "Research", id: "research", opts: { project: i }, icon: iconFor("research"), extra: p.tags.join(" ") + " " + p.summary })),
  ...Object.entries(TRACKS).flatMap(([tr, cs]) => cs.map((c) => ({ t: c, s: `${tr}${MARK[c] ? " · mark " + MARK[c] : ""}`, kind: "Course", id: "courses", icon: iconFor("courses") }))),
  ...SKILLS.flatMap((s) => s.items.map((it) => ({ t: it, s: s.t, kind: "Skill", id: "skills", icon: iconFor("skills") }))),
  ...EXPERIENCE.map((x) => ({ t: x.role, s: `${x.org} · ${x.date}`, kind: "Experience", id: "experience", icon: iconFor("experience") })),
  ...CERTS.flatMap((g) => g.items.map(([t, s]) => ({ t, s, kind: "Certificate", id: "certs", icon: iconFor("certs") }))),
];
let spSel = 0, spItems = [];
function openSpotlight() { const sp = $("#spotlight"); sp.hidden = false; const i = $("#spInput"); i.value = ""; renderSp(""); setTimeout(() => i.focus(), 10); }
function closeSpotlight() { $("#spotlight").hidden = true; }
function renderSp(q) {
  q = q.trim().toLowerCase();
  spItems = q ? INDEX.filter((x) => (x.t + " " + x.s + " " + (x.extra || "")).toLowerCase().includes(q)).slice(0, 12)
              : INDEX.filter((x) => x.kind === "App" || x.kind === "Research").slice(0, 14);
  spSel = 0;
  $("#spResults").innerHTML = spItems.length ? spItems.map((x, i) => `<li data-i="${i}" class="${i ? "" : "on"}">${x.icon}<div><b>${esc(x.t)}</b><span>${esc(x.s)}</span></div><span class="kind">${x.kind}</span></li>`).join("")
    : `<li class="sp-empty">No results for “${esc(q)}”</li>`;
}
function pickSp(i) { const x = spItems[i]; if (x) openApp(x.id, x.opts || {}); }
$("#spInput").addEventListener("input", (e) => renderSp(e.target.value));
$("#spInput").addEventListener("keydown", (e) => {
  const lis = [...$("#spResults").querySelectorAll("li[data-i]")];
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault(); spSel = (spSel + (e.key === "ArrowDown" ? 1 : -1) + lis.length) % lis.length;
    lis.forEach((l, i) => l.classList.toggle("on", i === spSel)); lis[spSel]?.scrollIntoView({ block: "nearest" });
  }
  if (e.key === "Enter") pickSp(spSel);
});
$("#spResults").addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) pickSp(+li.dataset.i); });
$("#spotlight").addEventListener("click", (e) => { if (e.target.id === "spotlight") closeSpotlight(); });
$("#mbSearch").onclick = openSpotlight;
$("#phSearch").onclick = openSpotlight;
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#spotlight").hidden ? openSpotlight() : closeSpotlight(); }
  else if (e.key === "Escape") { if (!$("#spotlight").hidden) closeSpotlight(); else if (sheet) closeSheet(); }
});

/* ---------------- MISC CHROME ---------------- */
$("#mbTheme").onclick = () => { setPref("theme", document.documentElement.dataset.theme === "dark" ? "light" : "dark"); toast(`${prefs.theme === "dark" ? "Dark" : "Light"} mode`); };
$("#homeInd").onclick = () => closeSheet();
function tick() {
  const d = new Date();
  $("#mbClock").textContent = d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }) + "  " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  $("#sbTime").textContent = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");
}
tick(); setInterval(tick, 10000);

buildDesktop(); buildPhone();
phoneMQ.addEventListener?.("change", () => {
  [...WM.wins.keys()].forEach(closeWindow); closeSheet(true);
});

/* ---------------- BOOT ---------------- */
const boot = $("#boot");
let booted = false; try { booted = sessionStorage.getItem("booted") === "1"; } catch {}
const finishBoot = () => {
  if (boot.classList.contains("done")) return;
  boot.classList.add("done");
  try { sessionStorage.setItem("booted", "1"); } catch {}
};
if (booted || prefs.calm) { boot.style.transition = "none"; finishBoot(); }
else { boot.addEventListener("click", finishBoot); setTimeout(finishBoot, 2300); }
})();

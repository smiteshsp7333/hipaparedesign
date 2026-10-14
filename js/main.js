/**
 * White Horse Manpower — Interactive Website Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ── 2. Mobile Menu Toggle ──
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>`;
      });
    });
  }

  // ── 3. Interactive Talent Solutions Switcher ──
  const solutionData = {
    permanent: {
      badge: 'Strategic Lateral Staffing',
      title: 'Permanent Lateral & Mid-to-Senior Staffing',
      desc: 'Precision headhunting for high-impact niche domains including Cloud Architectures, SAP S/4HANA transformations, P2P/O2C leads, and technical management.',
      features: [
        'Rigorous technical and competency screening before candidate presentation',
        'Customized candidate briefing ensuring high interview-to-offer ratios',
        'Guaranteed 90-day replacement warranty for ultimate client assurance',
        'Direct alignment with client corporate culture and compensation bands'
      ]
    },
    contract: {
      badge: 'Agile Workforce Operations',
      title: 'Contract & High-Velocity Volume Staffing',
      desc: 'Rapid ramp-up solutions for urgent operational expansions, 24x7 shift operations, seasonal projects, and immediate ramp-downs with full statutory compliance.',
      features: [
        'Turnaround of pre-screened talent pools within 24 to 48 hours',
        'Full management of payroll, attendance, PF, ESIC, and statutory mandates',
        'Dedicated on-site or off-site account coordinator for daily roster sync',
        'Scalable deployment across Bangalore, Pune, Hyderabad, and Mumbai'
      ]
    },
    rpo: {
      badge: 'Turnkey Talent Operations',
      title: 'Recruitment Process Outsourcing (RPO)',
      desc: 'Full or modular talent acquisition outsourcing where White Horse recruiters integrate directly inside your organization to manage sourcing, ATS tracking, and hiring SLAs.',
      features: [
        'Drastic reduction in cost-per-hire and agency dependency by up to 40%',
        'Deployment of dedicated recruitment pods equipped with proprietary ATS tooling',
        'Weekly pipeline governance, conversion analytics, and offer management',
        'Seamless integration with your existing HR workflows and corporate systems'
      ]
    },
    executive: {
      badge: 'C-Suite & Board Appointments',
      title: 'Executive Search & Leadership Advisory',
      desc: 'Confidential retained search for Vice Presidents, Practice Directors, Chief Information Officers, and strategic business leaders across India and UAE/Dubai.',
      features: [
        'Discreet, confidential market mapping and peer assessment',
        'In-depth leadership track-record evaluation and reference validations',
        'Executive compensation structuring and cross-border relocation assistance',
        'Specialized focus on GCC / Dubai and Pan-India executive mandates'
      ]
    }
  };

  const solutionNavBtns = document.querySelectorAll('.solution-nav-btn');
  const solutionBadge = document.querySelector('.solution-display-badge');
  const solutionTitle = document.querySelector('.solution-display-title');
  const solutionText = document.querySelector('.solution-display-text');
  const solutionList = document.querySelector('.solution-features-list');

  solutionNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      solutionNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-solution');
      const data = solutionData[key];
      if (data && solutionTitle) {
        solutionBadge.textContent = data.badge;
        solutionTitle.textContent = data.title;
        solutionText.textContent = data.desc;

        solutionList.innerHTML = data.features.map(f => `
          <li class="solution-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>${f}</span>
          </li>
        `).join('');
      }
    });
  });

  // ── 4. Job Board Category Filters ──
  const filterPills = document.querySelectorAll('.filter-pill');
  const jobCards = document.querySelectorAll('.job-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      jobCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── 5. Hero Quick Search ──
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroLocationSelect = document.getElementById('heroLocationSelect');

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const keyword = (heroSearchInput?.value || '').toLowerCase().trim();
      const location = (heroLocationSelect?.value || '').toLowerCase().trim();

      // Scroll to job board
      const jobBoard = document.getElementById('careers');
      if (jobBoard) {
        jobBoard.scrollIntoView({ behavior: 'smooth' });
      }

      // Filter jobs
      jobCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const matchesKeyword = !keyword || cardText.includes(keyword);
        const matchesLoc = !location || cardText.includes(location);

        if (matchesKeyword && matchesLoc) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ── 6. Trust Statistics Number Counter Animation ──
  const statsElements = document.querySelectorAll('.stat-num[data-count]');
  let counted = false;

  function countUpStats() {
    const heroCard = document.querySelector('.hero-glass-card');
    if (!heroCard || counted) return;

    const rect = heroCard.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      counted = true;
      statsElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const finalDisplay = el.getAttribute('data-display');
        let start = 0;
        const duration = 1800;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = finalDisplay || (target.toLocaleString('en-IN') + suffix);
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start).toLocaleString('en-IN') + suffix;
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', countUpStats);
  countUpStats(); // check on load

  // ── 7. Sector Matrix Filtering & Live Search ──
  const sectorInput = document.getElementById('sectorFilterInput');
  const sectorTabBtns = document.querySelectorAll('.sector-tab-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  function filterPracticeCards() {
    const query = (sectorInput?.value || '').toLowerCase().trim();
    const activeTab = document.querySelector('.sector-tab-btn.active');
    const selectedCategory = activeTab?.getAttribute('data-filter') || 'all';

    practiceCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (selectedCategory === 'all') || (cardCategory === selectedCategory);
      const matchesQuery = !query || cardText.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (sectorInput) {
    sectorInput.addEventListener('input', filterPracticeCards);
  }

  sectorTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sectorTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPracticeCards();
    });
  });

  window.filterCareersBySector = function(sectorId) {
    const careersSection = document.getElementById('careers');
    if (careersSection) {
      careersSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Also set category filter if available
    const searchInput = document.getElementById('jobSearchInput');
    if (searchInput && sectorId) {
      searchInput.value = sectorId;
      searchInput.dispatchEvent(new Event('input'));
    }
  };

  // ── 8. Sector Career & Salary Benchmark Data & Drawer ──
  const sectorBenchmarkData = {
    it: {
      tag: "Tech & Cloud",
      title: "Information Technology (IT)",
      desc: "Full stack engineering, cloud architecture, AI/ML models, DevSecOps and enterprise cybersecurity.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹4.5L – ₹9L PA / AED 8K–14K PM", roles: "Software Engineers (Java/Python/.NET), QA Automation, Cloud Associates", growth: "High market demand with rapid 18-month advancement to mid-tier engineering." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹12L – ₹28L PA / AED 18K–30K PM", roles: "Senior Full Stack, DevOps Architects, Cloud Migration Leads, Data Engineers", growth: "High compensation velocity; premium on microservices & multi-cloud certifications." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹45L – ₹85L+ PA / AED 45K–75K+ PM", roles: "VP Engineering, Principal Enterprise Architect, Chief Information Security Officer (CISO)", growth: "Board-level executive search and enterprise transformation ownership." }
      ],
      metros: ["Bangalore (Silicon Valley)", "Hyderabad", "Pune", "Mumbai", "Dubai (GCC Hub)"],
      skills: ["Java 17+", "Python", "AWS / Azure / GCP", "Kubernetes & Docker", "Kafka & Microservices", "React / Next.js", "CI/CD DevOps", "Cybersecurity & SIEM"],
      hiringVelocity: "Critical Priority (SLA: 48h Shortlists)",
      modalPracticeVal: "IT & Software Engineering"
    },
    bfsi: {
      tag: "BFSI & Fintech",
      title: "Banking & Financial Services (BFSI)",
      desc: "Investment banking, retail operations, risk governance, regulatory KYC/AML analysis & wealth management.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹4L – ₹7.5L PA / AED 7K–12K PM", roles: "KYC/AML Analysts, Credit Processing Officers, Retail Banking Executives", growth: "Direct pipeline into corporate risk and investment analysis tracks." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹10L – ₹24L PA / AED 16K–28K PM", roles: "Risk Officers, Treasury Analysts, AML Sanction Leads, Portfolio Managers", growth: "Specialized licensing (CAMS, CFA, FRM) commands top-tier market packages." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹40L – ₹80L+ PA / AED 40K–70K+ PM", roles: "Head of Compliance, Director of Credit Risk, Chief Risk Officer (CRO)", growth: "Leadership across multinational corporate banking and GCC financial hubs." }
      ],
      metros: ["Mumbai (Financial Capital)", "Bangalore", "Hyderabad", "Dubai (DIFC)"],
      skills: ["KYC / AML Due Diligence", "Investment Banking", "Basel III / IV Norms", "Credit Risk Modeling", "Trade Finance & Treasury", "Regulatory Reporting", "FinTech APIs"],
      hiringVelocity: "High Velocity (SLA: 48h Shortlists)",
      modalPracticeVal: "Banking & Financial Services"
    },
    accounting: {
      tag: "Finance & Accounting",
      title: "Accounting & Corporate Finance",
      desc: "Record-to-Report (R2R), Procure-to-Pay (P2P), Order-to-Cash (O2C), taxation, FP&A & statutory audit.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.8L – ₹6.5L PA / AED 6K–11K PM", roles: "AP / AR Specialists, Junior GL Accountants, Billing Executives", growth: "Core foundational training in ERP systems and corporate accounting standards." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹9L – ₹22L PA / AED 15K–25K PM", roles: "R2R Team Leads, Senior FP&A Analysts, Tax Consultants (Direct/Indirect), Internal Auditors", growth: "CA / CPA / CMA qualifications unlock high-growth corporate finance roles." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹35L – ₹70L+ PA / AED 35K–65K+ PM", roles: "VP Finance, Financial Controller, Chief Financial Officer (CFO)", growth: "Strategic capital planning, M&A due diligence, and global controller oversight." }
      ],
      metros: ["Bangalore", "Pune", "Gurgaon", "Mumbai", "Dubai (UAE)"],
      skills: ["General Ledger & R2R", "Accounts Payable (P2P)", "SAP FICO / Oracle ERP", "FP&A Budgeting", "Direct & Indirect Taxation", "Statutory Audit & US GAAP", "Payroll Compliance"],
      hiringVelocity: "Consistent Lateral Staffing",
      modalPracticeVal: "Procurement & P2P / O2C"
    },
    bpo: {
      tag: "Operations & BPM",
      title: "BPO, KPO & Customer Support",
      desc: "24x7 international customer support, technical helpdesk, back-office operations and workforce management.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3L – ₹5.5L PA / AED 5K–9K PM", roles: "Customer Service Associate (Voice/Chat), Technical Support L1, Data Processors", growth: "Fast-track promotions to Subject Matter Expert (SME) and Team Coach within 12–18 months." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹7L – ₹16L PA / AED 12K–22K PM", roles: "Operations Team Leader, Workforce Manager (WFM), Quality Assurance Manager", growth: "Management across international accounts with 50–150 FTE operational span." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹25L – ₹55L+ PA / AED 30K–50K+ PM", roles: "Director Operations, Head of Global Delivery, Vice President Customer Experience", growth: "Multi-site leadership managing 1,000+ seat delivery centers across India & Philippines." }
      ],
      metros: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Dubai"],
      skills: ["International Voice / Non-Voice", "Omnichannel Chat / Email", "Technical L1/L2 Troubleshooting", "Workforce Management (WFM)", "Six Sigma & Quality Audits", "Ticketing (ServiceNow/Zendesk)"],
      hiringVelocity: "Volume Hiring (20–100 Hires/Batch)",
      modalPracticeVal: "BPO & 24x7 NOC Operations"
    },
    hr: {
      tag: "People & Talent",
      title: "Human Resources (HR)",
      desc: "Talent acquisition, HRBP, compensation & benefits, HR operations, and employee engagement.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.5L – ₹6L PA / AED 6K–10K PM", roles: "Technical Recruiters, HR Operations Specialists, Onboarding Coordinators", growth: "High demand in scaling tech GCCs and high-volume recruiting." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹8L – ₹18L PA / AED 14K–24K PM", roles: "HR Business Partners (HRBP), C&B Specialists, Talent Acquisition Leads", growth: "Strategic partnering with business unit leaders on retention and workforce planning." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹30L – ₹65L+ PA / AED 35K–60K+ PM", roles: "Head of Talent Acquisition, VP Human Resources, Chief Human Resources Officer (CHRO)", growth: "Organizational culture design, global equity programs, and executive succession planning." }
      ],
      metros: ["Bangalore", "Mumbai", "Delhi NCR", "Dubai (GCC)"],
      skills: ["Technical Lateral Hiring", "NEXORA / Workday / Darwinbox ATS", "HR Business Partnering", "Compensation & Benefits (C&B)", "Labor Law & Compliance", "Employee Retention"],
      hiringVelocity: "Active Enterprise Searches",
      modalPracticeVal: "Executive Leadership Search"
    },
    sales: {
      tag: "Commercial Growth",
      title: "Sales & Marketing",
      desc: "B2B enterprise sales, software business development, digital growth marketing, and account management.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹4L – ₹8L PA + Incentives / AED 7K–14K PM", roles: "Business Development Representatives (BDR), Inside Sales Executives, Digital Marketing Associates", growth: "High uncapped incentive structures; quick progression to Account Executive." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹12L – ₹28L PA + Variable / AED 18K–35K PM", roles: "Enterprise Account Executives, Regional Sales Managers, Growth Marketing Leads", growth: "Managing enterprise quotas of $1M–$5M ARR across domestic & export territories." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹40L – ₹90L+ PA / AED 45K–80K+ PM", roles: "VP Sales, Chief Commercial Officer (CCO), Head of Global Enterprise Partnerships", growth: "P&L responsibility, international market expansion, and strategic commercial deal-making." }
      ],
      metros: ["Mumbai", "Bangalore", "Delhi NCR", "Dubai (GCC Strategic Hub)"],
      skills: ["B2B Enterprise Solution Selling", "SaaS & Cloud Deal Closing", "HubSpot / Salesforce CRM", "Performance Marketing & SEO/PPC", "Key Account Management", "RFP & Pitch Negotiations"],
      hiringVelocity: "Target-Driven High Demand",
      modalPracticeVal: "Executive Leadership Search"
    },
    telecom: {
      tag: "Telecom & Networks",
      title: "Telecommunications & Networking",
      desc: "5G rollouts, optical long-haul fiber, 24x7 NOC monitoring, core network design & RF engineering.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.8L – ₹7L PA / AED 7K–12K PM", roles: "NOC L1 Engineers, Field Network Technicians, RF Test Associates", growth: "Hands-on telecom infrastructure training leading to L2 network architecture roles." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹10L – ₹22L PA / AED 16K–26K PM", roles: "Long-Haul Fiber Leads, Day 2 Readiness Architects, Optical Network Engineers, CCNA/CCNP Specialists", growth: "Critical skill shortage in DWDM, long-haul fiber, and telecom cloud deployments." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹35L – ₹70L+ PA / AED 35K–65K+ PM", roles: "Head of Network Operations, Director Telecom Infrastructure, VP Technology", growth: "National 5G footprint management and multimillion-dollar optical backbone projects." }
      ],
      metros: ["Bangalore", "Pune", "Hyderabad", "Chennai", "Dubai"],
      skills: ["Long-Haul Fiber & FTTx", "Day 2 Readiness & Provisioning", "24x7 NOC L1/L2/L3 Monitoring", "Optical DWDM / SDH", "Cisco / Juniper Routing & Switching", "RF Engineering & 5G RAN", "Network Security"],
      hiringVelocity: "Critical Priority (SLA: 48h Shortlists)",
      modalPracticeVal: "BPO & 24x7 NOC Operations"
    },
    healthcare: {
      tag: "Health & Life Sciences",
      title: "Healthcare, RCM & Medical Coding",
      desc: "US Healthcare Revenue Cycle Management (RCM), medical coding, hospital administration, and clinical documentation.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.5L – ₹6.5L PA / AED 6K–11K PM", roles: "Certified Medical Coders (CPC-A), AR Calling Associates, Patient Registration Executives", growth: "AAPC certification dramatically accelerates salary progression and international remote roles." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹8L – ₹18L PA / AED 14K–24K PM", roles: "Senior Medical Coders (CPC/CIC), Denial Management Leads, Hospital Billing Managers", growth: "Expertise in specialized specialties (Cardiology, Surgery, Inpatient DRG) commands premium rates." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹28L – ₹60L+ PA / AED 30K–55K+ PM", roles: "Director RCM Delivery, Head of Clinical Operations, VP Healthcare BPO", growth: "End-to-end P&L oversight for 500+ seat US hospital billing operations." }
      ],
      metros: ["Bangalore", "Hyderabad", "Chennai", "Coimbatore", "Dubai (Healthcare City)"],
      skills: ["ICD-10-CM / CPT / HCPCS Coding", "AAPC / AHIMA Certified (CPC/CIC)", "Denial Management & Accounts Receivable", "Claims Adjudication & HIPAA Compliance", "EPIC / Cerner EHR Systems", "Prior Authorization"],
      hiringVelocity: "High Volume & Specialized Lateral",
      modalPracticeVal: "US Healthcare RCM"
    },
    manufacturing: {
      tag: "Core Engineering",
      title: "Manufacturing & Engineering",
      desc: "Plant operations, mechanical design, quality assurance (QA/QC), production planning, and industrial automation.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.5L – ₹6L PA / AED 6K–11K PM", roles: "Graduate Engineer Trainees, Production Supervisors, Quality Inspectors", growth: "Shop-floor operational mastery leading to plant engineering roles." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹8L – ₹20L PA / AED 14K–24K PM", roles: "Plant Maintenance Engineers, Design Engineers (AutoCAD/SolidWorks), Six Sigma Leads", growth: "High demand in automotive, industrial machinery, and semiconductor manufacturing." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹30L – ₹65L+ PA / AED 35K–60K+ PM", roles: "Plant Head, VP Manufacturing Operations, Director Quality & Safety", growth: "Comprehensive operational oversight, safety governance, and factory automation." }
      ],
      metros: ["Pune", "Chennai", "Ahmedabad", "Bangalore", "Dubai"],
      skills: ["AutoCAD / SolidWorks / CATIA", "Production Planning & Control (PPC)", "Six Sigma & Kaizen", "PLC / SCADA Automation", "Plant Maintenance & Safety", "ISO 9001 / IATF 16949"],
      hiringVelocity: "Consistent Engineering Deployment",
      modalPracticeVal: "Executive Leadership Search"
    },
    supplychain: {
      tag: "Logistics & SCM",
      title: "Supply Chain & Logistics",
      desc: "Strategic procurement, warehouse management, freight forwarding, inventory control, and global trade logistics.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.6L – ₹6.2L PA / AED 6K–11K PM", roles: "Logistics Coordinators, Dispatch Executives, Procurement Associates", growth: "Direct pipeline into international freight forwarding and SAP MM specialization." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹9L – ₹22L PA / AED 15K–26K PM", roles: "Warehouse Operations Managers, Category Procurement Managers, SCM Planners", growth: "Expertise in supply chain modeling and cold-chain logistics commands top packages." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹32L – ₹70L+ PA / AED 35K–65K+ PM", roles: "Head of Global Supply Chain, VP Procurement, Director Logistics & Warehousing", growth: "Enterprise logistics optimization, cross-border tariff mitigation, and vendor risk governance." }
      ],
      metros: ["Mumbai", "Bangalore", "Delhi NCR", "Chennai", "Dubai (JAFZA Logistics Hub)"],
      skills: ["Strategic Procurement & Sourcing", "SAP MM / Ariba", "Warehouse Management (WMS)", "Freight Forwarding & Customs Clearance", "Inventory Optimization", "P2P (Procure-to-Pay)"],
      hiringVelocity: "High Enterprise Demand",
      modalPracticeVal: "Procurement & P2P / O2C"
    },
    retail: {
      tag: "Consumer & Commerce",
      title: "Retail & E-Commerce",
      desc: "Store management, e-commerce catalog operations, visual merchandising, and omnichannel retail execution.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3L – ₹5.5L PA / AED 5K–9K PM", roles: "Retail Sales Associates, Catalog Executives, Store Supervisors", growth: "Rapid advancement to Assistant Store Manager in luxury & fashion chains." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹7L – ₹17L PA / AED 12K–22K PM", roles: "Store Managers, E-Commerce Category Managers, Visual Merchandisers", growth: "High market demand across D2C brands, luxury malls, and quick-commerce operations." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹25L – ₹55L+ PA / AED 28K–50K+ PM", roles: "Head of Retail Operations, Director E-Commerce, VP Brand Merchandising", growth: "Territory-wide retail network expansion and omnichannel digital transformation." }
      ],
      metros: ["Mumbai", "Delhi NCR", "Bangalore", "Dubai (Dubai Mall / Mall of Emirates)"],
      skills: ["Store Operations & P&L", "Visual Merchandising", "E-Commerce Catalog & Shopify", "Inventory Control", "Customer Experience (CX)", "Omnichannel Retail"],
      hiringVelocity: "Seasonal & Lateral Expansion",
      modalPracticeVal: "BPO & 24x7 NOC Operations"
    },
    pharma: {
      tag: "Life Sciences & Pharma",
      title: "Pharma & Clinical Research",
      desc: "Clinical trials, drug safety / pharmacovigilance (PV), regulatory affairs, and QA validation.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.8L – ₹6.5L PA / AED 7K–12K PM", roles: "Clinical Research Associates (CRA), Pharmacovigilance Trainees, Formulation Chemists", growth: "Specialized scientific progression in global contract research organizations (CROs)." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹9L – ₹22L PA / AED 15K–26K PM", roles: "Senior Regulatory Affairs Specialists, PV Scientists, QC/QA Managers", growth: "High value placed on US FDA, EMA, and CDSCO regulatory audit expertise." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹32L – ₹70L+ PA / AED 35K–65K+ PM", roles: "Director Clinical Operations, Head of Regulatory Affairs, VP R&D", growth: "Executive drug pipeline oversight, international clinical trials, and patent governance." }
      ],
      metros: ["Hyderabad (Genome Valley)", "Bangalore", "Mumbai", "Ahmedabad", "Dubai"],
      skills: ["Pharmacovigilance (Argus/ArisG)", "Clinical Data Management (CDM)", "US FDA & ICH-GCP Compliance", "Regulatory Affairs Dossier (eCTD)", "Analytical Chemistry (HPLC/GC)", "Quality Assurance (QA/QC)"],
      hiringVelocity: "Specialized Lateral Placements",
      modalPracticeVal: "Executive Leadership Search"
    },
    hospitality: {
      tag: "Aviation & Tourism",
      title: "Hospitality & Tourism",
      desc: "Luxury hotel management, aviation ground services, guest relations, and international F&B operations.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3L – ₹5.2L PA / AED 5K–9K PM", roles: "Front Desk Executives, Guest Service Associates, Cabin Crew / Ground Staff Trainees", growth: "Direct pathway to 5-star international luxury hotel chains and Gulf airlines." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹7L – ₹16L PA / AED 12K–22K PM", roles: "Duty Managers, Banquet Managers, Aviation Ground Operations Supervisors", growth: "High mobility between Indian luxury properties and Dubai/GCC mega-resorts." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹24L – ₹55L+ PA / AED 28K–50K+ PM", roles: "General Manager (GM), Director Food & Beverage, VP Hospitality Operations", growth: "Property P&L ownership, VIP relations, and luxury brand standards." }
      ],
      metros: ["Dubai (World Tourism Capital)", "Goa", "Mumbai", "Delhi NCR", "Bangalore"],
      skills: ["Luxury Guest Relations", "Opera PMS & Amadeus GDS", "F&B Operations & Cost Control", "Aviation Ground Handling", "Event & Banquet Management", "Hospitality Staff Leadership"],
      hiringVelocity: "International GCC Deployments",
      modalPracticeVal: "BPO & 24x7 NOC Operations"
    },
    education: {
      tag: "EdTech & Academics",
      title: "Education & E-Learning",
      desc: "Curriculum development, instructional design, EdTech operations, and academic administration.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹3.2L – ₹5.5L PA / AED 6K–10K PM", roles: "Instructional Designers, Academic Counselors, Online Tutors", growth: "High adoption of digital learning tools and rapid domain specialization." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹7L – ₹16L PA / AED 13K–22K PM", roles: "Curriculum Leads, E-Learning Product Managers, Academic Directors", growth: "Pedagogical leadership in K-12, higher education, and corporate L&D." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹22L – ₹50L+ PA / AED 25K–45K+ PM", roles: "Dean of Academics, VP EdTech Content, Director Institutional Partnerships", growth: "Accreditation leadership, learning platform governance, and university tie-ups." }
      ],
      metros: ["Bangalore", "Delhi NCR", "Hyderabad", "Dubai (International Schools Hub)"],
      skills: ["Instructional Design (ADDIE)", "LMS Administration (Moodle/Canvas)", "EdTech Content Architecture", "Academic Counseling", "Corporate L&D", "Pedagogy Design"],
      hiringVelocity: "Steady Lateral Search",
      modalPracticeVal: "Executive Leadership Search"
    },
    legal: {
      tag: "Legal, Risk & Governance",
      title: "Legal & Compliance",
      desc: "Corporate legal counsel, contract management (CLM), regulatory compliance, and risk mitigation.",
      brackets: [
        { level: "Entry-Level (1–3 Yrs)", salary: "₹4L – ₹7.5L PA / AED 7K–13K PM", roles: "Legal Associates, Contract Analysts, Compliance Executives", growth: "Direct immersion into contract lifecycles and corporate board filings." },
        { level: "Mid-Senior (4–9 Yrs)", salary: "₹10L – ₹25L PA / AED 16K–28K PM", roles: "Senior Corporate Counsel, Contract Lifecycle (CLM) Managers, Privacy Officers (GDPR/DPDP)", growth: "High demand in multinational tech firms and financial institutions." },
        { level: "Practice Heads & Directors (15+ Yrs)", salary: "₹35L – ₹75L+ PA / AED 40K–70K+ PM", roles: "General Counsel, VP Legal & Corporate Affairs, Chief Compliance Officer (CCO)", growth: "Board advisory, cross-border M&A negotiations, and enterprise risk protection." }
      ],
      metros: ["Mumbai", "Bangalore", "Delhi NCR", "Dubai (DIFC Legal Corridor)"],
      skills: ["Corporate Law & Companies Act", "Contract Lifecycle Management (CLM)", "Regulatory Compliance & Risk", "Data Privacy (GDPR / DPDP)", "Intellectual Property (IPR)", "M&A Due Diligence"],
      hiringVelocity: "High-Status Executive Search",
      modalPracticeVal: "Executive Leadership Search"
    }
  };

  window.openSectorBenchmark = function(sectorKey) {
    const data = sectorBenchmarkData[sectorKey];
    if (!data) return;

    const drawer = document.getElementById('sectorBenchmarkDrawer');
    const overlay = document.getElementById('benchmarkDrawerOverlay');
    const tag = document.getElementById('drawerSectorTag');
    const title = document.getElementById('drawerSectorTitle');
    const desc = document.getElementById('drawerSectorDesc');
    const body = document.getElementById('drawerBodyContent');

    if (tag) tag.textContent = data.tag;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;

    let bracketsHtml = data.brackets.map(b => `
      <div class="benchmark-bracket-card">
        <div class="bracket-card-top">
          <span class="bracket-level-badge">${b.level}</span>
          <span class="bracket-salary-range">${b.salary}</span>
        </div>
        <div class="bracket-roles"><strong>Typical Roles:</strong> ${b.roles}</div>
        <div class="bracket-growth"><span class="bracket-dot"></span>${b.growth}</div>
      </div>
    `).join('');

    let metrosHtml = data.metros.map(m => `<span class="metro-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C12.95 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>${m}</span>`).join('');

    let skillsHtml = data.skills.map(s => `<span class="benchmark-skill-chip">${s}</span>`).join('');

    body.innerHTML = `
      <div class="benchmark-section">
        <div class="benchmark-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span>Experience & Salary Compensation Brackets</span>
        </div>
        <div class="benchmark-brackets-list">
          ${bracketsHtml}
        </div>
      </div>

      <div class="benchmark-section">
        <div class="benchmark-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>Key Hiring Metros & Employment Hubs</span>
        </div>
        <div class="benchmark-metros-grid">
          ${metrosHtml}
        </div>
      </div>

      <div class="benchmark-section">
        <div class="benchmark-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg>
          <span>Hot In-Demand Skills & Methodologies</span>
        </div>
        <div class="benchmark-skills-chips">
          ${skillsHtml}
        </div>
      </div>

      <div class="benchmark-actions-block">
        <button onclick="closeSectorBenchmark(); filterCareersBySector('${sectorKey}');" class="btn btn-emerald" style="flex: 1; justify-content: center; padding: 13px 18px; font-weight: 700;">
          Explore Openings in Sector &rarr;
        </button>
        <button onclick="closeSectorBenchmark(); openEmployerModal('${data.modalPracticeVal}');" class="btn btn-gold" style="flex: 1; justify-content: center; padding: 13px 18px; font-weight: 700;">
          Hire for this Practice
        </button>
      </div>
    `;

    if (overlay) overlay.classList.add('open');
    if (drawer) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  window.closeSectorBenchmark = function() {
    const drawer = document.getElementById('sectorBenchmarkDrawer');
    const overlay = document.getElementById('benchmarkDrawerOverlay');
    if (overlay) overlay.classList.remove('open');
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeSectorBenchmark();
    }
  });

  // ── 9. Associations Sector Filter Pills ──
  const assocFilterBtns = document.querySelectorAll('.assoc-filter-btn');
  const assocCompanyCards = document.querySelectorAll('.assoc-company-card');
  const assocCountDisplay = document.getElementById('assocCountDisplay');

  const assocSectorNames = {
    all: "Across 5 Industry Sectors",
    tech: "Across IT, Cloud & Telecom",
    bfsi: "Across BFSI & FinTech",
    bpm: "Across BPM, CX & Operations",
    healthcare: "Across US Healthcare & RCM",
    energy: "Across Conglomerates & Clean Energy"
  };

  window.filterAssocCompanies = function(filter, btnElement) {
    if (assocFilterBtns.length > 0) {
      assocFilterBtns.forEach(b => b.classList.remove('active'));
      if (btnElement) btnElement.classList.add('active');
    }

    let visibleCount = 0;
    const cards = document.querySelectorAll('.assoc-company-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-assoc-cat');
      if (filter === 'all' || cat === filter) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });

    const countDisplay = document.getElementById('assocCountDisplay');
    if (countDisplay) {
      const sectorLabel = assocSectorNames[filter] || "Across Selected Verticals";
      countDisplay.textContent = `Showing ${visibleCount} Partners ${sectorLabel}`;
    }
  };

  if (assocFilterBtns.length > 0) {
    assocFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = btn.getAttribute('data-assoc-filter');
        window.filterAssocCompanies(filter, btn);
      });
    });
  }

  /* Client Empanelment Directory Drawer (Option 3) */
  window.openClientDirectoryDrawer = function() {
    const drawer = document.getElementById('clientDirectoryDrawer');
    const overlay = document.getElementById('clientDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      drawer.style.transform = 'translateX(0)';
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeClientDirectoryDrawer = function() {
    const drawer = document.getElementById('clientDirectoryDrawer');
    const overlay = document.getElementById('clientDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      drawer.style.transform = '';
      overlay.style.opacity = '';
      overlay.style.visibility = '';
      overlay.style.pointerEvents = '';
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.filterDrawerClients = function(filter, btnElement) {
    const tabs = document.querySelectorAll('.client-drawer-tabs .drawer-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const cards = document.querySelectorAll('.drawer-client-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-drawer-cat');
      if (filter === 'all' || cat === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof window.closeClientDirectoryDrawer === 'function') {
        window.closeClientDirectoryDrawer();
      }
    }
  });


  // ── 15. Dynamic Website CMS & Jobs Loader ──
  async function loadDynamicWebsiteConfig() {
    try {
      const res = await fetch('api/config.php?t=' + Date.now()).catch(() => fetch('data/site-config.json?t=' + Date.now()));
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;

      const s = data.siteSettings || {};
      const jobs = data.jobs || [];

      // IT Jobs Contacts (For Exp Only)
      if (s.itJobsPhone) {
        document.querySelectorAll('.site-it-phone').forEach(el => {
          el.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> ' + s.itJobsPhone;
          if (el.tagName === 'A') el.href = 'tel:' + s.itJobsPhone.replace(/\D/g, '');
        });
      }
      if (s.itJobsEmail) {
        document.querySelectorAll('.site-it-email').forEach(el => {
          el.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ' + s.itJobsEmail;
          if (el.tagName === 'A') el.href = 'mailto:' + s.itJobsEmail;
        });
      }

      // Non-IT Jobs Contacts
      if (s.nonItJobsPhone) {
        const parts = s.nonItJobsPhone.split(',');
        const p1 = (parts[0] || '').trim();
        const p2 = (parts[1] || '').trim();
        if (p1) {
          document.querySelectorAll('.site-nonit-phone1').forEach(el => {
            el.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> ' + p1;
            if (el.tagName === 'A') el.href = 'tel:' + p1.replace(/\D/g, '');
          });
        }
        if (p2) {
          document.querySelectorAll('.site-nonit-phone2').forEach(el => {
            el.textContent = p2;
            if (el.tagName === 'A') el.href = 'tel:' + p2.replace(/\D/g, '');
          });
        }
      }
      if (s.nonItJobsEmail) {
        document.querySelectorAll('.site-nonit-email').forEach(el => {
          el.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ' + s.nonItJobsEmail;
          if (el.tagName === 'A') el.href = 'mailto:' + s.nonItJobsEmail;
        });
      }

      // Branch Email
      if (s.branchEmail) {
        document.querySelectorAll('.site-branch-email').forEach(el => {
          el.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ' + s.branchEmail;
          if (el.tagName === 'A') el.href = 'mailto:' + s.branchEmail;
        });
      }

      // Social Links
      const soc = s.socialLinks || {};
      if (soc.facebook) document.querySelectorAll('.social-link-fb').forEach(a => a.href = soc.facebook);
      if (soc.twitter) document.querySelectorAll('.social-link-tw').forEach(a => a.href = soc.twitter);
      if (soc.linkedinCompany) document.querySelectorAll('.social-link-li-co').forEach(a => a.href = soc.linkedinCompany);
      if (soc.linkedinFounder) document.querySelectorAll('.social-link-li-founder').forEach(a => a.href = soc.linkedinFounder);
      if (soc.instagram) document.querySelectorAll('.social-link-ig').forEach(a => a.href = soc.instagram);
      if (soc.youtube) document.querySelectorAll('.social-link-yt').forEach(a => a.href = soc.youtube);
      if (soc.googleBusiness) document.querySelectorAll('.social-link-gb').forEach(a => a.href = soc.googleBusiness);
    } catch (err) {
      console.warn('Failed to load dynamic site config:', err);
    }
  }

  // Render Dynamic Jobs if present
      const jobsGrid = document.querySelector('.jobs-grid');
      if (jobsGrid && Array.isArray(jobs) && jobs.length > 0) {
        const activeJobs = jobs.filter(j => j.active !== false);
        if (activeJobs.length > 0) {
          jobsGrid.innerHTML = activeJobs.map(job => {
            const tagsHtml = (job.tags || []).map(t => '<span class="job-tag">' + t + '</span>').join('');
            const featuredBadge = job.featured ? '<span class="job-badge badge-featured">Featured</span>' : '';
            return `
              <div class="job-card" data-category="${job.category || 'it'}">
                <div class="job-card-header">
                  ${featuredBadge}
                  <span class="job-dept">${job.categoryLabel || job.category || 'General'}</span>
                </div>
                <div class="job-card-body">
                  <h4 class="job-title">${job.title}</h4>
                  <div class="job-meta-row">
                    <span class="job-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      ${job.experience || 'Any Exp'}
                    </span>
                    <span class="job-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C12.95 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"/></svg>
                      ${job.location || 'Bangalore'}
                    </span>
                    <span class="job-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      ${job.shift || 'Full-Time'}
                    </span>
                  </div>
                  <div class="job-tags">
                    ${tagsHtml}
                  </div>
                </div>
                <div class="job-card-footer">
                  <div class="job-salary">${job.salary || 'Competitive'}</div>
                  <button onclick="openJobModal('${job.title.replace(/'/g, "\\'")}', '${(job.categoryLabel || job.category || '').replace(/'/g, "\\'")}', '${(job.experience || '').replace(/'/g, "\\'")}', '${(job.location || '').replace(/'/g, "\\'")}', '${(job.salary || '').replace(/'/g, "\\'")}')" class="job-apply-btn">
                    Apply via ATS &rarr;
                  </button>
                </div>
              </div>
            `;
          }).join('');
        }
      }
    } catch (err) {
      console.warn('CMS dynamic loader notice:', err);
    }
  }

  loadDynamicWebsiteConfig();

});
/**
 * HiPapa Cloud — Qarin Framer Interactive & Scroll Parallax Engine
 * - Smooth scroll-driven 3D perspective tilt on dashboard
 * - Curtain background expansion and vertical parallax
 * - Frosted glass navbar state changes
 * - Currency Toggle ($ USD / ₹ INR)
 * - Monthly / Yearly billing toggles
 * - 7-Day Chart interactive day pillars
 * - FAQ Accordion
 * - Server Deploy Modal
 */

(function () {
    'use strict';

    // Global Pricing State
    const pricingData = {
        USD: {
            symbol: '$',
            monthly: { basic: '5.99', standard: '11.99', premium: '29.99' },
            yearly: { basic: '3.49', standard: '6.99', premium: '18.99' },
            notes: {
                monthly: 'Billed monthly',
                yearly: 'Billed annually (Save 40%)'
            }
        },
        INR: {
            symbol: '₹',
            monthly: { basic: '249', standard: '499', premium: '1,499' },
            yearly: { basic: '149', standard: '299', premium: '899' },
            notes: {
                monthly: 'Billed monthly',
                yearly: 'Billed annually (Save 40% + Free Domain)'
            }
        }
    };

    let currentCurrency = 'USD';
    let currentDuration = 'yearly';
    let selectedPlanForModal = 'Standard Business';

    // Currency Switcher
    window.setCurrency = function (curr) {
        if (!pricingData[curr]) return;
        currentCurrency = curr;

        // Sync all currency toggle buttons
        document.querySelectorAll('.capsule-btn').forEach(btn => {
            if (btn.getAttribute('data-curr') === curr) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        updatePricingDisplay();
    };

    // Duration Switcher (Monthly / Yearly)
    window.setDuration = function (duration) {
        currentDuration = duration;

        const monthlyBtn = document.getElementById('tab-monthly');
        const yearlyBtn = document.getElementById('tab-yearly');

        if (monthlyBtn && yearlyBtn) {
            if (duration === 'monthly') {
                monthlyBtn.classList.add('active');
                yearlyBtn.classList.remove('active');
            } else {
                yearlyBtn.classList.add('active');
                monthlyBtn.classList.remove('active');
            }
        }

        updatePricingDisplay();
    };

    // Update Pricing Numbers in UI
    function updatePricingDisplay() {
        const data = pricingData[currentCurrency];
        const rates = data[currentDuration];

        // Symbols
        ['price-sym-1', 'price-sym-2', 'price-sym-3'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = data.symbol;
        });

        // Prices
        const elBasic = document.getElementById('price-val-basic');
        const elStandard = document.getElementById('price-val-standard');
        const elPremium = document.getElementById('price-val-premium');

        if (elBasic) elBasic.textContent = rates.basic;
        if (elStandard) elStandard.textContent = rates.standard;
        if (elPremium) elPremium.textContent = rates.premium;

        // Subnotes
        const noteBasic = document.getElementById('price-note-basic');
        const noteStandard = document.getElementById('price-note-standard');
        const notePremium = document.getElementById('price-note-premium');

        const noteText = data.notes[currentDuration];
        if (noteBasic) noteBasic.textContent = noteText;
        if (noteStandard) noteStandard.textContent = noteText;
        if (notePremium) notePremium.textContent = noteText;
    }

    // FAQ Accordion Toggle
    window.toggleFaq = function (triggerBtn) {
        const panel = triggerBtn.closest('.faq-accordion-panel');
        if (!panel) return;

        const isCurrentlyActive = panel.classList.contains('active');

        // Close all other panels
        document.querySelectorAll('.faq-accordion-panel').forEach(p => {
            p.classList.remove('active');
        });

        // Toggle clicked
        if (!isCurrentlyActive) {
            panel.classList.add('active');
        }
    };

    // =========================================================================
    // SCROLL-DRIVEN BLUE CURTAIN & DASHBOARD 3D PARALLAX ENGINE
    // =========================================================================
    // Lightweight smooth scroll and parallax without layout thrashing
    let ticking = false;

    function handleScrollAnimations() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar scrolled state
        const header = document.getElementById('header');
        if (header) {
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Hero Curtain lightweight parallax (translate3d only, no getBoundingClientRect)
        const curtainWrap = document.getElementById('curtain-img-wrap');
        const dashboardCard = document.getElementById('main-dashboard-card');

        if (scrollY < 900) {
            if (curtainWrap) {
                const curtainY = (scrollY * 0.12).toFixed(1);
                curtainWrap.style.transform = `translate3d(0, ${curtainY}px, 0)`;
            }

            if (dashboardCard && window.innerWidth > 768) {
                const tiltProgress = Math.min(scrollY / 450, 1);
                const rotateX = (3.5 * (1 - tiltProgress)).toFixed(2);
                const scale = (0.97 + (0.03 * tiltProgress)).toFixed(3);
                const translateY = (-12 * tiltProgress).toFixed(1);
                dashboardCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale}) translate3d(0, ${translateY}px, 0)`;
            }
        }

        // Scroll spy for navbar
        const sections = [
            { id: 'hero', nav: 'Overview' },
            { id: 'core-features', nav: 'Features' },
            { id: 'features', nav: 'Infrastructure' },
            { id: 'how-it-works', nav: 'Workflow' },
            { id: 'integrations', nav: 'Integrations' },
            { id: 'pricing', nav: 'Pricing' },
            { id: 'reviews', nav: 'Reviews' },
            { id: 'blog', nav: 'Articles' },
            { id: 'faq', nav: 'FAQ' }
        ];

        let currentSectionId = 'hero';
        for (const sec of sections) {
            const el = document.getElementById(sec.id);
            if (el && scrollY >= (el.offsetTop - 140)) {
                currentSectionId = sec.id;
            }
        }

        document.querySelectorAll('.nav-links .nav-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(handleScrollAnimations);
            ticking = true;
        }
    }

    // =========================================================================
    // DOM READY INITIALIZATIONS
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        // Attach scroll listener
        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial run
        handleScrollAnimations();

        // Smooth scroll for nav items with navbar offset
        document.querySelectorAll('.nav-links .nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        const headerOffset = 85;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Mobile Navigation Drawer
        const mobileToggle = document.getElementById('mobile-toggle');
        const drawerClose = document.getElementById('drawer-close');
        const mobileDrawer = document.getElementById('mobile-drawer');

        if (mobileToggle && mobileDrawer) {
            mobileToggle.addEventListener('click', () => {
                mobileDrawer.classList.add('open');
            });
        }

        if (drawerClose && mobileDrawer) {
            drawerClose.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        }

        document.querySelectorAll('.m-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileDrawer) mobileDrawer.classList.remove('open');
            });
        });

        // Dashboard Inner Nav Tabs Click Interaction
        const dashNavTabs = document.querySelectorAll('.dash-tab-btn');
        dashNavTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                dashNavTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Dashboard Subtabs Click Interaction
        const dashSubtabs = document.querySelectorAll('.subtab-item');
        dashSubtabs.forEach(tab => {
            tab.addEventListener('click', () => {
                dashSubtabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // 7-Day Chart Interactive Pillars
        const dayPillars = document.querySelectorAll('.chart-day-pillar');
        const dayHours = {
            'Mon': '6h 48m',
            'Tue': '4h 42m',
            'Wed': '7h 45m',
            'Thu': '6h 00m',
            'Fri': '9h 21m',
            'Sat': '8h 24m',
            'Sun': 'Off (Maintenance)'
        };

        dayPillars.forEach(pillar => {
            pillar.addEventListener('mouseenter', () => {
                const labelEl = pillar.querySelector('.day-label');
                if (!labelEl) return;
                const day = labelEl.textContent.trim();

                let tooltip = pillar.querySelector('.active-pill-tooltip');
                if (!tooltip && day !== 'Sun') {
                    const existingTooltip = document.querySelector('.active-pill-tooltip');
                    if (existingTooltip) {
                        existingTooltip.remove();
                    }
                    const newTooltip = document.createElement('div');
                    newTooltip.className = 'active-pill-tooltip';
                    newTooltip.innerHTML = `<span>${dayHours[day] || '5h 30m'}</span>`;
                    pillar.appendChild(newTooltip);
                }
            });
        });

        // Initial pricing setup
        updatePricingDisplay();
    });

    // Server Deploy Modal
    window.openDeployModal = function (planName) {
        selectedPlanForModal = planName;
        const modal = document.getElementById('deploy-modal');
        const planTitle = document.getElementById('modal-plan-title');
        const planNameEl = document.getElementById('modal-plan-name');
        const planPriceEl = document.getElementById('modal-plan-price');

        if (planTitle) planTitle.textContent = `Deploy ${planName}`;
        if (planNameEl) planNameEl.textContent = `${planName} (${currentDuration === 'yearly' ? 'Yearly' : 'Monthly'})`;

        const data = pricingData[currentCurrency];
        let price = '6.99';
        if (planName.includes('Basic')) price = data[currentDuration].basic;
        else if (planName.includes('Standard')) price = data[currentDuration].standard;
        else if (planName.includes('Premium')) price = data[currentDuration].premium;

        if (planPriceEl) planPriceEl.textContent = `${data.symbol}${price} /mo`;

        if (modal) {
            modal.style.display = 'flex';
        }
    };

    window.closeDeployModal = function () {
        const modal = document.getElementById('deploy-modal');
        if (modal) modal.style.display = 'none';
    };

    window.selectRegion = function (btn, regionName) {
        document.querySelectorAll('.region-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };

    window.confirmDeploy = function () {
        const domainInput = document.getElementById('modal-domain-input');
        const domain = domainInput ? (domainInput.value.trim() || 'New Domain') : 'New Domain';
        const region = window.selectedServerRegion || 'Mumbai, India';
        const data = pricingData[currentCurrency];
        const rates = data[currentDuration];
        let price = rates.standard;
        if (selectedPlanForModal.includes('Basic')) price = rates.basic;
        if (selectedPlanForModal.includes('Premium')) price = rates.premium;

        const message = encodeURIComponent(
            `Hello HiPapa Team! I would like to deploy the ${selectedPlanForModal} plan (${currentDuration}) on ${region} node for domain "${domain}". Effective price: ${data.symbol}${price}/mo. Please send checkout and server activation instructions.`
        );
        const waUrl = `https://wa.me/919972788225?text=${message}`;
        
        window.open(waUrl, '_blank');
        window.closeDeployModal();
    };

    // Close modal on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeDeployModal();
        }
    });

})();

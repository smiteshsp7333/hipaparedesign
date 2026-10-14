
/**
 * HiPapa Cloud — Script Engine
 */
(function () {
    'use strict';

    // Pricing Matrix
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

    // Currency Switcher Function
    window.setCurrency = function (curr) {
        if (!pricingData[curr]) return;
        currentCurrency = curr;

        document.querySelectorAll('.capsule-btn').forEach(btn => {
            if (btn.getAttribute('data-curr') === curr) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        updatePricingDisplay();
    };

    // Duration Switcher Function
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

    function updatePricingDisplay() {
        const data = pricingData[currentCurrency];
        if (!data) return;
        const rates = data[currentDuration];
        if (!rates) return;

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

        // Notes
        const noteBasic = document.getElementById('price-note-basic');
        const noteStandard = document.getElementById('price-note-standard');
        const notePremium = document.getElementById('price-note-premium');

        const noteText = data.notes[currentDuration];
        if (noteBasic) noteBasic.textContent = noteText;
        if (noteStandard) noteStandard.textContent = noteText;
        if (notePremium) notePremium.textContent = noteText;
    }

    // FAQ Accordion
    window.toggleFaq = function (triggerBtn) {
        const panel = triggerBtn.closest('.faq-accordion-panel');
        if (!panel) return;
        const isActive = panel.classList.contains('active');
        document.querySelectorAll('.faq-accordion-panel').forEach(p => p.classList.remove('active'));
        if (!isActive) panel.classList.add('active');
    };

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
        let price = data.yearly.standard;
        if (planName.includes('Basic')) price = data[currentDuration].basic;
        if (planName.includes('Standard')) price = data[currentDuration].standard;
        if (planName.includes('Premium')) price = data[currentDuration].premium;

        if (planPriceEl) planPriceEl.textContent = `${data.symbol}${price} /mo`;
        if (modal) modal.style.display = 'flex';
    };

    window.closeDeployModal = function () {
        const modal = document.getElementById('deploy-modal');
        if (modal) modal.style.display = 'none';
    };

    window.selectRegion = function (btn, regionName) {
        document.querySelectorAll('.region-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.selectedServerRegion = regionName;
    };

    window.confirmDeploy = function () {
        const domainInput = document.getElementById('modal-domain-input');
        const domain = domainInput ? (domainInput.value.trim() || 'mycompany.com') : 'mycompany.com';
        const region = window.selectedServerRegion || 'Mumbai, India';
        const data = pricingData[currentCurrency];
        const rates = data[currentDuration];
        let price = rates.standard;
        if (selectedPlanForModal.includes('Basic')) price = rates.basic;
        if (selectedPlanForModal.includes('Premium')) price = rates.premium;

        const message = encodeURIComponent(
            `Hello HiPapa Team! I want to deploy ${selectedPlanForModal} plan (${currentDuration}) on ${region} node for domain "${domain}". Effective: ${data.symbol}${price}/mo. Please send checkout and server activation instructions.`
        );
        window.open(`https://wa.me/919972788225?text=${message}`, '_blank');
        window.closeDeployModal();
    };

    // Smooth Scroll & Navbar Scrollspy
    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.getElementById('header');
        if (header) {
            if (scrollY > 20) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }

        const curtainWrap = document.getElementById('curtain-img-wrap');
        if (curtainWrap && scrollY < 900) {
            curtainWrap.style.transform = `translate3d(0, ${(scrollY * 0.1).toFixed(1)}px, 0)`;
        }

        // Scrollspy
        const sections = ['hero', 'core-features', 'features', 'how-it-works', 'integrations', 'pricing', 'reviews', 'blog', 'faq'];
        let activeId = 'hero';
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el && scrollY >= (el.offsetTop - 140)) {
                activeId = id;
            }
        }
        document.querySelectorAll('.nav-links .nav-item').forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) link.classList.add('active');
            else link.classList.remove('active');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // Mobile Drawer
        const toggle = document.getElementById('mobile-toggle');
        const drawer = document.getElementById('mobile-drawer');
        const close = document.getElementById('drawer-close');
        if (toggle && drawer) toggle.addEventListener('click', () => drawer.classList.add('open'));
        if (close && drawer) close.addEventListener('click', () => drawer.classList.remove('open'));
        document.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => drawer && drawer.classList.remove('open')));

        // Direct click event binding for pricing tabs
        const mBtn = document.getElementById('tab-monthly');
        const yBtn = document.getElementById('tab-yearly');
        if (mBtn) mBtn.addEventListener('click', () => window.setDuration('monthly'));
        if (yBtn) yBtn.addEventListener('click', () => window.setDuration('yearly'));

        document.querySelectorAll('.currency-toggle-capsule button').forEach(b => {
            b.addEventListener('click', (e) => {
                const curr = b.getAttribute('data-curr');
                if (curr) window.setCurrency(curr);
            });
        });

        // Initialize display
        updatePricingDisplay();
    });
})();

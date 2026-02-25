/* ============================================================
   LIVRILI - Main JavaScript  (includes i18n engine)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------
       0. i18n ENGINE
    ------------------------------------------------- */
    let currentLang = localStorage.getItem('livrili_lang') || 'en';

    // Typing phrases per language (used by effect in section 13)
    const typingPhrases = {
        en: ['actually works.', 'done right.', 'you control.', 'stress-free.'],
        fr: ['qui fonctionne.', 'bien faite.', 'que vous contrôlez.', 'sans stress.'],
        ar: ['يعمل فعلاً.', 'على الوجه الصحيح.', 'تتحكم فيه.', 'بلا ضغوط.'],
    };

    // Map of data-i18n keys → DOM query selectors (all unique, stable IDs/classes)
    // Format: [key, selector, property ('text' | 'html' | 'placeholder')]
    const I18N_MAP = [
        // ── Navbar ──
        ['nav_home', '#nav-home', 'text'],
        ['nav_features', '#nav-features', 'text'],
        ['nav_download', '#nav-download', 'text'],
        ['nav_contact', '#nav-contact', 'text'],
        ['nav_cta', '#nav-cta', 'text'],
        // ── Hero ──
        ['hero_badge', '#hero-badge', 'text'],
        ['hero_title_static', '#hero-title-static', 'text'],
        ['hero_subtitle', '#hero-subtitle', 'text'],
        ['hero_btn_dl', '#hero-btn-dl', 'text'],
        ['hero_btn_feat', '#hero-btn-feat', 'text'],
        ['stat_users', '#stat-users', 'text'],
        ['stat_rate', '#stat-rate', 'text'],
        ['stat_rating', '#stat-rating', 'text'],
        ['scroll_text', '#scroll-text', 'text'],
        // Hero bubbles (HTML overlay on SVG illustration)
        ['hero_delivered', '#bubble-delivered', 'text'],
        ['hero_route', '#bubble-route', 'text'],
        // ── Features ──
        ['features_badge', '#features-badge', 'text'],
        ['features_title', '#features-title', 'html'],
        ['features_subtitle', '#features-subtitle', 'text'],
        ['tab_client', '#tab-client', 'text'],
        ['tab_shop', '#tab-shop', 'text'],
        // client cards
        ['feat1_title', '#feat1-title', 'text'],
        ['feat1_desc', '#feat1-desc', 'text'],
        ['status_packed', '#status-packed', 'text'],
        ['status_route', '#status-route', 'text'],
        ['status_nearby', '#status-nearby', 'text'],
        ['status_home', '#status-home', 'text'],
        ['feat2_title', '#feat2-title', 'text'],
        ['feat2_desc', '#feat2-desc', 'text'],
        ['feat3_title', '#feat3-title', 'text'],
        ['feat3_desc', '#feat3-desc', 'text'],
        // shop cards
        ['shop1_title', '#shop1-title', 'text'],
        ['shop1_desc', '#shop1-desc', 'text'],
        ['profile_orders', '#profile-orders', 'text'],
        ['profile_returns', '#profile-returns', 'text'],
        ['profile_reason', '#profile-reason', 'text'],
        ['profile_reason_val', '#profile-reason-val', 'text'],
        ['shop2_title', '#shop2-title', 'text'],
        ['shop2_desc', '#shop2-desc', 'text'],
        ['ai_tip', '#ai-tip', 'text'],
        ['shop3_title', '#shop3-title', 'text'],
        ['shop3_desc', '#shop3-desc', 'text'],
        ['order_delivered', '#order-delivered', 'text'],
        ['order_route', '#order-route', 'text'],
        ['order_packing', '#order-packing', 'text'],
        // ── How it works ──
        ['hiw_badge', '#hiw-badge', 'text'],
        ['hiw_title', '#hiw-title', 'html'],
        ['step1_title', '#step1-title', 'text'],
        ['step1_desc', '#step1-desc', 'text'],
        ['step2_title', '#step2-title', 'text'],
        ['step2_desc', '#step2-desc', 'text'],
        ['step3_title', '#step3-title', 'text'],
        ['step3_desc', '#step3-desc', 'text'],
        ['step4_title', '#step4-title', 'text'],
        ['step4_desc', '#step4-desc', 'text'],
        // ── Download ──
        ['dl_badge', '#dl-badge', 'text'],
        ['dl_title', '#dl-title', 'html'],
        ['dl_subtitle', '#dl-subtitle', 'text'],
        ['ios_sub', '#ios-sub', 'text'],
        ['ios_name', '#ios-name', 'text'],
        ['android_sub', '#android-sub', 'text'],
        ['android_name', '#android-name', 'text'],
        ['qr_hint', '#qr-hint-text', 'text'],
        ['app_greeting', '#app-greeting', 'text'],
        ['track_packed', '#track-packed', 'text'],
        ['track_route', '#track-route', 'text'],
        ['track_home', '#track-home', 'text'],
        ['nearby_shops', '#nearby-shops', 'text'],
        ['badge_rating', '#badge-rating', 'text'],
        ['badge_delivered', '#badge-delivered', 'text'],
        // ── Testimonials ──
        ['test_badge', '#test-badge', 'text'],
        ['test_title', '#test-title', 'html'],
        ['test1_text', '#test1-text', 'text'],
        ['test1_role', '#test1-role', 'text'],
        ['test2_text', '#test2-text', 'text'],
        ['test2_role', '#test2-role', 'text'],
        ['test3_text', '#test3-text', 'text'],
        ['test3_role', '#test3-role', 'text'],
        // ── Contact ──
        ['contact_badge', '#contact-badge', 'text'],
        ['contact_title', '#contact-title', 'html'],
        ['contact_subtitle', '#contact-subtitle', 'text'],
        ['lbl_email', '#lbl-email', 'text'],
        ['lbl_phone', '#lbl-phone', 'text'],
        ['lbl_location', '#lbl-location', 'text'],
        ['form_name_lbl', '#form-name-lbl', 'text'],
        ['form_name_ph', '#name', 'placeholder'],
        ['form_email_lbl', '#form-email-lbl', 'text'],
        ['form_email_ph', '#email', 'placeholder'],
        ['form_subject_lbl', '#form-subject-lbl', 'text'],
        ['form_subject_ph', '#subject option[value=""]', 'text'],
        ['opt1', '#subject option[value="support"]', 'text'],
        ['opt2', '#subject option[value="partnership"]', 'text'],
        ['opt3', '#subject option[value="feedback"]', 'text'],
        ['opt4', '#subject option[value="press"]', 'text'],
        ['form_msg_lbl', '#form-msg-lbl', 'text'],
        ['form_msg_ph', '#message', 'placeholder'],
        ['form_btn', '#form-btn-text', 'text'],
        ['form_success', '#formSuccess', 'text'],
        // ── Footer ──
        ['footer_tagline', '#footer-tagline', 'text'],
        ['footer_col_app', '#footer-col-app', 'text'],
        ['footer_col_company', '#footer-col-company', 'text'],
        ['footer_col_social', '#footer-col-social', 'text'],
        ['footer_privacy', '#footer-privacy', 'text'],
        ['footer_terms', '#footer-terms', 'text'],
        ['footer_copyright', '#footer-copyright', 'text'],
        ['footer_made', '#footer-made', 'text'],
        ['footer_link_home', '#footer-link-home', 'text'],
        ['footer_link_features', '#footer-link-features', 'text'],
        ['footer_link_download', '#footer-link-download', 'text'],
        ['footer_link_contact', '#footer-link-contact', 'text'],
        ['nav_home', '#footer-link-home2', 'text'],
        ['nav_contact', '#footer-link-contact2', 'text'],
    ];

    function applyLanguage(lang) {
        const t = TRANSLATIONS[lang];
        if (!t) return;
        currentLang = lang;
        localStorage.setItem('livrili_lang', lang);

        // Direction + lang attribute
        const isRTL = lang === 'ar';
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        // Apply all translations
        I18N_MAP.forEach(([key, selector, type]) => {
            const val = t[key];
            if (val === undefined) return;
            const el = document.querySelector(selector);
            if (!el) return;
            if (type === 'text') el.textContent = val;
            else if (type === 'html') el.innerHTML = val;
            else if (type === 'placeholder') el.setAttribute('placeholder', val);
        });

        // Update typing phrases for the current language
        if (window._typingPhrases) window._typingPhrases = typingPhrases[lang];

        // Update active lang button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Re-trigger AOS for currently visible elements after layout change
        setTimeout(() => {
            document.querySelectorAll('[data-aos]:not(.aos-visible)').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) el.classList.add('aos-visible');
            });
        }, 100);
    }

    // Language switcher clicks
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    // Apply saved language on load
    applyLanguage(currentLang);


    /* -------------------------------------------------
       1. NAVBAR: scroll + mobile burger + active link
    ------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const spans = burger.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                allNavLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === entry.target.id);
                });
            }
        });
    }, { threshold: 0.35, rootMargin: '-72px 0px 0px 0px' });

    sections.forEach(s => sectionObserver.observe(s));


    /* -------------------------------------------------
       2. AOS – Animate On Scroll
    ------------------------------------------------- */
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('aos-visible'), parseInt(delay));
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));


    /* -------------------------------------------------
       3. FEATURE TABS
    ------------------------------------------------- */
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => {
                if (content.id === `content-${target}`) {
                    content.style.opacity = '0';
                    content.classList.add('active');
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        content.style.transition = 'opacity 0.4s ease';
                        content.style.opacity = '1';
                    }));
                } else {
                    content.classList.remove('active');
                    content.style.opacity = '';
                    content.style.transition = '';
                }
            });
        });
    });


    /* -------------------------------------------------
       4. CONTACT FORM
    ------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnText = submitBtn.querySelector('#form-btn-text');
            const t = TRANSLATIONS[currentLang];
            if (btnText) btnText.textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.75';
            setTimeout(() => {
                if (btnText) btnText.textContent = t.form_btn;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                formSuccess.style.display = 'block';
                formSuccess.textContent = t.form_success;
                contactForm.reset();
                launchConfetti();
                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
            }, 1800);
        });
    }


    /* -------------------------------------------------
       5. CONFETTI
    ------------------------------------------------- */
    function launchConfetti() {
        const colors = ['#1E4DB7', '#FFD600', '#2563EB', '#FFE033', '#0D1F3C', '#FFFFFF'];
        for (let i = 0; i < 60; i++) {
            const piece = document.createElement('div');
            piece.style.cssText = `position:fixed;width:${Math.random() * 8 + 4}px;height:${Math.random() * 8 + 4}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > .5 ? '50%' : '2px'};top:50%;left:${20 + Math.random() * 60}%;pointer-events:none;z-index:9999;`;
            document.body.appendChild(piece);
            const angle = Math.random() * 360 * Math.PI / 180;
            const v = 150 + Math.random() * 200;
            piece.animate([
                { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * v}px,${Math.sin(angle) * v - 200}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
            ], { duration: 1000 + Math.random() * 800, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' })
                .onfinish = () => piece.remove();
        }
    }


    /* -------------------------------------------------
       6. SMOOTH SCROLL
    ------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });


    /* -------------------------------------------------
       7. COUNTER ANIMATION
    ------------------------------------------------- */
    document.querySelectorAll('.stat-number').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const text = el.textContent;
                const suffix = text.replace(/[0-9.]/g, '');
                const target = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (isNaN(target)) return;
                const start = performance.now();
                const update = (now) => {
                    const t = Math.min((now - start) / 1800, 1);
                    const val = (target * (1 - Math.pow(1 - t, 3))).toFixed(text.includes('.') ? 1 : 0);
                    el.textContent = val + suffix;
                    if (t < 1) requestAnimationFrame(update);
                };
                requestAnimationFrame(update);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });


    /* -------------------------------------------------
       8. RATING BARS ANIMATION
    ------------------------------------------------- */
    document.querySelectorAll('.rating-bar .fill').forEach(fill => {
        const w = fill.style.width; fill.style.width = '0';
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => { fill.style.transition = 'width 1s cubic-bezier(0.34,1.56,0.64,1)'; fill.style.width = w; }, 200);
                obs.unobserve(fill);
            }
        }, { threshold: 0.5 });
        obs.observe(fill);
    });


    /* -------------------------------------------------
       9. DASHBOARD BAR CHART ANIMATION
    ------------------------------------------------- */
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const h = bar.style.height; bar.style.height = '0';
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => { bar.style.transition = 'height 0.8s cubic-bezier(0.34,1.56,0.64,1)'; bar.style.height = h; }, 300 + Math.random() * 200);
                obs.unobserve(bar);
            }
        }, { threshold: 0.3 });
        obs.observe(bar);
    });


    /* -------------------------------------------------
       10. PARALLAX on hero shapes
    ------------------------------------------------- */
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((s, i) => { s.style.transform = `translateY(${scrollY * [0.15, 0.1, 0.08][i]}px)`; });
    }, { passive: true });


    /* -------------------------------------------------
       11. STORE BUTTON RIPPLE
    ------------------------------------------------- */
    document.querySelectorAll('.store-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const r = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            r.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);pointer-events:none;`;
            btn.style.position = 'relative'; btn.style.overflow = 'hidden';
            btn.appendChild(r);
            r.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(2.5)', opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' }).onfinish = () => r.remove();
        });
    });


    /* -------------------------------------------------
       12. FEATURE CARD TILT
    ------------------------------------------------- */
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });


    /* -------------------------------------------------
       13. TYPING EFFECT – hero gradient text
    ------------------------------------------------- */
    const heroAccent = document.querySelector('.hero-title .gradient-text');
    if (heroAccent) {
        window._typingPhrases = typingPhrases[currentLang];
        let phraseIdx = 0, charIdx = typingPhrases.en[0].length, isDeleting = false;

        const type = () => {
            const phrases = window._typingPhrases || typingPhrases.en;
            const current = phrases[phraseIdx % phrases.length];
            if (!isDeleting) {
                heroAccent.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx >= current.length) { isDeleting = true; setTimeout(type, 2500); return; }
            } else {
                heroAccent.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx++;
                    setTimeout(type, 400); return;
                }
            }
            setTimeout(type, isDeleting ? 60 : 90);
        };
        setTimeout(type, 3000);
    }


    /* -------------------------------------------------
       14. SCROLL PROGRESS BAR
    ------------------------------------------------- */
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#1E4DB7,#FFD600);z-index:9999;transition:width 0.1s linear;pointer-events:none;';
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${p}%`;
    }, { passive: true });


    /* -------------------------------------------------
       15. CURSOR TRAIL (desktop only)
    ------------------------------------------------- */
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.cssText = 'position:fixed;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle,rgba(30,77,183,0.25),transparent);pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left 0.12s ease,top 0.12s ease;';
        document.body.appendChild(trail);
        document.addEventListener('mousemove', (e) => { trail.style.left = e.clientX + 'px'; trail.style.top = e.clientY + 'px'; });
    }


    /* -------------------------------------------------
       16. PAGE LOAD FADE IN
    ------------------------------------------------- */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));

});

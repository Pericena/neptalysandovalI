document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ===================== LOADER =====================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }, 800);
    }

    // ===================== NAVBAR SCROLL =====================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================== MOBILE MENU =====================
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    function toggleMenu(open) {
        if (!mobileMenu) return;
        if (open) {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            toggleMenu(true);
        });
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function () {
            toggleMenu(false);
        });
    }
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            toggleMenu(false);
        });
    });

    // ===================== DARK MODE =====================
    const darkToggle = document.getElementById('darkToggle');
    let darkMode = false;
    if (darkToggle) {
        darkToggle.addEventListener('click', function () {
            darkMode = !darkMode;
            document.documentElement.classList.toggle('dark');
            const icon = this.querySelector('i');
            if (darkMode) {
                icon.className = 'bx bx-sun';
                document.body.style.backgroundColor = '#0f0f14';
            } else {
                icon.className = 'bx bx-moon';
                document.body.style.backgroundColor = '#0b0b0e';
            }
        });
    }

    // ===================== COUNTER ANIMATION =====================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            const isFloat = target % 1 !== 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = progress * target;
                counter.textContent = isFloat ? currentValue.toFixed(1) : Math.floor(currentValue);
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = isFloat ? target.toFixed(1) : target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // ===================== INTERSECTION OBSERVER =====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter') && !countersAnimated) {
                    animateCounters();
                }
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.counter, .bg-white\\/5, .faq-item, .group, article, .grid > div').forEach(el => {
        observer.observe(el);
    });

    // ===================== FAQ ACCORDION =====================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        if (btn) {
            btn.addEventListener('click', function () {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(i => i.classList.remove('open'));
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // ===================== BACK TO TOP =====================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===================== TOAST =====================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message || 'Operación exitosa';
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ===================== FORM VALIDATION =====================
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMessage');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });
            if (valid) {
                if (formMsg) {
                    formMsg.textContent = '✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.';
                    formMsg.classList.remove('hidden', 'text-red-400');
                    formMsg.classList.add('text-green-400');
                }
                showToast('Mensaje enviado con éxito');
                form.reset();
                setTimeout(() => {
                    if (formMsg) formMsg.classList.add('hidden');
                }, 5000);
            } else {
                if (formMsg) {
                    formMsg.textContent = '⚠️ Por favor, completa todos los campos obligatorios.';
                    formMsg.classList.remove('hidden', 'text-green-400');
                    formMsg.classList.add('text-red-400');
                }
                showToast('Completa todos los campos');
            }
        });
    }

    // ===================== COMPANIES SLIDER =====================
    const slider = document.getElementById('companiesSlider');
    if (slider) {
        let scrollAmount = 0;
        const step = 1.5;
        setInterval(() => {
            scrollAmount += step;
            if (scrollAmount >= slider.scrollWidth / 2) {
                scrollAmount = 0;
            }
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 3000);
    }

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===================== DASHBOARD MOCK INTERACTIVITY =====================
    const dashboardItems = document.querySelectorAll('.md\\:w-64 .flex.items-center');
    dashboardItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            dashboardItems.forEach(i => i.classList.remove('text-white'));
            this.classList.add('text-white');
            showToast('Vista cambiada: ' + this.textContent.trim());
        });
    });

    console.log('🚀 TikFlow · Landing Page cargada correctamente');
});
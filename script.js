/* ====================================
   Wu Yiqian - Personal Portfolio
   JavaScript: Interactions & Animations
   ==================================== */

(function() {
    'use strict';

    // === Navbar scroll effect ===
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrolled = window.pageYOffset;
        if (scrolled > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrolled;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // === Mobile menu toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // === Scroll reveal animation ===
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Stagger reveal for multiple items in same section
                const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
                const index = Array.from(siblings).indexOf(entry.target);
                setTimeout(function() {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    // Also handle comp-cards and project-cards that use .revealed class
    const cardElements = document.querySelectorAll('.comp-card, .project-card, .skill-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const siblings = entry.target.parentElement.querySelectorAll('.comp-card, .project-card, .skill-card');
                const index = Array.from(siblings).indexOf(entry.target);
                setTimeout(function() {
                    entry.target.classList.add('revealed');
                }, index * 120);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    cardElements.forEach(function(el) {
        cardObserver.observe(el);
    });

    // === Skill bar animation ===
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach(function(bar) {
        skillObserver.observe(bar);
    });

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 64; // navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Active nav link highlighting ===
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(function(link) {
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--text-primary)';
                        link.style.background = 'rgba(96, 165, 250, 0.08)';
                    } else {
                        link.style.color = '';
                        link.style.background = '';
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-64px 0px -50% 0px'
    });

    sections.forEach(function(section) {
        sectionObserver.observe(section);
    });

    // === Counter animation for hero stats ===
    const statNumbers = document.querySelectorAll('.stat-number');
    const eduStatNums = document.querySelectorAll('.edu-stat-num');

    function animateCounter(element) {
        const text = element.textContent;
        // Check if it's a number that can be animated
        const match = text.match(/^(\d+\.?\d*)(.*)$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = match[2] || '';
        const isDecimal = match[1].includes('.');
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (isDecimal) {
                element.textContent = current.toFixed(2) + suffix;
            } else {
                element.textContent = Math.round(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text; // Restore exact text
            }
        }

        requestAnimationFrame(update);
    }

    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(stat) {
        statObserver.observe(stat);
    });

    eduStatNums.forEach(function(stat) {
        statObserver.observe(stat);
    });

    // === Parallax glow effect ===
    const heroGlow = document.querySelector('.hero-bg-glow');
    if (heroGlow) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroGlow.style.transform = 'translate(-50%, calc(-50% + ' + (scrolled * 0.3) + 'px))';
            }
        }, { passive: true });
    }

})();

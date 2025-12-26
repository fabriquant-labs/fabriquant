// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const text = button.getAttribute('data-clipboard-text');

        try {
            await navigator.clipboard.writeText(text);

            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#171717';
            button.style.color = '#FFFFFF';
            button.style.borderColor = '#171717';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.color = '';
                button.style.borderColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            button.textContent = 'Failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for internal links
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add scroll-based nav background
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll with staggered delays
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe feature cards, use case cards, and quickstart steps
document.querySelectorAll('.feature-card, .use-case-card, .quickstart-step').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-bottom: 1px solid #E5E5E5;
            gap: 1.5rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c⚡ Fabrknt', 'font-size: 24px; font-weight: bold; color: #171717;');
console.log('%cThe Precision Execution Stack', 'font-size: 14px; color: #525252;');
console.log('%c\nBuilt with ❤️  by psyto', 'font-size: 12px; color: #737373;');
console.log('%c\nContribute: https://github.com/fabrknt/fabrknt', 'font-size: 12px; color: #404040;');

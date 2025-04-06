document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuBtn.querySelector('i').className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target) && isMenuOpen) {
                isMenuOpen = false;
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                menuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // Typing animation
    const roles = [
        'Backend Developer',
        'Cybersecurity Enthusiast'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    function type() {
        const currentRole = roles[roleIndex];
        const typedText = document.querySelector('.typed-text');
        
        if (!typedText) return;
        
        if (isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    type();

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Call once on load
});

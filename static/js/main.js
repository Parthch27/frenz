document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Helper function to create theme toggle
    function createThemeToggle() {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle-container';
        toggleContainer.innerHTML = `
            <span class="theme-icon light-icon"><i class="fas fa-sun"></i></span>
            <label class="theme-switch">
                <input type="checkbox" class="theme-toggle-checkbox">
                <span class="slider round"></span>
            </label>
            <span class="theme-icon dark-icon"><i class="fas fa-moon"></i></span>
        `;
        return toggleContainer;
    }
    
    // Add theme toggle to desktop and mobile positions
    const desktopContainer = document.getElementById('desktop-theme-container');
    const mobileContainer = document.getElementById('mobile-theme-container');
    
    if (desktopContainer) {
        desktopContainer.appendChild(createThemeToggle());
    }
    
    if (mobileContainer) {
        mobileContainer.appendChild(createThemeToggle());
    }
    
    // Get all theme toggles
    const themeToggleCheckboxes = document.querySelectorAll('.theme-toggle-checkbox');
    
    // Set initial theme based on user preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        updateLogoForDarkMode();
        updateElementsForDarkMode();
    } else {
        updateLogoForLightMode();
        updateElementsForLightMode();
    }
    
    // Add event listener to all theme toggles
    themeToggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const isDarkMode = this.checked;
            
            // Sync all checkboxes
            themeToggleCheckboxes.forEach(cb => {
                cb.checked = isDarkMode;
            });
            
            if (isDarkMode) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                
                // Update for dark mode
                updateLogoForDarkMode();
                updateElementsForDarkMode();
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                
                // Update for light mode
                updateLogoForLightMode();
                updateElementsForLightMode();
            }
        });
    });
    
    // Function to update logo for dark mode
    function updateLogoForDarkMode() {
        const logoText = document.querySelector('.logo-text');
        const logoAccent = document.querySelector('.logo-accent');
        
        if (logoText) {
            logoText.style.color = '#ffffff';
        }
        
        if (logoAccent) {
            logoAccent.style.color = '#16C79A';
        }
    }
    
    // Function to update logo for light mode
    function updateLogoForLightMode() {
        const logoText = document.querySelector('.logo-text');
        const logoAccent = document.querySelector('.logo-accent');
        
        if (logoText) {
            logoText.style.color = '#ffffff';
        }
        
        if (logoAccent) {
            logoAccent.style.color = '#16C79A';
        }
    }
    
    // Function to update various elements for dark mode
    function updateElementsForDarkMode() {
        // Update background elements for dark mode
        const bgLightElements = document.querySelectorAll('.bg-light');
        bgLightElements.forEach(element => {
            element.style.background = 'var(--bg-secondary)';
        });
        
        // Update cards, project placeholders, and other elements
        updateCardColors();
        updateProjectPlaceholders();
        updateServiceElements();
    }
    
    // Function to update various elements for light mode
    function updateElementsForLightMode() {
        // Update background elements for light mode
        const bgLightElements = document.querySelectorAll('.bg-light');
        bgLightElements.forEach(element => {
            element.style.background = 'var(--bg-secondary)';
        });
        
        // Update cards, project placeholders, and other elements
        updateCardColors();
        updateProjectPlaceholders();
        updateServiceElements();
    }
    
    // Update card colors based on theme
    function updateCardColors() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.background = 'var(--card-bg)';
            card.style.color = 'var(--text-body)';
        });
        
        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            title.style.color = 'var(--text-heading)';
        });
    }
    
    // Update project placeholders based on theme
    function updateProjectPlaceholders() {
        const projectPlaceholders = document.querySelectorAll('.project-placeholder');
        if (document.body.getAttribute('data-theme') === 'dark') {
            projectPlaceholders.forEach(placeholder => {
                placeholder.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        } else {
            projectPlaceholders.forEach(placeholder => {
                placeholder.style.background = 'rgba(0, 0, 0, 0.05)';
            });
        }
    }
    
    // Update service-specific elements based on theme
    function updateServiceElements() {
        // Service titles
        const serviceTitles = document.querySelectorAll('.service-detail-title, .service-title, .approach-title, .feature-title');
        serviceTitles.forEach(title => {
            title.style.color = 'var(--text-heading)';
        });
        
        // Service text
        const serviceTexts = document.querySelectorAll('.service-detail-text, .service-text, .approach-text, .feature-text');
        serviceTexts.forEach(text => {
            text.style.color = 'var(--text-body)';
        });
    }
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Generate particles for specific sections
    generateParticlesForSection('.hero', 30);
    generateParticlesForSection('.cta-section', 20);
    
    // Initialize Typed.js for sections that have that element
    if (document.querySelector('.typed-text') && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ["Digital Solutions", "Web Applications", "Mobile Apps", "User Experiences"],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Draw particles for contact page
    drawParticles();
});

// Create ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Generate particles for specific sections
function generateParticlesForSection(selector, count) {
    const section = document.querySelector(selector);
    if (!section) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    section.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.color = `rgba(22, 199, 154, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particle array
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines if they're close enough
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(22, 199, 154, ${0.2 - (distance/500)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Draw particles for specific elements
function drawParticles() {
    const particleContainers = document.querySelectorAll('.contact-particles');
    
    particleContainers.forEach(container => {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Set particle styles
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = duration + 's';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            // Random opacity
            const opacity = Math.random() * 0.3 + 0.1;
            particle.style.backgroundColor = `rgba(22, 199, 154, ${opacity})`;
            
            container.appendChild(particle);
        }
    });
}

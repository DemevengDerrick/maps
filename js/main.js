/**
 * Derrick Demeveng Portfolio - Main JavaScript
 * Interactive functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initSkillsTabs();
    initPortfolioFilter();
    initModal();
    initContactForm();
    initAnimations();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and scroll-based styling
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * Scroll Effects Module
 * Handles scroll-triggered animations and counters
 */
function initScrollEffects() {
    // Animate stat counters
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > sectionTop + 200) {
            statsAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
        }
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.offsetTop;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > sectionTop + 200) {
            skillsAnimated = true;
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 300);
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on load
}

/**
 * Skills Tabs Module
 * Handles tab switching in the skills section
 */
function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Update button states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });

            // Re-animate skill bars if showing technical tab
            if (tabId === 'technical') {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.width = '0';
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = `${progress}%`;
                    }, 100);
                });
            }
        });
    });
}

/**
 * Portfolio Filter Module
 * Handles project filtering in the portfolio section
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update button states
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Modal Module
 * Handles project detail modal
 */
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const viewBtns = document.querySelectorAll('.view-btn');

    // Project data
    const projectData = {
        'birth-death': {
            title: 'Cameroon Birth and Death Rates (1960-2024)',
            category: 'Demographics',
            description: 'Long-term trends in Cameroon\'s crude birth and death rates revealing sustained natural population growth. The steady decline in both indicators reflects a gradual demographic transition driven by improved survival, health conditions, and slowly declining fertility.',
            tags: ['Time Series', 'Trend Analysis', 'Demographic Indicators'],
            image: 'https://github.com/user-attachments/assets/99ef7470-9a81-45e2-a93e-8fc4ecb3dc9b'
        },
        'mortality': {
            title: 'Mortality Trends: Maternal, Under-5, Child, and Infant (1990-2024)',
            category: 'Demographics',
            description: 'Analysis of substantial long-term improvements in maternal, infant, neonatal, and under-five survival in Cameroon. The slower reduction in neonatal mortality highlights persistent risks in the first days of life, underscoring the need for sustained investments in maternal care and newborn health services.',
            tags: ['Mortality Analysis', 'Health Indicators', 'Trend Visualization'],
            image: 'https://github.com/user-attachments/assets/49066f49-d7bd-4055-a792-1acf8472b524'
        },
        'dependency': {
            title: 'Dependency Ratio Analysis (1960-2024)',
            category: 'Demographics',
            description: 'Visualization of demographic pressure on Cameroon\'s working-age population (15-64), showing how they support both a large child population (0-14) and a gradually expanding older population (65+). This analysis highlights the importance of job creation, productivity gains, and strengthened social protection systems.',
            tags: ['Population Structure', 'Dependency Ratio', 'Demographic Analysis'],
            image: 'https://github.com/user-attachments/assets/6594dc12-a00d-43d8-993f-d203a2b88517'
        },
        'hiv': {
            title: 'HIV Incidence and Prevalence Among Youth (1990-2024)',
            category: 'Public Health',
            description: 'Evolution of HIV incidence and prevalence among young people aged 15-24 in Cameroon. After a peak in the late 1990s and early 2000s, both indicators decline steadily, while persistently higher prevalence among young women highlights ongoing gender disparities requiring targeted interventions.',
            tags: ['HIV/AIDS', 'Youth Health', 'Gender Analysis'],
            image: 'https://github.com/user-attachments/assets/1dd492d5-1a99-47d0-af9d-598ffa33da7f'
        },
        'dpt1': {
            title: 'DPT1 Vaccination Coverage (WHO African Region, 2022)',
            category: 'Public Health',
            description: 'Choropleth map presenting DPT1 vaccination coverage across the WHO African Region. While several countries achieve coverage above 90%, others remain below 80%, underscoring persistent inequities in routine immunization and the need to reach zero-dose and under-immunized children.',
            tags: ['Vaccination', 'Choropleth Map', 'Immunization Coverage'],
            image: 'https://github.com/user-attachments/assets/ac4b780e-efd0-464b-9e4e-c71326517387'
        },
        'waterborne-cases': {
            title: 'Waterborne Disease Distribution in Africa',
            category: 'Public Health',
            description: 'Spatial distribution of reported disease cases across Africa, revealing geographic clustering and hotspots of higher burden. The concentration of cases in specific regions highlights spatial inequities in disease transmission and reporting.',
            tags: ['Disease Mapping', 'Choropleth', 'Epidemiology'],
            image: 'https://github.com/user-attachments/assets/97d07e9c-0436-413e-b2d3-2ff33cb9987f'
        },
        'bivariate': {
            title: 'Bivariate Map: Cases vs Deaths',
            category: 'Public Health',
            description: 'Joint spatial distribution of disease cases and deaths across Africa, highlighting areas where high incidence coincides with high mortality. Darker shades reveal priority hotspots with elevated health burden and severity.',
            tags: ['Bivariate Mapping', 'Spatial Analysis', 'Health Burden'],
            image: 'https://github.com/user-attachments/assets/4ce89cb4-ec17-4f75-882d-9f72fbc45ff4'
        },
        'hotspot': {
            title: 'Hotspot Analysis (Spatial Autocorrelation)',
            category: 'Public Health',
            description: 'Statistically significant clusters of high and low disease burden identified using spatial autocorrelation methods. High-confidence hotspots reveal areas of concentrated transmission, providing actionable evidence for prioritizing surveillance and resource allocation.',
            tags: ['Hotspot Analysis', 'Spatial Statistics', 'Getis-Ord Gi*'],
            image: 'https://github.com/user-attachments/assets/e30f9c3a-fb38-44c5-824e-fdd24cc75e46'
        },
        'disease-clusters': {
            title: 'Disease-Specific Cluster Analysis (2019-2023)',
            category: 'Public Health',
            description: 'Multi-panel spatial cluster analysis of major waterborne diseases (malaria, diarrhoea, dengue, cholera, typhoid) across the WHO African Region. Recurring hotspots along river basins, lake regions, and densely populated corridors underscore links between water systems, environmental conditions, and disease transmission.',
            tags: ['Cluster Analysis', 'Multi-Disease', 'Spatial Epidemiology'],
            image: 'https://github.com/user-attachments/assets/f3243f8c-450a-425d-99ae-e3d86c21994f'
        },
        'es-dashboard': {
            title: 'Environmental Surveillance Dashboard (WHO African Region)',
            category: 'Public Health',
            description: 'Dashboard summarizing Environmental Surveillance performance indicators across the WHO African Region (South-East sub-region) from March 2023 to March 2024. Monitors site coverage, sample collection, timeliness, sample quality, and enterovirus detection to strengthen polio surveillance.',
            tags: ['Dashboard', 'Surveillance', 'Performance Monitoring'],
            image: 'https://github.com/user-attachments/assets/5db70c7a-1db1-41eb-825d-dc1823930a8a'
        },
        'ev-isolation': {
            title: 'Enterovirus Isolation Rates by Site',
            category: 'Public Health',
            description: 'Spatial distribution of enterovirus (EV) isolation rates by environmental surveillance site. Variability in site performance helps identify locations with suboptimal detection rates, guiding targeted actions to strengthen sampling quality.',
            tags: ['Polio Surveillance', 'Site Performance', 'Spatial Mapping'],
            image: 'https://github.com/user-attachments/assets/9856656d-2bb1-4228-a3f0-4246bd4956a0'
        },
        'gdp-cemac': {
            title: 'GDP Growth: Cameroon vs CEMAC Countries (1960-2024)',
            category: 'Economics',
            description: 'Comparative analysis highlighting Cameroon\'s sustained and resilient economic expansion relative to other CEMAC countries. While peer economies show greater volatility, Cameroon\'s steady trajectory has widened its economic lead within the sub-region.',
            tags: ['GDP Analysis', 'Economic Comparison', 'CEMAC'],
            image: 'https://github.com/user-attachments/assets/4cc297ad-5676-40be-b325-3f267dfec8f6'
        },
        'gdp-regional': {
            title: 'GDP Growth: Western & Central Africa (1960-2024)',
            category: 'Economics',
            description: 'Broader regional context comparing Cameroon with Western and Central African countries. Despite Nigeria\'s dominance in absolute size, Cameroon shows steadier expansion, positioning it among leading mid-sized economies in the region.',
            tags: ['Regional Economics', 'Comparative Analysis', 'Time Series'],
            image: 'https://github.com/user-attachments/assets/65f71559-45a5-47ce-94a6-6794bc7255bd'
        },
        'gdp-proportional': {
            title: 'Proportional Symbol Map: Regional GDP (2024)',
            category: 'Economics',
            description: 'National GDP levels visualized using proportional symbols, highlighting economic output concentration in Nigeria and a second tier led by Cameroon, Ghana, and Côte d\'Ivoire. Accompanying time series shows sustained regional growth since the early 2000s.',
            tags: ['Proportional Symbols', 'Economic Mapping', 'GDP Visualization'],
            image: 'https://github.com/user-attachments/assets/b16b3292-aa30-4ada-b4e0-d7dc41533a9f'
        },
        'accessibility': {
            title: 'Education Accessibility in Dschang, Cameroon',
            category: 'Geospatial',
            description: 'Accessibility modeling for primary and secondary schools under motorized and walking travel scenarios. The analysis reveals strong accessibility advantages near urban cores while peripheral and mountainous areas experience significantly longer travel times, informing school placement and transport planning.',
            tags: ['Accessibility Analysis', 'Travel Time', 'Education Planning'],
            image: 'https://github.com/user-attachments/assets/c62be97b-ee3f-4f74-ac72-b9d29e055256'
        },
        'pacific': {
            title: 'Pacific Ocean Countries Map',
            category: 'Geospatial',
            description: 'Geographic visualization of Pacific Ocean countries alongside Australia and New Zealand, illustrating the wide dispersion of small island states. The map highlights the region\'s vast oceanic scale, spatial isolation, and logistical complexity—key factors shaping development planning and regional cooperation.',
            tags: ['Regional Mapping', 'Island States', 'Geographic Context'],
            image: 'https://github.com/user-attachments/assets/e0604083-8703-4028-8529-54847d2ccb58'
        },
        'landcover': {
            title: 'Vegetation Extraction in Akwa Ibom State, Nigeria',
            category: 'Environment',
            description: 'Satellite-derived land cover analysis isolating tree vegetation from built-up areas and linear infrastructure. The analysis highlights spatial extent and fragmentation of vegetation, providing a baseline for environmental monitoring and land-use planning.',
            tags: ['Land Cover', 'Remote Sensing', 'Vegetation Analysis'],
            image: 'https://github.com/user-attachments/assets/a6e93ac1-c3cd-41ff-b726-e00ab51fb66d'
        },
        'vegetation-patches': {
            title: 'Large Vegetation Patch Identification (≥15 km²)',
            category: 'Environment',
            description: 'Identification of contiguous tree vegetation areas of at least 15 km² after removing roads and river corridors. Analysis shows remaining large vegetation patches and their proximity to settlements, supporting conservation planning and environmental impact assessments.',
            tags: ['Conservation', 'Patch Analysis', 'Environmental Planning'],
            image: 'https://github.com/user-attachments/assets/6ab24703-e7ff-46ae-98fd-9eb0a2fd4621'
        }
    };

    // Open modal
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalCategory.textContent = project.category;
                modalDescription.textContent = project.description;

                // Clear and add tags
                modalTags.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.textContent = tag;
                    modalTags.appendChild(tagSpan);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Contact Form Module
 * Handles form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Construct mailto link
        const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `Message:\n${data.message}`
        );
        const mailtoLink = `mailto:demeveng@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show confirmation
        showNotification('Opening your email client...', 'success');
        form.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Animations Module
 * Handles scroll-triggered reveal animations
 */
function initAnimations() {
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.timeline-item, .skill-card, .publication-card, .portfolio-item, .domain-card, .tool-item'
    );

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index % 6 * 0.1}s`;
    });

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

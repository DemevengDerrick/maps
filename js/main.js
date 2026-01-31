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
    initExperienceModal();
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
 * Experience Modal Module
 * Handles the experience carousel modal
 */
function initExperienceModal() {
    const modal = document.getElementById('experienceModal');
    const modalClose = document.getElementById('experienceModalClose');
    const experienceItems = document.querySelectorAll('.experience-item');

    // Experience data
    const experienceData = {
        'unfpa': {
            title: 'Program Specialist, Geospatial Analysis',
            organization: 'United Nations Population Fund (UNFPA)',
            location: 'Nairobi, Kenya',
            date: 'March 2025 - Present',
            logo: 'images/unfpa.png',
            logoType: 'image',
            responsibilities: 'Programme Specialist, Geospatial Analysis at UNFPA HQ, leading the design and application of integrated geospatial and statistical methods to support LNOB (Leave No One Behind) analysis, population vulnerability assessments, and access to SRH services. Oversee geospatial data platforms, dashboards, and capacity building across HQ, regions, and countries, while representing UNFPA in inter-agency and global data-innovation initiatives.',
            achievements: [
                'Management of the Global Enterprise GIS infrastructure including software licensing, contracts and cost optimization strategies',
                'Designed and deployed an organization-wide GIS infrastructure monitoring dashboard, enabling real-time tracking of system usage, performance, and adoption across users',
                'Led the rollout of the Degree of Urbanization (DEGURBA) methodology in five countries (Rwanda, Tanzania, Paraguay, Ghana, and the Dominican Republic), enabling standardized urban-rural disaggregation',
                'Developed an end-to-end climate risk analysis workflow in R to map flood exposure of vulnerable populations, supporting targeted field interventions and climate resilience planning',
                'Built an interactive global Census Tracking Dashboard in Power BI to monitor Population and Housing Census implementation status, timelines, and gaps',
                'Provided technical training to over 50 regional trainers on geospatial technologies for modeling physical accessibility to maternal health services',
                'Trained technical teams from more than 20 countries on ArcGIS Pro and ArcGIS Online for spatial analysis, web mapping, and dashboard development',
                'Coordinated third-party contractors in the development of the organization\'s data platform, ensuring timely delivery and technical quality'
            ]
        },
        'who-data': {
            title: 'Data Analyst',
            organization: 'World Health Organization - Data & Information Management Unit',
            location: 'Brazzaville, Congo',
            date: 'January 2024 - February 2025',
            logo: 'images/WHO.jpg',
            logoType: 'image',
            responsibilities: 'In charge of the management of the WHO Regional Polio laboratory databases including Acute Flaccid Paralysis (AFP) data and Environmental Surveillance data. This includes supporting the development of a new Centralized web-based Information for Action Platform (WebIFA) for connecting country and laboratory databases.',
            achievements: [
                'Development of Data quality guidelines for managing Polio Data',
                'Development of Data pipelines in R for data ingestion, transformation, and loading to manage data shared by the 16 polio labs',
                'Development of data quality checks in R and automatic production of reports and emailing to different stakeholders',
                'Development of automated data analysis workflows and automatic reporting in R',
                'Supported the development of an R Package for Polio data management',
                'Support the development of WebIFA technical specifications and review of the development process',
                'Support Regional roll-out of WebIFA in 47 Countries and 16 Labs through capacity building and technical support'
            ]
        },
        'who-gis': {
            title: 'GIS Analyst',
            organization: 'World Health Organization - African Regional Office, GIS Center',
            location: 'Brazzaville, Congo',
            date: 'January 2021 - December 2023',
            logo: 'images/WHO.jpg',
            logoType: 'image',
            responsibilities: 'Working with RESWG (Regional Environmental Surveillance Working Group) Members, country focal points, WCO and MoH to introduce and provide training for the ES electronic data tools. Supporting countries by developing National ES plans to monitor ES implementation in nOPV2 priority countries. Creating weekly web-based site performance monitoring tool, analyses dashboards and feedback to countries.',
            achievements: [
                'Supported the implementation of electronic data tools in environmental surveillance for poliovirus in 40/47 countries of AFRO',
                'Developed a regional M&E dynamic dashboard using Power BI for monitoring ES performance in alignment with the global polio surveillance action plan 2022-2024',
                'Managed the AFRO instance of the ES Catalog, documenting all ES sites, geocoordinates, bluelines, catchment areas, and populations',
                'Supported the implementation of the Geospatial Tracking Systems (GTS) in supplementary immunization activities in Cameroon and Congo',
                'Supported development of GIS and Business Intelligence training materials and roll-out of capacity building for the 47 member states',
                'Development of ArcGIS Pro toolbox to automate virus mapping process and data ingestion from ONA/ODK server using Esri ArcPy',
                'Developed a free and opensource QGIS plugin (ODKConnector) to ingest ONA/ODK data directly into QGIS',
                'Successfully set up a PostgreSQL instance and user management for 47 Countries in WHO AFRO region',
                'Created data pipeline on 47 African countries using KNIME to extract polio surveillance data from ODK server, transforming and loading into PostgreSQL'
            ]
        },
        'bmgf': {
            title: 'GIS Analyst',
            organization: 'Bill & Melinda Gates Foundation (BMGF)',
            location: 'Brazzaville, Congo',
            date: 'June 2020 - December 2020',
            logo: 'images/gates_foundation.png',
            logoType: 'image',
            responsibilities: 'Facilitating access to population/survey data for population modeling in selected countries in the region. Providing training/orientation to local government and partners for understanding how to access and use the modeled population data. Coordinating with GIS focal points to validate environmental surveillance sites, geocoding AFP cases, and providing GIS training to in-country teams.',
            achievements: [
                'Supported the training and validation of machine learning models for building and settlement extraction from satellite imagery across Africa in support to population estimates for immunization activities',
                'Supported the WHO AFRO GIS Center in collecting and sharing baseline data on population, POIs, and data validation for geostatistical population modeling',
                'Supported field initiation, review, and expansion of Environmental Surveillance for poliovirus in AFRO (Mauritia, Burkina-Faso, Benin, and Chad)',
                'Capacity building of field data collectors on the use of ODK and country data managers on the management of ODK server',
                'Development of dynamic M&E Dashboards using ArcGIS Online dashboards to track the performance of Environmental Surveillance activities'
            ]
        },
        'sogefi': {
            title: 'Geomatic Project Manager',
            organization: 'SOGEFI',
            location: 'Yaounde, Cameroon',
            date: 'August 2019 - May 2020',
            logo: 'images/SOGEFI2.jpg',
            logoType: 'image',
            responsibilities: 'GeOSM Project manager (opensource geospatial data infrastructure on 20 African countries). Managing GIS, GPS (GNSS) and Drone mapping projects. Leading the development of Geospatial data infrastructures using opensource technologies. Providing technical support to clients and GIS capacity building.',
            achievements: [
                'Supported the mapping of Landcover of Cameroon using satellite Imagery and Machine learning models for image classification',
                'Trained and mentored 20 field data collectors in the use of field data collection mobile applications, data validation and mapping using QGIS',
                'Managed and scaled up the deployment of GeOSM from one country to 20 African countries through advocacy, training, and technical support',
                'Developed and implemented an ODK based community intelligence approach in mapping flood risk in Douala, approved by the World Bank as a low-cost approach',
                'Led a team of 04 Staff and more than 20 field data collectors to successfully deliver the World Bank flood risk mapping project in two districts of Yaoundé',
                'Led a team of 04 Staff and more than 20 field data collectors in the Mapping of Internally displaced due to the anglophone crisis for the World Bank',
                'Led the mapping of services in 18 African cities for UNESCO\'s adolescent and youth services integration project',
                'Led the development of the Rapid Response Mechanism (RRM) portal for Premier Urgence and Action Contre la Faim',
                'Successfully conducted drone mapping projects producing orthomosaic pictures, DEMs, and point cloud data'
            ]
        },
        'sgds': {
            title: 'Survey Engineer',
            organization: 'SGDS International',
            location: 'Yaounde, Cameroon',
            date: 'September 2018 - July 2019',
            logo: 'images/SGDS_International.png',
            logoType: 'image',
            responsibilities: 'Overseeing the project of densification of Cameroon\'s national geodetic network in the Centre and Littoral regions, including preliminary mapping of the network, GNSS observations, baseline postprocessing, and triangulation of inaccessible references.',
            achievements: [
                'Successfully led the survey and expansion of the Geodesic system of Cameroon in the Central and Littoral regions',
                'Planning missions, budgeting needs, data collection, baseline postprocessing, and production of reports for the Ministry of Lands and Surveys',
                'Using geodesic triangulation to determine coordinates of inaccessible telecommunication antennae used as permanent reference points',
                'Designed maps of geodesic sites for all districts in the Center and Littoral region of Cameroon'
            ]
        },
        'ggf': {
            title: 'Survey Engineer',
            organization: 'Group Galant & Friends',
            location: 'Yaounde, Cameroon',
            date: 'September 2017 - August 2018',
            logo: 'GGF',
            logoType: 'text',
            responsibilities: 'Overseeing all topographic and geodesic mapping projects including planning of data collection missions, stakeout, and surveying of geodesic reference points on road corridors, drone mapping of road corridors, ground topographic surveys using total stations, and designing of urban, interurban, and rural roads.',
            achievements: [
                'Successfully conducted topographic surveys for the building of bridge in Edea city',
                'Successfully conducted topographic surveys for rehabilitation of roads in the city of Bagangte for the 2021 AFCON',
                'More than 150hr cumulative of drone mapping on road projects',
                'More than 200Km cumulative of road surveys'
            ]
        }
    };

    // Open modal function
    function openExperienceModal(experienceId) {
        const experience = experienceData[experienceId];
        if (!experience) return;

        // Set modal content
        const logoContainer = document.getElementById('expModalLogo');
        if (experience.logoType === 'image') {
            logoContainer.innerHTML = `<img src="${experience.logo}" alt="${experience.organization} Logo">`;
            logoContainer.classList.remove('text-logo');
        } else {
            logoContainer.innerHTML = `<span>${experience.logo}</span>`;
            logoContainer.classList.add('text-logo');
        }

        document.getElementById('expModalTitle').textContent = experience.title;
        document.getElementById('expModalOrg').textContent = experience.organization;
        document.getElementById('expModalLocation').querySelector('span').textContent = experience.location;
        document.getElementById('expModalDate').querySelector('span').textContent = experience.date;
        document.getElementById('expModalResponsibilities').textContent = experience.responsibilities;

        // Build achievements list
        const achievementsList = document.getElementById('expModalAchievements');
        achievementsList.innerHTML = '';
        experience.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeExperienceModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click listeners to experience items
    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            const experienceId = item.getAttribute('data-experience');
            openExperienceModal(experienceId);
        });
    });

    // Close modal on button click
    modalClose?.addEventListener('click', closeExperienceModal);

    // Close modal on backdrop click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeExperienceModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeExperienceModal();
        }
    });
}

/**
 * Contact Form Module
 * Handles form validation and submission via Formspree
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', async (e) => {
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

        // Show sending notification
        showNotification('Sending message...', 'info');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again or reach out via social media.', 'error');
        }
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

    // Add reveal class to elements (excluding experience-items which use CSS animation)
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

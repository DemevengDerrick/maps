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
    initCountriesMap();
    initExperienceCategories();
    initServiceQuotes();
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
            organization: 'United Nations Population Fund (UNFPA) - Data, Demography and Development Branch',
            location: 'Nairobi, Kenya',
            date: 'March 2025 - Present',
            logo: 'images/unfpa.png',
            logoType: 'image',
            responsibilities: 'Programme Specialist, Geospatial Analysis at UNFPA HQ, leading the design and application of integrated geospatial and statistical methods to support LNOB (Leave No One Behind) analysis, population vulnerability assessments, and access to SRH services. Oversee geospatial data platforms, dashboards, and capacity building across HQ, regions, and countries, while representing UNFPA in inter-agency and global data-innovation initiatives.',
            achievements: [
                'Provided strategic leadership for the organization global Enterprise GIS ecosystem, overseeing software licensing, vendor and service provider contracts, reviewing guidelines for procurement of satellite imagery and GIS infrastructures to support Censuses in countries, and cost-optimization strategies, while coordinating third-party contractors to deliver scalable, standards-compliant data platforms.',
                'Supported the coordination with technical vendors in the development of the global population data and demographic intelligence from open-source platforms to provide insight into sexual and reproductive health and rights.',
                'Supported the international rollout of the Degree of Urbanization (DEGURBA) methodology using population censuses and built-up data across five countries, enabling standardized urban-rural classification and cross-country comparability of SDG indicators for policy and planning.',
                'Supported regional training of five country GIS focal points in conducting geospatial accessibility analysis to support Emergency Obstetric and Newborn Care (EmONC) prioritization exercises in countries.',
                'Developed end-to-end geospatial analytics pipelines in R for climate risk and flood-exposure modeling, integrating population and hazard data to support targeted, data-driven interventions and resilience planning for vulnerable populations.',
                'Built interactive decision-support dashboards in Power BI, including a global Census Tracking Dashboard, to monitor implementation status, timelines, and gaps, strengthening data-driven oversight and strategic decision-making.'
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
                'Developed data governance and quality frameworks for polio surveillance data, including standardized validation rules and quality guidelines applied across regional datasets.',
                'Built automated ETL pipelines in R to ingest, transform, and harmonize laboratory and surveillance data from 16 polio laboratories into centralized data management and analytics systems used by the Global Polio Eradication Network.',
                'Implemented automated data quality checks, analysis, and reporting workflows in R, generating reproducible reports and distributing outputs automatically to multiple stakeholder groups.',
                'Contributed to the development of an R package for polio data management, supporting reusable, modular, and maintainable data processing and analysis workflows.',
                'Supported the technical design and regional rollout of a Web Information for Action (WEBIFA) platform, including review of technical specifications, implementation planning, and capacity building across 47 countries and 16 laboratories.'
            ]
        },
        'who-gis': {
            title: 'GIS Analyst',
            organization: 'World Health Organization - African Regional Office, GIS Center',
            location: 'Brazzaville, Congo',
            date: 'January 2021 - December 2023',
            logo: 'images/WHO.jpg',
            logoType: 'image',
            responsibilities: 'Coordination with regional working groups, country focal points, ministries of health, and partners on the introduction and orientation of electronic surveillance data collection tools in countries. Providing technical guidance to countries on the preparation of national ES monitoring plans for priority settings. Coordination with technical partners on the development of geospatial data management platform for polio surveillance. Development and maintenance of business intelligence dashboards, provision of regular analytical outputs to country teams, and participation in periodic desk reviews of surveillance activities through data analysis and coordination calls with key stakeholders.',
            achievements: [
                'Designed and maintained regional ETL pipelines using KNIME, Python, and PostgreSQL, extracting surveillance data from ODK/ONA servers, performing data validation and transformation, and loading structured datasets to support analytics across 47 countries.',
                'Developed automated geospatial data ingestion and processing tools using Python (ArcPy), including a custom ArcGIS Pro toolbox and Python notebooks to synchronize data between ODK servers, ArcGIS Pro, and ArcGIS Online.',
                'Built and released an open-source QGIS plugin enabling direct ingestion of ODK/ONA data into QGIS, reducing manual data handling and improving efficiency in geospatial data management workflows.',
                'Designed and managed centralized geospatial databases using PostgreSQL/PostGIS, including schema design, user access management, and spatial data standardization for regional-scale analytics.',
                'Developed interactive analytics and performance monitoring dashboards using Power BI, translating complex surveillance and geospatial datasets into actionable insights for regional decision-making.'
            ]
        },
        'bmgf': {
            title: 'GIS Analyst',
            organization: 'Bill & Melinda Gates Foundation (BMGF)',
            location: 'Brazzaville, Congo',
            date: 'June 2020 - December 2020',
            logo: 'images/gates_foundation.png',
            logoType: 'image',
            responsibilities: 'Providing GIS and data analysis support during outbreak response activities, supporting the mapping of surveillance sites, and supporting the preparation and sharing of surveillance datasets at local, national, and regional levels. Supporting the rollout and routine follow-up of electronic data collection tools, monitoring incoming data submissions, and supporting data workflows between field data collection systems and national, regional, and global information platforms.',
            achievements: [
                'Managed the Geospatial Polio Environmental Surveillance data platform for the World Health Organization (WHO) regional office for Africa, cataloging more than 500 surveillance sites, watersheds and population data across 47 countries.',
                'Supported the training, validation, and quality assurance of machine learning models for building and settlement extraction from satellite imagery across Africa, contributing to population estimates used for immunization planning and micro-planning activities.',
                'Supported the WHO AFRO GIS Center in the collection, validation, and dissemination of baseline geospatial datasets, including population data and points of interest (POIs) to support geostatistical population modeling and analytics for immunization activities across 47 countries.',
                'Supported the initiation, review, and expansion of Geospatial technologies for Environmental Surveillance (ES) of poliovirus across four (04) African countries (Mauritania, Burkina Faso, Benin, and Chad), including capacity building of more than hundred (100) field data collectors and country data managers on the use of mobile phones, and GIS workflows to conduct data quality assurance, and KPI-based performance monitoring.',
                'Developed dynamic M&E dashboards using ArcGIS Online Dashboard to monitor the performance of Environmental Surveillance activities, enabling real-time tracking of key program indicators and operational decision-making.'
            ]
        },
        'sogefi': {
            title: 'Geomatic Project Manager',
            organization: 'SOGEFI',
            location: 'Yaounde, Cameroon',
            date: 'August 2019 - May 2020',
            logo: 'images/SOGEFI2.jpg',
            logoType: 'image',
            responsibilities: 'Coordinating geospatial projects across Africa, including managing the GeoOSM project, an open-source geospatial data infrastructure initiative covering multiple African countries. Overseeing GIS, GNSS, and drone mapping activities; supervising geospatial data collection projects; and supporting the development and maintenance of geospatial data infrastructures using open-source technologies. Managing geospatial data and systems, providing technical support to clients, delivering GIS training and capacity-building activities, contributing to tender preparation and responses, and producing technical documentation.',
            achievements: [
                'Supported land-cover mapping in Cameroon using satellite imagery and machine learning-based image classification techniques, including Support Vector Machines (SVM), Random Forest, and Maximum Likelihood algorithms.',
                'Led a team of two (02) software developers in the design, development, testing, deployment, and scaling of an open-source geospatial data infrastructure (GeoOSM) built on OpenStreetMap data across twenty (20) African countries. Responsibilities included technical oversight, code review and troubleshooting, geospatial database design using PostgreSQL/PostGIS, QGIS Server management, and capacity building through advocacy, training, and technical support.',
                'Managed a multidisciplinary team of four (04) staff and over twenty (20) field data collectors to deliver a World Bank-funded flood risk mapping project in Yaoundé and Douala, applying participatory mapping and focus group discussions, and leveraging mobile data collection platforms and GIS workflows to map and validate over 1,000,000 socioeconomic activities in flood-prone areas.',
                'Led a team of ten (10) field mappers to conduct large-scale mapping of more than hundred thousand (100,000) socioeconomic activities in Cameroon\'s Southwest Region, supporting the assessment of the economic impacts of the ongoing crisis.',
                'Directed the mapping of health and protection services in 18 African cities under the UNESCO-funded project Integration of Sexual, Reproductive, Support, and Protection Services for Adolescents and Young People.',
                'Led a team of two developers in the development of a Humanitarian Rapid Response Mechanism (RRM) platform for Premier Urgence International and Action Against Hunger, supporting timely data collection, analysis, and decision-making in emergency response contexts.'
            ]
        },
        'sgds': {
            title: 'Survey Engineer',
            organization: 'SGDS International',
            location: 'Yaounde, Cameroon',
            date: 'September 2018 - July 2019',
            logo: 'images/SGDS_International.png',
            logoType: 'image',
            responsibilities: 'Overseeing the project of densification of Cameroon\'s national geodetic network in the Centre and Littoral regions, preliminary mapping of the network, GNSS observations, baseline postprocessing, triangulation of inaccessible references.',
            achievements: [
                'Led a team of three surveyors in the establishment of 200 geodetic control pillars across five towns in Cameroon, supporting the expansion of the national geodetic network.',
                'Planned, executed, and post-processed geodetic baseline observations for the 200 control pillars using least-squares adjustment methods to ensure positional accuracy and network consistency.',
                'Contributed to the preparation of the project\'s final technical report submitted to the Ministry of Lands and Surveys, including documentation of methodology, results, and quality assurance procedures.'
            ]
        },
        'ggf': {
            title: 'Survey Engineer',
            organization: 'Group Galant & Friends',
            location: 'Yaounde, Cameroon',
            date: 'September 2017 - August 2018',
            logo: 'GGF',
            logoType: 'text',
            responsibilities: 'Overseeing all topographic and geodesic mapping projects. These tasks included planning of topographic and geodesic data collection missions, stakeout, and surveying of geodesic reference points on road corridors, drone mapping of road corridors and production of orthophotos, digital elevation models (DEM), and points clouds, ground topographic surveys using total stations, designing of urban, interurban, and rural roads, quantitative surveys, production of technical documents.',
            achievements: [
                'Led a team of two surveyors in conducting large-scale topographic surveys covering over 300 km of road infrastructure in Cameroon, using GNSS, total stations, and drone mapping. Responsibilities included data processing, cut-and-fill computations, and preparation of detailed topographic survey reports.',
                'Led a team of two surveyors in carrying out topographic surveys for more than 50 culverts and two bridges in Cameroon, including survey setup, data processing, cut-and-fill analysis, and production of technical topographic reports.'
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
        const achievementsHeading = achievementsList.previousElementSibling;
        achievementsList.innerHTML = '';

        // Hide achievements section if no achievements
        if (experience.achievements && experience.achievements.length > 0) {
            achievementsHeading.style.display = 'block';
            achievementsList.style.display = 'block';
            experience.achievements.forEach(achievement => {
                const li = document.createElement('li');
                li.textContent = achievement;
                achievementsList.appendChild(li);
            });
        } else {
            achievementsHeading.style.display = 'none';
            achievementsList.style.display = 'none';
        }

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
 * Countries Map Module
 * Displays an interactive map of visited countries
 */
function initCountriesMap() {
    const mapContainer = document.getElementById('countriesMap');
    if (!mapContainer || typeof L === 'undefined') return;

    // Initialize the map centered on Africa (zoom only via buttons)
    const map = L.map('countriesMap', {
        center: [10, 20],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        dragging: true
    });

    // Add tile layer (CartoDB Positron for clean look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Country data with coordinates for markers
    const visitedCountries = {
        'MRT': { name: 'Mauritania', coords: [20.3, -10.5] },
        'SEN': { name: 'Senegal', coords: [14.5, -14.5] },
        'GMB': { name: 'Gambia', coords: [13.5, -15.5] },
        'GHA': { name: 'Ghana', coords: [7.9, -1.0] },
        'CIV': { name: "Côte d'Ivoire", coords: [7.5, -5.5] },
        'TGO': { name: 'Togo', coords: [8.6, 0.8] },
        'BEN': { name: 'Benin', coords: [9.3, 2.3] },
        'NGA': { name: 'Nigeria', coords: [9.1, 8.7] },
        'BFA': { name: 'Burkina Faso', coords: [12.2, -1.5] },
        'CMR': { name: 'Cameroon', coords: [5.9, 12.4] },
        'GAB': { name: 'Gabon', coords: [-0.8, 11.6] },
        'TCD': { name: 'Chad', coords: [15.5, 19.0] },
        'COG': { name: 'Republic of Congo', coords: [-0.2, 15.8] },
        'COD': { name: 'DR Congo', coords: [-4.0, 21.8] },
        'KEN': { name: 'Kenya', coords: [-0.5, 38.0] },
        'TZA': { name: 'Tanzania', coords: [-6.4, 34.9] },
        'MWI': { name: 'Malawi', coords: [-13.3, 34.3] },
        'MDG': { name: 'Madagascar', coords: [-18.9, 46.9] },
        'RWA': { name: 'Rwanda', coords: [-1.9, 29.9] },
        'ETH': { name: 'Ethiopia', coords: [9.1, 40.5] },
        'PRY': { name: 'Paraguay', coords: [-23.4, -58.4] },
        'QAT': { name: 'Qatar', coords: [25.4, 51.2] },
        'DOM': { name: 'Dominican Republic', coords: [18.7, -70.2] },
        'USA': { name: 'United States', coords: [37.1, -95.7] },
        'CAN': { name: 'Canada', coords: [56.1, -106.3] },
        'ALB': { name: 'Albania', coords: [41.15, 20.17] }
    };

    const visitedCodes = Object.keys(visitedCountries);

    // Custom marker icon
    const markerIcon = L.divIcon({
        className: 'country-marker',
        html: '<div class="marker-dot"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    // Fetch GeoJSON data for world countries
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function(feature) {
                    const countryCode = feature.properties.ISO_A3;
                    const isVisited = visitedCodes.includes(countryCode);
                    return {
                        fillColor: isVisited ? '#2563eb' : '#e2e8f0',
                        weight: 1,
                        opacity: 1,
                        color: '#ffffff',
                        fillOpacity: isVisited ? 0.7 : 0.3
                    };
                },
                onEachFeature: function(feature, layer) {
                    const countryCode = feature.properties.ISO_A3;
                    if (visitedCodes.includes(countryCode)) {
                        const countryData = visitedCountries[countryCode];
                        layer.on({
                            mouseover: function(e) {
                                e.target.setStyle({
                                    fillOpacity: 0.9,
                                    weight: 2
                                });
                            },
                            mouseout: function(e) {
                                e.target.setStyle({
                                    fillOpacity: 0.7,
                                    weight: 1
                                });
                            }
                        });
                    }
                }
            }).addTo(map);

            // Add markers at center of each visited country
            Object.keys(visitedCountries).forEach(code => {
                const country = visitedCountries[code];
                const marker = L.marker(country.coords, { icon: markerIcon })
                    .addTo(map)
                    .bindTooltip(country.name, {
                        permanent: false,
                        direction: 'top',
                        offset: [0, -5],
                        className: 'country-tooltip'
                    });
            });
        })
        .catch(error => {
            console.error('Error loading countries GeoJSON:', error);
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
 * Experience Categories Module
 * Displays achievements categorized by Geospatial/Data Analysis, BI Analysis, and Data Engineering
 */
function initExperienceCategories() {
    const tabBtns = document.querySelectorAll('.exp-tab-btn');
    const tabContents = document.querySelectorAll('.exp-tab-content');

    // Categorized experience data — achievements split across roles
    const categorizedExperience = {
        geospatial: [
            {
                org: 'United Nations Population Fund (UNFPA)',
                logo: 'images/unfpa.png',
                logoType: 'image',
                role: 'Program Specialist, Geospatial Analysis',
                date: 'March 2025 - Present',
                achievements: [
                    'Provided strategic leadership for the organization global Enterprise GIS ecosystem, overseeing software licensing, vendor and service provider contracts, reviewing guidelines for procurement of satellite imagery and GIS infrastructures to support Censuses in countries, and cost-optimization strategies, while coordinating third-party contractors to deliver scalable, standards-compliant data platforms.',
                    'Supported the coordination with technical vendors in the development of the global population data and demographic intelligence from open-source platforms to provide insight into sexual and reproductive health and rights.',
                    'Supported the international rollout of the Degree of Urbanization (DEGURBA) methodology using population censuses and built-up data across five countries, enabling standardized urban-rural classification and cross-country comparability of SDG indicators for policy and planning.',
                    'Supported regional training of five country GIS focal points in conducting geospatial accessibility analysis to support Emergency Obstetric and Newborn Care (EmONC) prioritization exercises in countries.',
                    'Developed end-to-end geospatial analytics pipelines in R for climate risk and flood-exposure modeling, integrating population and hazard data to support targeted, data-driven interventions and resilience planning for vulnerable populations.'
                ]
            },
            {
                org: 'World Health Organization - GIS Center',
                logo: 'images/WHO.jpg',
                logoType: 'image',
                role: 'GIS Analyst',
                date: 'January 2021 - December 2023',
                achievements: [
                    'Developed automated geospatial data ingestion and processing tools using Python (ArcPy), including a custom ArcGIS Pro toolbox and Python notebooks to synchronize data between ODK servers, ArcGIS Pro, and ArcGIS Online.'
                ]
            },
            {
                org: 'Bill & Melinda Gates Foundation (BMGF)',
                logo: 'images/gates_foundation.png',
                logoType: 'image',
                role: 'GIS Analyst',
                date: 'June 2020 - December 2020',
                achievements: [
                    'Managed the Geospatial Polio Environmental Surveillance data platform for the World Health Organization (WHO) regional office for Africa, cataloging more than 500 surveillance sites, watersheds and population data across 47 countries.',
                    'Supported the training, validation, and quality assurance of machine learning models for building and settlement extraction from satellite imagery across Africa, contributing to population estimates used for immunization planning and micro-planning activities.',
                    'Supported the WHO AFRO GIS Center in the collection, validation, and dissemination of baseline geospatial datasets, including population data and points of interest (POIs) to support geostatistical population modeling and analytics for immunization activities across 47 countries.',
                    'Supported the initiation, review, and expansion of Geospatial technologies for Environmental Surveillance (ES) of poliovirus across four (04) African countries (Mauritania, Burkina Faso, Benin, and Chad), including capacity building of more than hundred (100) field data collectors and country data managers on the use of mobile phones, and GIS workflows to conduct data quality assurance, and KPI-based performance monitoring.'
                ]
            },
            {
                org: 'SOGEFI',
                logo: 'images/SOGEFI2.jpg',
                logoType: 'image',
                role: 'Geomatic Project Manager',
                date: 'August 2019 - May 2020',
                achievements: [
                    'Supported land-cover mapping in Cameroon using satellite imagery and machine learning-based image classification techniques, including Support Vector Machines (SVM), Random Forest, and Maximum Likelihood algorithms.',
                    'Managed a multidisciplinary team of four (04) staff and over twenty (20) field data collectors to deliver a World Bank-funded flood risk mapping project in Yaoundé and Douala, applying participatory mapping and focus group discussions, and leveraging mobile data collection platforms and GIS workflows to map and validate over 1,000,000 socioeconomic activities in flood-prone areas.',
                    'Led a team of ten (10) field mappers to conduct large-scale mapping of more than hundred thousand (100,000) socioeconomic activities in Cameroon\'s Southwest Region, supporting the assessment of the economic impacts of the ongoing crisis.',
                    'Directed the mapping of health and protection services in 18 African cities under the UNESCO-funded project Integration of Sexual, Reproductive, Support, and Protection Services for Adolescents and Young People.'
                ]
            },
            {
                org: 'SGDS International',
                logo: 'images/SGDS_International.png',
                logoType: 'image',
                role: 'Survey Engineer',
                date: 'September 2018 - July 2019',
                achievements: [
                    'Led a team of three surveyors in the establishment of 200 geodetic control pillars across five towns in Cameroon, supporting the expansion of the national geodetic network.',
                    'Planned, executed, and post-processed geodetic baseline observations for the 200 control pillars using least-squares adjustment methods to ensure positional accuracy and network consistency.',
                    'Contributed to the preparation of the project\'s final technical report submitted to the Ministry of Lands and Surveys, including documentation of methodology, results, and quality assurance procedures.'
                ]
            },
            {
                org: 'Group Galant & Friends',
                logo: 'GGF',
                logoType: 'text',
                role: 'Survey Engineer',
                date: 'September 2017 - August 2018',
                achievements: [
                    'Led a team of two surveyors in conducting large-scale topographic surveys covering over 300 km of road infrastructure in Cameroon, using GNSS, total stations, and drone mapping. Responsibilities included data processing, cut-and-fill computations, and preparation of detailed topographic survey reports.',
                    'Led a team of two surveyors in carrying out topographic surveys for more than 50 culverts and two bridges in Cameroon, including survey setup, data processing, cut-and-fill analysis, and production of technical topographic reports.'
                ]
            }
        ],
        bi: [
            {
                org: 'United Nations Population Fund (UNFPA)',
                logo: 'images/unfpa.png',
                logoType: 'image',
                role: 'Program Specialist, Geospatial Analysis',
                date: 'March 2025 - Present',
                achievements: [
                    'Built interactive decision-support dashboards in Power BI, including a global Census Tracking Dashboard, to monitor implementation status, timelines, and gaps, strengthening data-driven oversight and strategic decision-making.'
                ]
            },
            {
                org: 'World Health Organization - Data & Information Management Unit',
                logo: 'images/WHO.jpg',
                logoType: 'image',
                role: 'Data Analyst',
                date: 'January 2024 - February 2025',
                achievements: [
                    'Implemented automated data quality checks, analysis, and reporting workflows in R, generating reproducible reports and distributing outputs automatically to multiple stakeholder groups.'
                ]
            },
            {
                org: 'World Health Organization - GIS Center',
                logo: 'images/WHO.jpg',
                logoType: 'image',
                role: 'GIS Analyst',
                date: 'January 2021 - December 2023',
                achievements: [
                    'Developed interactive analytics and performance monitoring dashboards using Power BI, translating complex surveillance and geospatial datasets into actionable insights for regional decision-making.'
                ]
            },
            {
                org: 'Bill & Melinda Gates Foundation (BMGF)',
                logo: 'images/gates_foundation.png',
                logoType: 'image',
                role: 'GIS Analyst',
                date: 'June 2020 - December 2020',
                achievements: [
                    'Developed dynamic M&E dashboards using ArcGIS Online Dashboard to monitor the performance of Environmental Surveillance activities, enabling real-time tracking of key program indicators and operational decision-making.'
                ]
            }
        ],
        de: [
            {
                org: 'World Health Organization - Data & Information Management Unit',
                logo: 'images/WHO.jpg',
                logoType: 'image',
                role: 'Data Analyst',
                date: 'January 2024 - February 2025',
                achievements: [
                    'Developed data governance and quality frameworks for polio surveillance data, including standardized validation rules and quality guidelines applied across regional datasets.',
                    'Built automated ETL pipelines in R to ingest, transform, and harmonize laboratory and surveillance data from 16 polio laboratories into centralized data management and analytics systems used by the Global Polio Eradication Network.',
                    'Contributed to the development of an R package for polio data management, supporting reusable, modular, and maintainable data processing and analysis workflows.',
                    'Supported the technical design and regional rollout of a Web Information for Action (WEBIFA) platform, including review of technical specifications, implementation planning, and capacity building across 47 countries and 16 laboratories.'
                ]
            },
            {
                org: 'World Health Organization - GIS Center',
                logo: 'images/WHO.jpg',
                logoType: 'image',
                role: 'GIS Analyst',
                date: 'January 2021 - December 2023',
                achievements: [
                    'Designed and maintained regional ETL pipelines using KNIME, Python, and PostgreSQL, extracting surveillance data from ODK/ONA servers, performing data validation and transformation, and loading structured datasets to support analytics across 47 countries.',
                    'Built and released an open-source QGIS plugin enabling direct ingestion of ODK/ONA data into QGIS, reducing manual data handling and improving efficiency in geospatial data management workflows.',
                    'Designed and managed centralized geospatial databases using PostgreSQL/PostGIS, including schema design, user access management, and spatial data standardization for regional-scale analytics.'
                ]
            },
            {
                org: 'SOGEFI',
                logo: 'images/SOGEFI2.jpg',
                logoType: 'image',
                role: 'Geomatic Project Manager',
                date: 'August 2019 - May 2020',
                achievements: [
                    'Led a team of two (02) software developers in the design, development, testing, deployment, and scaling of an open-source geospatial data infrastructure (GeoOSM) built on OpenStreetMap data across twenty (20) African countries. Responsibilities included technical oversight, code review and troubleshooting, geospatial database design using PostgreSQL/PostGIS, QGIS Server management, and capacity building through advocacy, training, and technical support.',
                    'Led a team of two developers in the development of a Humanitarian Rapid Response Mechanism (RRM) platform for Premier Urgence International and Action Against Hunger, supporting timely data collection, analysis, and decision-making in emergency response contexts.'
                ]
            }
        ]
    };

    // Render categorized content
    function renderCategoryContent(categoryData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = categoryData.map(org => {
            const logoHtml = org.logoType === 'image'
                ? `<div class="exp-category-org-logo"><img src="${org.logo}" alt="${org.org} Logo"></div>`
                : `<div class="exp-category-org-logo text-logo"><span>${org.logo}</span></div>`;

            const achievementsHtml = org.achievements.map(a => `<li>${a}</li>`).join('');

            return `
                <div class="exp-category-org">
                    <div class="exp-category-org-header">
                        ${logoHtml}
                        <div class="exp-category-org-info">
                            <h4>${org.role}</h4>
                            <p>${org.org}</p>
                            <span>${org.date}</span>
                        </div>
                    </div>
                    <ul class="exp-category-achievements">${achievementsHtml}</ul>
                </div>
            `;
        }).join('');
    }

    // Render all tabs
    renderCategoryContent(categorizedExperience.geospatial, 'exp-geospatial');
    renderCategoryContent(categorizedExperience.bi, 'exp-bi');
    renderCategoryContent(categorizedExperience.de, 'exp-de');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-exp-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            const targetMap = { geospatial: 'exp-geospatial', bi: 'exp-bi', de: 'exp-de' };
            const target = document.getElementById(targetMap[tabId]);
            if (target) target.classList.add('active');
        });
    });
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
        '.timeline-item, .skill-card, .publication-card, .portfolio-item, .domain-card, .tool-item, .service-card'
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

/**
 * Service Quotes Module
 * Handles "Request a Quote" buttons that scroll to contact form and pre-fill subject
 */
function initServiceQuotes() {
    const quoteBtns = document.querySelectorAll('.quote-btn');

    quoteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            const subjectField = document.getElementById('subject');
            const contactSection = document.getElementById('contact');

            if (subjectField) {
                subjectField.value = `Quote Request: ${serviceName}`;
                // Trigger input event so the floating label moves up
                subjectField.dispatchEvent(new Event('input', { bubbles: true }));
            }

            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

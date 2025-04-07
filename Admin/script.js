document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected page
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.style.display = 'block';
                } else {
                    page.style.display = 'none';
                }
            });
        });
    });
    
    // Set Dashboard as active by default
    document.querySelector('[data-page="dashboard"]').classList.add('active');
    
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    
    // Slider value update
    const depthSlider = document.getElementById('depthSlider');
    const sliderValue = document.querySelector('.slider-value');
    
    if (depthSlider) {
        depthSlider.addEventListener('input', function() {
            const value = this.value;
            let label = 'Low';
            
            if (value > 70) {
                label = 'High';
            } else if (value > 30) {
                label = 'Medium';
            }
            
            sliderValue.textContent = `${label} (${value} pages)`;
        });
    }
    
    // Initialize Charts
    initializeGaugeCharts();
    initializeBarChart();
    initializePieChart();

    // Make sure Job Lists page is shown when clicking on Job Lists nav item
    document.querySelector('[data-page="job-lists"]').addEventListener('click', function() {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        
        // Show Job Lists page
        document.getElementById('job-lists').style.display = 'block';
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
    });
    
    // File upload handling
    const fileInput = document.getElementById('fileUpload');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }
    
    // Set Data Scraping tab as active by default in Data Management
    if (document.querySelector('[data-tab="data-scraping"]')) {
        document.querySelector('[data-tab="data-scraping"]').classList.add('active');
        document.getElementById('data-scraping').style.display = 'block';
    }
    
    // Modal functionality
    const addJobBtn = document.getElementById('addJobBtn');
    const scrapeDataBtn = document.getElementById('scrapeDataBtn');
    const addJobModal = document.getElementById('addJobModal');
    const scrapeDataModal = document.getElementById('scrapeDataModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    
    // Open Add Job Modal
    if (addJobBtn && addJobModal) {
        addJobBtn.addEventListener('click', function() {
            addJobModal.classList.add('show');
        });
    }
    
    // Open Scrape Data Modal
    if (scrapeDataBtn && scrapeDataModal) {
        scrapeDataBtn.addEventListener('click', function() {
            scrapeDataModal.classList.add('show');
            startScrapeAnimation();
        });
    }
    
    // Close modals with X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
        });
    });
    
    // Close modals with Cancel button
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    });
    
    // Skills input functionality
    const skillsInput = document.querySelector('.skills-input');
    const skillsTags = document.querySelector('.skills-tags');
    
    if (skillsInput) {
        skillsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                e.preventDefault();
                
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `${this.value.trim()} <i class="fas fa-times"></i>`;
                
                const removeIcon = skillTag.querySelector('i');
                removeIcon.addEventListener('click', function() {
                    skillTag.remove();
                });
                
                skillsTags.appendChild(skillTag);
                this.value = '';
            }
        });
    }
    
    // Remove skill tags
    document.querySelectorAll('.skill-tag i').forEach(icon => {
        icon.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
});

function initializeGaugeCharts() {
    const gaugeOptions = {
        cutout: '70%',
        circumference: 270,
        rotation: -135,
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            animateRotate: true,
            animateScale: true
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };
    
    // Jobs Gauge
    const jobsGauge = document.getElementById('jobsGauge');
    if (jobsGauge) {
        new Chart(jobsGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [75, 25],
                    backgroundColor: [
                        '#60c7fe',
                        '#f0f0f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: gaugeOptions
        });
    }
    
    // CVs Gauge
    const cvsGauge = document.getElementById('cvsGauge');
    if (cvsGauge) {
        new Chart(cvsGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [75, 25],
                    backgroundColor: [
                        '#60c7fe',
                        '#f0f0f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: gaugeOptions
        });
    }
    
    // ML Gauge
    const mlGauge = document.getElementById('mlGauge');
    if (mlGauge) {
        new Chart(mlGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [85.6, 14.4],
                    backgroundColor: [
                        '#60c7fe',
                        '#f0f0f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: gaugeOptions
        });
    }
    
    // Scraped Data Gauge
    const scrapedGauge = document.getElementById('scrapedGauge');
    if (scrapedGauge) {
        new Chart(scrapedGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [75, 25],
                    backgroundColor: [
                        '#60c7fe',
                        '#f0f0f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: gaugeOptions
        });
    }
}

function initializeBarChart() {
    const barChart = document.getElementById('barChart');
    if (barChart) {
        new Chart(barChart, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [{
                    label: 'Success Rate',
                    data: [85, 87, 82, 78],
                    backgroundColor: '#60c7fe',
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function initializePieChart() {
    const pieChart = document.getElementById('pieChart');
    if (pieChart) {
        new Chart(pieChart, {
            type: 'doughnut',
            data: {
                labels: ['LinkedIn', 'Indeed', 'Company Websites', 'Other'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        '#60c7fe',
                        '#ff6b6b',
                        '#feca57',
                        '#1dd1a1'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '40%',
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

function startScrapeAnimation() {
    // Reset progress
    const progressFill = document.querySelector('.scrape-progress-fill');
    const progressText = document.querySelector('.scrape-progress-text');
    const jobsScraped = document.getElementById('jobsScraped');
    const companiesScraped = document.getElementById('companiesScraped');
    const timeElapsed = document.getElementById('timeElapsed');
    const scrapeLog = document.getElementById('scrapeLog');
    
    if (!progressFill || !progressText || !jobsScraped || !companiesScraped || !timeElapsed || !scrapeLog) {
        return;
    }
    
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    jobsScraped.textContent = '0';
    companiesScraped.textContent = '0';
    timeElapsed.textContent = '0:00';
    
    // Clear log
    scrapeLog.innerHTML = `
        <div class="log-entry">
            <span class="log-time">00:00</span>
            <span class="log-message">Initializing scraper...</span>
        </div>
    `;
    
    let progress = 0;
    let jobs = 0;
    let companies = 0;
    let seconds = 0;
    let logMessages = [
        'Connecting to data source...',
        'Authenticating connection...',
        'Starting data extraction...',
        'Parsing job listings...',
        'Extracting company information...',
        'Processing job details...',
        'Analyzing salary data...',
        'Extracting required skills...',
        'Normalizing job titles...',
        'Storing data in database...',
        'Validating data integrity...',
        'Removing duplicate entries...',
        'Updating search index...'
    ];
    
    // Update progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
        
        // Update jobs and companies
        if (Math.random() > 0.7) {
            jobs += Math.floor(Math.random() * 5) + 1;
            jobsScraped.textContent = jobs;
        }
        
        if (Math.random() > 0.8) {
            companies += Math.floor(Math.random() * 2) + 1;
            companiesScraped.textContent = companies;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(timeInterval);
            clearInterval(logInterval);
            
            // Add completion log
            addLogEntry('Scraping completed successfully!');
        }
    }, 200);
    
    // Update time
    const timeInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeElapsed.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, 1000);
    
    // Add log entries
    const logInterval = setInterval(() => {
        if (logMessages.length > 0 && Math.random() > 0.7) {
            const randomIndex = Math.floor(Math.random() * logMessages.length);
            const message = logMessages[randomIndex];
            logMessages.splice(randomIndex, 1);
            
            addLogEntry(message);
        }
    }, 2000);
    
    function addLogEntry(message) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeString = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-message">${message}</span>
        `;
        
        scrapeLog.appendChild(logEntry);
        scrapeLog.scrollTop = scrapeLog.scrollHeight;
    }
}
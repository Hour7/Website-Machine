document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // User dropdown menu
    const avatarTrigger = document.getElementById('avatar-menu-trigger');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (avatarTrigger && userDropdown) {
        avatarTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && e.target !== avatarTrigger) {
                userDropdown.classList.remove('active');
            }
        });
    }
    
    // Action menu dropdowns
    const actionTriggers = document.querySelectorAll('.action-trigger');
    
    actionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.action-dropdown.active').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        });
    });
    
    document.addEventListener('click', function() {
        document.querySelectorAll('.action-dropdown.active').forEach(menu => {
            menu.classList.remove('active');
        });
    });
    
    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.getAttribute('data-tab');
            
            // Update nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update content tabs
            contentTabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Settings tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Modal handling
    const addJobBtn = document.getElementById('add-job-btn');
    const addUserBtn = document.getElementById('add-user-btn');
    const addJobModal = document.getElementById('add-job-modal');
    const addUserModal = document.getElementById('add-user-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const cancelAddJobBtn = document.getElementById('cancel-add-job');
    const cancelAddUserBtn = document.getElementById('cancel-add-user');
    
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    if (addJobBtn && addJobModal) {
        addJobBtn.addEventListener('click', function() {
            openModal(addJobModal);
        });
    }
    
    if (addUserBtn && addUserModal) {
        addUserBtn.addEventListener('click', function() {
            openModal(addUserModal);
        });
    }
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    if (cancelAddJobBtn) {
        cancelAddJobBtn.addEventListener('click', function() {
            closeModal(addJobModal);
        });
    }
    
    if (cancelAddUserBtn) {
        cancelAddUserBtn.addEventListener('click', function() {
            closeModal(addUserModal);
        });
    }
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Train model button
    const trainModelBtn = document.getElementById('train-model-btn');
    
    if (trainModelBtn) {
        trainModelBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            
            // Disable button and show loading state
            this.disabled = true;
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Training...
            `;
            
            // Simulate training process
            setTimeout(() => {
                // Update alert message
                const alertMessage = document.querySelector('.alert p');
                if (alertMessage) {
                    const now = new Date();
                    const formattedDate = now.toLocaleDateString();
                    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    alertMessage.textContent = `Model training completed on ${formattedDate} at ${formattedTime}. Current model version: v2.4.2`;
                }
                
                // Re-enable button
                this.disabled = false;
                this.innerHTML = originalText;
            }, 3000);
        });
    }
    
    // Initialize charts
    initCharts();
});

function initCharts() {
    // This is a placeholder for chart initialization
    // In a real application, you would use a charting library like Chart.js
    
    const recommendationChart = document.getElementById('recommendation-chart');
    const engagementChart = document.getElementById('engagement-chart');
    
    if (recommendationChart) {
        recommendationChart.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #6b7280;">Recommendation Performance Chart</div>';
    }
    
    if (engagementChart) {
        engagementChart.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #6b7280;">User Engagement Chart</div>';
    }
    
    // In a real implementation, you would add code like:
    /*
    if (typeof Chart !== 'undefined' && recommendationChart) {
        new Chart(recommendationChart.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Success Rate',
                    data: [65, 70, 68, 75, 82, 87],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    */
}

// Add a CSS class for spinning animation
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
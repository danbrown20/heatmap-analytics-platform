// HeatMap Analytics Platform - Main Application

// Import modules
import { HeatMapRenderer } from './components/heatmap.js';
import { DashboardManager } from './components/dashboard.js';
import { DataManager } from './utils/dataManager.js';
import { EventManager } from './utils/eventManager.js';
import { AppConfig } from './config/config.js';

/**
 * Main Application Class
 * Orchestrates all components and manages application lifecycle
 */
class HeatMapApp {
    constructor() {
        this.config = AppConfig;
        this.dataManager = new DataManager();
        this.eventManager = new EventManager();
        this.dashboardManager = null;
        this.heatMapRenderer = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Initializing HeatMap Analytics Platform...');
            
            // Show loading
            this.showLoading();
            
            // Initialize managers
            await this.initializeManagers();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load initial data
            await this.loadInitialData();
            
            // Render initial UI
            this.renderInitialUI();
            
            // Hide loading
            this.hideLoading();
            
            this.isInitialized = true;
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitError(error);
        }
    }

    /**
     * Initialize all managers
     */
    async initializeManagers() {
        // Initialize dashboard manager
        this.dashboardManager = new DashboardManager({
            container: document.getElementById('main-content'),
            config: this.config
        });
        
        // Initialize heat map renderer
        this.heatMapRenderer = new HeatMapRenderer({
            dataManager: this.dataManager,
            eventManager: this.eventManager
        });
        
        console.log('📊 Managers initialized');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Custom events
        this.eventManager.on('data:updated', this.handleDataUpdate.bind(this));
        this.eventManager.on('heatmap:typeChanged', this.handleHeatMapTypeChange.bind(this));
        this.eventManager.on('dashboard:filterChanged', this.handleFilterChange.bind(this));
        
        console.log('🎯 Event listeners setup');
    }

    /**
     * Load initial application data
     */
    async loadInitialData() {
        try {
            // Load sample data for demo
            await this.dataManager.loadSampleData();
            console.log('📈 Initial data loaded');
        } catch (error) {
            console.error('Failed to load initial data:', error);
            throw error;
        }
    }

    /**
     * Render initial UI components
     */
    renderInitialUI() {
        // Render header
        this.renderHeader();
        
        // Render dashboard
        this.dashboardManager.render();
        
        console.log('🎨 Initial UI rendered');
    }

    /**
     * Render application header
     */
    renderHeader() {
        const header = document.getElementById('app-header');
        header.innerHTML = `
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo">HeatMapPro</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">Website Analytics Platform</div>
                </div>
                <div class="header-stats">
                    <div class="stat-item">
                        <div class="stat-value" id="totalSessions">847,293</div>
                        <div class="stat-label">Sessions Tracked</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="revenueTracked">$2.4M</div>
                        <div class="stat-label">Revenue Tracked</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="conversionRate">4.2%</div>
                        <div class="stat-label">Conversion Rate</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Event Handlers
     */
    handleResize() {
        if (this.dashboardManager) {
            this.dashboardManager.handleResize();
        }
    }

    handleBeforeUnload(event) {
        // Save any pending data
        this.dataManager.saveState();
    }

    handleDataUpdate(data) {
        // Update UI components with new data
        if (this.dashboardManager) {
            this.dashboardManager.updateWithData(data);
        }
    }

    handleHeatMapTypeChange(type) {
        if (this.heatMapRenderer) {
            this.heatMapRenderer.changeType(type);
        }
    }

    handleFilterChange(filters) {
        // Apply filters to data and re-render
        this.dataManager.applyFilters(filters);
    }

    /**
     * Utility Methods
     */
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    handleInitError(error) {
        this.hideLoading();
        
        // Show error message to user
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <h2>⚠️ Application Failed to Load</h2>
                    <p>There was an error initializing the application.</p>
                    <details style="margin-top: 1rem; text-align: left;">
                        <summary>Error Details</summary>
                        <pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-top: 0.5rem;">${error.message}</pre>
                    </details>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        Reload Application
                    </button>
                </div>
            `;
        }
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    const app = new HeatMapApp();
    app.init().catch(error => {
        console.error('Failed to start application:', error);
    });
    
    // Make app globally available for debugging
    window.HeatMapApp = app;
}

export default HeatMapApp;
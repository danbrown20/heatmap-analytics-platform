// Commercial Features Inspired by Top Heat Map Companies
// BrightLocal, Local Falcon, and Local Viking

/**
 * BrightLocal-style Local Search Grid Component
 * Features: White-label reports, Average Map Rank, competitor analysis, 7x7 grids
 */
export class LocalSearchGrid {
    constructor(options = {}) {
        this.gridSize = options.gridSize || '5x5'; // 3x3, 5x5, 7x7 like BrightLocal
        this.keywords = options.keywords || [];
        this.competitors = options.competitors || [];
        this.whiteLabel = options.whiteLabel || false;
        this.averageMapRank = 0;
        this.gridPoints = this.generateGridPoints();
    }

    /**
     * Generate grid points like BrightLocal's system
     */
    generateGridPoints() {
        const [rows, cols] = this.gridSize.split('x').map(Number);
        const points = [];
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                points.push({
                    id: `${i}-${j}`,
                    lat: 39.0997 + (i - Math.floor(rows/2)) * 0.01, // Kansas City base
                    lng: -94.5786 + (j - Math.floor(cols/2)) * 0.01,
                    rank: Math.floor(Math.random() * 20) + 1,
                    visible: Math.random() > 0.3, // 70% visibility rate
                    competitors: this.generateCompetitorData()
                });
            }
        }
        
        this.calculateAverageMapRank(points);
        return points;
    }

    /**
     * Calculate Average Map Rank (BrightLocal's proprietary metric)
     */
    calculateAverageMapRank(points) {
        const visiblePoints = points.filter(p => p.visible);
        const totalRank = visiblePoints.reduce((sum, p) => sum + p.rank, 0);
        this.averageMapRank = visiblePoints.length > 0 ? 
            (totalRank / visiblePoints.length).toFixed(1) : 'N/A';
    }

    /**
     * Generate competitor data for each grid point
     */
    generateCompetitorData() {
        return this.competitors.map(comp => ({
            name: comp.name,
            rank: Math.floor(Math.random() * 20) + 1,
            factors: {
                proximity: Math.random() * 10,
                prominence: Math.random() * 10,
                relevance: Math.random() * 10
            }
        }));
    }

    /**
     * Generate white-label report (BrightLocal feature)
     */
    generateWhiteLabelReport() {
        return {
            clientName: this.whiteLabel ? 'Your Client Name' : 'Victory Cleaning',
            reportDate: new Date().toISOString().split('T')[0],
            averageMapRank: this.averageMapRank,
            gridSize: this.gridSize,
            totalPoints: this.gridPoints.length,
            visiblePoints: this.gridPoints.filter(p => p.visible).length,
            keywords: this.keywords,
            competitorAnalysis: this.getCompetitorAnalysis()
        };
    }

    getCompetitorAnalysis() {
        return this.competitors.map(comp => {
            const avgRank = this.gridPoints
                .flatMap(p => p.competitors.filter(c => c.name === comp.name))
                .reduce((sum, c, i, arr) => sum + c.rank / arr.length, 0);
            
            return {
                name: comp.name,
                averageRank: avgRank.toFixed(1),
                visibility: this.gridPoints.filter(p => 
                    p.competitors.some(c => c.name === comp.name && c.rank <= 3)
                ).length
            };
        });
    }
}

/**
 * Local Falcon-style Geo-Grid Rank Tracker
 * Features: Multiple keywords, AI recommendations, Share of Local Voice (SoLV)
 */
export class GeoGridTracker {
    constructor(options = {}) {
        this.keywords = options.keywords || [];
        this.gridSizes = ['3x3', '5x5', '7x7', '9x9', '11x11', '13x13', '15x15', '17x17', '21x21']; // Local Falcon sizes
        this.currentGrid = options.gridSize || '7x7';
        this.aiRecommendations = [];
        this.shareOfLocalVoice = 0;
    }

    /**
     * Calculate Share of Local Voice (SoLV™) - Local Falcon's signature metric
     */
    calculateShareOfLocalVoice(gridData) {
        const totalLocalPackAppearances = gridData.reduce((sum, point) => {
            return sum + (point.rank <= 3 ? 1 : 0); // Count top 3 appearances
        }, 0);
        
        const totalPossibleAppearances = gridData.length;
        this.shareOfLocalVoice = ((totalLocalPackAppearances / totalPossibleAppearances) * 100).toFixed(1);
        
        return {
            solv: this.shareOfLocalVoice,
            appearances: totalLocalPackAppearances,
            totalPoints: totalPossibleAppearances,
            percentile: this.getPercentileRank(this.shareOfLocalVoice)
        };
    }

    /**
     * Generate AI-powered recommendations (Local Falcon feature)
     */
    generateAIRecommendations(gridData, competitorData) {
        const recommendations = [];
        
        // Analyze weak spots
        const weakPoints = gridData.filter(p => p.rank > 10).length;
        if (weakPoints > gridData.length * 0.3) {
            recommendations.push({
                type: 'optimization',
                priority: 'high',
                title: 'Optimize for Geographic Coverage',
                description: `${weakPoints} grid points show poor visibility. Focus on local citations and geo-targeted content.`,
                impact: 'Could improve SoLV by 15-25%'
            });
        }

        // Competitor analysis recommendations
        const strongCompetitors = competitorData.filter(c => c.averageRank < 5);
        if (strongCompetitors.length > 0) {
            recommendations.push({
                type: 'competition',
                priority: 'medium',
                title: 'Competitor Analysis Required',
                description: `${strongCompetitors[0].name} dominates ${strongCompetitors[0].visibility} grid points. Analyze their local SEO strategy.`,
                impact: 'Potential 10-20% SoLV increase'
            });
        }

        // Keyword optimization
        const underperformingKeywords = this.keywords.filter(k => k.avgRank > 8);
        if (underperformingKeywords.length > 0) {
            recommendations.push({
                type: 'keywords',
                priority: 'medium',
                title: 'Keyword Optimization Needed',
                description: `Keywords "${underperformingKeywords[0].term}" underperforming. Consider long-tail variations.`,
                impact: 'Could improve rankings by 2-5 positions'
            });
        }

        this.aiRecommendations = recommendations;
        return recommendations;
    }

    /**
     * Export data for Looker Studio integration (Local Falcon feature)
     */
    exportForLookerStudio(gridData) {
        return {
            timestamp: new Date().toISOString(),
            businessName: 'Victory Cleaning Services',
            gridSize: this.currentGrid,
            shareOfLocalVoice: this.shareOfLocalVoice,
            averageRank: gridData.reduce((sum, p) => sum + p.rank, 0) / gridData.length,
            topThreeAppearances: gridData.filter(p => p.rank <= 3).length,
            keywords: this.keywords.map(k => ({
                term: k.term,
                averageRank: k.avgRank,
                visibility: k.visibility
            })),
            gridPoints: gridData.map(point => ({
                lat: point.lat,
                lng: point.lng,
                rank: point.rank,
                visible: point.visible
            }))
        };
    }

    getPercentileRank(solv) {
        // Industry benchmarks for SoLV
        if (solv >= 80) return '95th percentile - Excellent';
        if (solv >= 60) return '75th percentile - Good';
        if (solv >= 40) return '50th percentile - Average';
        if (solv >= 20) return '25th percentile - Below Average';
        return '10th percentile - Needs Improvement';
    }
}

/**
 * Local Viking-style GBP Management + GeoGrid
 * Features: Time-lapse GIFs, public share links, white-label reports, GeoGrid widget
 */
export class GBPGeoGridManager {
    constructor(options = {}) {
        this.businessProfile = options.profile || {};
        this.geoGridHistory = [];
        this.publicShareLinks = new Map();
        this.widgetEmbeds = new Map();
        this.timeLapseData = [];
    }

    /**
     * Generate time-lapse GIF data (Local Viking signature feature)
     */
    generateTimeLapseData(days = 30) {
        const frames = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        for (let i = 0; i < days; i++) {
            const frameDate = new Date(startDate);
            frameDate.setDate(frameDate.getDate() + i);
            
            frames.push({
                date: frameDate.toISOString().split('T')[0],
                gridData: this.generateHistoricalGridData(i),
                metrics: {
                    averageRank: 5.2 + Math.sin(i * 0.2) * 2, // Simulate ranking changes
                    visibility: 65 + Math.cos(i * 0.15) * 15,
                    topThreeCount: 12 + Math.floor(Math.sin(i * 0.1) * 8)
                }
            });
        }

        this.timeLapseData = frames;
        return frames;
    }

    /**
     * Create public share link (Local Viking feature)
     */
    createPublicShareLink(reportData, expirationDays = 30) {
        const shareId = this.generateShareId();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);

        const shareLink = {
            id: shareId,
            url: `https://heatmappro.com/share/${shareId}`,
            reportData: reportData,
            createdAt: new Date(),
            expiresAt: expirationDate,
            views: 0,
            isActive: true
        };

        this.publicShareLinks.set(shareId, shareLink);
        return shareLink;
    }

    /**
     * Generate embeddable GeoGrid widget (Local Viking feature)
     */
    generateEmbeddableWidget(gridData, options = {}) {
        const widgetId = this.generateShareId();
        const widget = {
            id: widgetId,
            embedCode: this.createWidgetEmbedCode(widgetId, gridData, options),
            gridData: gridData,
            styling: {
                theme: options.theme || 'professional',
                colors: options.colors || ['#ff4444', '#ffaa44', '#44ff44'],
                showLegend: options.showLegend !== false,
                showMetrics: options.showMetrics !== false
            },
            createdAt: new Date(),
            updateFrequency: options.updateFrequency || 'daily'
        };

        this.widgetEmbeds.set(widgetId, widget);
        return widget;
    }

    /**
     * Create widget embed code
     */
    createWidgetEmbedCode(widgetId, gridData, options) {
        return `
<!-- HeatMapPro GeoGrid Widget -->
<div id="heatmappro-widget-${widgetId}" style="width: 100%; height: 400px; border: 1px solid #ddd; border-radius: 8px;"></div>
<script>
(function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.heatmappro.com/widget.js';
    script.onload = function() {
        HeatMapPro.renderWidget('${widgetId}', {
            container: 'heatmappro-widget-${widgetId}',
            theme: '${options.theme || 'professional'}',
            autoUpdate: ${options.autoUpdate !== false}
        });
    };
    document.head.appendChild(script);
})();
</script>
<!-- End HeatMapPro Widget -->`;
    }

    /**
     * Generate white-label report with Local Viking styling
     */
    generateWhiteLabelReport(clientBranding = {}) {
        return {
            // Client branding
            clientLogo: clientBranding.logo || null,
            clientName: clientBranding.name || 'Client Name',
            agencyName: clientBranding.agency || 'Your Agency',
            
            // Report data
            businessName: this.businessProfile.name || 'Business Name',
            reportPeriod: this.getReportPeriod(),
            
            // Key metrics
            currentMetrics: {
                averageRank: this.calculateCurrentAverageRank(),
                shareOfVoice: this.calculateShareOfVoice(),
                visibilityScore: this.calculateVisibilityScore(),
                competitorPosition: this.getCompetitorPosition()
            },
            
            // Time-lapse summary
            timeLapseSummary: {
                totalDays: this.timeLapseData.length,
                trendDirection: this.getTrendDirection(),
                bestPerformingDay: this.getBestPerformingDay(),
                improvementOpportunities: this.getImprovementOpportunities()
            },
            
            // Export options
            exportFormats: ['PDF', 'CSV', 'PNG', 'GIF'],
            shareableLink: this.createPublicShareLink({}).url,
            widgetCode: this.generateEmbeddableWidget({}).embedCode
        };
    }

    // Helper methods
    generateShareId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    generateHistoricalGridData(dayOffset) {
        // Simulate historical data with realistic variations
        const baseData = Array.from({length: 25}, (_, i) => ({
            id: i,
            rank: Math.max(1, Math.min(20, 8 + Math.sin(dayOffset * 0.1 + i * 0.5) * 5)),
            visible: Math.random() > 0.25
        }));
        return baseData;
    }

    getReportPeriod() {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }

    calculateCurrentAverageRank() {
        if (this.timeLapseData.length === 0) return 'N/A';
        const latest = this.timeLapseData[this.timeLapseData.length - 1];
        return latest.metrics.averageRank.toFixed(1);
    }

    calculateShareOfVoice() {
        if (this.timeLapseData.length === 0) return 'N/A';
        const latest = this.timeLapseData[this.timeLapseData.length - 1];
        return `${latest.metrics.visibility.toFixed(1)}%`;
    }

    calculateVisibilityScore() {
        if (this.timeLapseData.length === 0) return 'N/A';
        const latest = this.timeLapseData[this.timeLapseData.length - 1];
        return `${latest.metrics.topThreeCount}/25 points`;
    }

    getCompetitorPosition() {
        return Math.floor(Math.random() * 5) + 1; // Random position 1-5
    }

    getTrendDirection() {
        if (this.timeLapseData.length < 2) return 'Stable';
        const recent = this.timeLapseData.slice(-7);
        const trend = recent[recent.length - 1].metrics.averageRank - recent[0].metrics.averageRank;
        return trend < -0.5 ? 'Improving' : trend > 0.5 ? 'Declining' : 'Stable';
    }

    getBestPerformingDay() {
        if (this.timeLapseData.length === 0) return 'N/A';
        const best = this.timeLapseData.reduce((best, current) => 
            current.metrics.averageRank < best.metrics.averageRank ? current : best
        );
        return best.date;
    }

    getImprovementOpportunities() {
        return [
            'Optimize for 3 underperforming grid points in the northwest area',
            'Increase local citation consistency across 5 directories',
            'Target competitor weak spots in the downtown district'
        ];
    }
}

// Export all classes for use in main application
export { LocalSearchGrid, GeoGridTracker, GBPGeoGridManager };
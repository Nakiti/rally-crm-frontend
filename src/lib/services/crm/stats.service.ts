import apiClient from "../../apiClient"

export interface StatsValue {
    value: number;
    change: number;
}

export interface StatsSummary {
    activeCampaigns: StatsValue;
    totalDonations: StatsValue;
    activeDonors: StatsValue;
    retentionRate: StatsValue;
}

export type StatsPeriod = 'week' | 'month' | 'year';

/**
 * Fetches stats summary for the organization dashboard.
 * @param period - Time period for the stats (week, month, year)
 * @returns The stats summary with KPIs and changes
 */
export const getStatsSummary = async (period: StatsPeriod = 'month'): Promise<StatsSummary> => {
    const response = await apiClient.get('/crm/stats/summary', { 
        params: { period } 
    });
    return response.data.data;
};

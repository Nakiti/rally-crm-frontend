import * as statsService from "@/lib/services/crm/stats.service";
import { useQuery } from "@tanstack/react-query";
import type { StatsPeriod } from "@/lib/services/crm/stats.service";

/**
 * Hook to fetch stats summary for the dashboard
 * @param period - Time period for the stats (week, month, year)
 * @returns React Query result with stats summary data
 */
export const useGetStatsSummary = (period: StatsPeriod = 'month') => {
    return useQuery({
        queryKey: ['crm', 'stats', 'summary', period],
        queryFn: () => statsService.getStatsSummary(period),
    });
};

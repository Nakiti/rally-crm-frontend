
import React from 'react';
import { Users, User, Heart, Calendar } from 'lucide-react';

interface ProgressData {
    raised: number;
    goal: number;
    donations: number;
    uniqueDonors: number;
    averageDonation: number;
    daysLeft: number;
}

const ProgressSectionPreview: React.FC = () => {
    // Fixed color scheme for consistent styling
    const colors = {
        primary: '#3b82f6', // blue-500
        secondary: '#64748b', // slate-500
        accent: '#ef4444', // red-500
        success: '#10b981', // emerald-500
        text: '#1e293b', // slate-800
        textSecondary: '#64748b', // slate-500
        progressBar: '#3b82f6', // blue-500
        progressBg: '#e2e8f0' // slate-200
    };

    // Fixed icon sizes
    const iconSizes = {
        small: 'w-3 h-3 sm:w-4 sm:h-4',
        medium: 'w-4 h-4 sm:w-5 sm:h-5',
        large: 'w-5 h-5 sm:w-6 sm:h-6'
    };

    // Sample progress data
    const progressData: ProgressData = {
        raised: 2450,
        goal: 10000,
        donations: 127,
        uniqueDonors: 89,
        averageDonation: 27.53,
        daysLeft: 23
    };

    const progressPercentage = (progressData.raised / progressData.goal) * 100;

    return (
        <div className="bg-white border border-slate-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                <span 
                    className="font-semibold text-sm"
                    style={{ 
                        color: colors.primary,
                        fontSize: '14px'
                    }}
                >
                    ${progressData.raised.toLocaleString()} raised
                </span>
                <span 
                    className="font-medium text-xs"
                    style={{ 
                        color: colors.textSecondary,
                        fontSize: '12px'
                    }}
                >
                    of ${progressData.goal.toLocaleString()} goal
                </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                <div 
                    className="h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                        backgroundColor: colors.progressBar,
                        width: `${Math.min(progressPercentage, 100)}%`
                    }}
                ></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs" style={{ color: colors.textSecondary }}>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Users className={`${iconSizes.small} text-slate-400 flex-shrink-0`} />
                    <span className="truncate">{progressData.donations} donations</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <User className={`${iconSizes.small} text-slate-400 flex-shrink-0`} />
                    <span className="truncate">{progressData.uniqueDonors} unique</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Heart className={`${iconSizes.small} text-rose-400 flex-shrink-0`} />
                    <span className="truncate">${progressData.averageDonation} avg</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Calendar className={`${iconSizes.small} text-amber-400 flex-shrink-0`} />
                    <span className="truncate">{progressData.daysLeft} days left</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressSectionPreview;

import React from 'react';
import { Trophy, Clock, Heart } from 'lucide-react';

const LeaderBoardPreview = () => {
    // Fixed color scheme for consistent styling
    const colors = {
        primary: '#3b82f6', // blue-500
        secondary: '#64748b', // slate-500
        accent: '#f59e0b', // amber-500
        success: '#ef4444', // red-500
        text: '#1e293b', // slate-800
        textSecondary: '#64748b' // slate-500
    };

    // Fixed icon sizes
    const iconSizes = {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-6 h-6'
    };

    return (
        <div className="bg-white border border-slate-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
            <h3 
                className="font-bold text-base mb-3 sm:mb-4 lg:mb-6"
                style={{
                    color: colors.primary,
                    fontSize: '16px'
                }}
            >
                Donation Leaderboard
            </h3>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-3 sm:mb-4 lg:mb-6 p-1 bg-slate-100 rounded-lg">
                <button className="flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs font-medium rounded-lg bg-white text-slate-900 flex items-center justify-center space-x-1.5 sm:space-x-2">
                    <Trophy className={`${iconSizes.small} text-amber-500`} />
                    <span className="truncate">Highest</span>
                </button>
                <button className="flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center space-x-1.5 sm:space-x-2">
                    <Clock className={`${iconSizes.small} text-slate-500`} />
                    <span className="truncate">Recent</span>
                </button>
            </div>

            {/* Leaderboard Content */}
            <div className="space-y-2 sm:space-y-3">
                {[
                    { name: "Sarah Johnson", amount: 500, isTop: true },
                    { name: "Michael Chen", amount: 250, isTop: false },
                    { name: "Emily Davis", amount: 200, isTop: false }
                ].map((donor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 flex-shrink-0">
                            {donor.isTop ? (
                                <Trophy className={`${iconSizes.medium} text-amber-500`} />
                            ) : (
                                <Heart className={`${iconSizes.small} text-red-500`} />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div 
                                className="font-semibold text-sm truncate"
                                style={{ 
                                    color: colors.text,
                                    fontSize: '14px'
                                }}
                            >
                                {donor.name}
                            </div>
                        </div>
                        </div>
                        <div 
                        className="font-bold text-sm ml-2 flex-shrink-0"
                        style={{ 
                            color: colors.primary,
                            fontSize: '14px'
                        }}
                        >
                        ${donor.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeaderBoardPreview
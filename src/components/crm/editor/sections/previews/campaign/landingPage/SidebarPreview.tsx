import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const SidebarPreview = () => {
    // Fixed color scheme for consistent styling
    const colors = {
        primary: '#3b82f6', // blue-500
        secondary: '#64748b', // slate-500
        accent: '#ef4444', // red-500
        success: '#10b981', // emerald-500
        text: '#1e293b', // slate-800
        textSecondary: '#64748b', // slate-500
        buttonPrimary: '#3b82f6', // blue-500
        buttonSecondary: '#6b7280' // gray-500
    };

    // Fixed icon sizes
    const iconSizes = {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-6 h-6'
    };

    // Sample donation amounts
    const donationAmounts = ["25", "50", "100", "250", "500", "1000"];

    return (
        <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:sticky lg:top-6">
            <h3 
                className="font-bold text-base mb-3 sm:mb-4 lg:mb-6"
                style={{
                    color: colors.primary,
                    fontSize: '16px'
                }}
            >
                Choose Your Amount
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                {donationAmounts.map((amount, index) => (
                    <button
                        key={index}
                        className="p-2 sm:p-3 lg:p-4 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center rounded-lg"
                        style={{borderRadius: '8px'}}
                    >
                        <div 
                        className="font-bold text-sm"
                        style={{ 
                            color: colors.primary,
                            fontSize: '14px'
                        }}
                        >
                        ${amount}
                        </div>
                        <div 
                        className="text-xs mt-0.5 sm:mt-1"
                        style={{ color: colors.textSecondary }}
                        >
                        Donation
                        </div>
                    </button>
                ))}
            </div>
            <button 
                className="w-full py-2 sm:py-3 lg:py-3 px-4 sm:px-6 font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 hover:opacity-90 text-sm"
                style={{
                    backgroundColor: colors.buttonPrimary,
                    borderRadius: '12px',
                    fontSize: '14px'
                }}
            >
                <Heart className={`${iconSizes.small} text-white`} />
                <span>Donate Now</span>
            </button>
            <button 
                className="mt-4 w-full py-2 sm:py-3 lg:py-3 px-4 sm:px-6 font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 hover:opacity-90 text-sm"
                style={{
                    backgroundColor: colors.buttonSecondary,
                    borderRadius: '12px',
                    fontSize: '14px'
                }}
            >
                <ShoppingCart className={`${iconSizes.small} text-white`} />
                <span>Add to Cart</span>
            </button>
            </div>
        </div>
    )
}

export default SidebarPreview
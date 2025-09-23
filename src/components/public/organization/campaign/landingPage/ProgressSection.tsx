import React from 'react';
import { Users, Heart } from 'lucide-react';

interface ProgressData {
  raised: number;
  goal: number;
  donations: number;
  uniqueDonors: number;
  averageDonation: number;
  daysLeft: number;
}

interface ProgressSectionProps {
  progressData?: ProgressData;
  showProgress?: boolean;
  showDonorCount?: boolean;
  showDaysLeft?: boolean;
}

export function ProgressSection({
  progressData = {
    raised: 0,
    goal: 0,
    donations: 0,
    uniqueDonors: 0,
    averageDonation: 0,
    daysLeft: 0
  },
  showProgress = true,
  showDonorCount = true,
  showDaysLeft = true
}: ProgressSectionProps) {
  if (!showProgress) return null;

  const progressPercentage = progressData.goal ? Math.min((progressData.raised / progressData.goal) * 100, 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-gray-500">
          ${progressData.raised.toLocaleString()} raised
        </span>
        <span className="font-medium text-gray-500">
          of ${progressData.goal.toLocaleString()} goal
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className="h-3 rounded-full transition-all duration-500 ease-out bg-blue-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-start items-center space-x-6 text-sm text-gray-500">
        {showDonorCount && (
          <div className="flex items-center space-x-2">
            <Users className="text-blue-600 w-4 h-4" />
            <span>{progressData.uniqueDonors} donors</span>
          </div>
        )}
        {showDaysLeft && (
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500 w-4 h-4" />
            <span>{progressData.daysLeft} days left</span>
          </div>
        )}
      </div>
    </div>
  );
}

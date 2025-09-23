import React from 'react';
import { Trophy, Clock, Heart } from 'lucide-react';

interface Donor {
  name: string;
  amount: number;
  isTop?: boolean;
}

interface LeaderBoardProps {
  donors?: Donor[];
}

export function LeaderBoard({
  donors = [
    { name: "Sarah Johnson", amount: 500, isTop: true },
    { name: "Michael Chen", amount: 250, isTop: false },
    { name: "Emily Davis", amount: 200, isTop: false }
  ]
}: LeaderBoardProps) {
  return (
    <div className="bg-white border border-slate-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
      <h3 className="font-bold text-base mb-3 sm:mb-4 lg:mb-6 text-blue-500">
        Donation Leaderboard
      </h3>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-3 sm:mb-4 lg:mb-6 p-1 bg-slate-100 rounded-lg">
        <button className="flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs font-medium rounded-lg bg-white text-slate-900 flex items-center justify-center space-x-1.5 sm:space-x-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="truncate">Highest</span>
        </button>
        <button className="flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 flex items-center justify-center space-x-1.5 sm:space-x-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="truncate">Recent</span>
        </button>
      </div>

      {/* Leaderboard Content */}
      <div className="space-y-2 sm:space-y-3">
        {donors.map((donor, index) => (
          <div key={index} className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 flex-shrink-0">
                {donor.isTop ? (
                  <Trophy className="w-5 h-5 text-amber-500" />
                ) : (
                  <Heart className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate text-gray-900">
                  {donor.name}
                </div>
              </div>
            </div>
            <div className="font-bold text-sm ml-2 flex-shrink-0 text-blue-500">
              ${donor.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

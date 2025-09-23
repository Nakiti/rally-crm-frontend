import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface StatusIndicatorProps {
  isComplete: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const StatusIndicator = ({ isComplete, isLoading, children }: StatusIndicatorProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
        <span className="text-gray-600">{children}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {isComplete ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600" />
      )}
      <span className={isComplete ? "text-gray-900" : "text-gray-600"}>{children}</span>
    </div>
  );
};

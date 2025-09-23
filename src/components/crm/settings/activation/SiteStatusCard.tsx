import { CheckCircle, AlertCircle, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface SiteStatusCardProps {
  isReadyToPublish: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export const SiteStatusCard = ({
  isReadyToPublish,
  isLoading,
  isRefreshing,
  onRefresh,
  onPublish,
  isPublishing
}: SiteStatusCardProps) => {
  return (
    <Card className="shadow-sm border border-gray-200 mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-green-600" />
            Site Status
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            loading={isRefreshing}
            disabled={isRefreshing}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
            ) : isReadyToPublish ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {isReadyToPublish ? 'Ready to Publish' : 'Not Ready to Publish'}
              </h3>
              <p className="text-gray-600">
                {isReadyToPublish 
                  ? 'All requirements have been met. Your site can go live!'
                  : 'Complete the requirements below to publish your site.'
                }
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={onPublish}
            loading={isPublishing}
            disabled={!isReadyToPublish || isPublishing}
            className={isReadyToPublish ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isReadyToPublish ? 'Publish Site' : 'Not Ready'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

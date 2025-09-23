import { AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface MissingRequirementsCardProps {
  missingRequirements: string[];
}

export const MissingRequirementsCard = ({ missingRequirements }: MissingRequirementsCardProps) => {
  if (!missingRequirements || missingRequirements.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm border border-yellow-200 bg-yellow-50 mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold text-yellow-800 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Missing Requirements
        </h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {missingRequirements.map((requirement, index) => (
            <li key={index} className="flex items-center space-x-2 text-yellow-800">
              <XCircle className="w-4 h-4" />
              <span>{requirement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

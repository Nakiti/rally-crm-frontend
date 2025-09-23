import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export const HelpCard = () => {
  return (
    <Card className="shadow-sm border border-gray-200 mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
          Need Help?
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/settings/organization" className="hover:text-blue-600">
                  → Organization Settings
                </Link>
              </li>
              <li>
                <Link href="/settings/payment" className="hover:text-blue-600">
                  → Payment Configuration
                </Link>
              </li>
              <li>
                <Link href="/website" className="hover:text-blue-600">
                  → Website Editor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Support</h3>
            <p className="text-sm text-gray-600">
              If you need assistance completing these requirements, please contact our support team.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

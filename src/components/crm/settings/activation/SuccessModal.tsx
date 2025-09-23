import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Site Published Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Your organization is now live and accessible to the public.
          </p>
          <Button onClick={onClose} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

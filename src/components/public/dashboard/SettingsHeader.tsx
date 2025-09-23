"use client";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

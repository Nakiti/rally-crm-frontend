import React, { useState } from 'react';

interface PersonalInfoSectionProps {
  onFormDataChange?: (field: string, value: string) => void;
}

export function PersonalInfoSection({ onFormDataChange }: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    onFormDataChange?.(field, value);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Your Information
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
        />
      </div>
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 mb-3 text-sm rounded-md"
        placeholder="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 mb-3 text-sm rounded-md"
        placeholder="Street Address"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
      />
      <div className="grid grid-cols-3 gap-3 mb-3">
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="City"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="State"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
        />
      </div>
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
        placeholder="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
    </div>
  );
}

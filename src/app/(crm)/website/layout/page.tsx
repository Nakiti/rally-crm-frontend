"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Layout, Palette, Globe, Menu, Phone, Mail, MapPin } from "lucide-react";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormGroup, FormRow } from "@/components/ui/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ErrorModal } from "@/components/ui/ErrorModal";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

// Validation schema for website layout theme
const websiteLayoutSchema = z.object({
  // Header Configuration
  headerLogo: z.string().optional(),
  headerBackgroundColor: z.string().optional(),
  headerTextColor: z.string().optional(),
  showNavigationMenu: z.boolean(),
  navigationMenuItems: z.string().optional(),
  
  // Footer Configuration
  footerBackgroundColor: z.string().optional(),
  footerTextColor: z.string().optional(),
  footerContactEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  footerContactPhone: z.string().optional(),
  footerAddress: z.string().optional(),
  showSocialLinks: z.boolean(),
  socialLinks: z.string().optional(),
});

type WebsiteLayoutFormData = z.infer<typeof websiteLayoutSchema>;

/*
   Component: WebsiteLayout
   Description: renders website layout theme configuration page
*/
const WebsiteLayout = () => {
    const { data: user } = useGetCurrentUser();
    const organizationId = user?.organizationId;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<WebsiteLayoutFormData>({
        resolver: zodResolver(websiteLayoutSchema),
        defaultValues: {
            headerLogo: '',
            headerBackgroundColor: '#ffffff',
            headerTextColor: '#000000',
            showNavigationMenu: true,
            navigationMenuItems: '',
            footerBackgroundColor: '#f8f9fa',
            footerTextColor: '#6b7280',
            footerContactEmail: '',
            footerContactPhone: '',
            footerAddress: '',
            showSocialLinks: false,
            socialLinks: ''
        }
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Watch form values for real-time updates
    const watchedValues = watch();

    const onSubmit = async (data: WebsiteLayoutFormData) => {
        if (!organizationId) return;
        
        try {
            // TODO: Implement API call to save website layout theme settings
            console.log('Saving website layout theme:', data);
            setError(false);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
            setError(true);
        }
    };

    return (
      <div className="w-full h-full overflow-y-auto">
         {error && <ErrorModal message={errorMessage} onClose={() => setError(false)} />}
         <div className="p-6 bg-gray-50">
            <Card className="w-full h-full">
               <CardHeader>
                  <Link 
                     href="/website"
                     className="text-gray-700 flex flex-row items-center space-x-2 hover:text-gray-900 transition-colors"
                  >
                     <ArrowLeft className="w-4 h-4"/>
                     <span>Website</span>
                  </Link>
                  <div className="mt-4">
                     <h1 className="text-3xl font-semibold mb-2 text-gray-800 flex items-center">
                        <Layout className="w-8 h-8 mr-3 text-blue-600" />
                        Website Layout Theme
                     </h1>
                     <p className="text-gray-600">Configure the global theme and layout for your organization's website</p>
                  </div>
               </CardHeader>

               <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="space-y-8">
                        {/* Header Configuration Section */}
                        <div>
                           <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <Globe className="w-5 h-5 mr-2 text-blue-600" />
                              Header Configuration
                           </h2>
                           <FormGroup>
                              <Input
                                 label="Header Logo URL"
                                 placeholder="https://example.com/logo.png"
                                 error={errors.headerLogo?.message}
                                 {...register("headerLogo")}
                              />
                              <FormRow>
                                 <Input
                                    label="Header Background Color"
                                    placeholder="#ffffff"
                                    error={errors.headerBackgroundColor?.message}
                                    {...register("headerBackgroundColor")}
                                 />
                                 <Input
                                    label="Header Text Color"
                                    placeholder="#000000"
                                    error={errors.headerTextColor?.message}
                                    {...register("headerTextColor")}
                                 />
                              </FormRow>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                 <ToggleSwitch
                                    label="Show Navigation Menu"
                                    checked={watchedValues.showNavigationMenu}
                                    onChange={(checked) => setValue("showNavigationMenu", checked)}
                                 />
                                 <p className="text-sm text-gray-500 mt-2">Display navigation menu in the header</p>
                              </div>
                              {watchedValues.showNavigationMenu && (
                                 <Input
                                    label="Navigation Menu Items"
                                    placeholder="Home, About, Contact, Donate"
                                    error={errors.navigationMenuItems?.message}
                                    {...register("navigationMenuItems")}
                                 />
                              )}
                           </FormGroup>
                        </div>

                        {/* Footer Configuration Section */}
                        <div>
                           <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <Menu className="w-5 h-5 mr-2 text-blue-600" />
                              Footer Configuration
                           </h2>
                           <FormGroup>
                              <FormRow>
                                 <Input
                                    label="Footer Background Color"
                                    placeholder="#f8f9fa"
                                    error={errors.footerBackgroundColor?.message}
                                    {...register("footerBackgroundColor")}
                                 />
                                 <Input
                                    label="Footer Text Color"
                                    placeholder="#6b7280"
                                    error={errors.footerTextColor?.message}
                                    {...register("footerTextColor")}
                                 />
                              </FormRow>
                              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                                 <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                 Contact Information
                              </h3>
                              <FormRow>
                                 <Input
                                    label="Contact Email"
                                    placeholder="contact@organization.com"
                                    error={errors.footerContactEmail?.message}
                                    {...register("footerContactEmail")}
                                 />
                                 <Input
                                    label="Contact Phone"
                                    placeholder="(555) 123-4567"
                                    error={errors.footerContactPhone?.message}
                                    {...register("footerContactPhone")}
                                 />
                              </FormRow>
                              <Input
                                 label="Address"
                                 placeholder="123 Main St, City, State 12345"
                                 error={errors.footerAddress?.message}
                                 {...register("footerAddress")}
                              />
                              <div className="p-4 bg-gray-50 rounded-lg">
                                 <ToggleSwitch
                                    label="Show Social Links"
                                    checked={watchedValues.showSocialLinks}
                                    onChange={(checked) => setValue("showSocialLinks", checked)}
                                 />
                                 <p className="text-sm text-gray-500 mt-2">Display social media links in the footer</p>
                              </div>
                              {watchedValues.showSocialLinks && (
                                 <Input
                                    label="Social Media Links"
                                    placeholder="Facebook, Twitter, Instagram, LinkedIn"
                                    error={errors.socialLinks?.message}
                                    {...register("socialLinks")}
                                 />
                              )}
                           </FormGroup>
                        </div>

                        {/* Theme Preview Section */}
                        <div>
                           <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <Palette className="w-5 h-5 mr-2 text-blue-600" />
                              Theme Preview
                           </h2>
                           <div className="border border-gray-200 rounded-lg p-6 bg-white">
                              <div 
                                 className="w-full h-16 flex items-center justify-between px-6 rounded-t-lg"
                                 style={{ 
                                    backgroundColor: watchedValues.headerBackgroundColor || '#ffffff',
                                    color: watchedValues.headerTextColor || '#000000'
                                 }}
                              >
                                 <div className="flex items-center space-x-4">
                                    {watchedValues.headerLogo && (
                                       <img 
                                          src={watchedValues.headerLogo} 
                                          alt="Logo" 
                                          className="h-8 w-auto"
                                          onError={(e) => {
                                             e.currentTarget.style.display = 'none';
                                          }}
                                       />
                                    )}
                                    <span className="font-semibold">Organization Name</span>
                                 </div>
                                 {watchedValues.showNavigationMenu && (
                                    <nav className="flex space-x-6">
                                       {watchedValues.navigationMenuItems?.split(',').map((item, index) => (
                                          <span key={index} className="text-sm hover:underline">
                                             {item.trim()}
                                          </span>
                                       ))}
                                    </nav>
                                 )}
                              </div>
                              <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-500">
                                 <span>Website Content Area</span>
                              </div>
                              <div 
                                 className="w-full h-24 flex items-center justify-between px-6 rounded-b-lg"
                                 style={{ 
                                    backgroundColor: watchedValues.footerBackgroundColor || '#f8f9fa',
                                    color: watchedValues.footerTextColor || '#6b7280'
                                 }}
                              >
                                 <div className="flex flex-col space-y-1">
                                    {watchedValues.footerContactEmail && (
                                       <div className="flex items-center space-x-2 text-sm">
                                          <Mail className="w-3 h-3" />
                                          <span>{watchedValues.footerContactEmail}</span>
                                       </div>
                                    )}
                                    {watchedValues.footerContactPhone && (
                                       <div className="flex items-center space-x-2 text-sm">
                                          <Phone className="w-3 h-3" />
                                          <span>{watchedValues.footerContactPhone}</span>
                                       </div>
                                    )}
                                    {watchedValues.footerAddress && (
                                       <div className="flex items-center space-x-2 text-sm">
                                          <MapPin className="w-3 h-3" />
                                          <span>{watchedValues.footerAddress}</span>
                                       </div>
                                    )}
                                 </div>
                                 {watchedValues.showSocialLinks && (
                                    <div className="flex space-x-4">
                                       {watchedValues.socialLinks?.split(',').map((link, index) => (
                                          <span key={index} className="text-sm hover:underline">
                                             {link.trim()}
                                          </span>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Save Button */}
                     <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <Button
                           type="submit"
                           loading={isSubmitting}
                           disabled={isSubmitting}
                           size="lg"
                        >
                           Save Theme Settings
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default WebsiteLayout;

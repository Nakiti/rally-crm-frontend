"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { useGetOrganization, useUpdateOrganization } from "@/hooks/crm/useOrganization";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormGroup, FormRow } from "@/components/ui/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ErrorModal } from "@/components/ui/ErrorModal";

// Validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

/*
   Component: Organization
   Description: renders organization page and allows user to manage settings
*/
const OrganizationPage = () => {
    const { data: user } = useGetCurrentUser();
    const organizationId = user?.organizationId;
    const { data: organization } = useGetOrganization(organizationId ?? '');
    const updateOrganizationMutation = useUpdateOrganization(organizationId ?? '');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<OrganizationFormData>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            name: '',
            url: '',
            street: '',
            city: '',
            state: '',
            country: '',
            zipcode: ''
        }
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Update form data when organization data is loaded
    useEffect(() => {
        if (organization) {
            reset({
                name: organization.name || '',
                url: '', // URL field not in current organization type
                street: '', // Address fields not in current organization type
                city: '',
                state: '',
                country: '',
                zipcode: ''
            });
        }
    }, [organization, reset]);

    const onSubmit = async (data: OrganizationFormData) => {
        if (!organizationId) return;
        
        try {
            await updateOrganizationMutation.mutateAsync(data);
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
                     href="/settings"
                     className="text-gray-700 flex flex-row items-center space-x-2 hover:text-gray-900 transition-colors"
                  >
                     <ArrowLeft className="w-4 h-4"/>
                     <span>Settings</span>
                  </Link>
                  <div className="mt-4">
                     <h1 className="text-3xl font-semibold mb-2 text-gray-800 flex items-center">
                        <Building2 className="w-8 h-8 mr-3 text-blue-600" />
                        Organization
                     </h1>
                     <p className="text-gray-600">Manage details about your organization</p>
                  </div>
               </CardHeader>


               <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="space-y-8">
                        {/* General Information Section */}
                        <div>
                           <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                              General Information
                           </h2>
                           <FormGroup>
                              <Input
                                 label="Organization Name"
                                 placeholder="Enter organization name"
                                 error={errors.name?.message}
                                 {...register("name")}
                              />
                              <Input
                                 label="Organization URL"
                                 placeholder="https://example.com"
                                 error={errors.url?.message}
                                 {...register("url")}
                              />
                           </FormGroup>
                        </div>
                        {/* Address Section */}
                        <div>
                           <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                              Address Information
                           </h2>
                           <FormGroup>
                              <Input
                                 label="Street Address"
                                 placeholder="Enter street address"
                                 error={errors.street?.message}
                                 {...register("street")}
                              />
                              <FormRow>
                                 <Input
                                    label="City"
                                    placeholder="Enter city"
                                    error={errors.city?.message}
                                    {...register("city")}
                                 />
                                 <Input
                                    label="State"
                                    placeholder="Enter state"
                                    error={errors.state?.message}
                                    {...register("state")}
                                 />
                              </FormRow>
                              <FormRow>
                                 <Input
                                    label="Country"
                                    placeholder="Enter country"
                                    error={errors.country?.message}
                                    {...register("country")}
                                 />
                                 <Input
                                    label="Zipcode"
                                    placeholder="Enter zipcode"
                                    error={errors.zipcode?.message}
                                    {...register("zipcode")}
                                 />
                              </FormRow>
                           </FormGroup>
                        </div>
                     </div>
                     
                     {/* Save Button */}
                     <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <Button
                           type="submit"
                           loading={isSubmitting || updateOrganizationMutation.isPending}
                           disabled={isSubmitting || updateOrganizationMutation.isPending}
                           size="lg"
                        >
                           Save Changes
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default OrganizationPage
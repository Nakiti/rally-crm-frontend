"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, MapPin } from "lucide-react";
import { useGetCurrentOrganization, useUpdateCurrentOrganization } from "@/hooks/crm/useOrganization";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormGroup, FormRow } from "@/components/ui/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ErrorModal } from "@/components/ui/ErrorModal";
import OrganizationHeader from "@/components/crm/settings/OrganizationHeader";

// Validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  subdomain: z.string().min(1, "Subdomain is required"),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

/*
   Component: OrganizationPage
   Description: renders organization page and allows user to manage settings
*/
const OrganizationPage = () => {
    const { data: user } = useGetCurrentUser();
    const { data: organization, isLoading, error } = useGetCurrentOrganization();
    const updateOrganizationMutation = useUpdateCurrentOrganization();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<OrganizationFormData>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            name: '',
            subdomain: '',
            url: '',
            street: '',
            city: '',
            state: '',
            country: '',
            zipcode: ''
        }
    });

    // Update form data when organization data is loaded
    useEffect(() => {
        if (organization) {
            reset({
                name: organization.name || '',
                subdomain: organization.subdomain || '',
                url: organization.settings?.url || '',
                street: organization.settings?.street || '',
                city: organization.settings?.city || '',
                state: organization.settings?.state || '',
                country: organization.settings?.country || '',
                zipcode: organization.settings?.zipcode || ''
            });
        }
    }, [organization, reset]);

    const onSubmit = async (data: OrganizationFormData) => {
        try {
            // Structure the data properly: name and subdomain are direct fields,
            // while address fields go into settings
            const updateData = {
                name: data.name,
                subdomain: data.subdomain,
                settings: {
                    url: data.url,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    zipcode: data.zipcode
                }
            };
            
            await updateOrganizationMutation.mutateAsync(updateData);
        } catch (err) {
            console.error("Failed to update organization:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        {error instanceof Error ? error.message : 'Failed to load organization'}
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
            {updateOrganizationMutation.error && (
                <ErrorModal 
                    message={updateOrganizationMutation.error instanceof Error ? updateOrganizationMutation.error.message : 'Failed to update organization'} 
                    onClose={() => updateOrganizationMutation.reset()} 
                />
            )}
            
            <div className="p-6 max-w-6xl mx-auto">
                <OrganizationHeader />
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        <Card className="shadow-sm border border-gray-200">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                                    General Information
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <FormGroup>
                                        <Input
                                            label="Organization Name"
                                            placeholder="Enter organization name"
                                            error={errors.name?.message}
                                            {...register("name")}
                                        />
                                        <Input
                                            label="Organization Subdomain"
                                            placeholder="your-organization"
                                            error={errors.subdomain?.message}
                                            {...register("subdomain")}
                                        />
                                        <Input
                                            label="Organization URL"
                                            placeholder="https://example.com"
                                            error={errors.url?.message}
                                            {...register("url")}
                                        />
                                    </FormGroup>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-gray-200">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                    Address Information
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
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
                            </CardContent>
                        </Card>
                        
                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                loading={isSubmitting || updateOrganizationMutation.isPending}
                                disabled={isSubmitting || updateOrganizationMutation.isPending}
                                size="lg"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganizationPage
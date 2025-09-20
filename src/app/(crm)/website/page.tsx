
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Layout, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

/**
 * WebsitePage Component
 * 
 * Displays the website configuration interface allowing users to manage
 * website layout and pages settings.
 * 
 * @returns JSX element containing the website configuration page
 */
const WebsitePage: React.FC = () => {
    const router = useRouter()

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="p-6 bg-gray-50">
                <div className="mt-4 mb-8">
                    <h1 className="text-3xl font-semibold mb-2 text-gray-800 flex items-center">
                        Website Configuration
                    </h1>
                    <p className="text-gray-600">Configure your public website for users to access</p>
                </div>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow duration-200 h-84">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <Layout className="w-8 h-8 text-blue-600 mr-3" />
                                    <h3 className="text-lg font-semibold text-gray-800">Layout</h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Customize the overall design and layout of your website
                                </p>
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                >
                                    <Link href="/website/layout">Configure Layout</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Pages Configuration */}
                        <Card className="hover:shadow-lg transition-shadow duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                                    <h3 className="text-lg font-semibold text-gray-800">Pages</h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Manage and customize individual pages on your website
                                </p>
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                >
                                    <Link href="/website/pages">Configure Pages</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsitePage;
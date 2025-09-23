

"use client";

import React from "react";
import Link from "next/link";
import { FileText, Globe, Users, Info, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

// Define the page interface
interface WebsitePage {
    id: string;
    title: string;
    description: string;
    pageType: 'landing' | 'about' | 'contact' | 'campaigns' | 'settings' | 'custom';
    icon: React.ReactNode;
    href: string;
    isConfigured?: boolean;
}

const WebsitePages = () => {
    const router = useRouter();

    // Mock data for pages - in a real app, this would come from an API
    const pages: WebsitePage[] = [
        {
            id: '1',
            title: 'Landing Page',
            description: 'Configure the first page your visitors will see',
            pageType: 'landing',
            icon: <Home className="w-8 h-8 text-blue-600" />,
            href: '/website/pages/editor/landing',
            isConfigured: true
        },
        {
            id: '2',
            title: 'About Page',
            description: 'Tell your organization\'s story and mission',
            pageType: 'about',
            icon: <Info className="w-8 h-8 text-green-600" />,
            href: '/website/pages/editor/about',
            isConfigured: false
        }
    ];

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="p-6 bg-gray-50">
                <div className="mt-4 mb-8">
                    <h1 className="text-3xl font-semibold mb-2 text-gray-800 flex items-center">
                        Website Pages
                    </h1>
                    <p className="text-gray-600">Manage and customize individual pages on your website</p>
                </div>
                
                {/* 2xX Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pages.map((page) => (
                        <Card 
                            key={page.id} 
                            className="hover:shadow-lg transition-shadow duration-200"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    {page.icon}
                                    <h3 className="text-lg font-semibold text-gray-800 ml-3">
                                        {page.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {page.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm px-2 py-1 rounded-full ${
                                        page.isConfigured 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {page.isConfigured ? 'Configured' : 'Not Configured'}
                                    </span>
                                    <Button 
                                        variant="outline" 
                                        className="ml-2"
                                        onClick={() => router.push(page.href)}
                                    >
                                        {page.isConfigured ? 'Edit' : 'Configure'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebsitePages;
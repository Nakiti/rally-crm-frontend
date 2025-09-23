"use client"
import { OrganizationHeader } from '@/components/public';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <OrganizationHeader 
                organizationName="Sample Organization"
                showLogo={true}
            />
            <div>
                {children}
            </div>
        </div>
    )
}
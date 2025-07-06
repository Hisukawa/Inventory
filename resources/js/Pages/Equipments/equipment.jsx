import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import QRCode from "react-qr-code";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function EquipmentView({ equipment }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(equipment.qr_code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/equipment/list">
                                    Equipment View
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            {equipment.equipment_name}
                        </h1>

                        <div
                            className="inline-block bg-white p-4 border rounded shadow cursor-pointer"
                            onClick={handleCopy}
                        >
                            <QRCode
                                value={equipment.qr_code || ""}
                                size={200}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-600 break-all">
                            {equipment.qr_code}
                        </p>
                        {copied && (
                            <p className="text-green-600 text-sm mt-1">
                                Copied to clipboard!
                            </p>
                        )}

                        <div className="mt-4">
                            <p className="text-gray-700">
                                <strong>Room:</strong>{" "}
                                {equipment.room?.room_name || "Unknown"}
                            </p>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

import React, { useState } from "react";
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

    // ✅ Pull specification fields from the JSON column
    const { specifications = {}, room } = equipment;

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
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Equipment Details
                        </h1>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Equipment Name:
                                </span>
                                <p className="text-gray-900">
                                    {equipment.equipment_name}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Room:
                                </span>
                                <p className="text-gray-900">
                                    {room?.room_name || "Unknown"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Equipment ID / QR Code:
                                </span>
                                <p className="text-gray-900 break-all">
                                    {equipment.qr_code}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Brand:
                                </span>
                                <p className="text-gray-900">
                                    {specifications.brand || "—"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Processor:
                                </span>
                                <p className="text-gray-900">
                                    {specifications.processor || "—"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    RAM:
                                </span>
                                <p className="text-gray-900">
                                    {specifications.ram || "—"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Storage:
                                </span>
                                <p className="text-gray-900">
                                    {specifications.storage || "—"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Operating System:
                                </span>
                                <p className="text-gray-900">
                                    {specifications.os || "—"}
                                </p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-700">
                                    Status:
                                </span>
                                <p className="text-gray-900">
                                    {equipment.status || "Active"}
                                </p>
                            </div>
                        </div>

                        {/* Optional: QR Code Display */}
                        <div className="mt-8 text-center">
                            <h2 className="text-lg font-semibold mb-2">
                                QR Code
                            </h2>
                            <div className="inline-block bg-white p-4 border rounded shadow">
                                <QRCode value={equipment.qr_code} size={180} />
                            </div>
                            <p
                                className="mt-2 text-sm text-gray-600 cursor-pointer"
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Click to copy QR path"}
                            </p>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

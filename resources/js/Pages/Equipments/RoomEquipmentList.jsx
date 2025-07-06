import React from "react";
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

export default function RoomEquipmentList({ room, equipments }) {
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
                                <BreadcrumbLink href="/admin/rooms/list">
                                    Room List
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {room.room_name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">
                        Equipments in {room.room_name}
                    </h1>

                    {equipments.length === 0 ? (
                        <p className="text-gray-600">
                            No equipment found in this room.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {equipments.map((equipment) => (
                                <div
                                    key={equipment.id}
                                    className="bg-white p-4 border rounded shadow text-center"
                                >
                                    <h2 className="text-lg font-semibold mb-2">
                                        {equipment.equipment_name}
                                    </h2>
                                    <QRCode
                                        value={`https://kensqui.eskey22.com/equipment/${equipment.equipment_path}`}
                                        // value={`https://localhost:8000/equipment/${equipment.equipment_path}`}
                                        size={150}
                                    />
                                    <p className="mt-2 text-sm text-gray-600 break-all">
                                        {equipment.equipment_path}
                                    </p>
                                    <a
                                        href={`/equipment/${equipment.equipment_path}`}
                                        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                    >
                                        View
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

import React, { useState } from "react";
import { router } from "@inertiajs/react";
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

export default function RoomForm() {
    const [roomNumber, setRoomNumber] = useState("");
    const [message, setMessage] = useState("");
    const [qrCodeText, setQrCodeText] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            "/admin/rooms",
            { room_number: roomNumber },
            {
                onSuccess: () => {
                    const formatted = roomNumber.trim().toUpperCase();
                    const full = `ISU-ILAGAN/ICT-DEPARTMENT/ROOM-${formatted}`;
                    const qr = full.toLowerCase();
                    setQrCodeText(qr);
                    setMessage("Room added successfully!");
                    setRoomNumber("");
                },
                onError: (errors) => {
                    setMessage(errors.room_number || "Error adding room.");
                },
            }
        );
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
                                <BreadcrumbLink href="/admin/rooms/create">
                                    Room Management
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Add Room</h1>
                            {/* <a
                                href="/admin/rooms/list"
                                className="text-sm bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-gray-700 transition"
                            >
                                View All Rooms
                            </a> */}
                        </div>

                        {message && (
                            <div className="bg-green-100 p-2 mb-4 rounded">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label className="block mb-1 font-medium">
                                Room Number
                            </label>
                            <input
                                type="number"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                                placeholder="e.g. 101"
                                required
                            />
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Add Room
                                </button>
                            </div>
                        </form>

                        {qrCodeText && (
                            <div className="mt-8 text-center">
                                <h2 className="text-lg font-semibold mb-2">
                                    QR Code Preview
                                </h2>
                                <div className="inline-block bg-white p-4 border rounded shadow">
                                    <QRCode value={qrCodeText} size={180} />
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    {qrCodeText}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
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

export default function EditEquipmentForm({ equipment, rooms }) {
    const { data, setData, put, processing, errors } = useForm({
        equipment_name: equipment.equipment_name || "",
        room_id: equipment.room_id || "",
        brand: equipment.specifications?.brand || "",
        processor: equipment.specifications?.processor || "",
        ram: equipment.specifications?.ram || "",
        storage: equipment.specifications?.storage || "",
        os: equipment.specifications?.os || "",
    });

    const [qrPath, setQrPath] = useState(equipment.equipment_path);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/equipments/${equipment.id}`, {
            onSuccess: () => {
                setMessage("Equipment updated successfully!");
            },
            onError: (e) => {
                setMessage("There was a problem updating the equipment.");
            },
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
                                <BreadcrumbLink href="/admin/equipments/list">
                                    Equipment List
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    Edit Equipment
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Edit Equipment
                        </h1>

                        {message && (
                            <div className="bg-green-100 p-2 mb-4 rounded">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label className="block mb-1 font-medium">
                                Room
                            </label>
                            <select
                                value={data.room_id}
                                onChange={(e) =>
                                    setData("room_id", e.target.value)
                                }
                                className="border p-2 w-full mb-4 rounded"
                                required
                            >
                                <option value="">Select Room</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.room_name}
                                    </option>
                                ))}
                            </select>

                            <label className="block mb-1 font-medium">
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                value={data.equipment_name}
                                onChange={(e) =>
                                    setData("equipment_name", e.target.value)
                                }
                                className="border p-2 w-full mb-4 rounded"
                                required
                            />

                            <label className="block mb-1 font-medium">
                                Brand
                            </label>
                            <input
                                type="text"
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                                className="border p-2 w-full mb-4 rounded"
                            />

                            <label className="block mb-1 font-medium">
                                Processor
                            </label>
                            <input
                                type="text"
                                value={data.processor}
                                onChange={(e) =>
                                    setData("processor", e.target.value)
                                }
                                className="border p-2 w-full mb-4 rounded"
                            />

                            <label className="block mb-1 font-medium">
                                RAM
                            </label>
                            <input
                                type="text"
                                value={data.ram}
                                onChange={(e) => setData("ram", e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                            />

                            <label className="block mb-1 font-medium">
                                Storage
                            </label>
                            <input
                                type="text"
                                value={data.storage}
                                onChange={(e) =>
                                    setData("storage", e.target.value)
                                }
                                className="border p-2 w-full mb-4 rounded"
                            />

                            <label className="block mb-1 font-medium">
                                Operating System
                            </label>
                            <input
                                type="text"
                                value={data.os}
                                onChange={(e) => setData("os", e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                            />

                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    disabled={processing}
                                >
                                    Update Equipment
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <h2 className="text-lg font-semibold mb-2">
                                Current QR Code
                            </h2>
                            <div className="inline-block bg-white p-4 border rounded shadow">
                                <QRCode value={qrPath} size={180} />
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                {qrPath}
                            </p>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

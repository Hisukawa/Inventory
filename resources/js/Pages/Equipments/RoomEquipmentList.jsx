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

export default function RoomEquipmentList({ room, equipments }) {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ url: "", label: "" });

    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(modalData.url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const openQrModal = (url, label) => {
        setModalData({ url, label });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalData({ url: "", label: "" });
        setCopied(false);
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
                                    <div
                                        className="flex justify-center cursor-pointer mb-2"
                                        onClick={() =>
                                            openQrModal(
                                                `${window.location.origin}/equipment/${equipment.equipment_path}`,
                                                equipment.equipment_name
                                            )
                                        }
                                        title="Click to enlarge"
                                    >
                                        <QRCode
                                            value={`${window.location.origin}/equipment/${equipment.equipment_path}`}
                                            size={150}
                                        />
                                    </div>
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

                    {/* ✅ Modal from RoomList with copy */}
                    {showModal && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-white p-6 rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-lg font-bold mb-4 text-center">
                                    {modalData.label}
                                </h2>
                                <div
                                    className="flex justify-center mb-2 cursor-pointer"
                                    onClick={handleCopy}
                                    title="Click to copy QR URL"
                                >
                                    <QRCode value={modalData.url} size={350} />
                                </div>
                                <p className="mt-2 text-sm text-gray-600 break-all text-center">
                                    {modalData.url}
                                </p>
                                {copied && (
                                    <p className="text-green-600 text-center text-sm mt-1">
                                        Copied to clipboard!
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

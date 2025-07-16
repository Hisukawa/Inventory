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

export default function RoomEquipmentList({
    room,
    equipments,
    system_units = [],
}) {
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

    const statusStyles = {
        functional: "bg-green-500",
        intact: "bg-green-500",
        "under maintenance": "bg-yellow-400",
        worn: "bg-yellow-400",
        defective: "bg-red-500",
        damaged: "bg-red-500",
        "for replacement": "bg-orange-500",
        "needs replacement": "bg-orange-500",
        missing: "bg-rose-400",
        spare: "bg-gray-400",
    };

    const allEquipments = [...equipments, ...system_units];

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

                    {allEquipments.length === 0 ? (
                        <p className="text-gray-600">
                            No equipment found in this room.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {allEquipments.map((equipment) => {
                                const statusKey =
                                    equipment.status?.toLowerCase() ||
                                    "unknown";

                                return (
                                    <div
                                        key={equipment.id}
                                        className="bg-white p-6 border rounded shadow text-left min-w-[200px] min-h-[250px] flex flex-col justify-between"
                                    >
                                        <div>
                                            <h2 className="text-lg font-bold mb-3">
                                                {equipment.equipment_name}
                                            </h2>

                                            <p className="text-base text-gray-700 mb-2">
                                                <span className="font-semibold">
                                                    Type:
                                                </span>{" "}
                                                {equipment.type || "N/A"}
                                            </p>

                                            <p className="text-base text-gray-700 mb-2">
                                                <span className="font-semibold">
                                                    Room:
                                                </span>{" "}
                                                {equipment.room?.room_name ||
                                                    room.room_name ||
                                                    "N/A"}
                                            </p>

                                            <div className="mt-2 mb-3">
                                                <span className="font-semibold text-base">
                                                    Status:{" "}
                                                </span>
                                                <span
                                                    className={`inline-block text-white px-3 py-1 mt-1 rounded-full text-sm ${
                                                        statusStyles[
                                                            statusKey
                                                        ] || "bg-gray-300"
                                                    }`}
                                                >
                                                    {equipment.status ||
                                                        "Unknown"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-center mt-4">
                                            <a
                                                href={`/system-unit/${equipment.equipment_path}`}
                                                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                            >
                                                View
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

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

import { router } from "@inertiajs/react";
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

export default function RoomList(props) {
    const { rooms } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedQr, setSelectedQr] = useState("");
    const [selectedRoomName, setSelectedRoomName] = useState(""); // 🔧 ADDED

    const openQrModal = (qrCodeValue, roomName) => {
        // 🔧 CHANGED
        setSelectedQr(qrCodeValue);
        setSelectedRoomName(roomName); // 🔧 ADDED
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedQr("");
        setSelectedRoomName(""); // 🔧 ADDED
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
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
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content */}
                <main className="max-w-6xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4 text-left">
                        All Added Rooms
                    </h1>

                    {props.flash?.success && (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-6 shadow">
                            {props.flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="w-full max-w-sm p-4 bg-white border rounded shadow text-center"
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {room.room_name}
                                </h2>

                                <div
                                    className="flex justify-center cursor-pointer mb-2"
                                    onClick={() =>
                                        openQrModal(
                                            `${window.location.origin}/${room.qr_code}`,
                                            room.room_name // 🔧 ADDED
                                        )
                                    }
                                    title="Click to enlarge"
                                >
                                    <QRCode
                                        value={`${window.location.origin}/${room.qr_code}`}
                                        size={150}
                                    />
                                </div>

                                {/* <p className="text-sm text-gray-500 break-all">
                                    {room.qr_code}
                                </p> */}

                                <div className="mt-4 flex justify-center gap-2">
                                    <a
                                        href={`/admin/rooms/${room.id}/equipments`}
                                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm"
                                    >
                                        View Equipments
                                    </a>
                                    <button
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    `Delete ${room.room_name}? This cannot be undone.`
                                                )
                                            ) {
                                                router.delete(
                                                    `/admin/rooms/${room.id}`
                                                );
                                            }
                                        }}
                                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Modal */}
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
                                    {selectedRoomName} {/* 🔧 CHANGED */}
                                </h2>
                                <div className="flex justify-center mb-2">
                                    <QRCode value={selectedQr} size={350} />
                                </div>
                                <p className="mt-2 text-sm text-gray-600 break-all text-center">
                                    {selectedQr}
                                </p>
                                {/* <button
                                    onClick={closeModal}
                                    className="mt-4 block mx-auto bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Close
                                </button> */}
                            </div>
                        </div>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

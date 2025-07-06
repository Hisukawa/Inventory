import React, { useEffect, useState } from "react";
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

export default function EquipmentForm() {
    const [equipmentName, setEquipmentName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [qrCodeText, setQrCodeText] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                console.log("Loaded rooms:", data);
                setRooms(data);
                setFilteredRooms(data);
            });
    }, []);

    const handleRoomSearch = (e) => {
        const inputValue = e.target.value;
        setRoomId(inputValue);

        setFilteredRooms(
            rooms.filter((room) =>
                room.room_number
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedRoom = rooms.find(
            (room) => room.room_number.toLowerCase() === roomId.toLowerCase()
        );

        if (!selectedRoom) {
            setMessage("Please select a valid room.");
            return;
        }

        const formattedEquipment = equipmentName.trim().toLowerCase();
        const qrPath = `${selectedRoom.qr_code}/${formattedEquipment}`; // final ID format

        router.post(
            "/admin/equipment",
            {
                room_id: selectedRoom.id,
                equipment_name: equipmentName,
                qr_code: qrPath,
            },
            {
                onSuccess: () => {
                    setQrCodeText(qrPath);
                    setMessage("Equipment added successfully!");
                    setEquipmentName("");
                    setRoomId("");
                },
                onError: (errors) => {
                    const errorMessage =
                        typeof errors === "string"
                            ? errors
                            : errors?.equipment_name ||
                              "Error adding equipment.";
                    setMessage(errorMessage);
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
                                <BreadcrumbLink href="/admin/equipment/create">
                                    Equipment Management
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Add Equipment
                            </h1>
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
                                type="text"
                                value={roomId}
                                onChange={handleRoomSearch}
                                list="room-list"
                                placeholder="Type room number (e.g. 103)"
                                className="border p-2 w-full mb-4 rounded"
                                required
                            />
                            <datalist id="room-list">
                                {filteredRooms.map((room) => (
                                    <option
                                        key={room.id}
                                        value={room.room_number}
                                    />
                                ))}
                            </datalist>

                            <label className="block mb-1 font-medium">
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                value={equipmentName}
                                onChange={(e) =>
                                    setEquipmentName(e.target.value)
                                }
                                placeholder="e.g. PC-01"
                                className="border p-2 w-full mb-4 rounded"
                                required
                            />

                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Add Equipment
                                </button>
                            </div>
                        </form>

                        {qrCodeText && (
                            <div className="mt-8 text-center">
                                <h2 className="text-lg font-semibold mb-2">
                                    QR Code for Equipment
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

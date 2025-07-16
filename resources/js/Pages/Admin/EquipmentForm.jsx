import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";

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
    const [qrCodeText, setQrCodeText] = useState("");

    const [category, setCategory] = useState("system-unit");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    // System Unit Fields
    const [brand, setBrand] = useState("");
    const [processor, setProcessor] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [os, setOs] = useState("");
    const [sameAsLast, setSameAsLast] = useState(false);
    const [lastSpecs, setLastSpecs] = useState(null);

    // Furniture Fields
    const [furnitureType, setFurnitureType] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [condition, setCondition] = useState("");

    useEffect(() => {
        fetch("/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                setRooms(data);
                setFilteredRooms(data);
            });
    }, []);

    const handleRoomSearch = (e) => {
        const value = e.target.value;
        setRoomId(value);
        setFilteredRooms(
            rooms.filter((room) =>
                room.room_number.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedRoom = rooms.find(
            (room) => room.room_number.toLowerCase() === roomId.toLowerCase()
        );

        if (!selectedRoom) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Room",
                text: "Please select a valid room from the list.",
            });
            return;
        }

        const payload = {
            room_id: selectedRoom.id,
            equipment_name: equipmentName,
            category,
            type,
            status,
        };

        if (category === "system-unit") {
            payload.brand = brand;
            payload.processor = processor;
            payload.ram = ram;
            payload.storage = storage;
            payload.os = os;
        } else if (category === "furniture") {
            payload.furniture_type = furnitureType;
            payload.material = material;
            payload.color = color;
            payload.dimensions = dimensions;
            payload.condition = condition;
        }

        router.post("/admin/system-units", payload, {
            preserveScroll: true,
            onSuccess: (page) => {
                const path = page.props?.flash?.equipment_path || "";
                Swal.fire({
                    icon: "success",
                    title: "Equipment Added!",
                    text: "The equipment has been added to the inventory.",
                });

                setQrCodeText(path);
                setEquipmentName("");
                setRoomId("");
                setType("");
                setStatus("");

                if (category === "system-unit") {
                    if (!sameAsLast) {
                        setBrand("");
                        setProcessor("");
                        setRam("");
                        setStorage("");
                        setOs("");
                    }
                    setLastSpecs({ brand, processor, ram, storage, os });
                } else if (category === "furniture") {
                    setFurnitureType("");
                    setMaterial("");
                    setColor("");
                    setDimensions("");
                    setCondition("");
                }
            },
            onError: (errors) => {
                const errorMessage =
                    typeof errors === "string"
                        ? errors
                        : Object.values(errors)?.[0] ||
                          "An unexpected error occurred.";

                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: errorMessage,
                    confirmButtonColor: "#d33",
                });
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
                                <BreadcrumbLink href="/admin/equipments/create">
                                    Equipment Management
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">
                            Add Equipment
                        </h1>

                        <form onSubmit={handleSubmit}>
                            {/* Category */}
                            <label className="block mb-1 font-medium">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                            >
                                <option value="system-unit">System Unit</option>
                                <option value="furniture">Furniture</option>
                            </select>

                            {/* Room Search */}
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

                            {/* Equipment Name */}
                            <label className="block mb-1 font-medium">
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                value={equipmentName}
                                onChange={(e) =>
                                    setEquipmentName(e.target.value)
                                }
                                placeholder="e.g. PC-1"
                                className="border p-2 w-full mb-4 rounded"
                                required
                            />

                            {/* Type */}
                            <label className="block mb-1 font-medium">
                                Type
                            </label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                                required
                            />

                            {/* Status */}
                            <label className="block mb-1 font-medium">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border p-2 w-full mb-4 rounded"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Functional">Functional</option>
                                <option value="Defective">Defective</option>
                                <option value="Under Maintenance">
                                    Under Maintenance
                                </option>
                                <option value="Missing">Missing</option>
                                <option value="Damaged">Damaged</option>
                                <option value="Spare">Spare</option>
                                <option value="For Replacement">
                                    For Replacement
                                </option>
                            </select>

                            {/* System Unit Fields */}
                            {category === "system-unit" && (
                                <>
                                    <label className="inline-flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            checked={sameAsLast}
                                            onChange={(e) => {
                                                setSameAsLast(e.target.checked);
                                                if (
                                                    e.target.checked &&
                                                    lastSpecs
                                                ) {
                                                    setBrand(
                                                        lastSpecs.brand || ""
                                                    );
                                                    setProcessor(
                                                        lastSpecs.processor ||
                                                            ""
                                                    );
                                                    setRam(lastSpecs.ram || "");
                                                    setStorage(
                                                        lastSpecs.storage || ""
                                                    );
                                                    setOs(lastSpecs.os || "");
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        Use same specifications as last
                                    </label>

                                    <label className="block mb-1 font-medium">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={brand}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Processor
                                    </label>
                                    <input
                                        type="text"
                                        value={processor}
                                        onChange={(e) =>
                                            setProcessor(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        RAM
                                    </label>
                                    <input
                                        type="text"
                                        value={ram}
                                        onChange={(e) => setRam(e.target.value)}
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Storage
                                    </label>
                                    <input
                                        type="text"
                                        value={storage}
                                        onChange={(e) =>
                                            setStorage(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Operating System
                                    </label>
                                    <input
                                        type="text"
                                        value={os}
                                        onChange={(e) => setOs(e.target.value)}
                                        className="border p-2 w-full mb-4 rounded"
                                        list="os-options"
                                    />
                                    <datalist id="os-options">
                                        <option value="Windows 10" />
                                        <option value="Windows 11" />
                                        <option value="Ubuntu 22.04" />
                                        <option value="Linux Mint" />
                                    </datalist>
                                </>
                            )}

                            {/* Furniture Fields */}
                            {category === "furniture" && (
                                <>
                                    <label className="block mb-1 font-medium">
                                        Furniture Type
                                    </label>
                                    <input
                                        type="text"
                                        value={furnitureType}
                                        onChange={(e) =>
                                            setFurnitureType(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        value={material}
                                        onChange={(e) =>
                                            setMaterial(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Dimensions
                                    </label>
                                    <input
                                        type="text"
                                        value={dimensions}
                                        onChange={(e) =>
                                            setDimensions(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />

                                    <label className="block mb-1 font-medium">
                                        Condition
                                    </label>
                                    <input
                                        type="text"
                                        value={condition}
                                        onChange={(e) =>
                                            setCondition(e.target.value)
                                        }
                                        className="border p-2 w-full mb-4 rounded"
                                    />
                                </>
                            )}

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

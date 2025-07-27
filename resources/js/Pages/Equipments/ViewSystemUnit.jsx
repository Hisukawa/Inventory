import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function ViewSystemUnit({ system_unit }) {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const qrRef = useRef(null);

    const qrUrl = `${window.location.origin}/system-unit/${system_unit.equipment_path}`;

    const openModal = () => {
        setShowModal(true);
        setCopied(false);
    };

    const closeModal = () => setShowModal(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(qrUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownloadQr = () => {
        const svg = qrRef.current.querySelector("svg");
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const pngFile = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `${system_unit.equipment_name}-qr.png`;
            link.href = pngFile;
            link.click();
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
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
                                    Rooms List
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {system_unit?.equipment_name ||
                                        "System Unit"}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            System Unit Details
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <Info
                                label="Equipment Name"
                                value={system_unit.equipment_name}
                            />
                            <Info
                                label="Room"
                                value={system_unit.room?.room_name || "Unknown"}
                            />
                            <Info label="Brand" value={system_unit.brand} />
                            <Info
                                label="Processor"
                                value={system_unit.processor}
                            />
                            <Info label="RAM" value={system_unit.ram} />
                            <Info label="Storage" value={system_unit.storage} />
                            <Info
                                label="Operating System"
                                value={system_unit.os}
                            />
                            <Info label="Status" value={system_unit.status} />
                        </div>

                        {/* QR Section */}
                        {system_unit.equipment_path && (
                            <div className="mt-8 max-w-xs mx-auto">
                                <div
                                    className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer text-center"
                                    onClick={openModal}
                                    title="Click to enlarge QR code"
                                >
                                    <h2 className="text-base font-semibold mb-4 text-gray-800">
                                        View QR Code
                                    </h2>
                                    <div className="flex justify-center">
                                        <QRCode value={qrUrl} size={150} />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Click the QR code to enlarge and copy
                                        the link
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-lg font-bold mb-4 text-center">
                                {system_unit.equipment_name}
                            </h2>

                            <div
                                className="flex justify-center mb-2 cursor-pointer"
                                onClick={handleCopy}
                                title="Click to copy full URL"
                            >
                                <div ref={qrRef}>
                                    <QRCode value={qrUrl} size={300} />
                                </div>
                            </div>

                            <p className="mt-2 text-sm text-gray-600 break-all text-center">
                                Click QR Code to copy the link.
                            </p>

                            {copied && (
                                <p className="text-green-600 text-sm text-center mt-1">
                                    Link copied to clipboard!
                                </p>
                            )}

                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleDownloadQr}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
                                >
                                    Save QR Code as Image
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}

const Info = ({ label, value }) => (
    <div>
        <span className="font-semibold text-gray-700">{label}:</span>
        <p className="text-gray-900 break-all">{value || "—"}</p>
    </div>
);

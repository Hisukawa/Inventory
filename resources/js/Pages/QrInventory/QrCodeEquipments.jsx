import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import useAppUrl from "@/hooks/useAppUrl";

import { Link, usePage } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Index from "@/Pages/QrInventory/Index";

const QrCodeEquipments = () => {
    const CONFIG_URL = useAppUrl();

    const [equipments, setEquipment] = useState([]);
    // setEquipment(response.data);
    // console.log(equipments); // See what is being fetched

    const fetchEquipment = async () => {
        try {
            const response = await axios.get(`${CONFIG_URL}/api/getequipment`);
            setEquipment(response.data);
            console.log(response.data); // ✅ Safe to log here
        } catch (error) {
            console.error("Error fetching equipment:", error);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    const header = "Equipments";

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {header && (
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            {header}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                )}

                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Equipments</h1>
                        <table className="border-collapse border border-black bg-[#ffff99] w-full text-center mb-4">
                            <thead>
                                <tr>
                                    {/* <th className="py-2 text-xl text-black  font-bold border-b border-black">
                            Name
                        </th> */}
                                    {/* <th className="py-2 text-xl text-black  font-bold border-b border-black">
                            QR Code
                        </th> */}
                                    {/* <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {equipments.map((equipment) => (
                                    <tr
                                        key={equipment.unique_id}
                                        className="border-b border-black last:border-b-0"
                                    >
                                        <td className="text-xl font-bold py-2 flex justify-center">
                                            {equipment.equipment_name}
                                        </td>
                                        <td className="py-2 pb-5 flex justify-center">
                                            <QRCodeCanvas
                                                value={`${CONFIG_URL}/qrinventory/${equipment.unique_id}`}
                                                size={300}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </td>
                                        {/* <td className="px-4 py-2 border">
                                {equipment.description}
                            </td>
                            <td className="px-4 py-2 border">
                                {equipment.category}
                            </td>
                            <td className="px-4 py-2 border">
                                {equipment.quantity}
                            </td>
                            <td className="px-4 py-2 border">{equipment.status}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default QrCodeEquipments;

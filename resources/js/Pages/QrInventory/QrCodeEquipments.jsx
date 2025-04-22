import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import useAppUrl from "@/hooks/useAppUrl";

import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

const QrCodeEquipments = () => {
    const CONFIG_URL = useAppUrl();

    const [equipments, setEquipment] = useState([]);

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
                    <h1 className="text-2xl font-bold text-center mb-4">
                        Room 204
                    </h1>
                    <div className="p-6 flex justify-center ">
                        <table className="border border-black bg-[#e0e0e0] p-10">
                            <thead>
                                <tr>
                                    {/* <th className="py-2 text-xl text-black font-bold border-b border-black">
                                        Equipment Name
                                    </th>
                                    <th className="py-2 text-xl text-black font-bold border-b border-black">
                                        QR Code
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {equipments.slice(0, 1).map((equipment) => (
                                    <tr
                                        key={equipment.unique_id}
                                        className="border-b border-black last:border-b-0"
                                    >
                                        {/* Display QR Code */}
                                        <td className="p-10">
                                            <QRCodeCanvas
                                                value={`${CONFIG_URL}/qrinventory/${equipment.unique_id}`}
                                                size={400}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </td>
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

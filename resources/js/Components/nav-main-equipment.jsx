//SIDEBAR PLATFORM DROPDOWN

"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { LayoutGrid } from "lucide-react";
import QrCodeEquipments from "@/Pages/QrInventory/QrCodeEquipments";

export function NavMainEquipment() {
    const [isRoomsOpen, setIsRoomsOpen] = useState(false);

    useEffect(() => {
        // Open the Rooms section when the path matches any room-related route
        const path = window.location.pathname;
        if (path.startsWith("/admin/equipments")) {
            setIsRoomsOpen(true);
        }
    }, []);
    return (
        <SidebarGroup>
            <SidebarMenu>
                <Collapsible open={isRoomsOpen} onOpenChange={setIsRoomsOpen}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {/* <Package /> */}
                                <LayoutGrid />
                                <span>Equipments</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                    {/* <SidebarMenuSubButton>
                                        <a href="#">
                                            <span>Units</span>
                                        </a>
                                    </SidebarMenuSubButton> */}
                                    <SidebarMenuSubButton>
                                        {/* <a href="/equipments"> */}
                                        <a href="/admin/equipments/create">
                                            {/* <span>Equipments</span> */}
                                            <span>Add Equipments</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton>
                                        <a href="/admin/equipments/list">
                                            <span>All Equipments</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                    {/* <SidebarMenuSubButton> */}
                                    {/* <a href="/equipments"> */}
                                    {/* <a href="/room"> */}
                                    {/* <span>Equipments</span> */}
                                    {/* <span>Room 204</span> */}
                                    {/* </a> */}
                                    {/* </SidebarMenuSubButton> */}
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}

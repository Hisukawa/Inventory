//SIDEBAR PLATFORM DROPDOWN

"use client";

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
<<<<<<< HEAD
import { useState } from "react";
import QrCodeEquipments from "@/Pages/QrInventory/QrCodeEquipments";

export function NavMain({ items }) {
    const [isQrCodeVisible, setQrCodeVisible] = useState(false); // Local state to control visibility

=======

export function NavMain({ items }) {
>>>>>>> 20ca48dbac2f017b7794cf9312758a84150a3c42
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Inventories</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {/* <Package /> */}
                                <LayoutGrid />
                                <span>Room</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton>
                                        <a href="#">
                                            <span>Units</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                    <SidebarMenuSubButton>
<<<<<<< HEAD
                                        <a href="/equipments">
                                            <span>Equipments</span>
=======
                                        <a href="#">
                                            <span>Other Equipments</span>
>>>>>>> 20ca48dbac2f017b7794cf9312758a84150a3c42
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}

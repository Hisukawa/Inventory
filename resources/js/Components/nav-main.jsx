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
import { useState } from "react";
import QrCodeEquipments from "@/Pages/QrInventory/QrCodeEquipments";

export function NavMain() {
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
                                        <a href="/equipments">
                                            <span>Equipments</span>
                                        </a>
                                        <a href="#">
                                            <span>Other Equipments</span>
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

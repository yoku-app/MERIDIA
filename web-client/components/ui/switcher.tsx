"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useState } from "react";

interface ItemBrief {
    id: string;
    name: string;
    avatarURL: string;
}

export interface ItemSwitcher<T extends ItemBrief> {
    defaultSelection: T;
    items: T[];
    title: string;
    renderItemDisplay: (item: T) => JSX.Element;
}

export const ItemSwitcher = <T extends ItemBrief>({
    defaultSelection,
    items,
    title,
    renderItemDisplay,
}: ItemSwitcher<T>) => {
    const { isMobile } = useSidebar();
    const [activeItem, setActiveItem] = useState(
        items.find((item) => item.id === defaultSelection.id) ?? items[0]
    );

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {renderItemDisplay(activeItem)}
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            {title}s
                        </DropdownMenuLabel>
                        {items.map((item, index) => (
                            <DropdownMenuItem
                                key={item.name}
                                onClick={() => setActiveItem(item)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <Image
                                        src={item.avatarURL}
                                        alt={item.name}
                                        width={24}
                                        height={24}
                                        className="rounded-sm"
                                    />
                                </div>
                                {item.name}
                                <DropdownMenuShortcut>
                                    ⌘{index + 1}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                                Add {title}
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

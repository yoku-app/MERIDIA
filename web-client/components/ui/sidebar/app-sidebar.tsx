"use client";

import {
    AudioWaveform,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { useUserStore } from "@/components/provider/user.provider";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/utils";
import { NavProjects } from "./mav-projects";
import { NavMain } from "./nav-main";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarUser } from "./sidebar-user";

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Your Organisations",
            url: "#yes",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Organisations",
                    url: "organisation/",
                },
                {
                    title: "People",
                    url: "organisation/people",
                },
                {
                    title: "Roles",
                    url: "organisation/roles",
                },

                {
                    title: "Logs",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Your Created Surveys",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                {
                    title: "Insights",
                    url: "#",
                },
                {
                    title: "Logs",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUserStore((state) => state);
    const { open, setOpen } = useSidebar();

    if (!user) return null;

    return (
        <Sidebar
            className={cn(!open && "cursor-e-resize group/sidebar")}
            onClick={() => {
                if (!open) setOpen(true);
            }}
            collapsible="icon"
            {...props}
        >
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            {/* <TeamSwitcher teams={data.teams} /> */}
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarUser user={user} />
            </SidebarFooter>
            <SidebarRail
                disabled={!open}
                className={cn(
                    !open && "group-hover/sidebar:after:bg-sidebar-border"
                )}
            />
        </Sidebar>
    );
}

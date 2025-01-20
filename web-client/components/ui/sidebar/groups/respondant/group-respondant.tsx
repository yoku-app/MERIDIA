import { MessageSquareReply } from "lucide-react";
import { SidebarGroupItem, SidebarItem } from "../sidebar-group";

export const SidebarRespondantGroup = () => {
    const surveyRespondantSidebarGroup: SidebarGroupItem = {
        label: "Your Surveys",
        collapsible: true,
        icon: MessageSquareReply,
        initialActive: true,
        children: [
            {
                label: "Assigned to you",
                link: "/surveys",
            },
            {
                label: "Explore more",
                link: "/surveys/new",
            },
            {
                label: "Tag Subscriptions",
                link: "/surveys/tags",
            },
            {
                label: "Survey Profile",
                link: "/surveys/profile",
            },
            {
                label: "Leaderboards",
                link: "/surveys/leaderboards",
            },
        ],
    };

    return <SidebarItem {...surveyRespondantSidebarGroup} />;
};

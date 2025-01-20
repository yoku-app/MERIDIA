import { useIsMobile } from "@/hooks/use-mobile";
import { UserProfile } from "@/lib/interfaces/user/user.interface";
import { getInitials } from "@/lib/utils/utils";
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../sidebar";

interface Props {
    user: UserProfile;
}

export const SidebarUser: FC<Props> = ({ user }) => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserDetails user={user} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <UserDropdown user={user} />
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

const UserDetails: FC<Props> = ({ user }) => {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                <AvatarFallback className="rounded-lg">
                    {getInitials(user.displayName)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    {user.displayName}
                </span>
                <span className="truncate text-xs">{user.email}</span>
            </div>
        </>
    );
};

const UserDropdown: FC<Props> = ({ user }) => {
    const isMobile = useIsMobile();

    return (
        <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
        >
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserDetails user={user} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Bell />
                    Notifications
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut />
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

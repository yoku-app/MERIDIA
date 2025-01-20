import { JapaneseYen } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import { SidebarMenu, SidebarMenuItem } from "../sidebar";

export const SidebarLogo = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem className="h-8 w-8 mt-1">
                <Button
                    variant={"link"}
                    className="p-0 h-8 w-8 [&_svg]:size-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link href={"/"}>
                        <JapaneseYen className="text-blue-200" />
                    </Link>
                </Button>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

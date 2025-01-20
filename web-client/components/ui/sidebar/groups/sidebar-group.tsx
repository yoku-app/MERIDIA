import { FCWC, IconType } from "@/lib/interfaces/shared/interface";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Collapsible, CollapsibleContent } from "../../collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "../../sidebar";

export interface SidebarGroupItem {
    label: string;
    icon: LucideIcon;
    action?: () => void;
    children?: SidebarGroupSubItem[];
    collapsible: boolean;
    initialActive?: boolean;
    link?: string;
    renderCustomItem?: (
        props: Omit<SidebarGroupItem, "renderCustomItem">
    ) => JSX.Element;
}

export interface SidebarGroupSubItem {
    label: string;
    link: string;
}

export interface SidebarGroupAction {
    icon: IconType;
    tooltip?: String;
    action: () => void;
}

export interface SidebarGroupContent {
    label: string;
    action?: SidebarGroupAction;
    items: SidebarGroupItem[];
}

export const SidebarGroupContent: FC<SidebarGroupContent> = ({
    label,
    action,
    items,
}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarItem key={item.label} {...item} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

interface CollapsibleProps extends Pick<SidebarGroupItem, "collapsible"> {
    isActive: boolean;
}

const CollapsibleGroup: FCWC<CollapsibleProps> = ({
    children,
    collapsible,
    isActive,
}) => {
    if (collapsible) {
        return (
            <Collapsible
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
            >
                {children}
            </Collapsible>
        );
    }
    return <>{children}</>;
};

interface CollapsibleHeaderProps
    extends Pick<SidebarGroupItem, "collapsible" | "label"> {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const CollapsibleHeader: FCWC<CollapsibleHeaderProps> = ({
    collapsible,
    children,
    label,
    active,
    setActive,
}) => {
    if (collapsible) {
        return <>{children}</>;
    }

    return (
        <CollapsibleTrigger asChild>
            <SidebarMenuButton
                tooltip={label}
                onClick={() => setActive(!active)}
            >
                {children}
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
        </CollapsibleTrigger>
    );
};

const CollapsibleBody: FCWC<Pick<SidebarGroupItem, "collapsible">> = ({
    collapsible,
    children,
}) => {
    if (collapsible) {
        return <>{children}</>;
    }

    return <CollapsibleContent>{children}</CollapsibleContent>;
};

export const SidebarItem: FC<SidebarGroupItem> = ({
    label,
    icon,
    action,
    children,
    renderCustomItem,
    collapsible = true,
    initialActive = true,
}) => {
    const [isActive, setIsActive] = useState<boolean>(initialActive);

    if (renderCustomItem) {
        return renderCustomItem({
            label,
            icon,
            action,
            children,
            collapsible,
            initialActive,
        });
    }

    return (
        <CollapsibleGroup isActive={isActive} collapsible={collapsible}>
            <SidebarMenuItem>
                <CollapsibleHeader
                    active={isActive}
                    setActive={setIsActive}
                    collapsible={collapsible}
                    label={label}
                >
                    <SidebarItemTitle label={label} icon={icon} />
                </CollapsibleHeader>
                <CollapsibleBody collapsible={collapsible}>
                    <SidebarMenuSub>
                        {children?.map((item) => (
                            <SidebarMenuSubItem key={item.label}>
                                <SidebarMenuSubButton asChild>
                                    <Link href={item.link}>
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleBody>
            </SidebarMenuItem>
        </CollapsibleGroup>
    );
};

const SidebarItemTitle: FC<Pick<SidebarGroupItem, "label" | "icon">> = (
    props
) => {
    return (
        <>
            <props.icon />
            <span>{props.label}</span>
        </>
    );
};

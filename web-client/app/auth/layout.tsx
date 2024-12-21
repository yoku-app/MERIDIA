import { ChildNodeProps } from "@/lib/interfaces/shared/interface";
import { FC } from "react";

const layout: FC<ChildNodeProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default layout;

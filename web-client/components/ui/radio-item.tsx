import { ClassNameProps, FCWC } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import { FormItem, FormLabel } from "./form";
import { RadioGroupItem } from "./radio-group";

interface RadioProps extends ClassNameProps {
    value: string;
}

export const FormRadioItem: FCWC<RadioProps> = ({
    value,
    className,
    children,
}) => {
    return (
        <FormItem className="flex">
            <RadioGroupItem
                value={value}
                className="peer hidden"
                id={`control-${value}`}
            />
            <FormLabel
                styleError={false}
                className={cn(
                    "py-6 peer font-semibold flex items-center rounded-sm border-2 cursor-pointer peer-data-[state=checked]:bg-border/30 peer-data-[state=checked]:border-primary/40 peer-data-[state=checked]:font-bold  transition-all hover:border-primary/40  w-full px-3 ",
                    className
                )}
                htmlFor={`control-${value}`}
            >
                {children}
            </FormLabel>
        </FormItem>
    );
};

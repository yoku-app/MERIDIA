import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormRadioItem } from "@/components/ui/radio-item";
import { ClassNameProps } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import { Banknote, Route, Users } from "lucide-react";
import { FC } from "react";
import { Control } from "react-hook-form";
import { UserOnboard } from "./OnboardForm";

interface FocusProps extends ClassNameProps {
    control: Control<UserOnboard>;
}

export const UserFocusForm: FC<FocusProps> = ({ control, className }) => {
    return (
        <FormField
            control={control}
            name="focus"
            render={({ field }) => {
                return (
                    <FormItem className={cn("", className)}>
                        <FormLabel className="text-2xl font-bold">
                            What's the main thing you want to do?
                        </FormLabel>
                        <FormDescription className="max-w-md text-sm">
                            We'll use this information to better personalise and
                            tailor your experience to meet your wants from this
                            application
                        </FormDescription>
                        <FormMessage className="font-semibold" />
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col pt-4"
                            >
                                <FormRadioItem value="creator">
                                    <Users className="w-6 h-6 mr-4" />
                                    <span>
                                        Create surveys and gather responses from
                                        target audience
                                    </span>
                                </FormRadioItem>
                                <FormRadioItem value="respondent">
                                    <Banknote className="w-6 h-6 mr-4" />
                                    Give out my opinions and be rewarded for my
                                    input
                                </FormRadioItem>
                                <FormRadioItem value="hybrid">
                                    <Route className="w=6 h-6 mr-4" />
                                    <span>
                                        A bit of everything this application has
                                        to offer
                                    </span>
                                </FormRadioItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};

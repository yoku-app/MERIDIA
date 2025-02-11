import { useUserStore } from "@/components/provider/user.provider";
import { AvatarUploader } from "@/components/ui/avatar-uploader";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { handleAvatarImageTransformation } from "@/lib/utils/image/image.util";
import { responseSuccess } from "@/lib/utils/utils";
import { ExternalLink } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { OrganisationFormValues } from "./OrganisationForm";

interface OrganisationDetailsProps {
    form: UseFormReturn<OrganisationFormValues>;
    setUploadedAvatar: Dispatch<SetStateAction<Blob | null>>;
}

export const OrganisationDetails: FC<OrganisationDetailsProps> = ({
    form,
    setUploadedAvatar,
}) => {
    const { session } = useUserStore((state) => state);

    const handleOrganisationAvatarUpload = async (
        image: File
    ): Promise<void> => {
        // Resize Uploaded Image and convert to WebP
        const response: ControllerResponse<Blob> =
            await handleAvatarImageTransformation(image, session);

        if (!responseSuccess(response) || !response.data) {
            // todo: Handle Error
            toast.error(
                "There was an issue with uploading your avatar, please try again"
            );
            return;
        }

        // Store transformed image ready for upload upon form submission
        setUploadedAvatar(response.data);

        // Set Avatar URL for Preview and form form persistence
        const avatarURL = URL.createObjectURL(response.data);
        form.setValue("avatarUrl", avatarURL);
    };

    const handleAvatarRemoval = (): void => {
        setUploadedAvatar(null);
        form.setValue("avatarUrl", undefined);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Organization name"
                                    className="bg-zinc-900 border-zinc-800"
                                />
                            </FormControl>
                            <p className="text-sm text-zinc-400">
                                What's the name of your company or team?
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Display Picture
                            </FormLabel>
                            <AvatarUploader
                                onUpload={handleOrganisationAvatarUpload}
                                imageURL={field.value}
                                onRemove={handleAvatarRemoval}
                            />

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Type of organization
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="personal">
                                        Personal
                                    </SelectItem>
                                    <SelectItem value="company">
                                        Company
                                    </SelectItem>
                                    <SelectItem value="educational">
                                        Educational
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="organization@example.com"
                                    className="bg-zinc-900 border-zinc-800"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Tell us about your organization"
                                    className="bg-zinc-900 border-zinc-800"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel className="font-semibold">
                                    Plan
                                </FormLabel>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-zinc-400 hover:text-white"
                                >
                                    Pricing
                                    <ExternalLink className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                        <SelectValue placeholder="Select plan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="free">
                                        Free - $0/month
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        Pro - $20/month
                                    </SelectItem>
                                    <SelectItem value="enterprise">
                                        Enterprise
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Tooltip>
        </TooltipProvider>
    );
};

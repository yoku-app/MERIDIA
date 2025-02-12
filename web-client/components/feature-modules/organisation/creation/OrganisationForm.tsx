"use client";

import { useUserStore } from "@/components/provider/user.provider";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { createNewOrganisation } from "@/controller/organisation.controller";
import { handlePublicFileUpload } from "@/lib/utils/storage/storage.util";
import { createClient } from "@/lib/utils/supabase/client";
import { responseSuccess } from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { OrganisationDTO } from "@yoku-app/shared-schemas/dist/types/organisation/dto/organisation-dto";
import { randomUUID } from "crypto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { isMobilePhone } from "validator";
import { z } from "zod";
import { OrganisationDetails } from "./OrganisationDetails";

const organisationCreationSchema = z.object({
    name: z
        .string({
            required_error: "Organisation name is required",
        })
        .min(2, "Organization name must be at least 2 characters"),
    // industry: z.string({}),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters"),
    avatarUrl: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .min(10, "Invalid Phone Number")
        .refine(isMobilePhone)
        .optional()
        .or(z.literal("")),
    type: z.enum(["PERSONAL", "COMPANY", "EDUCATIONAL"], {
        required_error: "Please select an organization type",
    }),
    plan: z.enum(["FREE", "PRO", "ENTERPRISE"], {
        required_error: "Please select a plan",
    }),
});

export type OrganisationFormValues = z.infer<typeof organisationCreationSchema>;

export const OrganisationCreationForm = () => {
    const { user, session } = useUserStore((state) => state);
    const [uploadedAvatar, setUploadedAvatar] = useState<Blob | null>(null);
    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<
        string | undefined
    >();
    const [pendingSubmission, setPendingSubmission] = useState<boolean>(false);
    const router = useRouter();

    const organisationCreationForm = useForm<OrganisationFormValues>({
        resolver: zodResolver(organisationCreationSchema),
        defaultValues: {
            name: "",
            // industry: "",
            description: "",
            avatarUrl: "",
            email: "",
            type: undefined,
            plan: undefined,
        },
    });

    const handleSubmission = async (values: OrganisationFormValues) => {
        setPendingSubmission(true);
        if (!user || !session) {
            setPendingSubmission(false);
            return;
        }

        if (uploadedAvatar) {
            const loadingToast = toast.loading("Uploading Avatar...");
            const client: SupabaseClient = createClient();
            const response = await handlePublicFileUpload(
                client,
                uploadedAvatar!,
                "organisation-profile",
                randomUUID(),
                true
            );

            toast.dismiss(loadingToast);

            if (!response.ok || !response.data) {
                toast.error("Failed to upload Avatar");
                return;
            }

            setUploadedAvatarUrl(response.data);
        }

        const newOrganisation: Partial<OrganisationDTO> = {
            creatorId: user.id,
            name: values.name,
            // industry: values.industry,
            description: values.description,
            email: values.email,
            avatarURL: uploadedAvatarUrl,
            orgType: values.type,
        };

        // Create Database Entry
        const createOrgToast = toast.loading("Creating your organisation...");
        const response = await createNewOrganisation(newOrganisation, session);
        toast.dismiss(createOrgToast);

        if (!responseSuccess(response) || !response.data) {
            toast.error("Failed to create your organisation, please try again");
            return;
        }

        toast.success("Organisation created successfully");
        router.push(`/organisation`);
        setPendingSubmission(false);
    };

    return (
        <section className="flex justify-center pt-16">
            <Card className="max-w-3xl bg-sidebar  text-primary border">
                <CardHeader>
                    <CardTitle className="font-bold text-lg pb-2">
                        Create a new organization
                    </CardTitle>
                    <Separator />
                    <CardDescription className="pt-4">
                        <p className="text-primary">
                            An organisation is your centralised workspace for
                            all your distributed surveys and collected
                            information
                        </p>
                        <p className="mt-1">
                            For example, you can use the name of your startup,
                            department, side project or even just your own name.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...organisationCreationForm}>
                        <form
                            onSubmit={organisationCreationForm.handleSubmit(
                                handleSubmission
                            )}
                            className="space-y-6"
                        >
                            <OrganisationDetails
                                setUploadedAvatar={setUploadedAvatar}
                                form={organisationCreationForm}
                            />
                            <div className="flex items-center justify-between pt-4">
                                <Link href={"/"}>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-muted-foreground font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm text-muted-foreground">
                                        You can rename your organization later
                                    </p>
                                    <Button
                                        type="submit"
                                        variant={"default"}
                                        disabled={pendingSubmission}
                                    >
                                        {pendingSubmission
                                            ? "Creating..."
                                            : "Create organization"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
};

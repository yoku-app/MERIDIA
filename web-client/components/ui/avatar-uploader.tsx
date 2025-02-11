import { imageUploadHelper } from "@/lib/utils/image/image.util";
import { Upload } from "lucide-react";
import Image from "next/image";
import { FC, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface AvatarUploaderProps {
    onUpload: (file: File) => Promise<void>;
    onRemove?: () => void;
    imageURL?: string;
    title?: string;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
    onUpload,
    imageURL,
    onRemove,
    title = "Profile Picture",
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChangeEvent = imageUploadHelper({
        handleUpload: onUpload,
    });

    /**
     * Allows File input to be accessed from a Button component
     */
    const uploadFile = () => {
        if (!inputRef.current) return;

        inputRef.current.click();
    };

    const handleRemoveImage = () => {
        onRemove && onRemove();
    };

    return (
        <section className="flex items-center mt-2">
            <div className="mt-2 relative group/picture">
                <div className="w-20 h-20 relative rounded-xl overflow-hidden">
                    {imageURL ? (
                        <Image
                            alt="User Profile Picture"
                            className=""
                            src={imageURL}
                            fill
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <div className="border-2 rounded-xl h-full w-full"></div>
                    )}
                </div>

                <Input
                    ref={inputRef}
                    onChange={handleImageChangeEvent}
                    id="picture"
                    className="w-full mt-6 absolute hidden"
                    accept="image/*"
                    type="file"
                />
                <label
                    htmlFor="picture"
                    className="absolute top-0 w-full  h-full  bg-neutral-900/50 dark:bg-neutral-950/70 opacity-0 group-hover/picture:opacity-100 cursor-pointer transition-opacity flex items-center text-center left-0"
                >
                    Upload Picture
                </label>
            </div>

            <div className="ml-4 flex flex-col">
                <Label className="hidden md:block font-semibold">{title}</Label>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2">
                    <Button
                        type="button"
                        onClick={uploadFile}
                        variant={"outline"}
                    >
                        <Upload className="w-4 h-4" />
                        <span>Upload Picture</span>
                    </Button>
                    <Button
                        type="button"
                        onClick={handleRemoveImage}
                        variant={"destructive"}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </section>
    );
};

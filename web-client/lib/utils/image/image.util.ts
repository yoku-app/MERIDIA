import { transformImage } from "@/controller/image.controller";
import {
    ImageCrop,
    ImageTransformationOptions,
} from "@/lib/interfaces/image/image.interface";
import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { ChangeEvent } from "react";

interface UploadHelperCallbacks {
    handleUpload: (file: File) => Promise<void>;
}

export const imageUploadHelper = ({ handleUpload }: UploadHelperCallbacks) => {
    return async (event: ChangeEvent<HTMLInputElement>) => {
        // No Files have been provided
        if (!event.target.files || event.target.files.length === 0) {
            //todo: Handle Errors
            return;
        }

        // Retrieve Uploaded File and handle uploading process
        const file = event.target.files[0];
        await handleUpload(file);
    };
};

/**
 * Functionality to resize an uploaded avatar image and convert to webp format
 * to reduce the size of the image before uploading to storage bucket
 *
 * @param {File} image - Uploaded Image File
 * @param {ImageCrop} [crop] - Cropped portion of the image to be used as the avatar
 */
export const handleAvatarImageTransformation = async (
    image: File,
    crop?: ImageCrop
): Promise<ControllerResponse<Blob>> => {
    // Define the transformation options
    const options: ImageTransformationOptions = {
        resize: {
            width: 256,
            height: 256,
        },
        crop,
        format: "webp",
    };

    // Return the transformed image
    return await transformImage(image, options);
};

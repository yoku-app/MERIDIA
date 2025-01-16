import { SupabaseClientResponse } from "@/lib/interfaces/shared/interface";
import { StorageError } from "@supabase/storage-js/dist/module/lib/errors";
import { SupabaseClient } from "@supabase/supabase-js";

const storageBuckets = ["profile-picture"] as const;
type Bucket = (typeof storageBuckets)[number];

export type StorageResponse = SupabaseClientResponse<StorageError, string>;

/**
 * Helper function to handle file upload to a given storage bucket
 * and store in a specific file path,
 *
 * Upon a successful upload, the function will return the URL of the uploaded file
 *
 * @param client
 * @param upload
 * @param bucket
 * @param filePath
 * @param upsert
 */
export const handlePublicFileUpload = async (
    client: SupabaseClient,
    upload: File | Blob,
    bucket: Bucket,
    filePath: string,
    upsert: boolean = false
): Promise<StorageResponse> => {
    const { data, error } = await client.storage
        .from(bucket)
        .upload(filePath, upload, {
            upsert,
        });

    // Handle Failed Upload
    if (error || !data) {
        return { ok: false, error: error };
    }

    const { data: urlData } = client.storage
        .from(bucket)
        .getPublicUrl(filePath);

    // Retrieve the Public URL of the upload file
    if (!urlData?.publicUrl) {
        return {
            ok: false,
            error: new StorageError("Failed to retrieve public URL"),
        };
    }

    return { ok: true, data: urlData.publicUrl };
};

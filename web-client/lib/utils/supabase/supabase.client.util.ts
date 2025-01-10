"use client";

import { ControllerResponse, SupabaseClientResponse } from "@/lib/interfaces/shared/interface";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "./client";
import {StorageError} from '@supabase/storage-js';
import { UserProfile } from "@/lib/interfaces/user/user.interface";

/**
 * Supabase Client helper function that will take in a user's new 
 * avatar image as a file, and upload it to the Supabase storage bucket,
 * returning the URL of the uploaded image.
 * 
 * @param {UserProfile} user - The actioning user
 * @param {File} file - The file object of the image to upload
 * 
 */
const uploadAvatarFile = async (user: UserProfile, file: File): Promise<SupabaseClientResponse<StorageError, string>> => {
    // Send File to Sharp Service to resize and conversion to webp
    
    //Upload the file to the Supabase Storage bucket upserting the old avatar
    const client: SupabaseClient = createClient();

    

    

}
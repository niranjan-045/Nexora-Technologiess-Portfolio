// ==========================================================================
// CLOUDINARY CONFIG — used for ALL image/video uploads in the admin panel.
// Free tier, no billing card required (unlike Firebase Storage on Blaze).
// Same cloud name / preset as the original static admin panel, so uploads
// keep landing in the same Cloudinary account.
// ==========================================================================
export const CLOUDINARY_CLOUD_NAME = "ywcbl0b3";
export const CLOUDINARY_UPLOAD_PRESET = "e9rtdy9v";

/**
 * Uploads a File (image or video) to Cloudinary and returns its public HTTPS URL.
 */
export async function uploadToCloudinary(file: File, folder = "nexora"): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error(
      "Cloudinary is not configured yet — open lib/cloudinary.ts and add your Cloud name + upload preset."
    );
  }
  const resourceType = file.type && file.type.startsWith("video") ? "video" : "image";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `nexora/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }
  return data.secure_url as string;
}

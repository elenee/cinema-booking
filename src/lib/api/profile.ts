
import { api } from "./client";
import type { ApiResponse, User } from "./types";

export interface UpdateProfileData {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  preferredVenueId?: number | "";
  avatar?: File | null;
}

export async function updateProfile(data: UpdateProfileData) {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  // The API accepts spaces, but stores the mobile number without them.
  formData.append("mobileNumber", data.mobileNumber.replace(/\s/g, ""));
  formData.append("dateOfBirth", data.dateOfBirth);

  // Send an empty value when no preferred venue is selected.
  formData.append(
    "preferredVenueId",
    data.preferredVenueId == null ? "" : String(data.preferredVenueId),
  );

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const response = await api.put<ApiResponse<User>>("/profile", formData);

  return response.data.data;
}

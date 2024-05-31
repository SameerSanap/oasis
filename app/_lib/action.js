"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const nationality = "IND";

  if (!nationalID) {
    throw new Error("NationalID is required");
  }

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error(
      "Provide a valid nationalID (6-12 alphanumeric characters)"
    );
  }

  const updateData = { nationalID, nationality };

  console.log("Updating guest with data:", updateData);
  console.log("Session user ID:", session.user.id);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating guest:", error);
    throw new Error("Guest could not be updated");
  }

  return data;
  revalidatePath("/account/profile");
}

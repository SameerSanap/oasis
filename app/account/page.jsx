import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};
export default async function Account() {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      WellCome {session.user.name}
    </h2>
  );
}

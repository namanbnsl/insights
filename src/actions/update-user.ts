"use server";

import { onboardFormSchema } from "@/components/onboarding";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function updateUser(
  values: z.infer<typeof onboardFormSchema>,
  email: string,
  redirectLink?: string
) {
  await db.user.update({
    where: {
      email,
    },
    data: {
      username: values.username,
      role: values.is_teacher ? "TEACHER" : "STUDENT",
    },
  });

  if (redirectLink) {
    return redirect(redirectLink);
  } else {
    return "";
  }
}

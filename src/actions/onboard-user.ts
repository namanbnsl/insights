"use server";

import { onboardFormSchema } from "@/components/onboarding";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function onboardUser(
  values: z.infer<typeof onboardFormSchema>,
  email: string
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

  return redirect("/dashboard");
}

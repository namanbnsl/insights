'use server';

import { resourceUploadFormSchema } from '@/components/dashboard/resources/resources';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function updateUser(
  values: z.infer<typeof resourceUploadFormSchema>,
  classId: string,
  redirectLink?: string
) {
  await db.resources.create({
    data: {
      name: values.name,
      resourceUrl: values.resourceUrl,
      subject: values.subject,
      classId: classId
    }
  });

  if (redirectLink) {
    return redirect(redirectLink);
  } else {
    return '';
  }
}

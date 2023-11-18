'use server';

import { resourceUploadFormSchema } from '@/components/modals/create-resource-modal';
import { getEmbeddings } from '@/lib/cohere';
import { db } from '@/lib/db';
import { insightsIndex } from '@/lib/pinecone';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function addResource(
  values: z.infer<typeof resourceUploadFormSchema>,
  classId: string,
  redirectLink?: string
) {
  const resource = await db.resources.create({
    data: {
      name: values.name,
      resourceUrl: values.resourceUrl,
      subject: values.subject,
      classId: classId
    }
  });

  const resourceText = await fetch(values.resourceUrl);
  const text = await resourceText.text();

  const embedding = await getEmbeddings(text);

  await insightsIndex.upsert([
    {
      id: resource.id,
      values: embedding,
      metadata: {
        classId: classId
      }
    }
  ]);

  if (redirectLink) {
    return redirect(redirectLink);
  } else {
    return '';
  }
}

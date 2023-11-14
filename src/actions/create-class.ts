'use server';

import { createClassFormSchema } from '@/components/create-class-onboard';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function createClass(
  values: z.infer<typeof createClassFormSchema>,
  ownerId: string
) {
  const classOwned = await db.class.create({
    data: {
      name: values.name,
      ownerId
    }
  });

  return classOwned;
}

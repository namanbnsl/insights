'use server';

import { createClassFormSchema } from '@/components/create-class-onboard';
import { db } from '@/lib/db';
import { z } from 'zod';

import { cookies } from 'next/headers';

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

  cookies().set('current-class', classOwned.id);

  return classOwned;
}

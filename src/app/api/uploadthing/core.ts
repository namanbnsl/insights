import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error('Unauthorized');

  return { user: session?.user };
};

export const insightsFileRouter = {
  resourceFile: f({
    text: {}
  })
    .middleware(() => auth())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type InsightsFileRouter = typeof insightsFileRouter;

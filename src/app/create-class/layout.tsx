import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CreateClassLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return redirect('/auth/signIn');
  }

  const classOwned = await db.class.findFirst({
    where: {
      ownerId: session.user.id
    }
  });

  const user = await db.user.findFirst({
    where: { email: session.user.email }
  });

  if (!user?.username && !classOwned?.id) {
    return redirect('/onboarding');
  }

  if (classOwned?.id) return redirect('/dashboard');

  return <>{children}</>;
}

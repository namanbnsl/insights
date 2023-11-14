import Sidebar from '@/components/dashboard/sidebar';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return redirect('/auth/signIn');
  }

  const user = await db.user.findFirst({
    where: { email: session.user.email }
  });

  const classesOwned = await db.class.findMany({
    where: { ownerId: session.user.id }
  });

  if (!user?.username && classesOwned.length > 0) {
    return redirect('/onboarding');
  }

  if (!user?.username && classesOwned.length <= 0) {
    return redirect('/onboarding');
  }

  if (user?.username && classesOwned.length <= 0) {
    return redirect('/create-class');
  }

  return (
    <>
      <Sidebar classes={classesOwned} />
      <div className="ml-72">{children}</div>
    </>
  );
}

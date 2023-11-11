import Sidebar from "@/components/dashboard/sidebar";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return redirect("/auth/signIn");
  }

  const user = await db.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user?.username) {
    return redirect("/onboarding");
  }

  return (
    <>
      <Sidebar />
      <div className="ml-72">{children}</div>
    </>
  );
}

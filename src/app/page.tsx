import { HomePage } from "@/components/home-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    return redirect("/dashboard");
  }

  return <HomePage />;
};

export default Home;

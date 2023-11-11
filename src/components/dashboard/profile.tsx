"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const SidebarProfile = () => {
  const session = useSession();

  return (
    <div className="flex items-center w-full justify-between space-x-4">
      <div className="flex items-center space-x-4 w-[95%]">
        <Avatar>
          <AvatarImage src={session?.data?.user.image!} />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        {session.status === "loading" ? (
          <div className="flex flex-grow justify-end mr-5">
            <Loader2 className="animate-spin text-zinc-300" />
          </div>
        ) : (
          <div>
            <p className="text-sm leading-none font-bold">
              {session.data?.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {session?.data?.user?.email?.slice(0, 7) + "..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarProfile;

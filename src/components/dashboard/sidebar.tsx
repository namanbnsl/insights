import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";
import { GoHome } from "react-icons/go";
import { AiOutlineQuestion } from "react-icons/ai";

type Props = {};

type SidebarLink = {
  name: string;
  icon: IconType;
  href: string;
};

const links: SidebarLink[] = [
  {
    href: "/dashboard",
    icon: GoHome,
    name: "Dashboard",
  },
  {
    href: "/dashboard/ask",
    icon: AiOutlineQuestion,
    name: "Ask",
  },
];

const Sidebar = (props: Props) => {
  return (
    <aside className="h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 border-r">
      <div className="p-8 h-full mt-9">
        <Link href={"/dashboard"} className="flex text-xl gap-x-2 font-bold">
          <svg
            className=" h-6 w-6"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m4 6 8-4 8 4" />
            <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
            <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
            <path d="M18 5v17" />
            <path d="M6 5v17" />
            <circle cx="12" cy="9" r="2" />
          </svg>

          <span>insights</span>
        </Link>

        <div className="mt-12 text-md w-full flex flex-col gap-y-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm group flex w-full justify-start font-medium cursor-pointer hover:text-gray-700/90 rounded-lg transition "
              )}
            >
              <div className="flex items-center flex-1">
                <link.icon className={cn("h-5 w-5 mr-3")} />
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

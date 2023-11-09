import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { SendHorizontal } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 m-6 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
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

          <span className="sr-only">insights</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 bg-white dark:bg-zinc-900 mt-[5%]">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold pb-1 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
                  Welcome to insights
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl dark:text-zinc-400">
                  Enhance your learning experience with our smart education app.
                </p>
              </div>

              <Link
                href={"/dashboard"}
                className="w-full flex justify-center pt-4"
              >
                <Button className="flex w-1/5">
                  <span className="ml-auto">Get Started</span>
                  <SendHorizontal className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © 2023 insights. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export { HomePage };

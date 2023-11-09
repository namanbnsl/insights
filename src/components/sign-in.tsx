"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="mx-auto max-w-sm space-y-6 w-screen h-screen flex  flex-col justify-center items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
        <div className="text-center mt-2">
          <p className="text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?
            <Link
              className="text-blue-500 hover:underline ml-1"
              href="/auth/signUp"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full">
        <Button
          className="w-full flex justify-center items-center"
          variant="outline"
          onClick={() => {
            signIn("google");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            className="w-4 h-4 mr-2"
            xmlSpace="preserve"
          >
            <path d="M30.418 49.137c-9.242-7.272-16.109-12.661-21.237-16.601C20.161 13.095 40.993 0 64.895 0c16.572 0 31.696 6.316 43.053 16.659C94.563 29.32 94.997 30.044 89.724 35.317c-6.577-5.447-13.733-9.329-24.829-9.329-15.732 0-28.886 9.532-34.477 23.149zM27.491 64c0-1.97.145-3.882.435-5.765A2420.091 2420.091 0 0 0 5.299 40.677 63.585 63.585 0 0 0 .895 64c0 9.271 1.97 18.079 5.505 26.017 6.577-5.592 14.399-12.284 21.787-18.6A38.995 38.995 0 0 1 27.491 64zm37.404 38.012c-15.124 0-27.871-8.837-33.811-21.613-8.924 7.62-15.529 13.269-20.484 17.47C21.9 115.976 41.978 128 64.895 128c15.326 0 27.321-3.882 36.476-10.169a2583 2583 0 0 0-21.15-18.108c-4.201 1.507-9.242 2.289-15.326 2.289zm61.45-50.673h-61.45v25.322s24.569-.029 34.593-.029c-2.665 7.996-5.997 14.255-11.183 18.513 8.894 7.533 15.326 13.009 19.962 17.065 16.659-16.138 20.773-41.546 18.078-60.871z" />
          </svg>
          Sign in with Google
        </Button>
        <Separator className="my-8" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              autoComplete="off"
              autoCorrect="off"
              className="h-11 w-full outline-none ring-none"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <Button
            className="w-full flex justify-center items-center"
            type="submit"
          >
            <svg
              className="w-4 h-4 mr-2"
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
              <rect height="16" rx="2" width="20" x="2" y="4" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Sign in with Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GoHome } from 'react-icons/go';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <Link
        href={'/dashboard'}
        className="flex text-3xl gap-x-2 font-bold mb-4"
      >
        <svg
          className="h-8 w-8 mr-2"
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

      <span className="mt-4 font-semibold text-lg text-slate-700">
        404. Page Not Found.
      </span>
      <p className="mt-1 text-sm text-zinc-500 text-center">
        The page you were looking for does not exist. <br /> If you are sure the
        page exists, <br /> then please contact us or try again in some time.
      </p>

      <div className="mt-6">
        <Link href={'/'}>
          <Button variant={'link'}>
            <GoHome className="mr-2 w-6 h-6" />
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}

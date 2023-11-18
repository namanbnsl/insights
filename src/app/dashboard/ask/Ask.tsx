'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';
import { SendHorizonal } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Ask = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/ask'
  });

  const session = useSession();

  return (
    <div className="mt-16 w-[60%]">
      <div className="py-4 flex flex-col gap-y-6 text-sm">
        {messages.map((m) => (
          <div key={m.id}>
            <div className="flex items-start gap-x-2">
              <div>
                {m.role === 'user' ? (
                  <Avatar>
                    <AvatarImage src={session?.data?.user.image as string} />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                ) : (
                  <svg
                    className="h-8 w-8"
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
                )}
              </div>
              <span>{m.content}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Your doubt..."
        />

        <Button type="submit" size={'icon'}>
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default Ask;

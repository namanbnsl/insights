'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { Eraser, SendHorizonal } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Ask = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages
  } = useChat({
    api: '/api/ask'
  });

  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  return (
    <div className="mt-16 w-[60%]">
      <div className="py-4 flex flex-col gap-y-6 text-sm">
        {messages.map((m) => (
          <ChatMessage message={m} key={m.id} />
        ))}
        {isLoading && lastMessageIsUser && (
          <ChatMessage
            message={{
              role: 'assistant',
              content: 'Thinking...'
            }}
          />
        )}
        {error && (
          <ChatMessage
            message={{
              role: 'assistant',
              content: 'Something went wrong. Please try again.'
            }}
          />
        )}
        {!error && messages.length === 0 && (
          <div className="flex h-full items-center justify-center gap-3">
            <svg
              className="mr-2 shrink-0"
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
            Ask your doubts.
          </div>
        )}
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

        <Button
          title="Clear chat"
          variant="outline"
          size="icon"
          type="button"
          onClick={() => setMessages([])}
        >
          <Eraser className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

const ChatMessage = ({
  message: { role, content }
}: {
  message: { role: string; content: string };
}) => {
  const isAiMessage = role === 'assistant';

  const session = useSession();

  return (
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end'
      )}
    >
      {isAiMessage && (
        <svg
          className="mr-2 shrink-0"
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

      <p
        className={cn(
          'whitespace-pre-line rounded-md border px-3 py-2',
          isAiMessage ? 'bg-white' : 'bg-gray-800 text-white'
        )}
      >
        {content}
      </p>
      {!isAiMessage && session?.data?.user?.image && (
        <Avatar className="ml-2 h-10 w-10 rounded-full object-cover">
          <AvatarImage src={session?.data?.user.image as string} />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Ask;

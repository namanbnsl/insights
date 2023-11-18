'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, SendHorizontal } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { createClass } from '@/actions/create-class';
import { useRouter } from 'next/navigation';

export const createClassFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Class name must be at least 2 characters.'
  })
});

const CreateClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const router = useRouter();

  const session = useSession();

  const form = useForm<z.infer<typeof createClassFormSchema>>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createClassFormSchema>) => {
    try {
      setLoading(true);

      await createClass(values, session.data?.user?.id as string);

      router.refresh();
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your request. Please try again later or contact us.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="border border-dashed w-1/3 rounded-lg p-4 flex flex-col gap-y-0">
        <div className="p-8 flex flex-col gap-y-[2px]">
          <span className="font-bold text-lg">Let&apos;s get you started.</span>
          <span className="text-sm text-slate-500">
            Let&apos;s create your first class in{' '}
            <span className="underline font-bold">insights</span>.
          </span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[70%] px-8 flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Grade 7 - Math"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your class name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="mt-5 w-[40%]">
              {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
              Done
              <SendHorizontal className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Form>
      </div>{' '}
    </div>
  );
};

export default CreateClass;

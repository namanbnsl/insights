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
import { updateUser } from '@/actions/update-user';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

export const onboardFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .refine((s) => !s.includes(' '), 'Only one word.'),
  is_teacher: z.boolean()
});

const Onboarding = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const session = useSession();

  const form = useForm<z.infer<typeof onboardFormSchema>>({
    resolver: zodResolver(onboardFormSchema),
    defaultValues: {
      username: '',
      is_teacher: false
    }
  });

  const onSubmit = async (values: z.infer<typeof onboardFormSchema>) => {
    try {
      setLoading(true);

      await updateUser(
        values,
        session.data?.user?.email as string,
        '/dashboard'
      );
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
            Let&apos;s set your username and get you started with{' '}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="joe" {...field} />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_teacher"
              render={({ field }) => (
                <FormItem className="mt-4 mb-4 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Are You A Teacher?
                    </FormLabel>
                    <FormDescription>
                      Achieve teacher settings. Keep off if you are a student.
                    </FormDescription>
                  </div>
                  <FormControl className="ml-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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

export default Onboarding;

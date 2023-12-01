'use client';

import { accountSettingsFormSchema } from '@/components/dashboard/settings/settings';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import { Loader2, SendHorizontal } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { z } from 'zod';

type Props = {
  form: UseFormReturn<
    {
      username: string;
      is_teacher: boolean;
    },
    undefined
  >;
  loading: boolean;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: z.infer<typeof accountSettingsFormSchema>
  ) => Promise<void>;
};

const AccountSettings = (props: Props) => {
  return (
    <div className="mt-16">
      <h3 className="text-xl mt-8 font-bold">Account</h3>

      <div className="mt-4 ml-5">
        <h4 className="text-lg">Change Username.</h4>

        <Form {...props.form}>
          <form
            onSubmit={props.form.handleSubmit(props.onSubmit)}
            className="space-y-8 mt-2 w-[30%]"
          >
            <FormField
              control={props.form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input autoComplete="off" placeholder="joe" {...field} />
                  </FormControl>
                  <FormDescription className="ml-1">
                    Your username will be visible to other users. It will also
                    be used in emails and discussions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={props.form.control}
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
            <Button
              variant={'outline'}
              size={'sm'}
              disabled={props.loading}
              type="submit"
              className="mt-5 w-[40%]"
            >
              {props.loading && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              Update
              <SendHorizontal className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;

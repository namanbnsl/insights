'use client';

import { classSettingsFormSchema } from '@/components/dashboard/settings/settings';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, SendHorizontal } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  form: UseFormReturn<
    {
      name: string;
    },
    undefined
  >;
  loading: boolean;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: z.infer<typeof classSettingsFormSchema>
  ) => Promise<void>;
};

const ClassSettings = (props: Props) => {
  return (
    <div className="mt-16">
      <h3 className="text-xl mt-8 font-bold">Current Class</h3>

      <div className="mt-4 ml-5">
        <h4 className="text-lg">Change Name.</h4>

        <Form {...props.form}>
          <form
            onSubmit={props.form.handleSubmit(props.onSubmit)}
            className="space-y-8 mt-2 w-[30%]"
          >
            <FormField
              control={props.form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Grade 7 - Math"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="ml-1">
                    Your class will be visible to your students. It will also be
                    used in emails and discussions.
                  </FormDescription>
                  <FormMessage />
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

export default ClassSettings;

'use client';

import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizontal } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsFiles } from 'react-icons/bs';
import { z } from 'zod';

import { MdOutlineDone } from 'react-icons/md';

export const resourceUploadFormSchema = z.object({
  resourceUrl: z.string().url().min(2, {
    message: 'Url must be at least 2 characters.'
  }),
  name: z
    .string()
    .min(2, { message: 'Subject must be at least 2 characters.' })
    .max(30),
  subject: z
    .string()
    .min(2, { message: 'Subject must be at least 2 characters.' })
    .max(30)
});

const CreateResource = () => {
  const form = useForm<z.infer<typeof resourceUploadFormSchema>>({
    resolver: zodResolver(resourceUploadFormSchema),
    defaultValues: {
      resourceUrl: '',
      subject: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = () => {};

  return (
    <div className="p-16">
      <div>
        <h2 className="font-semibold text-3xl flex items-center gap-x-3">
          Resources <BsFiles className="w-6 h-6" />
        </h2>
        <span className="text-sm text-slate-500">
          Add resources for your students from here.
        </span>
      </div>

      <div className="mt-16 w-1/3">
        <h3 className="text-xl mt-8 font-bold">Add resources:</h3>

        <div className="border border-dashed mt-6 rounded-lg p-4 flex flex-col gap-y-0">
          <div className="p-8 flex flex-col gap-y-[2px]">
            <span className="font-bold text-lg">Upload your file.</span>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-8 flex flex-col gap-y-2"
            >
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold">
                        Subject:
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          disabled={isLoading}
                          placeholder="Math"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold">Name:</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          disabled={isLoading}
                          placeholder="31/09/23 homework"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="resourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold">
                        Resource Text:
                      </FormLabel>
                      {field.value.length > 0 ? (
                        <div className="flex text-sm">
                          Resource Uploaded{' '}
                          <MdOutlineDone className="w-5 h-5 ml-2" />
                        </div>
                      ) : (
                        <>
                          <FormControl>
                            <FileUpload
                              endpoint="resourceFile"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="mt-5 w-[40%]"
              >
                {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                Done
                <SendHorizontal className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;

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
import { PlusCircleIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { MdOutlineDone } from 'react-icons/md';
import { addResource } from '@/actions/add-resource';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { useCookies } from 'next-client-cookies';

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

const CreateResourceModal = () => {
  const { isOpen, onClose, type } = useModal();
  const cookies = useCookies();

  const isModalOpen = isOpen && type === 'addResource';

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const form = useForm<z.infer<typeof resourceUploadFormSchema>>({
    resolver: zodResolver(resourceUploadFormSchema),
    defaultValues: {
      resourceUrl: '',
      subject: ''
    }
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof resourceUploadFormSchema>) => {
    try {
      const classId = await cookies.get('current-class');
      await addResource(values, classId as string);

      handleClose();
      router.refresh();
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your request. Please try again later or contact us.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add resource
          </DialogTitle>
        </DialogHeader>
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

            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading}>
                Add <PlusCircleIcon className="w-4 h-4 ml-2" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResourceModal;

'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModalStore';
import { useSession } from 'next-auth/react';
import { PlusCircleIcon } from 'lucide-react';
import { createClass } from '@/actions/create-class';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Chat name is required.'
  })
});

export const CreateClassModal = () => {
  const { isOpen, onClose, type } = useModal();
  const session = useSession();

  const isModalOpen = isOpen && type === 'createClass';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createClass(values, session.data?.user?.id as string);

      form.reset();
      onClose();

      window.location.reload();
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your request. Please try again later or contact us.',
        variant: 'destructive'
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Class
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-700 dark:text-gray-700/70">
                      Class Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter class name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-50 px-6 py-4">
              <Button disabled={isLoading}>
                Create <PlusCircleIcon className="w-4 h-4 ml-1" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

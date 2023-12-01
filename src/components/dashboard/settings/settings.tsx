'use client';

type Props = {
  username: string;
  is_teacher: boolean;
  email: string;
};

import { updateUser } from '@/actions/update-user';
import AccountSettings from '@/components/dashboard/settings/account-settings';
import ClassSettings from '@/components/dashboard/settings/class-settings';

import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoSettingsOutline } from 'react-icons/io5';
import { z } from 'zod';

export const accountSettingsFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .refine((s) => !s.includes(' '), 'Only one word.'),
  is_teacher: z.boolean()
});
type AccountFormValues = z.infer<typeof accountSettingsFormSchema>;

export const classSettingsFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  })
});
type ClassFormValues = z.infer<typeof classSettingsFormSchema>;

const Settings = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSettingsFormSchema),
    defaultValues: {
      username: props.username,
      is_teacher: props.is_teacher
    }
  });

  const classForm = useForm<ClassFormValues>({
    resolver: zodResolver(classSettingsFormSchema),
    defaultValues: {}
  });

  const accountOnSubmit = async (
    values: z.infer<typeof accountSettingsFormSchema>
  ) => {
    try {
      setLoading(true);

      await updateUser(values, props.email);

      return window.location.reload();
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

  const classOnSubmit = async () =>
    // values: z.infer<typeof classSettingsFormSchema>
    {
      try {
        setLoading(true);

        // await updateUser(values, props.email);

        return window.location.reload();
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
    <div className="p-16">
      <div>
        <h2 className="font-semibold text-3xl flex items-center gap-x-2">
          Settings <IoSettingsOutline className="w-6 h-6" />
        </h2>
        <span className="text-sm text-slate-500">
          Change your settings from here.
        </span>
      </div>

      <AccountSettings
        form={accountForm}
        loading={loading}
        onSubmit={accountOnSubmit}
      />
      <ClassSettings
        form={classForm}
        loading={loading}
        onSubmit={classOnSubmit}
      />
    </div>
  );
};

export default Settings;

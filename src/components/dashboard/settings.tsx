"use client";

type Props = {
  username: string;
  is_teacher: boolean;
  email: string;
};

import { updateUser } from "@/actions/update-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoSettingsOutline } from "react-icons/io5";
import { z } from "zod";

export const accountSettingsFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .refine((s) => !s.includes(" "), "Only one word."),
  is_teacher: z.boolean(),
});
type AccountFormValues = z.infer<typeof accountSettingsFormSchema>;

const Settings = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSettingsFormSchema),
    defaultValues: {
      username: props.username,
      is_teacher: props.is_teacher,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof accountSettingsFormSchema>
  ) => {
    try {
      setLoading(true);

      await updateUser(values, props.email);

      return window.location.reload();
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. Please try again later or contact us.",
        variant: "destructive",
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

      <div className="mt-16">
        <h3 className="text-xl mt-8 font-bold">Account</h3>

        <div className="mt-4 ml-5">
          <h4 className="text-lg">Change Username.</h4>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-2 w-[30%]"
            >
              <FormField
                control={form.control}
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
              <Button
                variant={"outline"}
                size={"sm"}
                disabled={loading}
                type="submit"
                className="mt-5 w-[40%]"
              >
                {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                Update
                <SendHorizontal className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

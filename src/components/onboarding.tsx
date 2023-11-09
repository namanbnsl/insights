import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";

const Onboarding = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="border border-dashed w-1/3 h-1/3 rounded-lg p-4 flex flex-col gap-y-0">
        <div className="p-8 flex flex-col gap-y-[2px]">
          <span className="font-bold text-lg">Let&apos;s get you started.</span>
          <span className="text-sm text-slate-500">
            Let&apos;s set your username and get you started with{" "}
            <span className="underline font-bold">insights</span>.
          </span>
        </div>

        <div className="w-[70%] px-8 flex flex-col gap-y-2">
          <Label htmlFor="username" className="text-sm">
            Username:{" "}
          </Label>
          <Input
            type="text"
            placeholder="joe"
            name="username"
            autoComplete="off"
          />
        </div>

        <div className="p-8 ">
          <Button className="w-[40%]">
            Done <SendHorizontal className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

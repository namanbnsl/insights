'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Class } from '@prisma/client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
  classes: Class[];
};

const ClassPicker = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    window.localStorage.getItem('current-class')
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs"
        >
          {value
            ? props.classes.find((insightsClass) => insightsClass.id === value)
                ?.name
            : 'Select class...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search class..." />
          <CommandEmpty>No class found.</CommandEmpty>
          <CommandGroup>
            {props.classes.map((insightsClass) => (
              <CommandItem
                key={insightsClass.name}
                value={insightsClass.id}
                onSelect={(currentValue) => {
                  window.localStorage.setItem('current-class', currentValue);

                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === insightsClass.name ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {insightsClass.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClassPicker;

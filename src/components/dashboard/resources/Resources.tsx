'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModalStore';
import { PlusCircle } from 'lucide-react';
import { BsFiles } from 'react-icons/bs';

const Resources = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-3xl flex items-center gap-x-3">
          Resources <BsFiles className="w-6 h-6" />
        </h2>
        <span className="text-sm text-slate-500">
          Add resources for your students from here.
        </span>
      </div>

      <Button onClick={() => onOpen('addResource')}>
        Add
        <PlusCircle className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default Resources;

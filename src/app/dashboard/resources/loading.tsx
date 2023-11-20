import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="p-20">
      <div className="flex justify-between items-center">
        <Skeleton className="rounded-lg h-20 w-[60%]" />
        <Skeleton className="rounded-lg h-20 w-[10%]" />
      </div>

      <div className="mt-16">
        <Skeleton className="rounded-lg h-80 w-[33%]" />
      </div>
    </div>
  );
};

export default Loading;

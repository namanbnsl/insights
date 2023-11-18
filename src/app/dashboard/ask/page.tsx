import Ask from '@/app/dashboard/ask/Ask';
import { AiOutlineQuestion } from 'react-icons/ai';

const AskPage = () => {
  return (
    <div className="p-16">
      <div>
        <div>
          <h2 className="font-semibold text-3xl flex items-center gap-x-2">
            Ask <AiOutlineQuestion className="w-8 h-8" />
          </h2>
          <span className="text-sm text-slate-500">
            Ask doubts and questions from here.
          </span>
        </div>
      </div>

      <Ask />
    </div>
  );
};

export default AskPage;

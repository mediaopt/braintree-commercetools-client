import { FC } from "react";
export const LoadingOverlay: FC = () => {
  return (
    <div className="bg-slate-300/50 flex flex-col justify-center content-center gap-2 p-3">
      <div className="h-6 w-6 m-auto text-white dark:text-neutral-700 border-2 border-gray-500 rounded-full border-r-gray-100 animate-spin" />
      <span>loading...</span>
    </div>
  );
};

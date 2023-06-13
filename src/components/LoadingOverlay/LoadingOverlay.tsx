import { FC } from "react";
import { LoadingOverlayType } from "../../types";

export const LoadingOverlay: FC<LoadingOverlayType> = ({
  loadingText,
  textStyles = "text-center",
}: LoadingOverlayType) => {
  return (
    <div className="h-full w-full bg-slate-300/50 flex flex-col justify-center content-center gap-2 p-3">
      <div>
        <div className="h-6 w-6 m-auto text-white dark:text-neutral-700 border-2 border-gray-500 rounded-full border-r-gray-100 animate-spin" />
      </div>
      {loadingText && <span className={textStyles}>{loadingText}</span>}
    </div>
  );
};

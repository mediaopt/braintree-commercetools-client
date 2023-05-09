import { FC } from "react";

export const Result: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      Thank you for your purchase! <div>{children}</div>
    </div>
  );
};

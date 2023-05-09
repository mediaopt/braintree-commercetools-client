import { FC } from "react";

type ResultProps = {
  success?: boolean;
  message?: string;
};

export const Result: FC<React.PropsWithChildren<ResultProps>> = ({
  success = true,
  message,
  children,
}) => {
  return (
    <div className={!success ? "result-error" : "result-success"}>
      {message ?? "Thank you for your purchase!"}

      <div>{children}</div>
    </div>
  );
};

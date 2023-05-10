import React from "react";

interface Props {
  label: string;
}

export const PayPalCheckout: React.FC<Props> = ({ label }: Props) => {
  return <button>{label}</button>;
};

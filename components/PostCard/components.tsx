import React from "react";
import { ComponentProps } from "./props";

export const Tag: React.FC<ComponentProps> = ({ text }) => {
  return (
    <span className="px-4 py-1 rounded-full border border-black opacity-70 inline-block mr-2 mb-2">
      <h5 className="inline text-sm leading-4">{text}</h5>
    </span>
  );
};

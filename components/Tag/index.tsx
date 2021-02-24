import React from "react";
import { TagProps } from "./props";

const Tag: React.FC<TagProps> = ({ text, href }) => {
  return (
    <a
      className="px-4 py-1 rounded-full border border-black opacity-70 inline-block mr-2 mb-2"
      href={href}
    >
      <h5 className="inline text-sm leading-4">{text}</h5>
    </a>
  );
};

export default Tag;

import React from "react";
import { DividerProps } from "./props";

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <hr className={`bg-black opacity-30 h-0.5 ${className}`} />;
};

export default Divider;

"use client";

import { ButtonHTMLAttributes } from "react";

export const NextStepBtn = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="mt-3">
      <button
        {...props}
        className="border-black border text-black w-full py-2 px-4 font-medium italic"
      ></button>
    </div>
  );
};

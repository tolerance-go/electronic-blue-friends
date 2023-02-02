import { PropsWithChildren } from "react";

export const Frame = (props: PropsWithChildren) => {
  return <div className="border-4 bg-[#FF7272] border-black h-full">{props.children}</div>;
};

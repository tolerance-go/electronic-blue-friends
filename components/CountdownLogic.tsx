"use client";

import { Countdown } from "./Countdown";
import { useRouter } from "next/navigation";

export const CountdownLogic = () => {
  const router = useRouter();
  return (
    <Countdown
      className="text-white absolute top-3 right-4 w-7 h-7 rounded-full flex justify-center items-center bg-black"
      onDone={() => {
        router.push("/steps");
      }}
    />
  );
};

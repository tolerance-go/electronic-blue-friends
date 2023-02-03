"use client";

import { continuousAuntDaysColumnData } from "@/constants/keys";
import { useUserStore } from "@/stores/user";
import { useRef } from "react";
import Slider from "react-slick";
import { ColumnsPicker } from "./ColumnsPicker";
import { NextStepBtn } from "./NextStepBtn";
import { shallow } from "zustand/shallow";

export default function Step1({
  sliderRef,
}: {
  sliderRef: React.MutableRefObject<Slider | null>;
}) {
  const user = useUserStore(
    (state) => ({
      setContinuousAuntDays: state.setContinuousAuntDays,
      continuousAuntDays: state.continuousAuntDays,
    }),
    shallow
  );
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapRef}
      className="p-12 h-full relative flex flex-col justify-center"
    >
      <div className="relative -top-10">
        <div className="text-8xl">持续</div>
        <div className="text-2xl mt-2">姨妈天数是多少？</div>
        <div className="mt-10">
          <ColumnsPicker<number>
            defaultValue={[user.continuousAuntDays]}
            columns={continuousAuntDaysColumnData}
            onConfirm={(value) => {
              if (value) {
                user.setContinuousAuntDays(value[0]);
              }
            }}
            getContainer={() => wrapRef.current}
          />
        </div>
        <NextStepBtn
          onClick={() => {
            sliderRef.current?.slickNext();
          }}
        >
          下一步 2 / 3
        </NextStepBtn>
      </div>
    </div>
  );
}

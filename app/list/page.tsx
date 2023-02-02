"use client";

import clsx from "clsx";
import Link from "next/link";
import dayjs from "dayjs";
import { Fragment, useId, useState } from "react";
import { getMonthDays } from "@/utils/getMonthDays";
import {
  getMenstruationDate,
  getMenstruationDateWithPrevMonth,
} from "@/utils/getMenstruationDate";
import { flatten } from "lodash-es";
import {
  getSafeDays,
  getSafeDaysWithNextMonth,
  getSafeDaysWithPrevMonth,
} from "@/utils/getSafeDays";
import { getOvulation, getOvulationWithNext } from "@/utils/getOvulation";
import { getDayjs } from "@/utils/getDayjs";

export default function Date() {
  const list = [
    {
      id: useId(),
      from: {
        year: 2022,
        month: 12,
        date: 24,
      },
      to: {
        year: 2023,
        month: 1,
        date: 2,
      },
    },
    {
      id: useId(),
      from: {
        year: 2023,
        month: 1,
        date: 24,
      },
      to: {
        year: 2023,
        month: 2,
        date: 24,
      },
    },

    {
      id: useId(),
      from: {
        year: 2023,
        month: 2,
        date: 26,
      },
      to: {
        year: 2023,
        month: 3,
        date: 12,
      },
    },
    {
      id: useId(),
      from: {
        year: 2023,
        month: 2,
        date: 26,
      },
      to: {
        year: 2023,
        month: 3,
        date: 12,
      },
    },
    {
      id: useId(),
      from: {
        year: 2023,
        month: 2,
        date: 26,
      },
      to: {
        year: 2023,
        month: 2,
        date: 27,
      },
    },
  ];
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="flex p-5 flex-none">
        <Link href={"/main"}>
          <svg
            width="1em"
            height="1em"
            className="text-4xl"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.1666 12.7917H7.37623L16.9258 3.24209L14.5 0.833344L0.833313 14.5L14.5 28.1667L16.9087 25.7579L7.37623 16.2083H28.1666V12.7917Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
      <div className="flex-auto p-5 overflow-auto">
        {list.map((item, index) => {
          return (
            <Fragment key={item.id}>
              {(index === 0 || list[index - 1].to.year !== item.from.year) && (
                <div className="text-sm sticky top-0 pt-2">
                  <span className="bg-[#FF7272] py-1">{item.from.year}</span>
                </div>
              )}
              <div
                className={clsx(
                  "flex justify-start items-center",
                  index === 0 ? null : "pt-4"
                )}
              >
                <div className="rounded-full w-4 h-4 bg-black flex-none"></div>
                <div className="flex-auto flex justify-center items-center space-x-2">
                  <div className="text-4xl font-bold pl-5 italic">
                    {item.from.month} / {item.from.date}
                  </div>
                  <div className="text-xs italic self-end">开始</div>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <svg
                  className="w-4 flex-none"
                  viewBox="0 0 24 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9393 127.061C11.5251 127.646 12.4749 127.646 13.0607 127.061L22.6066 117.515C23.1924 116.929 23.1924 115.979 22.6066 115.393C22.0208 114.808 21.0711 114.808 20.4853 115.393L12 123.879L3.51472 115.393C2.92894 114.808 1.97919 114.808 1.3934 115.393C0.807617 115.979 0.807617 116.929 1.3934 117.515L10.9393 127.061ZM10.5 6.55671e-08L10.5 126L13.5 126L13.5 -6.55671e-08L10.5 6.55671e-08Z"
                    fill="black"
                  />
                </svg>
                <div className="flex-auto flex justify-center items-center text-md">
                  持续
                  <span className="text-yellow-300 px-2">
                    {getDayjs(item.to.year, item.to.month, item.to.date).diff(
                      getDayjs(item.from.year, item.from.month, item.from.date),
                      "d"
                    )}
                  </span>
                  天
                </div>
              </div>
              {item.to.year !== item.from.year && (
                <div className="text-sm sticky top-0 pt-2">
                  <span className="bg-[#FF7272] py-1">{item.to.year}</span>
                </div>
              )}
              <div className="flex justify-start items-center pb-4">
                <div className="rounded-full w-4 h-4 bg-black flex-none"></div>
                <div className="flex-auto flex justify-center items-center space-x-2">
                  <div className="text-4xl font-bold pl-5 italic">
                    {item.to.month} / {item.to.date}
                  </div>
                  <div className="text-xs italic self-end">结束</div>
                </div>
              </div>
              {index === list.length - 1 ? null : (
                <div className="pb-5 mb-5 border-b border-b-black"></div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

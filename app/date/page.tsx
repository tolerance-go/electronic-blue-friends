"use client";

import clsx from "clsx";
import Link from "next/link";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
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

export default function Date() {
  const [year, setYear] = useState(() => dayjs().year());
  const [month, setMonth] = useState(() => dayjs().month() + 1);

  const today = dayjs().date();
  // 是否是相同的年份和月份
  const isItTheSameYearAndMonth = dayjs().isSame(
    dayjs(`${year}-${month}`, "YYYY-M"),
    "month"
  );

  // 经期持续天数
  const durationOfMenstrualPeriod = 5;

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="flex px-5 pt-5 pb-4">
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
      <div className="p-8 flex justify-between items-center">
        <div className="text-5xl flex space-x-10 font-medium italic">
          <span>{month}</span>
          <span>{year}</span>
        </div>
        <div className="flex space-x-8">
          <svg
            width="1em"
            height={`${27 / 16}em`}
            viewBox="0 0 16 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              const next = dayjs(`${year}-${month}`, "YYYY-M").subtract(1, "M");
              setMonth(next.month() + 1);
              setYear(next.year());
            }}
          >
            <path
              d="M15.7463 23.2537L6.01375 13.5L15.7463 3.74625L12.75 0.75L0 13.5L12.75 26.25L15.7463 23.2537Z"
              fill="#FBBF24"
            />
          </svg>
          <svg
            width="1em"
            height={`${27 / 16}em`}
            viewBox="0 0 16 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              const next = dayjs(`${year}-${month}`, "YYYY-M").add(1, "M");
              setMonth(next.month() + 1);
              setYear(next.year());
            }}
          >
            <path
              d="M0.253752 3.74625L9.98625 13.5L0.25375 23.2537L3.25 26.25L16 13.5L3.25 0.749999L0.253752 3.74625Z"
              fill="#FBBF24"
            />
          </svg>
        </div>
      </div>
      <div>
        <div className="flex pb-4 px-2 text-2xl mt-4">
          {["日", "一", "二", "三", "四", "五", "六"].map((item) => {
            return (
              <div className="flex-auto font-medium text-center" key={item}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="border-t-2 border-t-black"></div>
        <div>
          {getMonthDays(year, month)
            .filter((item) => item.some((item) => item !== null))
            .map((line, index) => {
              // 当前日历下应该显示的上一个月姨妈日
              const theAuntDayOfThePreviousMonthThatShouldBeDisplayed =
                getMenstruationDateWithPrevMonth(
                  year,
                  month,
                  durationOfMenstrualPeriod,
                  28,
                  {
                    year: 2023,
                    month: 1,
                    date: 4,
                  }
                );
              // 当前日历下应该来姨妈的日子
              const theDayWhenYouShouldComeToMyAunt = getMenstruationDate(
                year,
                month,
                durationOfMenstrualPeriod,
                28,
                {
                  year: 2023,
                  month: 1,
                  date: 4,
                }
              );

              // 全部当前日历下应该来姨妈的日子
              const allTheDaysThatShouldComeToMyAuntUnder = flatten([
                ...theAuntDayOfThePreviousMonthThatShouldBeDisplayed,
                ...theDayWhenYouShouldComeToMyAunt,
              ]);

              // 当前日历显示下一个月的安全日
              const theCurrentCalendarShowsTheSecurityDayOfTheNextMonth =
                getSafeDaysWithNextMonth(
                  year,
                  month,
                  durationOfMenstrualPeriod,
                  28,
                  {
                    year: 2023,
                    month: 1,
                    date: 4,
                  }
                );
              // 当前日历显示上一个月的安全日
              const theCurrentCalendarShowsTheSecurityDayOfThePreviousMonth =
                getSafeDaysWithPrevMonth(
                  year,
                  month,
                  durationOfMenstrualPeriod,
                  28,
                  {
                    year: 2023,
                    month: 1,
                    date: 4,
                  }
                );

              // 当前日历下安全日
              const safetyDayUnderCalendar = getSafeDays(year, month, [
                ...theAuntDayOfThePreviousMonthThatShouldBeDisplayed,
                ...theDayWhenYouShouldComeToMyAunt,
              ]);

              // 所有当前日历下的安全日
              const allSecurityDaysUnderTheCurrentCalendar = flatten([
                ...safetyDayUnderCalendar,
                theCurrentCalendarShowsTheSecurityDayOfTheNextMonth,
                theCurrentCalendarShowsTheSecurityDayOfThePreviousMonth,
              ]);

              // 当前日历的排卵日
              const ovulationDayOfTheCurrentCalendar = getOvulation(
                year,
                month,
                theDayWhenYouShouldComeToMyAunt
              );

              // 当前日历显示下个月的排卵日
              const theCurrentCalendarDisplaysTheOvulationDateOfTheNextMonth =
                getOvulationWithNext(
                  year,
                  month,
                  durationOfMenstrualPeriod,
                  28,
                  {
                    year: 2023,
                    month: 1,
                    date: 4,
                  }
                );

              // 所有当前日历下的排卵日
              const allOvulationDaysInTheCurrentCalendar = [
                ...ovulationDayOfTheCurrentCalendar,
                theCurrentCalendarDisplaysTheOvulationDateOfTheNextMonth,
              ];

              return (
                <Fragment key={year + month + index}>
                  <div className="flex px-2">
                    {line.map((num, index) => {
                      // 应该显示月经期
                      const theMenstrualPeriodShouldBeDisplayed =
                        num !== null &&
                        allTheDaysThatShouldComeToMyAuntUnder.includes(num);

                      // 应该显示安全日
                      const securityDayShouldBeDisplayed =
                        num !== null &&
                        allSecurityDaysUnderTheCurrentCalendar.includes(num);

                      //  应该显示排卵日
                      const theOvulationDateShouldBeDisplayed =
                        num !== null &&
                        allOvulationDaysInTheCurrentCalendar.includes(num);

                      return (
                        <div
                          className="px-2 py-4 flex-auto text-2xl flex justify-center items-center italic w-5"
                          key={index}
                        >
                          {(isItTheSameYearAndMonth && num === today) ||
                          theMenstrualPeriodShouldBeDisplayed ||
                          securityDayShouldBeDisplayed ||
                          theOvulationDateShouldBeDisplayed ? (
                            <div className="relative text-center w-full">
                              <span
                                className={clsx(
                                  "text-white z-10 relative p-1",
                                  isItTheSameYearAndMonth &&
                                    num === today &&
                                    "border-2"
                                )}
                              >
                                {num}
                              </span>
                              <div
                                className={clsx(
                                  "h-4 absolute w-full z-0 bottom-0 -skew-x-6",
                                  {
                                    "bg-violet-600":
                                      theMenstrualPeriodShouldBeDisplayed,
                                    "bg-black":
                                      !theMenstrualPeriodShouldBeDisplayed &&
                                      securityDayShouldBeDisplayed,
                                    "bg-yellow-500":
                                      theOvulationDateShouldBeDisplayed,
                                  }
                                )}
                              ></div>
                            </div>
                          ) : (
                            num
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={clsx(
                      "border-t-2 border-t-black",
                      index % 2 ? "rotate-1" : "-rotate-1"
                    )}
                  ></div>
                </Fragment>
              );
            })}
        </div>
      </div>

      <div className="flex space-x-4 py-10 px-5 mt-2">
        {[
          {
            title: "月经期",
            type: "moon",
          },
          {
            title: "排卵日",
            type: "ovulation",
          },
          {
            title: "安全期",
            type: "safe",
          },
        ].map((item) => {
          return (
            <div key={item.type} className="relative text-center w-20">
              <span className="text-xl text-white z-10 relative -top-1">
                {item.title}
              </span>
              <div
                className={clsx("h-5 absolute w-full z-0 bottom-0", {
                  "bg-black": item.type === "safe",
                  "bg-violet-600": item.type === "moon",
                  "bg-yellow-500": item.type === "ovulation",
                })}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

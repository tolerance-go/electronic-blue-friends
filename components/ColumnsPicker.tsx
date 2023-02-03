"use client";
import MultiPicker from "rmc-picker/es/MultiPicker";
import Picker from "rmc-picker/es/Picker";
import { Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./ColumnsPicker.scss";
import { isSSR } from "@/constants/keys";

export type ColumnsPickerValue = string | number;

export const ColumnsPicker = <T extends ColumnsPickerValue>({
  columns,
  defaultValue,
  format,
  onConfirm,
  placeholder,
  getContainer,
}: {
  getContainer?: () => HTMLElement | null;
  placeholder?: string;
  columns?: { value: T; title: string | number }[][];
  defaultValue?: T[];
  format?: (value?: T[]) => string;
  onConfirm?: (value?: T[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T[] | undefined>(defaultValue);

  const prevValueRef = useRef<T[] | undefined>(value);
  return (
    <>
      <div
        className="relative bg-black flex h-14 items-center px-4"
        onClick={() => setOpen(!open)}
      >
        <div className="w-full text-white text-3xl">
          {format?.(value) ?? value?.join("/") ?? placeholder ?? "请选择"}
        </div>
        <svg
          className="text-white absolute right-4"
          width="0.6em"
          height="1.2em"
          viewBox="0 0 10 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 20L0 15H10L5 20Z" fill="currentColor" />
          <path
            d="M5 4.37114e-07L10 5L0 5L5 4.37114e-07Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {!isSSR &&
        ReactDOM.createPortal(
          <Transition
            show={open}
            className={"absolute w-screen inset-x-0 bottom-0 z-10"}
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 translate-y-full"
          >
            <div className="bg-black relative">
              <div className="text-white flex justify-end px-3 py-1 space-x-2">
                <button
                  className="p-2 focus:outline-none"
                  onClick={() => {
                    onConfirm?.(value);
                    prevValueRef.current = value;
                    setOpen(false);
                  }}
                >
                  确认
                </button>
                <button
                  className="p-2 focus:outline-none"
                  onClick={() => {
                    setOpen(false);
                    setValue(prevValueRef.current);
                  }}
                >
                  取消
                </button>
              </div>
              <MultiPicker
                selectedValue={value}
                onValueChange={(next, colIndex) => {
                  setValue(next);
                }}
              >
                {columns?.map((cols, index) => {
                  return (
                    <Picker key={index}>
                      {cols.map((col) => {
                        return (
                          <Picker.Item key={col.value} value={col.value}>
                            {col.title}
                          </Picker.Item>
                        );
                      })}
                    </Picker>
                  );
                })}
              </MultiPicker>
            </div>
          </Transition>,
          getContainer?.() ?? document.body
        )}
    </>
  );
};

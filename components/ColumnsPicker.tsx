"use client";
import MultiPicker from "rmc-picker/es/MultiPicker";
import Picker from "rmc-picker/es/Picker";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import "./ColumnsPicker.scss";

export const ColumnsPicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>();

  return (
    <>
      <div
        className="relative bg-black flex h-14 items-center px-4"
        onClick={() => setOpen(!open)}
      >
        <div className="w-full text-white text-3xl">今天</div>
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
      <Transition
        show={open}
        className={"fixed inset-x-0 bottom-0 z-10"}
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-full"
      >
        <div className="bg-black relative">
          <div className="text-white flex justify-end px-3 py-1 space-x-2">
            <button className="p-2 focus:outline-none">确认</button>
            <button
              className="p-2 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              取消
            </button>
          </div>
          <MultiPicker
            selectedValue={["4", "5", "3"]}
            onValueChange={(next, colIndex) => {}}
          >
            <Picker indicatorClassName="my-picker-indicator">
              <Picker.Item className="my-picker-view-item" value="1">
                one
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="2">
                two
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="3">
                three
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="4">
                four
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="5">
                five
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="6">
                six
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="7">
                seven
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="8">
                eight
              </Picker.Item>
            </Picker>
            <Picker indicatorClassName="my-picker-indicator">
              <Picker.Item className="my-picker-view-item" value="11">
                eleven
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="12">
                twelve
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="13">
                thirteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="14">
                fourteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="15">
                fifteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="16">
                sixteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="17">
                seventeen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="18">
                eighteen
              </Picker.Item>
            </Picker>
            <Picker indicatorClassName="my-picker-indicator">
              <Picker.Item className="my-picker-view-item" value="11">
                eleven
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="12">
                twelve
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="13">
                thirteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="14">
                fourteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="15">
                fifteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="16">
                sixteen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="17">
                seventeen
              </Picker.Item>
              <Picker.Item className="my-picker-view-item" value="18">
                eighteen
              </Picker.Item>
            </Picker>
          </MultiPicker>
        </div>
      </Transition>
    </>
  );
};

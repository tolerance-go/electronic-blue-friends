import Link from "next/link";
import { ColumnsPicker } from "@/components/ColumnsPicker";

export default function Home() {
  return (
    <div className="p-12 h-full relative flex flex-col justify-center">
      <div className="flex px-5 py-5 absolute top-0 left-0">
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
      <div className="relative -top-10 divide-y divide-black">
        {[
          {
            title: "最近姨妈来的日期",
          },
          {
            title: "持续姨妈天数",
          },
          {
            title: "姨妈周期长度",
          },
        ].map((item) => {
          return (
            <div key={item.title} className="py-5">
              <div className="text-3xl mt-2">{item.title}</div>
              <div className="mt-5">
                <ColumnsPicker />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

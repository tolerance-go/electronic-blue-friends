import Link from "next/link";

export default function Home() {
  return (
    <div className="p-12 h-full relative flex flex-col justify-center">
      <div className="flex px-5 py-5 absolute top-0 left-0">
        <Link href={'/main'}>
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
        <div className="py-5">
          <div className="text-3xl mt-2">最近姨妈来的日期</div>
          <div className="relative mt-5 flex items-center">
            <select className="bg-black h-14 w-full text-white text-3xl px-4 appearance-none focus:outline-none">
              <option selected>今天</option>
              <option value="US">昨天</option>
              <option value="DE">之前</option>
            </select>
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
        </div>
        <div className="py-5">
          <div className="text-3xl mt-2">持续姨妈天数</div>
          <div className="relative mt-5 flex items-center">
            <select className="bg-black h-14 w-full text-white text-3xl px-4 appearance-none focus:outline-none">
              <option selected>今天</option>
              <option value="US">昨天</option>
              <option value="DE">之前</option>
            </select>
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
        </div>
        <div className="py-5">
          <div className="text-3xl mt-2">姨妈周期长度</div>
          <div className="relative mt-5 flex items-center">
            <select className="bg-black h-14 w-full text-white text-3xl px-4 appearance-none focus:outline-none">
              <option selected>今天</option>
              <option value="US">昨天</option>
              <option value="DE">之前</option>
            </select>
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
        </div>
      </div>
    </div>
  );
}

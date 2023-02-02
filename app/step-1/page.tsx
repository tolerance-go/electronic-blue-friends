export default function Home() {
  return (
    <div className="p-12 h-full relative flex flex-col justify-center">
      <div className="relative -top-10">
        <div className="text-8xl">最近</div>
        <div className="text-2xl mt-2">姨妈是哪天来的？</div>
        <div className="relative mt-10 flex items-center">
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
  );
}

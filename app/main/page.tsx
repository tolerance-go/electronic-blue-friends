import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      <div className="flex-none">
        <div className="flex justify-between items-center">
          <div className="relative text-center w-24">
            <span className="text-2xl text-white z-10 relative -top-1">
              安全期
            </span>
            <div className="bg-black h-6 absolute w-full z-0 bottom-0"></div>
          </div>
          <Link href="/settings" className="text-3xl">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6459 31.8333L11.0125 26.7667C10.6695 26.6347 10.3465 26.4764 10.0435 26.2917C9.73952 26.1069 9.44239 25.909 9.15211 25.6979L4.44169 27.6771L0.0875244 20.1562L4.16461 17.0687C4.13822 16.884 4.12502 16.7056 4.12502 16.5336V15.4648C4.12502 15.2938 4.13822 15.116 4.16461 14.9312L0.0875244 11.8437L4.44169 4.32291L9.15211 6.30207C9.44239 6.09096 9.74586 5.89304 10.0625 5.70832C10.3792 5.5236 10.6959 5.36527 11.0125 5.23332L11.6459 0.166656H20.3542L20.9875 5.23332C21.3306 5.36527 21.6541 5.5236 21.9581 5.70832C22.2611 5.89304 22.5577 6.09096 22.8479 6.30207L27.5584 4.32291L31.9125 11.8437L27.8354 14.9312C27.8618 15.116 27.875 15.2938 27.875 15.4648V16.5336C27.875 16.7056 27.8486 16.884 27.7959 17.0687L31.8729 20.1562L27.5188 27.6771L22.8479 25.6979C22.5577 25.909 22.2542 26.1069 21.9375 26.2917C21.6209 26.4764 21.3042 26.6347 20.9875 26.7667L20.3542 31.8333H11.6459ZM16.0792 21.5417C17.6097 21.5417 18.916 21.0007 19.9979 19.9187C21.0799 18.8368 21.6209 17.5305 21.6209 16C21.6209 14.4694 21.0799 13.1632 19.9979 12.0812C18.916 10.9993 17.6097 10.4583 16.0792 10.4583C14.5222 10.4583 13.2091 10.9993 12.1399 12.0812C11.0716 13.1632 10.5375 14.4694 10.5375 16C10.5375 17.5305 11.0716 18.8368 12.1399 19.9187C13.2091 21.0007 14.5222 21.5417 16.0792 21.5417Z"
                fill="#FBBF24"
              />
            </svg>
          </Link>
        </div>
        <div className="py-24 text-center italic">
          <span className="text-9xl font-bold">3</span>
          <span className="text-xl align-text-bottom">天后</span>
        </div>

        <div className="py-4 text-center">
          <Link href={'/date'} className="underline underline-offset-2 text-xl">
            预计经期开始日为 2 月 1 日
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center grow">
        <button className="group relative inline-block focus:outline-none focus:ring">
          <span className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative inline-block border-2 border-current px-12 py-7 text-3xl font-medium uppercase tracking-widest text-white group-active:text-opacity-75">
            来姨妈了
          </span>
        </button>
      </div>
    </div>
  );
}

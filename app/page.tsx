/* eslint-disable @next/next/no-img-element */
import { CountdownLogic } from "@/components/CountdownLogic";

export default function Home() {
  return (
    <div className="p-16 h-full relative">
      <img
        src="/_assets/home-bg.jpg"
        alt="home-bg.jpg"
        className="object-cover h-full"
      />
      <span className="absolute text-white top-32 right-5 text-8xl">欢迎</span>
      <span className="absolute text-white top-60 right-7 write-rl-upright text-xl">
        use to
      </span>
      <span className="absolute text-white text-8xl font-bold bottom-[17rem] left-5">
        dianzi
      </span>
      <span className="absolute text-white text-8xl bottom-40 left-5">
        蓝朋友
      </span>
      <CountdownLogic />
    </div>
  );
}

import imgCover1 from "./824f6d3e433a3097c63622ca15fc81cc67d9ad1b.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[950px] left-0 top-0 w-[1656px]" data-name="cover 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCover1} />
      </div>
      <div className="absolute bg-[#d9d9d9] h-[268px] left-[173px] top-[155px] w-[310px]" />
      <div className="absolute bg-[#d9d9d9] h-[314px] left-[679px] top-[75px] w-[322px]" />
      <div className="absolute bg-[#d9d9d9] h-[264px] left-[1113px] top-[211px] w-[315px]" />
      <div className="absolute bg-[#d9d9d9] h-[296px] left-[1024px] top-[508px] w-[328px]" />
      <div className="absolute bg-[#d9d9d9] h-[264px] left-[367px] top-[512px] w-[303px]" />
    </div>
  );
}
import imgCover1 from "./824f6d3e433a3097c63622ca15fc81cc67d9ad1b.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute bg-[#d9d9d9] h-[306.087px] left-[1849px] top-[-990px] w-[351.304px]" />
      <div className="absolute h-[803px] left-[261px] top-0 w-[1399px]" data-name="cover 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCover1} />
      </div>
      <div className="absolute bg-[rgba(217,217,217,0.7)] h-[229px] left-[405px] top-[128px] w-[263px]" />
      <div className="absolute bg-[rgba(217,217,217,0.7)] h-[266px] left-[829px] top-[63px] w-[279px]" />
      <div className="absolute bg-[rgba(217,217,217,0.7)] h-[243px] left-[1125px] top-[432px] w-[279px]" />
      <div className="absolute bg-[rgba(217,217,217,0.7)] h-[226px] left-[566px] top-[432px] w-[263px]" />
      <div className="absolute bg-[rgba(217,217,217,0.7)] h-[220px] left-[1199px] top-[179px] w-[269px]" />
    </div>
  );
}
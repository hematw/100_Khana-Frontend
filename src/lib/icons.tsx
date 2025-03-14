import { Bath, GlassWater, Tv, WavesLadder } from "lucide-react";

type IconType = {
  [key: string]: JSX.Element;
};

const icons: IconType = {
  GlassWater: <GlassWater />,
  Bath: <Bath />,
  WavesLadder: <WavesLadder />,
  Tv: <Tv />,
};

export default icons;

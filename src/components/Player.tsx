import { CELL_SIZE } from "@/constant/config";
import { PlayerType } from "@/types/player";
import { useMemo } from "react";

const Player: React.FC<PlayerType> = ({
  x,
  y,
  direction,
  state,
  name,
  avatar,
}) => {
  const directionStyle = useMemo(() => {
    switch (direction) {
      case "top":
        return "-114px";
      case "bottom":
        return "-4px";
      case "left":
        return "-40px";
      case "right":
        return "-77px";
      default:
        return "-4px";
    }
  }, [direction]);

  const stateStyle = useMemo(() => {
    if (state === 1) {
      return "3px";
    }
    if (state === 2) {
      return "-23px";
    }
    if (state === 3) {
      return "-49px";
    }
    return "3px";
  }, [state]);

  return (
    <div
      style={{
        transform: `translateX(${x * CELL_SIZE}px) translateY(${
          y * CELL_SIZE
        }px)`,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE + 5}px`,
      }}
      className="absolute top-0 left-0 duration-300">
      <div
        style={{
          backgroundSize: "80px",
          backgroundPositionY: directionStyle,
          backgroundPositionX: stateStyle,
          // background: `url(@/assets/characters/${avatar}.png)`
        }}
        className={`absolute top-0 left-0 w-full h-full bg-[url('@/assets/characters/${avatar}.png')]`}></div>
      {/* name */}
      <p className="absolute -top-1 -translate-y-full left-1/2 font-bold -translate-x-1/2 bg-gray-800/50 text-white px-2 py-0.1 rounded-lg whitespace-nowrap">
        {name}
      </p>
    </div>
  );
};

export default Player;

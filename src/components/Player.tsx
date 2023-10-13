import { CELL_SIZE } from "@/constant/config";
import { PlayerType } from "@/types/player";
import { useEffect, useMemo, useState } from "react";

const Player: React.FC<PlayerType> = ({
  x,
  y,
  direction,
  state,
  name,
  avatar,
}) => {
  const [animation, setAnimation] = useState("3px");
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

  useEffect(() => {
    (async () => {
      setAnimation("-23px");
      setTimeout(() => {
        setAnimation("-49px");
      }, 50);
      setTimeout(() => {
        setAnimation("-23px");
      }, 100);
      setTimeout(() => {
        setAnimation("3px");
      }, 150);
    })();
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
          backgroundPositionX: animation,
          backgroundImage: `url(${avatar}.png)`,
        }}
        className={`absolute top-0 left-0 w-full h-full`}></div>
      {/* name */}
      <p className="absolute -top-1 -translate-y-full left-1/2 font-bold -translate-x-1/2 text-xs bg-gray-800/50 text-white px-2 py-0.1 rounded-lg whitespace-nowrap capitalize">
        {name}
      </p>
    </div>
  );
};

export default Player;

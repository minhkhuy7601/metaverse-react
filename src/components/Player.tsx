import { CELL_SIZE } from "@/constant/config";
import { PlayerType } from "@/types/player";

const Player: React.FC<PlayerType> = ({ x, y }) => {
  return (
    <div
      style={{
        transform: `translateX(${x * CELL_SIZE}px) translateY(${
          y * CELL_SIZE
        }px)`,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE + 5}px`,
        backgroundSize: "320px",
        backgroundPositionY: "-4px",
        // backgroundPositionX: "-23px",
      }}
      className="absolute top-0  left-0 duration-300 bg-[url('@/assets/characters/characters.png')]"></div>
  );
};

export default Player;

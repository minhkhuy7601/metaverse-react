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
        height: `${CELL_SIZE}px`,
      }}
      className="absolute top-0 left-0 bg-white duration-300"></div>
  );
};

export default Player;

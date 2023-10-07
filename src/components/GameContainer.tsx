import { CELL_SIZE, COLS, ROWS } from "@/constant/config";
import classNames from "classnames";
import GridTemplate from "./GridTemplate";
import PlayersList from "./PlayersList";
const GameContainer = () => {
  return (
    <div className="w-screen h-screen relative top-0 flex justify-center items-center">
      <div
        style={{
          width: `${COLS * CELL_SIZE}px`,
          height: `${ROWS * CELL_SIZE}px`,
        }}
        className={classNames(
          "bg-[url('@/assets/maps/metaverse_class.png')] bg-no-repeat bg-center bg-cover relative"
        )}>
        <GridTemplate />
        <PlayersList />
      </div>
    </div>
  );
};

export default GameContainer;

import { CELL_SIZE, COLS, ROWS } from "@/constant/config";
import classNames from "classnames";
import GridTemplate from "./GridTemplate";
import PlayersList from "./PlayersList";
const GameContainer = () => {
  return (
    <div
      style={{
        width: `${COLS * CELL_SIZE}px`,
        height: `${ROWS * CELL_SIZE}px`,
      }}
      className={classNames(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[url('@/assets/maps/metaverse_class.png')] bg-no-repeat bg-center bg-cover"
      )}>
      <GridTemplate />
      <PlayersList />
    </div>
  );
};

export default GameContainer;

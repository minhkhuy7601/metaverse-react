import { CELL_SIZE } from "@/constant/config";
import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import classNames from "classnames";
import GridTemplate from "./GridTemplate";
import PlayersList from "./PlayersList";
const GameContainer = () => {
  const { currentRoom } = useGamePlayContext();
  console.log("currentRoom", currentRoom);
  return (
    <div className="w-screen h-screen relative top-0 flex justify-center items-center">
      <div
        id="game-container"
        style={{
          width: `${currentRoom.cols * CELL_SIZE}px`,
          height: `${currentRoom.rows * CELL_SIZE}px`,
        }}
        className={classNames(`bg-no-repeat bg-center bg-cover relative`)}>
        <img
          src={currentRoom.image}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <GridTemplate />
        <PlayersList />
      </div>
    </div>
  );
};

export default GameContainer;

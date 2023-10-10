import { CELL_SIZE } from "@/constant/config";
import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import { RootState } from "@/redux/store";
import classNames from "classnames";
import { useSelector } from "react-redux";
import GridTemplate from "./GridTemplate";
import ModalQA from "./ModalQA";
import PlayersList from "./PlayersList";
import VideoFrame from "./VideoFrame";
const GameContainer = () => {
  const { currentRoom } = useGamePlayContext();
  const isLoading = useSelector((state: RootState) => state.map.isLoading);
  // console.log("currentRoom", currentRoom);

  return (
    <div
      className={classNames(
        "w-full h-full relative top-0 flex justify-center items-center duration-500",
        isLoading ? "invisible opacity-0" : "visible opacity-100"
      )}>
      <VideoFrame />
      <div
        id="game-container relative"
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

        <ModalQA />
        <GridTemplate />
        <PlayersList />
      </div>
    </div>
  );
};

export default GameContainer;

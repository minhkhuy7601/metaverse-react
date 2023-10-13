/* eslint-disable react-hooks/exhaustive-deps */
import { CELL_SIZE } from "@/constant/config";
import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import { RootState } from "@/redux/store";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GridTemplate from "./GridTemplate";
import PlayersList from "./PlayersList";
import VideoFrame from "./VideoFrame";
const CAMERA_LIMIT = 4;
const GameContainer = () => {
  const { currentRoom, players, playerId } = useGamePlayContext();
  const isLoading = useSelector((state: RootState) => state.map.isLoading);
  const [scale, setScale] = useState(1);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });

  // console.log("currentRoom", currentRoom);
  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      container.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) {
          setScale((sc) => (sc - 0.06 < 0.8 ? 0.8 : sc - 0.1));
        } else {
          setScale((sc) => (sc + 0.1 > 2 ? 2 : sc + 0.1));
        }
      });
    }
  }, []);

  useEffect(() => {
    try {
      const gameContainer = document.getElementById(
        "game-container"
      ) as HTMLDivElement;
      if (!gameContainer) return;

      const containerRect = gameContainer.getBoundingClientRect();

      if (playerId && scale > 1.45) {
        // You may need to adjust the values for x and y based on your requirements
        const x =
          players[playerId].x * CELL_SIZE - containerRect.width / (2 * scale);
        const y =
          players[playerId].y * CELL_SIZE - containerRect.height / (2 * scale);
        const centerX = currentRoom.cols / 2;
        const centerY = currentRoom.rows / 2;
        const isPlayerInRect =
          players[playerId].x >= centerX - CAMERA_LIMIT &&
          players[playerId].x <= centerX + CAMERA_LIMIT &&
          players[playerId].y >= centerY - CAMERA_LIMIT &&
          players[playerId].y <= centerY + CAMERA_LIMIT;
        if (isPlayerInRect) {
          console.log("in");
        } else {
          console.log("out");
          setCameraPosition({ x, y });
        }
      } else {
        setCameraPosition({ x: 0, y: 0 });
      }
    } catch (error) {
      console.log(error);
    }
  }, [playerId && players[playerId]]);

  return (
    <div
      id="container"
      style={
        {
          // transform: `scale(${scale})`,
        }
      }
      className={classNames(
        "w-full h-full relative top-0 flex justify-center items-center duration-500 hover:cursor-pointer",
        isLoading ? "invisible opacity-0" : "visible opacity-100"
      )}>
      <VideoFrame />
      <div
        id="game-container"
        style={{
          width: `${currentRoom.cols * CELL_SIZE}px`,
          height: `${currentRoom.rows * CELL_SIZE}px`,
          transform: `scale(${scale}) translate(${-(
            cameraPosition.x / scale
          )}px, ${-cameraPosition.y / scale}px)`,
        }}
        className={classNames(
          `bg-no-repeat bg-center bg-cover relative duration-[0.5s] transition-all ease-linear`
        )}>
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

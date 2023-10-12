import { CELL_SIZE } from "@/constant/config";
import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import { RootState } from "@/redux/store";
import classNames from "classnames";
import { useSelector } from "react-redux";
import GridTemplate from "./GridTemplate";
import ModalQA from "./ModalQA";
import PlayersList from "./PlayersList";
import VideoFrame from "./VideoFrame";
import { useEffect, useState } from "react";
const GameContainer = () => {
	const { currentRoom } = useGamePlayContext();
	const isLoading = useSelector((state: RootState) => state.map.isLoading);
	const [scale, setScale] = useState(1);
	// console.log("currentRoom", currentRoom);
	useEffect(() => {
		const container = document.getElementById("game-container");
		if (container) {
			container.addEventListener("wheel", (e) => {
				if (e.deltaY > 0) {
					setScale((sc) => sc + 0.02);
				} else {
					setScale((sc) => (sc - 0.04 < 1.4 ? 1 : sc - 0.04));
				}
			});
		}
	}, []);
	return (
		<div
			id="container"
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
					transform: `scale(${scale})`,
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

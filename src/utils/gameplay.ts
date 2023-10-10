/* eslint-disable @typescript-eslint/no-explicit-any */
import { CELL_SIZE, COLS, ROWS } from "@/constant/config";
import { MapType } from "@/types/map";

export function isSolid(grid: number[][], x: number, y: number) {
	const blockedNextSpace =
		x < 0 || y < 0 || y >= ROWS || x >= COLS || grid[y][x] === 1;
	return blockedNextSpace;
}

export function isPerformAction(
	currentMap: MapType,
	x: number,
	y: number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	callback: (type: string, value: any) => void
) {
	const nearsRemove = document.querySelectorAll(".near");
	console.log(nearsRemove);
	if (nearsRemove) nearsRemove.forEach((e) => e?.classList.remove("near"));
	const action = currentMap?.actions?.[`${x},${y}`];
	const near1 = currentMap?.actions?.[`${x},${y + 1}`];
	const near2 = currentMap?.actions?.[`${x},${y - 1}`];
	const near3 = currentMap?.actions?.[`${x + 1},${y}`];
	const near4 = currentMap?.actions?.[`${x - 1},${y}`];
	addNearClass(near1);
	addNearClass(near2);
	addNearClass(near3);
	addNearClass(near4);
	const nearQuestion = [near1, near2, near3, near4].find(
		(item) => item?.type === "POP_UP_QUESTION"
	);
	if (nearQuestion) {
		callback("POP_UP_QUESTION", nearQuestion.value);
	}
	if (action) {
		callback(action.type, action.value);
	}
}

const addNearClass = (near: any) => {
	if (near?.id) {
		const nearElement = document.querySelector(`#${near?.id}`);
		nearElement?.classList.add("near");
	}
};

export function getGridCoordinates(
	clientX: number,
	clientY: number,
	rect: DOMRect
) {
	const offsetX = clientX - rect.left; // Tọa độ x so với góc trái của gridMapDiv
	const offsetY = clientY - rect.top;

	const gridX = Math.floor(offsetX / CELL_SIZE); // Tính tọa độ x trên gridArray
	const gridY = Math.floor(offsetY / CELL_SIZE);

	return { x: gridX, y: gridY };
}

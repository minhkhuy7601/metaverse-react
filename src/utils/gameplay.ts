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
  const action = currentMap?.actions?.[`${y},${x}`];

  console.log("action", currentMap?.actions);
  if (action) {
    callback(action.type, action.value);
  }
}

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

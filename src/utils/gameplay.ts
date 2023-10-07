import { CELL_SIZE } from "@/constant/config";

export function isSolid(grid: number[][], x: number, y: number) {
  const blockedNextSpace = !!grid[y][x];
  return blockedNextSpace;
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

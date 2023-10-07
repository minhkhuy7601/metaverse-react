class PriorityQueue<T> {
  private elements: { element: T; priority: number }[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: T, priority: number): void {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    const result = this.elements.shift();
    return result ? result.element : undefined;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

export type NodePlayer = [number, number];

function heuristic(node: NodePlayer, goal: NodePlayer): number {
  return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
}

export function astar(
  grid: number[][],
  start: NodePlayer,
  end: NodePlayer
): NodePlayer[] | null {
  const openSet = new PriorityQueue<NodePlayer>();
  openSet.enqueue(start, 0);

  const cameFrom: { [key: string]: NodePlayer } = {};
  const gScore: { [key: string]: number } = {};
  gScore[start.toString()] = 0;

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue() as NodePlayer;

    if (current[0] === end[0] && current[1] === end[1]) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbor of getNeighbors(current, grid)) {
      const tentativeGScore = gScore[current.toString()] + 1;

      if (
        // eslint-disable-next-line no-prototype-builtins
        !gScore.hasOwnProperty(neighbor.toString()) ||
        tentativeGScore < gScore[neighbor.toString()]
      ) {
        cameFrom[neighbor.toString()] = current;
        gScore[neighbor.toString()] = tentativeGScore;
        const fScore = tentativeGScore + heuristic(neighbor, end);
        openSet.enqueue(neighbor, fScore);
      }
    }
  }

  return null;
}

function getNeighbors(node: NodePlayer, grid: number[][]): NodePlayer[] {
  const neighbors: NodePlayer[] = [];
  const directions: number[][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  for (const dir of directions) {
    const [dx, dy] = dir;
    const neighborX = node[0] + dx;
    const neighborY = node[1] + dy;

    if (
      neighborX >= 0 &&
      neighborX < grid.length &&
      neighborY >= 0 &&
      neighborY < grid[0].length &&
      grid[neighborX][neighborY] === 0
    ) {
      neighbors.push([neighborX, neighborY]);
    }
  }

  return neighbors;
}

function reconstructPath(
  cameFrom: { [key: string]: NodePlayer },
  current: NodePlayer
): NodePlayer[] {
  const path: NodePlayer[] = [current];
  while (cameFrom[current.toString()]) {
    current = cameFrom[current.toString()];
    path.push(current);
  }
  return path.reverse();
}

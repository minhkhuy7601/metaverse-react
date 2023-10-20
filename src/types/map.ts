export type MapType = {
  id: string;
  type: "room" | "lobby" | "school";
  rows: number;
  cols: number;
  map: number[][];
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<string, any>;
  startPosition: { x: number; y: number };
};

export type ConfigMapType = Record<string, MapType>;

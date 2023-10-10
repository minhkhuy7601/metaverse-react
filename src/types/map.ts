export type MapType = {
  id: string;
  rows: number;
  cols: number;
  map: number[][];
  image: string;
  meetingUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<string, any>;
};

export type ConfigMapType = Record<string, MapType>;

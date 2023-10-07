import { astar } from "./automove";
import { getGridCoordinates } from "./gameplay";

export class KeyPressListener {
  private keySafe: boolean = true;
  private keyCode: string;
  private callback: () => void;
  private time: number | null | NodeJS.Timeout = null;

  constructor(keyCode: string, callback: () => void) {
    this.keyCode = keyCode;
    this.callback = callback;

    this.keydownFunction = this.keydownFunction.bind(this);
    this.keyupFunction = this.keyupFunction.bind(this);

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  private keydownFunction(event: KeyboardEvent): void {
    // if (this.time) clearInterval(this.time);
    if (event.code === this.keyCode) {
      if (this.keySafe) {
        this.keySafe = false;
        this.callback();
        this.time = setInterval(() => {
          this.callback();
        }, 100);
      }
    }
  }

  private keyupFunction(event: KeyboardEvent): void {
    if (event.code === this.keyCode) {
      if (this.time) clearInterval(this.time);
      this.keySafe = true;
    }
  }

  public unbind(): void {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}

export function initHandleMoveOnClick(
  // isMovingRef: React.MutableRefObject<boolean>,
  grid: number[][],
  currentPosition: { x: number; y: number },
  callback: (x: number, y: number) => void
) {
  const gameContainer = document.querySelector("#game-container");
  if (!gameContainer) return;
  const rect = gameContainer.getBoundingClientRect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameContainer.addEventListener("click", (event: any) => {
    // if (isMovingRef.current) return;
    // isMovingRef.current = true;
    try {
      const { x, y } = getGridCoordinates(event.pageX, event.pageY, rect);
      const race = astar(grid, [currentPosition.x, currentPosition.y], [x, y]);
      race?.forEach((position, index) => {
        setTimeout(() => {
          const newX = position[0];
          const newY = position[1];
          callback(newX, newY);
          // if (index === race.length - 1) isMoving = false;
        }, index * 200);
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  });
}

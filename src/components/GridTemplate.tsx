import { COLS } from "@/constant/config";
import { CLASS_MAP } from "@/constant/maps/class";
import classNames from "classnames";

const GridTemplate = () => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
      }}
      className="absolute inset-0 grid ">
      {CLASS_MAP.flat().map((item, index) => (
        <div
          key={index}
          className={classNames(
            "aspect-square outline outline-1 outline-white/30",
            item === 1 && "bg-red-600/50"
          )}></div>
      ))}
    </div>
  );
};

export default GridTemplate;

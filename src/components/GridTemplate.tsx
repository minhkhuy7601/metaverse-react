import { COLS } from "@/constant/config";
import { CLASS_MAP } from "@/constant/maps/class";
import classNames from "classnames";
import { useState } from "react";

const template = CLASS_MAP;

const GridTemplate = () => {
  const [renderMap, setRenderMap] = useState(() => {
    const temp = [];
    CLASS_MAP.forEach((i, index) =>
      i.forEach((item, j) => temp.push({ x: index, y: j, value: item }))
    );
    return temp;
  });

  console.log("renderMap", renderMap);
  console.log("template", template);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
      }}
      className="absolute inset-0 grid ">
      {renderMap?.map((item, index) => (
        <div
          onClick={() => {
            console.log("item", item);
            const newMap = JSON.parse(JSON.stringify(renderMap));
            if (newMap[index].value === 1) {
              newMap[index].value = 0;
              template[item.x][item.y] = 0;
            } else {
              newMap[index].value = 1;
              template[item.x][item.y] = 1;
            }

            setRenderMap(newMap);
          }}
          key={index}
          className={classNames(
            "aspect-square outline outline-1 outline-white/30",
            item.value === 1 && "bg-red-600/50"
          )}></div>
      ))}
    </div>
  );
};

export default GridTemplate;

import { COLS } from "@/constant/config";
import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import { setOpenMeeting } from "@/redux/slices/meetingRoomSlice";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const GridTemplate = () => {
  const { currentRoom, clickPositionMap } = useGamePlayContext();
  const dispatch = useDispatch();
  const [renderMap, setRenderMap] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const temp: Array<{ x: number; y: number; value: any }> = [];
    currentRoom.map.forEach((i, index) =>
      i.forEach((item, j) => temp.push({ x: index, y: j, value: item }))
    );
    return temp;
  });

  useEffect(() => {
    const temp: Array<{ x: number; y: number; value: any }> = [];
    currentRoom.map.forEach((i, index) =>
      i.forEach((item, j) => temp.push({ x: index, y: j, value: item }))
    );
    setRenderMap(temp);
  }, [currentRoom.map]);

  const handleClickItem = (x: number, y: number) => {
    if (currentRoom.actions?.[`${y},${x}`].type === "JOIN_MEETING") {
      // alert("show");
      dispatch(setOpenMeeting(true));
    }
  };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
      }}
      className="absolute inset-0 grid">
      {renderMap?.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            clickPositionMap.current.x = item.y;
            clickPositionMap.current.y = item.x;
            // console.log("first", item.x, item.y);
            // console.log("item", item);
            // const newMap = JSON.parse(JSON.stringify(renderMap));
            // if (newMap[index].value === 1) {
            //   newMap[index].value = 0;
            //   currentRoom.map[item.x][item.y] = 0;
            // } else {
            //   newMap[index].value = 1;
            //   currentRoom.map[item.x][item.y] = 1;
            // }
            // setRenderMap(newMap);
            // console.log("newMap", currentRoom.map);
          }}
          className={classNames(
            "aspect-square relative flex items-center justify-center"
            // "outline outline-1 outline-white/30",
            // item.value === 1 && "bg-red-600/50"
          )}>
          {currentRoom.actions?.[`${item.y},${item.x}`] && (
            <div className="w-fit h-full relative">
              {currentRoom.actions?.[`${item.y},${item.x}`]?.label && (
                <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-0.5 font-bold text-xs ring-1 whitespace-nowrap">
                  {currentRoom.actions?.[`${item.y},${item.x}`]?.label}
                </p>
              )}

              <img
                id={currentRoom.actions?.[`${item.y},${item.x}`].id}
                src={currentRoom.actions?.[`${item.y},${item.x}`].image}
                className={classNames(
                  "w-full h-full object-contain rounded-sm",
                  currentRoom.actions?.[`${item.y},${item.x}`].type ===
                    "POP_UP_QUESTION" && "scale-[1.2]",
                  currentRoom.actions?.[`${item.y},${item.x}`]?.styling
                )}
                onClick={() => {
                  handleClickItem(item.x, item.y);
                }}
                alt="alt"
              />
              {currentRoom.actions?.[`${item.y},${item.x}`].tooltip && (
                <span
                  className={classNames(
                    "hidden left-0 bg-[#ffffffc7] whitespace-nowrap text-xs w-fit absolute -top-8 font-bold p-1 px-2 rounded-full -translate-x-1/3 tooptip",
                    currentRoom.actions?.[`${item.y},${item.x}`].type ===
                      "POP_UP_QUESTION" && "-top-10"
                  )}>
                  {currentRoom.actions?.[`${item.y},${item.x}`].tooltip}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GridTemplate;

import classNames from "classnames";
import { useState } from "react";

const ChatBox = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={classNames(
        "w-80 h-full transition-all ease-linear duration-100 bg-[#28324E]",
        {
          "!w-20": !collapse,
        }
      )}>
      <div
        className="bg-white rounded-xl cursor-pointer w-8 h-8 flex items-center justify-center absolute top-2 right-2"
        onClick={() => setCollapse((e) => !e)}>
        X
      </div>
    </div>
  );
};

export default ChatBox;

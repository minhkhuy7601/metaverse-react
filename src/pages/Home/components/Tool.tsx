import {
  setActionToChatBox,
  setActionToMember,
} from "@/redux/slices/actionSlice";
import { RootState } from "@/redux/store";
import classNames from "classnames";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Tool = () => {
  const dispatch = useDispatch();
  const activeAction = useSelector(
    (state: RootState) => state.actionSlice.activeAction
  );
  console.log("activeAction", activeAction);
  return (
    <div className="h-16 bg-[#202540] w-full border-gray-100/20 flex justify-end">
      <div className="h-full flex items-center mr-10 gap-3">
        <button
          onClick={() => {
            dispatch(setActionToChatBox());
          }}
          className={classNames(
            "p-2 text-white flex justify-center items-center rounded-md hover:bg-indigo-400/20 duration-200",
            activeAction === "CHAT_BOX" && "bg-indigo-400/50"
          )}>
          <IoChatbubblesSharp size={22} />
        </button>
        <button
          onClick={() => {
            dispatch(setActionToMember());
          }}
          className={classNames(
            "p-2 text-white flex justify-center items-center rounded-md hover:bg-indigo-400/20 duration-200",
            activeAction === "MEMBER" && "bg-indigo-400/50"
          )}>
          <FaUserFriends size={22} />
        </button>
      </div>
    </div>
  );
};

export default Tool;

import { ReactNode } from "react";
import ChatBox from "./components/ChatBox";
import EditAvatarModal from "./components/EditAvatarModal";
import EditNameModal from "./components/EditNameModal";
import MemberBox from "./components/MemberBox";
import QuestionModal from "./components/QuestionModal";
import Tool from "./components/Tool";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <EditNameModal />
      <EditAvatarModal />
      <QuestionModal />

      <div className="w-screen h-screen top-0 flex relative left-0 overflow-hidden flex-col">
        <div className="bg-black flex w-full h-full">
          <div className="flex-1 relative h-full transition-all ease-linear duration-200 select-none">
            {children}
          </div>
          <ChatBox />
          <MemberBox />
        </div>
        <Tool />
      </div>
    </>
  );
};

export default Layout;

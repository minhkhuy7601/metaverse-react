import { ReactNode } from "react";
import ChatBox from "./components/ChatBox";
import Tool from "./components/Tool";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-black">
      {children}
      <Tool />
      <ChatBox />
    </div>
  );
};

export default Layout;

import { ReactNode } from "react";
import ChatBox from "./components/ChatBox";
import EditAvatarModal from "./components/EditAvatarModal";
import EditNameModal from "./components/EditNameModal";
import MemberBox from "./components/MemberBox";
import Tool from "./components/Tool";
import ModalQA from "@/components/ModalQA";

type LayoutProps = {
	children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<EditNameModal />
			<EditAvatarModal />

			<div className="w-screen h-screen top-0 flex relative left-0 overflow-hidden flex-col">
				<ModalQA />
				<div className="bg-black flex w-full h-full">
					<div className="flex-1 relative h-full transition-all ease-linear duration-200">
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

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScreenLoading from "./components/ScreenLoading";
import { GamePlayProvider } from "./contexts/GamePlayContext";
import GetStated from "./pages/GetStated";
import Home from "./pages/Home";

function App() {
	return (
		<Suspense fallback={<ScreenLoading />}>
			<GamePlayProvider>
				<Routes>
					<Route path="/" element={<GetStated />} />
					<Route path="/play" element={<Home />} />
				</Routes>
			</GamePlayProvider>
		</Suspense>
	);
}

export default App;

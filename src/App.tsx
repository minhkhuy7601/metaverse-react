import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScreenLoading from "./components/ScreenLoading";
import { GamePlayProvider } from "./contexts/GamePlayContext";
import GetStated from "./pages/GetStated";
import Home from "./pages/Home";
import Zoom from "./pages/Zoom";
import ZoomVideoSdk from "./pages/ZoomVideoSdk";

function App() {
  return (
    <Suspense fallback={<ScreenLoading />}>
      <GamePlayProvider>
        <Routes>
          <Route path="/" element={<GetStated />} />
          <Route path="/play" element={<Home />} />
          <Route path="/zoom" element={<ZoomVideoSdk />} />
          <Route path="/token" element={<Zoom />} />
        </Routes>
      </GamePlayProvider>
    </Suspense>
  );
}

export default App;

import GameContainer from "@/components/GameContainer";
import { GamePlayProvider } from "@/contexts/GamePlayContext";

const Home = () => {
  return (
    <GamePlayProvider>
      <GameContainer />
    </GamePlayProvider>
  );
};

export default Home;

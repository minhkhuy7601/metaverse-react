import GameContainer from "@/components/GameContainer";
import { GamePlayProvider } from "@/contexts/GamePlayContext";
import Layout from "./Layout";

const Home = () => {
  return (
    <GamePlayProvider>
      <Layout>
        <GameContainer />
      </Layout>
    </GamePlayProvider>
  );
};

export default Home;

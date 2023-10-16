import GameContainer from "@/components/GameContainer";
import MeetingRoom from "@/components/MeetingRoom";
import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <MeetingRoom />
      <GameContainer />
    </Layout>
  );
};

export default Home;

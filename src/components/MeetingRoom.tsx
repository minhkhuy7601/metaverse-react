import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import ZoomVideoSdk from "@/pages/ZoomVideoSdk";
import { RootState } from "@/redux/store";
import { generateZoomJWT } from "@/utils/generateZoomJWT";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MeetingRoom = () => {
  const { currentPlayer } = useGamePlayContext();
  console.log("currentPlayer", currentPlayer);
  const roomId = useSelector(
    (state: RootState) => state.meetingRoomSlice.roomId
  );
  const isOpen = useSelector(
    (state: RootState) => state.meetingRoomSlice.isOpenMeeting
  );

  const devConfig = useMemo(
    () => ({
      sdkKey: "",
      sdkSecret: "",
      webEndpoint: "zoom.us",
      topic: roomId,
      name: currentPlayer.name,
      password: "",
      signature: generateZoomJWT({
        topic: roomId as string,
        userIdentity: currentPlayer.name,
        password: "",
        roleType: 1,
      }),
      sessionKey: "",
      userIdentity: "",
      role: 1,
    }),
    [roomId, currentPlayer.name]
  );

  return <>{isOpen && roomId && <ZoomVideoSdk devConfig={devConfig} />}</>;
};

export default MeetingRoom;

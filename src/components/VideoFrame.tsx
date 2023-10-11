import { useGamePlayContext } from "@/hooks/useGamePlayContext";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const VideoFrame = () => {
  const isShowVideo = useSelector(
    (state: RootState) => state.videoSlice.isShow
  );
  const { currentRoom } = useGamePlayContext();
  return (
    <>
      {isShowVideo && (
        <iframe
          allow="camera; microphone; display-capture; autoplay; clipboard-write;"
          className="absolute w-full h-full top-0 left-0 z-50"
          src={currentRoom.meetingUrl}></iframe>
      )}
    </>
  );
};

export default VideoFrame;

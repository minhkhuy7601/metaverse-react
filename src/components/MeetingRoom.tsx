import { setOpenMeeting } from "@/redux/slices/meetingRoomSlice";
import { RootState } from "@/redux/store";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useDispatch, useSelector } from "react-redux";

const MeetingRoom = () => {
  const dispatch = useDispatch();
  const roomId = useSelector(
    (state: RootState) => state.meetingRoomSlice.roomId
  );
  const isOpen = useSelector(
    (state: RootState) => state.meetingRoomSlice.isOpenMeeting
  );

  return (
    <>
      {isOpen && roomId && (
        <div
          id="jitsi-meeting"
          className="fixed top-0 left-0 w-screen h-screen z-50">
          <JaaSMeeting
            appId={import.meta.env.VITE_APP_JITSI_ID}
            roomName={roomId as string}
            // jwt={import.meta.env.VITE_APP_JITSI_JWT}
            configOverwrite={{
              disableThirdPartyRequests: true,
              disableLocalVideoFlip: true,
              //   backgroundAlpha: 0.5,
            }}
            interfaceConfigOverwrite={{
              VIDEO_LAYOUT_FIT: "nocrop",
              MOBILE_APP_PROMO: false,
              TILE_VIEW_MAX_COLUMNS: 4,
            }}
            onReadyToClose={() => {
              dispatch(setOpenMeeting(false));
            }}
          />
        </div>
      )}
    </>
  );
};

export default MeetingRoom;

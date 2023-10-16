import { JaaSMeeting } from "@jitsi/react-sdk";

const Meeting = () => {
  return (
    <JaaSMeeting
      appId="hello"
      roomName="PleaseUseAGoodRoomName"
      configOverwrite={{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5,
      }}
      interfaceConfigOverwrite={{
        VIDEO_LAYOUT_FIT: "nocrop",
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4,
      }}
      // spinner = { SpinnerView }
      onApiReady={(externalApi) => {
        console.log("log", externalApi);
      }}
    />
  );
};

export default Meeting;

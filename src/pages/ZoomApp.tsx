import LoadingLayer from "@/components/zoomSdk/loading-layer";
import ZoomMediaContext from "@/contexts/media-context";
import zoomContext from "@/contexts/zoom-context";
import Video from "@/features/video/video";
import VideoNonSAB from "@/features/video/video-non-sab";
import VideoSingle from "@/features/video/video-single";
import ZoomVideo, { ConnectionState, ReconnectReason } from "@zoom/videosdk";
import { produce } from "immer";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

interface AppProps {
  meetingArgs: {
    sdkKey: string;
    topic: string;
    signature: string;
    name: string;
    password?: string;
    webEndpoint?: string;
    enforceGalleryView?: string;
    customerJoinId?: string;
    lang?: string;
  };
}

const mediaShape = {
  audio: {
    encode: false,
    decode: false,
  },
  video: {
    encode: false,
    decode: false,
  },
  share: {
    encode: false,
    decode: false,
  },
};

const mediaReducer = produce((draft, action) => {
  switch (action.type) {
    case "audio-encode": {
      draft.audio.encode = action.payload;
      break;
    }
    case "audio-decode": {
      draft.audio.decode = action.payload;
      break;
    }
    case "video-encode": {
      draft.video.encode = action.payload;
      break;
    }
    case "video-decode": {
      draft.video.decode = action.payload;
      break;
    }
    case "share-encode": {
      draft.share.encode = action.payload;
      break;
    }
    case "share-decode": {
      draft.share.decode = action.payload;
      break;
    }
    case "reset-media": {
      Object.assign(draft, { ...mediaShape });
      break;
    }
    default:
      break;
  }
}, mediaShape);

declare global {
  interface Window {
    webEndpoint: string | undefined;
    zmClient: any | undefined;
    mediaStream: any | undefined;
    crossOriginIsolated: boolean;
    ltClient: any | undefined;
  }
}

const ZoomApp = (props: AppProps) => {
  const {
    meetingArgs: {
      sdkKey,
      topic,
      signature,
      name,
      password,
      webEndpoint: webEndpointArg,
      enforceGalleryView,
      customerJoinId,
      lang,
    },
  } = props;
  console.log("props", props);
  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [isFailover, setIsFailover] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("closed");
  const [mediaState, dispatch] = useReducer(mediaReducer, mediaShape);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isSupportGalleryView, setIsSupportGalleryView] =
    useState<boolean>(true);
  const zmClient = useContext(zoomContext);
  let webEndpoint: any;
  if (webEndpointArg) {
    webEndpoint = webEndpointArg;
  } else {
    webEndpoint = window?.webEndpoint ?? "zoom.us";
  }
  const mediaContext = useMemo(
    () => ({ ...mediaState, mediaStream }),
    [mediaState, mediaStream]
  );
  const galleryViewWithoutSAB =
    Number(enforceGalleryView) === 1 && !window.crossOriginIsolated;
  useEffect(() => {
    const init = async () => {
      await zmClient.init("en-US", `${window.location.origin}/lib`, {
        webEndpoint,
        enforceMultipleVideos: galleryViewWithoutSAB,
        enforceVirtualBackground: galleryViewWithoutSAB,
        stayAwake: true,
      });
      try {
        setLoadingText("Joining the session...");
        await zmClient.join(topic, signature, name, password).catch((e) => {
          console.log(e);
        });
        const stream = zmClient.getMediaStream();
        console.log("stream", stream);
        setMediaStream(stream);
        setIsSupportGalleryView(stream.isSupportMultipleVideos());
        setIsLoading(false);
      } catch (e: any) {
        console.log("e", e);
        setIsLoading(false);
        // message.error(e.reason);
      }
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, [
    sdkKey,
    signature,
    zmClient,
    topic,
    name,
    password,
    webEndpoint,
    galleryViewWithoutSAB,
    customerJoinId,
  ]);
  const onConnectionChange = useCallback(
    (payload) => {
      if (payload.state === ConnectionState.Reconnecting) {
        setIsLoading(true);
        setIsFailover(true);
        setStatus("connecting");
        const { reason, subsessionName } = payload;
        if (reason === ReconnectReason.Failover) {
          setLoadingText("Session Disconnected,Try to reconnect");
        } else if (
          reason === ReconnectReason.JoinSubsession ||
          reason === ReconnectReason.MoveToSubsession
        ) {
          setLoadingText(`Joining ${subsessionName}...`);
        } else if (reason === ReconnectReason.BackToMainSession) {
          setLoadingText("Returning to Main Session...");
        }
      } else if (payload.state === ConnectionState.Connected) {
        setStatus("connected");
        if (isFailover) {
          setIsLoading(false);
        }
        window.zmClient = zmClient;
        window.mediaStream = zmClient.getMediaStream();

        console.log("getSessionInfo", zmClient.getSessionInfo());
      } else if (payload.state === ConnectionState.Closed) {
        setStatus("closed");
        dispatch({ type: "reset-media" });
        if (payload.reason === "ended by host") {
          //   Modal.warning({
          //     title: "Meeting ended",
          //     content: "This meeting has been ended by host",
          //   });
        }
      }
    },
    [isFailover, zmClient]
  );
  const onMediaSDKChange = useCallback((payload) => {
    const { action, type, result } = payload;
    dispatch({ type: `${type}-${action}`, payload: result === "success" });
  }, []);

  const onDialoutChange = useCallback((payload) => {
    console.log("onDialoutChange", payload);
  }, []);

  const onAudioMerged = useCallback((payload) => {
    console.log("onAudioMerged", payload);
  }, []);

  const onLeaveOrJoinSession = useCallback(async () => {
    if (status === "closed") {
      setIsLoading(true);
      await zmClient.join(topic, signature, name, password);
      setIsLoading(false);
    } else if (status === "connected") {
      await zmClient.leave();
      //   message.warn("You have left the session.");
    }
  }, [zmClient, status, topic, signature, name, password]);
  useEffect(() => {
    zmClient.on("connection-change", onConnectionChange);
    zmClient.on("media-sdk-change", onMediaSDKChange);
    zmClient.on("dialout-state-change", onDialoutChange);
    zmClient.on("merged-audio", onAudioMerged);
    return () => {
      zmClient.off("connection-change", onConnectionChange);
      zmClient.off("media-sdk-change", onMediaSDKChange);
      zmClient.off("dialout-state-change", onDialoutChange);
      zmClient.off("merged-audio", onAudioMerged);
    };
  }, [
    zmClient,
    onConnectionChange,
    onMediaSDKChange,
    onDialoutChange,
    onAudioMerged,
  ]);

  console.log("isSupportGalleryView", isSupportGalleryView);
  console.log("galleryViewWithoutSAB", galleryViewWithoutSAB);
  return (
    <>
      {loading && <LoadingLayer content={loadingText} />}
      {!loading && (
        <ZoomMediaContext.Provider value={mediaContext}>
          {isSupportGalleryView ? (
            <Video />
          ) : galleryViewWithoutSAB ? (
            <VideoNonSAB />
          ) : (
            <VideoSingle />
          )}
        </ZoomMediaContext.Provider>
      )}
    </>
  );
};

export default ZoomApp;

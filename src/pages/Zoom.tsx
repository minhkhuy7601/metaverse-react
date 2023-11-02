import { client } from "@/lib/zoomVideoSdk";
import { generateZoomJWT } from "@/utils/generateZoomJWT";
import ZoomVideo from "@zoom/videosdk";
import { useEffect, useState } from "react";

const Zoom = () => {
  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(" ");
  const [mediaStream, setMediaStream] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const init = async () => {
      await client.init("en-US", "CDN");

      try {
        setLoadingText("Joining Session...");
        const signature = generateZoomJWT({
          topic: "test",
          userIdentity: "Chrome",
          password: "pass",
          roleType: 1,
        });
        console.log("token", signature);
      } catch (err) {
        console.log("Error Joining Meeting", err);
        setIsLoading(false);
      }
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, []);

  return <div>Zoom</div>;
};

export default Zoom;

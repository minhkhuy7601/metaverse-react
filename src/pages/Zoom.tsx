import { client } from "@/lib/zoomVideoSdk";
import { generateZoomJWT } from "@/utils/generateZoomJWT";
import ZoomVideo from "@zoom/videosdk";
import { useEffect } from "react";

const Zoom = () => {
  useEffect(() => {
    const init = async () => {
      await client.init("en-US", "CDN");

      try {
        const signature = generateZoomJWT({
          topic: "test",
          userIdentity: "Chrome",
          password: "pass",
          roleType: 1,
        });
        console.log("token", signature);
      } catch (err) {
        console.log("Error Joining Meeting", err);
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

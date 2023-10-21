import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlineDownload } from "react-icons/ai";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";

const Recording = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, audio: true, screen: true });
  console.log("status", status);

  const downloadRecording = () => {
    const currentTimeSatmp = new Date().getTime();
    const pathName = `Screen_Recording_Metaverse_${currentTimeSatmp}.mp4`;
    try {
      const link = document.createElement("a");
      link.href = mediaBlobUrl as string;
      link.download = pathName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("status", status);
  console.log("mediaBlobUrl", mediaBlobUrl);
  return (
    <div className="h-10 w-auto flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {status && status !== "recording" && (
              <button
                onClick={() => {
                  navigator.mediaDevices
                    .getUserMedia({ video: true, audio: true })
                    .then(function (stream) {
                      console.log("ok");
                      // Media access granted, 'stream' contains the media data
                    })
                    .catch(function (error) {
                      // Handle errors, such as permission denied by the user
                      console.error("Error accessing media devices: ", error);
                    });
                  //   startRecording();
                }}
                className="h-full aspect-square bg-indigo-100/10 rounded-full flex items-center justify-center text-red-400">
                <BsFillRecordCircleFill />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-gray-600 border-none">
            <p className="text-white ">Start record</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {status && status === "recording" && (
              <button
                onClick={stopRecording}
                className="h-full aspect-square bg-indigo-100/10 rounded-full flex items-center justify-center text-red-400">
                <FaStop />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-gray-600 border-none">
            <p className="text-white ">Stop record</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {mediaBlobUrl && status && status === "stopped" && (
              <button
                onClick={downloadRecording}
                className="h-full aspect-square bg-indigo-100/10 rounded-full flex items-center justify-center text-red-400">
                <AiOutlineDownload size={25} />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-gray-600 border-none">
            <p className="text-white ">Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Recording;

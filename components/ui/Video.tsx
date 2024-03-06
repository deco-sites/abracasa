import VideoComponent from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
  video: VideoWidget;
  width?: number;
  height?: number;
  preload?: boolean;
  autoplay?: boolean;
  muted?: boolean;
}

export default function Video(
  { video, width, height, preload, autoplay, muted = false }: Props,
) {
  if (!video) return null;

  return (
    <VideoComponent
      src={video}
      width={width || 1250}
      height={height || 400}
      forceOptimizedSrc={preload}
      autoPlay={autoplay}
      muted={muted}
      class="w-full h-full object-cover"
    />
  );
}

import VideoComponent from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
  video: VideoWidget;
  width?: number;
  height?: number;
  preload?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  alt?: string;
  /**
   * @default true
   */
  loop?: boolean;
}

export default function Video(
  {
    video,
    width,
    height,
    preload,
    autoplay,
    alt,
    muted = false,
    controls = false,
    loop = true,
  }: Props,
) {
  return (
    <VideoComponent
      src={video}
      width={width || 1250}
      height={height || 400}
      alt={alt || "Descrição"}
      forceOptimizedSrc={preload}
      autoPlay={autoplay}
      muted={muted}
      controls={controls}
      loop={loop}
      class="w-full h-full object-cover object-center"
    />
  );
}

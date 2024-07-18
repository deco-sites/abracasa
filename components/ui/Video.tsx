import VideoComponent from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface VideoUploaded {
  /**
   * @default Video
   */
  "type": "Video";
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

export interface Youtube {
  /**
   * @default Youtube
   */
  "type": "Youtube";
  link: string;
  width: string;
  height: string;
}

export interface VideoProps {
  content: Youtube | VideoUploaded;
}

export interface Props {
  video: VideoProps;
}

export default function Video(
  {
    video,
  }: Props,
) {
  const { content } = video;

  if (content.type === "Youtube") {
    return (
      <div class="container overflow-hidden relative w-full">
        <iframe
          width={content.width || "560"}
          height={content.height || "315"}
          src={content.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
          allowTransparency
          class="flex items-center justify-center w-full"
        />
      </div>
    );
  }

  if (content.type === "Video") {
    return (
      <VideoComponent
        src={content.video}
        width={content.width || 1250}
        height={content.height || 400}
        alt={content.alt || "Descrição"}
        forceOptimizedSrc={content.preload}
        autoPlay={content.autoplay}
        muted={content.muted}
        controls={content.controls}
        loop={content.loop}
        class="w-full h-full object-cover object-center"
      />
    );
  }

  return null;
}

import Video from "apps/website/components/Video.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";

export interface VideoProps {
  content: VideoWidget;
  description: string;
  width?: number;
  height?: number;
}

export interface ImageProps {
  content: ImageWidget;
  description: string;
  width?: number;
  height?: number;
}

export interface Props {
  content: {
    animatedContent?: {
      type: "image" | "video";
      choose: ImageProps | VideoProps;
    };

    align: "center" | "start";
  };
}

export default function AdaptativeContent({ content }: Props) {
  return (
    <aside
      class={`${
        content.align === "center" ? "lg:items-center" : "lg:items-start"
      } flex flex-col justify-between items-center w-full p-4 gap-4`}
    >
      {content.animatedContent && (
        <>
          {content.animatedContent.type === "video"
            ? (
              <Video
                src={content.animatedContent.choose.content}
                width={content.animatedContent.choose.width ??
                  300}
                height={content.animatedContent.choose.height ??
                  600}
                alt={content.animatedContent.choose.description}
              />
            )
            : (
              <Image
                src={content.animatedContent.choose.content}
                width={content.animatedContent.choose.width ??
                  300}
                height={content.animatedContent.choose.height ??
                  600}
                alt={content.animatedContent.choose.description}
              />
            )}
        </>
      )}
    </aside>
  );
}

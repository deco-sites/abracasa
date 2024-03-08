import Image from "apps/website/components/Image.tsx";

import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: HTMLWidget;
  description?: HTMLWidget;
  button?: { link?: string; title?: string; target?: "_blank" | "_self" };
  aside?: {
    image: ImageWidget;
    width?: number;
    height?: number;
    description?: string;
  };
  /** @format color */
  backgroundColor?: string;
  mobileDevicePosition?:
    | "flex-row"
    | "flex-col"
    | "flex-row-reverse"
    | "flex-col-reverse";
  mediaDevicePosition?:
    | "md:flex-row"
    | "md:flex-col"
    | "md:flex-row-reverse"
    | "md:flex-col-reverse";
  removePaddingBottom?: boolean;
}

export default function ImageAndText({
  title,
  description,
  button,
  aside,
  backgroundColor,
  mobileDevicePosition = "flex-col",
  mediaDevicePosition = "md:flex-row",
  removePaddingBottom,
}: Props) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class={`${mobileDevicePosition} ${mediaDevicePosition} ${
        removePaddingBottom ? "pt-12" : "py-12"
      } flex lg:py-16 gap-12 lg:gap-6 w-full h-full justify-between items-center`}
    >
      <div class="flex flex-col gap-8 w-full md:max-w-[300px] mx-auto px-4 lg:px-0">
        <div class="flex flex-col gap-4 w-full">
          <div dangerouslySetInnerHTML={{ __html: title || "" }} />
          <div dangerouslySetInnerHTML={{ __html: description || "" }} />
        </div>

        {button && (
          <a
            href={button.link || "#"}
            target={button.target || "_blank"}
            class="flex items-center justify-center border border-black w-full text-black hover:bg-black hover:text-white transition-colors duration-300 py-2.5 px-1"
          >
            {button.title}
          </a>
        )}
      </div>

      {aside && (
        <div class="w-full md:max-w-[65%] h-full">
          <Image
            src={aside.image || ""}
            width={aside.width || 600}
            height={aside.height || 600}
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            preload={false}
          />
        </div>
      )}
    </div>
  );
}

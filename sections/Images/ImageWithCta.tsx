import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description mobile otimized image */
  mobile: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  image?: Banner;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  button?: {
    link?: string;
    title?: string;
    target?: "_blank" | "_self";
    isBold?: boolean;
  };
  /**
   * @format color-input
   */
  backgroundColor?: string;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <a
      href={image?.href ?? "#"}
      aria-label={image?.alt}
      class="relative h-full overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={mobile.width || 767}
          height={mobile.height || 972}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={desktop.width || 2000}
          height={desktop.height || 600}
        />
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

export default function ImageWithCta(
  { image, preload, backgroundColor, button }: Props,
) {
  return (
    <div
      style={{ backgroundColor }}
      class="flex flex-col gap-12 items-center justify-center w-full h-full pb-10"
    >
      {image && (
        <BannerItem
          image={image}
          lcp={preload}
        />
      )}

      {button && (
        <a
          href={button.link || "#"}
          target={button.target || "_blank"}
          class={`flex items-center justify-center border border-black w-full max-w-[80%] md:max-w-xs text-black hover:bg-black hover:text-white transition-colors duration-300 py-2.5 px-1 ${
            button.isBold ? "font-bold" : "font-medium"
          }`}
        >
          {button.title}
        </a>
      )}
    </div>
  );
}

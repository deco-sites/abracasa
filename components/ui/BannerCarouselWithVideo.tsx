import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video from "apps/website/components/Video.tsx";
import { useDevice } from "@deco/deco/hooks";
/**
 * @titleBy alt
 */
export interface Image {
  /**
   * @default Image
   */
  "type": "Image";
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
/**
 * @titleBy alt
 */
export interface Video {
  /**
   * @default Video
   */
  "type": "Video";
  /** @description desktop otimized image */
  desktop: {
    video: VideoWidget;
    width?: number;
    height?: number;
  };
  /** @description mobile otimized image */
  mobile: {
    video: VideoWidget;
    width?: number;
    height?: number;
  };
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
}
export interface Banner {
  banner: Image | Video;
}
export interface Props {
  banners?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}
function BannerItem({ image, lcp, id }: {
  image: Image;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop } = image;
  return (
    <a
      id={id}
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
function VideoItem({ id, video, lcp }: {
  video: Video;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop } = video;
  const device = useDevice();
  const isMobile = device === "mobile";
  return (
    <a
      id={id}
      href={video?.href ?? "#"}
      aria-label={video?.alt}
      class="relative overflow-y-hidden w-full h-full xl:max-h-[564px]"
    >
      {isMobile
        ? (
          <Video
            src={mobile.video}
            width={mobile.width || 767}
            height={mobile.height || 972}
            forceOptimizedSrc={lcp}
            loop={video.loop}
            autoplay={video.autoplay}
            muted={video.muted}
            controls={video.controls}
            alt={alt}
          />
        )
        : (
          <Video
            src={desktop.video}
            width={desktop.width || 2000}
            height={desktop.height || 564}
            forceOptimizedSrc={lcp}
            loop={video.loop}
            autoplay={video.autoplay}
            muted={video.muted}
            controls={video.controls}
            alt={alt}
          />
        )}
    </a>
  );
}
function Dots({ banners, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {banners?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-[40px] sm:w-[100px] h-1 group-disabled:animate-progress bg-gradient-to-r from-firebrick from-[length:var(--dot-progress)] to-white to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}
function BannerCarousel({ banners, interval, preload }: Props) {
  const id = useId();
  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {banners?.map((item, index) => {
          const params = { promotion_name: item.banner.alt };
          if (item.banner.type === "Image") {
            return (
              <Slider.Item index={index} class="carousel-item w-full">
                <BannerItem
                  image={item.banner}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          }
          if (item.banner.type === "Video") {
            return (
              <Slider.Item index={index} class="carousel-item w-full">
                <VideoItem
                  video={item.banner}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          }
          return null;
        })}
      </Slider>

      {banners && banners.length > 1 && (
        <>
          <Buttons />

          <Dots banners={banners} interval={interval} />

          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </>
      )}
    </div>
  );
}
export default BannerCarousel;

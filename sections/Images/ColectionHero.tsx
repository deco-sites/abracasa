import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import type {
  ImageWidget as LiveImage,
  RichText,
  VideoWidget,
} from "apps/admin/widgets.ts";

interface Props {
  /** @description turn this option true to limit title max width */
  limitTitleText?: boolean;
  title?: RichText;
  /** @description Line Height of the text */
  lineHeightTitle?: number;
  titleMobile?: RichText;
  /** @description Line Height of the text */
  lineHeightTitleMobile?: number;
  button?: {
    link?: string;
    title?: string;
    target?: "_blank" | "_self";
    isBold?: boolean;
  };
  image?: {
    /** @description insert a video if you want to show it instead of an image */
    video?: VideoWidget;
    /** @description desktop otimized image */
    desktop?: LiveImage;
    width?: number;
    height?: number;
    /** @description mobile otimized image */
    mobile?: LiveImage;
    widthMobile?: number;
    heightMobile?: number;
    alt?: string;
    link?: string;
  }[];
}

function ColectionHero({
  limitTitleText,
  title,
  lineHeightTitle,
  titleMobile,
  lineHeightTitleMobile,
  button,
  image,
}: Props) {
  return (
    <div class="mt-[72px] lg:mt-[172px] relative">
      <div class="max-w-[1210px] mx-auto font-inter">
        <div class="flex flex-col gap-7 lg:mx-7 xl:mx-0">
          <h2
            class={`font-semibold mx-6 lg:mx-0 hidden lg:block leading-[1.2] tracking-wider ${
              limitTitleText ? "max-w-[495px] sliderP !font-light" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
            style={{ lineHeight: lineHeightTitle || "", }}
          />
          <h2
            class={`font-semibold mx-6 lg:mx-0 lg:hidden ${
              limitTitleText ? "max-w-[495px] sliderP !font-light" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: titleMobile ?? "" }}
            style={{lineHeight: lineHeightTitleMobile}}
          />
          {button && (
            <a
              href={button.link || "#"}
              target={button.target || "_blank"}
              class={`w-fit flex mx-6 lg:mx-0 items-center justify-center border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 py-2.5 px-12 ${
                button.isBold ? "font-bold" : "font-medium"
              }`}
            >
              {button.title}
            </a>
          )}
          <ul class="flex flex-col lg:flex-row items-center gap-7">
            {image?.map((img, index) => (
              <li
                class={`${
                  index === 1
                    ? `xl:absolute ${
                        img.video
                          ? "xl:top-[-65px] xl:right-[3%]"
                          : "xl:right-0 xl:top-0 "
                      }`
                    : ""
                }`}
              >
                {img.video ? (
                  <>
                    <Video
                      src={img.video}
                      width={588}
                      height={798}
                      controls={true}
                      alt={img.alt}
                      class="hidden lg:block h-[798px] object-fill"
                    />
                    <Video
                      src={img.video}
                      width={323}
                      height={397}
                      alt={img.alt}
                      controls={true}
                      class="lg:hidden h-[397px] object-fill"
                    />
                  </>
                ) : (
                  <a href={img.link}>
                    <Image
                      src={img.desktop ?? ""}
                      alt={img.alt}
                      width={img.width ?? 588}
                      height={img.height ?? 798}
                      loading="lazy"
                      decoding="async"
                      class="hidden lg:block"
                    />
                    <Image
                      src={img.mobile ?? ""}
                      alt={img.alt}
                      width={img.widthMobile ?? 323}
                      height={img.heightMobile ?? 397}
                      loading="lazy"
                      decoding="async"
                      class="lg:hidden"
                    />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ColectionHero;

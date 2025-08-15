import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import type {
  ImageWidget as LiveImage,
  RichText,
  VideoWidget,
} from "apps/admin/widgets.ts";
import Slider from "deco-sites/abracasa/components/ui/Slider.tsx";
import SliderJS from "deco-sites/abracasa/islands/SliderJS.tsx";
import { useId } from "deco-sites/abracasa/sdk/useId.ts";

interface Props {
  mobileSlider?: boolean;
  /** @description turn this option true to limit title max width */
  limitTitleText?: boolean;
  title?: RichText;
  /** @description Line Height of the text */
  lineHeightTitle?: number;
  titleMobile?: RichText;
  /** @description Line Height of the text */
  lineHeightTitleMobile?: number;
  dobleTitle?: boolean;
  TitleTwo?: RichText;
  lineHeightTitleTwo?: number;
  TitleTwoMobile?: RichText;
  lineHeightTitleTwoMobile?: number;
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
  twoText?: boolean;
  textTwo?: RichText;
  lineHeightTextTwo?: number;
  textTwoMobile?: RichText;
  lineHeightTextTwoMobile?: number;
}

function ColectionHero({
  mobileSlider,
  limitTitleText,
  title,
  lineHeightTitle,
  titleMobile,
  lineHeightTitleMobile,
  button,
  image,
  twoText,
  textTwo,
  dobleTitle,
  TitleTwo,
  lineHeightTitleTwo,
  TitleTwoMobile,
  lineHeightTitleTwoMobile,
  lineHeightTextTwo,
  textTwoMobile,
  lineHeightTextTwoMobile
}: Props) {
  const id = useId();
  return (
    <div class="mt-[72px] lg:mt-[172px] relative">
      <div class="max-w-[1210px] mx-auto font-inter">
        <div
          class={`flex flex-col lg:mx-7 xl:mx-0 ${twoText ? "gap-0" : "gap-7"}`}
        >
          <h2
            class={`mx-6 lg:mx-0 hidden lg:block leading-[1.2] ${
              twoText ? "font-thin sliderP tracking-[6px]" : "font-semibold tracking-wider"
            } ${limitTitleText ? "max-w-[495px] sliderP !font-light" : ""}`}  
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
            style={{ lineHeight: lineHeightTitle || "" }}
          />
          <h2
            class={`font-semibold mx-6 lg:mx-0 lg:hidden
              ${twoText ? "font-thin sliderP tracking-widest" : "font-semibold tracking-wider"}
              ${limitTitleText ? "max-w-[495px] sliderP !font-light" : ""}`}
            dangerouslySetInnerHTML={{ __html: titleMobile ?? "" }}
            style={{ lineHeight: lineHeightTitleMobile }}
          />
          {dobleTitle && (
            <>
              <h2
                class={`font-normal mx-6 lg:mx-0 hidden lg:block leading-[1.2] 
                  ${twoText ? "sliderP mb-[134px] tracking-normal" : "tracking-wider"}
                  ${limitTitleText ? "max-w-[495px] sliderP !font-light" : ""}`}
                dangerouslySetInnerHTML={{ __html: TitleTwo ?? "" }}
                style={{ lineHeight: lineHeightTitleTwo || "" }}
              />
              <h2
                class={`font-normal mb-[68px] mx-6 lg:mx-0 lg:hidden 
                  ${twoText ? "sliderP" : ""}
                  ${limitTitleText ? "max-w-[495px] sliderP !font-light" : ""}`}
                dangerouslySetInnerHTML={{ __html: TitleTwoMobile ?? "" }}
                style={{ lineHeight: lineHeightTitleTwoMobile }}
              />
            </>
          )}
          {button?.title && button?.link && (
            <a
              href={button.link || "#"}
              target={button.target || "_blank"}
              class={`w-fit flex mx-6 lg:mx-0 items-center justify-center border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 py-2.5 px-12
                ${twoText ? "mb-7" : ""}
                ${
                button.isBold ? "font-bold" : "font-medium"
              }`}
            >
              {button.title}
            </a>
          )}
          {mobileSlider && (
            <>
              <Slider class="carousel carousel-center snap-mandatory scroll-smooth gap-[12px] col-span-full row-start-2 row-end-5 ml-6 lg:mt-8 lg:hidden">
                {image?.map((img, index) => (
                  <Slider.Item
                    key={index}
                    index={index}
                    class="carousel-item w-[276px] group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
                  >
                    {img.video ? (
                      <Video
                        src={img.video}
                        width={323}
                        height={362}
                        controls={true}
                        alt={img.alt}
                        class="h-[362px] object-fill"
                      />
                    ) : (
                      <a href={img.link}>
                        <Image
                          src={img.mobile ?? ""}
                          alt={img.alt}
                          width={img.widthMobile ?? 323}
                          height={img.heightMobile ?? 362}
                          loading="lazy"
                          decoding="async"
                          class="h-[362px]"
                        />
                      </a>
                    )}
                  </Slider.Item>
                ))}
              </Slider>
              <SliderJS rootId={id} />
            </>
          )}
          <ul
            class={`lg:flex flex-col lg:flex-row items-center gap-7 ${
              mobileSlider ? "hidden" : "flex"
            } `}
          >
            {image?.map((img, index) => (
              <li
                key={index}
                class={`${
                  index === 1
                    ? img.video
                      ? "xl:absolute xl:top-[-65px] xl:right-[3%]"
                      : "xl:absolute xl:right-0 xl:top-0"
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
          {twoText ? (
            <div class="flex mt-[85px] justify-start xl:justify-end">
              <h2
                class="sliderP font-normal hidden lg:block text-left xl:absolute xl:bottom-[239px] xl:w-[588px] xl:right-0"
                style={{ lineHeight: lineHeightTextTwo || "" }}
                dangerouslySetInnerHTML={{ __html: textTwo ?? "" }}
              />
              <h2
                class="sliderP font-normal lg:hidden mx-6 text-left xl:absolute xl:bottom-[239px] xl:w-[588px] xl:right-0"
                style={{ lineHeight: lineHeightTextTwoMobile || "" }}
                dangerouslySetInnerHTML={{ __html: textTwoMobile ?? "" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ColectionHero;

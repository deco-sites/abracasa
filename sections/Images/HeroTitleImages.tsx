import type { ImageWidget as LiveImage, RichText } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * When `true`, reverses the order of elements by applying `flex-row-reverse` for row layouts
   * and `flex-col-reverse` for column layouts, flipping the flex container's direction.
   */
  reverse?: boolean;
  /** @description Desktop title */
  title?: RichText;
  /** @description Line Height of the text */
  lineHeightTitle?: number;
  /** @description Mobile title */
  titleMobile?: RichText;
  /** @description Line Height of the text */
  lineHeightTitleMobile?: number;

  /** @description Turn this option true to make text fix on center justified */
  justifyCenter: boolean;
  /** @description Set this option to place text at the end of the line */
  justifyEnd?: boolean;
  image: {
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
  /** @description Image that will fill all width */
  mainImage?: {
    desktop?: LiveImage;
    mobile?: LiveImage;
    finalText?: string;
  }[];
  /** @description Two text*/
  showTwoText?: boolean;
  /** @description Desktop description */
  description?: RichText;
  /** @description Line Height of the text */
  lineHeightDescription?: number;
  /** @description Mobile description */
  descriptionMobile?: RichText;
  /** @description Line Height of the text */
  lineHeightDescriptionMobile?: number;
}

export const getLayoutClasses = ({ reverse }: { reverse?: boolean }) => {
  const reversePosition = reverse ? "flex-col-reverse" : "flex-col";
  const container = reverse
    ? `pt-[68px] lg:pt-[170px]`
    : "mt-[72px] lg:mt-[172px]";

  return {
    reverse: `${reversePosition}`,
    container: `${container}`,
  };
};

function HeroTitleImages({
  reverse,
  title,
  lineHeightTitle,
  titleMobile,
  lineHeightTitleMobile,
  justifyCenter,
  image,
  mainImage = [],
  showTwoText = false,
  description,
  lineHeightDescription,
  descriptionMobile,
  lineHeightDescriptionMobile,
  justifyEnd,
}: Props) {
  const id = useId();

  const { container, reverse: reversePosition } = getLayoutClasses({
    reverse,
  });

  return (
    <div id={id} class={`${container}`}>
      <div class="max-w-[1196px] mx-auto">
        <div class={`flex font-inter ${reversePosition}`}>
          <h1
            class={`sliderP leading-[1] hidden lg:block mx-6 xl:mx-0 mb-7 ${
              justifyEnd
                ? "font-semibold text-left lg:mb-[164px]"
                : "lg:mb-[66px]"
            }
                ${reverse ? " pt-[117px]" : "mb-[51px] lg:mb-[154px]"} ${
              justifyCenter
                ? "max-w-[782px] !font-light tracking-wider !mx-auto leading-6"
                : ""
            }`}
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
            style={{
              lineHeight: lineHeightTitle || "",
              fontWeight: `${reverse ? 700 : 600}`,
              fontSize: `${reverse && "26px"}`,
            }}
          />
          <h1
            class={`sliderP mx-6 leading-[1] font-semibold lg:mb-[66px] lg:hidden ${
              justifyEnd
                ? "pt-[29px] mb-[101px]"
                : "pt-[49px] mb-7"
            } ${
              justifyCenter
                ? "max-w-[782px] !font-light tracking-wider mb-[51px] lg:mb-[154px] leading-6"
                : ""
            }`}
            dangerouslySetInnerHTML={{ __html: titleMobile ?? "" }}
            style={{
              lineHeight: lineHeightTitleMobile || "",
              fontWeight: `${reverse ? 700 : 600}`,
            }}
          />

          {/* Desktop view */}
          <ul class="hidden lg:flex gap-[18px] mx-6 xl:mx-0">
            {image?.map((img) => (
              <li class="w-full">
                <a href={img.link}>
                  <Image
                    src={img.desktop ?? ""}
                    alt={img.alt}
                    width={img.width ?? 386}
                    height={img.height ?? 563}
                    loading="lazy"
                    decoding="async"
                    class={` ${reverse && "object-cover h-full w-full"}`}
                  />
                </a>
              </li>
            ))}
          </ul>
          {showTwoText ? (
            <div
              class={`${justifyEnd ? "flex lg:justify-end lg:mr-[218px]" : ""}`}
            >
              <h1
                class={`sliderP  leading-[1] hidden lg:block mx-6 xl:mx-0 mb-7 lg:mt-[165px] ${
                  justifyEnd
                    ? "font-semibold text-left lg:mb-[44px] lg:mt-[164px]"
                    : ""
                } ${
                  justifyCenter
                    ? "max-w-[782px] !font-light tracking-wider !mx-auto leading-6"
                    : ""
                }`}
                dangerouslySetInnerHTML={{ __html: description ?? "" }}
                style={{
                  lineHeight: lineHeightDescription || "",
                }}
              />
            </div>
          ) : null}

          {/* Mobile view */}
          <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-3 col-span-full row-start-2 row-end-5 ml-6 lg:mt-8 lg:hidden">
            {image?.map((img, index) => (
              <Slider.Item
                index={index}
                class={`carousel-item w-[276px] group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300 ${
                  justifyCenter ? "min-h-[362px]" : ""
                }`}
              >
                <a href={img.link}>
                  <Image
                    src={img.mobile ?? ""}
                    alt={img.alt}
                    width={img.widthMobile ?? 278}
                    height={img.heightMobile ?? 403}
                    loading="lazy"
                    decoding="async"
                    class={` 
                      ${reverse && "min-h-[403px] object-cover h-full w-full"}`}
                  />
                </a>
              </Slider.Item>
            ))}
          </Slider>
          <SliderJS rootId={id} />

          {showTwoText ? (
            <div
              class={`${justifyEnd ? "flex lg:justify-end lg:mr-[218px]" : ""}`}
            >
              <h1
                class={`sliderP mx-6 leading-[1] font-semibold pt-[49px] lg:mt-[82px] lg:hidden 
                    ${
                      justifyEnd
                        ? "mb-[18px] pt-[82px]"
                        : "mb-7 pt-[49px]"
                    }
                    ${
                      justifyCenter
                        ? "max-w-[782px] !font-light tracking-wider mb-[51px] lg:mt-[154px] leading-6"
                        : ""
                    }`}
                dangerouslySetInnerHTML={{ __html: descriptionMobile ?? "" }}
                style={{
                  lineHeight: lineHeightDescriptionMobile || "",
                }}
              />
            </div>
          ) : null}

          {Array.isArray(mainImage) &&
            mainImage.map((main) => (
              <div class="flex flex-col justify-center items-center gap-7 lg:gap-16 mb-6 mt-7 lg:mt-[48px]">
                <>
                  <Image
                    src={main.desktop ?? ""}
                    alt={main.finalText}
                    width={1210}
                    height={591}
                    loading="lazy"
                    decoding="async"
                    class="hidden lg:block"
                  />

                  <Image
                    src={main.mobile ?? ""}
                    alt={main.finalText}
                    width={376}
                    height={186}
                    loading="lazy"
                    decoding="async"
                    class="lg:hidden w-full"
                  />
                </>

                {main.finalText && (
                  <span
                    class="text-2xl font-normal text-[#212121] text-center"
                    dangerouslySetInnerHTML={{
                      __html: main.finalText,
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HeroTitleImages;

export function LoadingFallback() {
  return (
    <div style={{ height: "650px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

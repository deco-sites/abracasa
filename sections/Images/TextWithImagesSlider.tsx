import Image from "apps/website/components/Image.tsx";
import type { ImageWidget as LiveImage, RichText } from "apps/admin/widgets.ts";
import Slider from "deco-sites/abracasa/components/ui/Slider.tsx";
import SliderJS from "deco-sites/abracasa/islands/SliderJS.tsx";
import { useId } from "deco-sites/abracasa/sdk/useId.ts";

interface Props {
  reverseMob?: boolean;
  text?: RichText;
  lineHeightText: number;
  textMobile?: RichText;
  lineHeightTextMobile?: number;
  images?: {
    desktop: LiveImage;
    mobile: LiveImage;
    alt?: string;
    width?: number;
    height?: number;
    widthMobile?: number;
    heightMobile?: number;
  }[];
}

export default function TextWithImagesSlider({
  /** @description leave text below images on mobile */
  reverseMob,
  text,
  lineHeightText,
  textMobile,
  lineHeightTextMobile,
  images = [],
}: Props) {
  const id = useId();
  return (
    <section class= {`pl-6 mx-auto xl:pl-0 max-w-[1210px] w-full xl:mx-auto xl:mt-[79px] mt-[60px] flex xl:flex-row items-start ${reverseMob ? "flex-col-reverse lg:mb-[67px] mb-0" : "flex-col"}`} >
      <div
        class="hidden xl:block sliderP font-normal w-1/3 text-left mr-[133px] my-auto"
        dangerouslySetInnerHTML={{ __html: text || "" }}
        style={{ lineHeight: lineHeightText || "" }}
      />
      <div
        class={`xl:hidden mr-6 block sliderP font-normal text-left ${reverseMob ? "mt-[65px] mb-0" : "mb-[60px] "}`}
        dangerouslySetInnerHTML={{ __html: textMobile || "" }}  
        style={{ lineHeight: lineHeightTextMobile || "" }}
      />

        <Slider class="carousel w-full carousel-center snap-mandatory scroll-smooth xl:hidden gap-3 col-span-full row-start-2 row-end-5">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              key={index}
              class="carousel-item snap-center max-w-[276px] group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={img.mobile}
                alt={img.alt || ""}
                width={276}
                height={290}
                class="object-cover"
              />
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />

      <div class="hidden xl:flex w-full xl:w-2/3 gap-[22px]">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.desktop}
            alt={img.alt || ""}
            width={img.width || 397}
            height={img.height || 464}
            class="object-cover"
          />
        ))}
      </div>
    </section>
  );
}

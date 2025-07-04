import { RichText } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { asset } from "$fresh/runtime.ts";
import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";

interface TimeText {
  date?: number;
  text?: RichText;
  lineHeight?: number;
}

interface Props {
  title?: RichText;
  lineHeightTitle?: number;
  titleMobile?: RichText;
  lineHeightTitleMobile?: number;
  timeItems?: TimeText[];
}

function TimelineSlider({
  title,
  lineHeightTitle,
  titleMobile,
  lineHeightTitleMobile,
  timeItems,
}: Props) {
  const id = useId();
  return (
    <div>
      <div
        id={id}
        class="max-w-[1196px] mx-auto flex flex-col gap-[49px] md:gap-32"
      >
        <span
          class="sliderP mt-[51px] md:mt-[126px] max-w-[782px] max-lg:mx-6 mx-auto font-inter hidden md:block"
          dangerouslySetInnerHTML={{ __html: title ?? "" }}
          style={{ lineHeight: lineHeightTitle || "" }}
        />
        <span
          class="sliderP mt-[51px] md:mt-[126px] max-w-[782px] max-lg:mx-6 mx-auto font-inter md:hidden"
          dangerouslySetInnerHTML={{ __html: titleMobile ?? "" }}
          style={{ lineHeight: lineHeightTitleMobile || "" }}
        />

        <div class="flex flex-col">
          <div class="flex w-full gap-4 md:gap-8 max-lg:mb-7 mb-[40px] justify-end md:mr-0 px-6 md:px-0">
            <Slider.PrevButton class="btn btn-circle btn-outline max-lg:!w-8 max-lg:!h-8 max-lg:!min-w-8 max-lg:!min-h-8 bg-transparent border-[#30303033]">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
            <Slider.NextButton class="btn btn-circle btn-outline max-lg:!w-8 max-lg:!h-8 max-lg:!min-w-8 max-lg:!min-h-8 bg-transparent border-[#30303033]">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
          <img
            class="object-cover w-full mb-[38px] hidden md:block"
            src={asset("/image/timeline.png")}
            width={1194}
            height={12}
            alt="Barra linha do tempo"
            loading="lazy"
          />
          <img
            class="object-cover w-full pl-6 mb-[38px] md:hidden"
            src={asset("/image/timeline-mobile.png")}
            width={1194}
            height={12}
            alt="Barra linha do tempo"
            loading="lazy"
          />
          <Slider class="carousel carousel-center md:carousel-end snap-mandatory scroll-smooth sm:snap-end gap-12 md:gap-[105px] col-span-full row-start-2 row-end-5 ml-[48px] lg:ml-[80px]">
            {timeItems?.map((item, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[170px] md:w-[198px] font-inter flex flex-col gap-2"
              >
                <span class="text-[#212121] font-bold text-[23px] md:text-[33px] mb-2">
                  {item.date}
                </span>
                <span
                  class="text-[#212121] sliderP"
                  style={{ lineHeight: item.lineHeight }}
                  dangerouslySetInnerHTML={{ __html: item.text ?? "" }}
                />
              </Slider.Item>
            ))}
          </Slider>
          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}

export default TimelineSlider;

export function LoadingFallback() {
  return (
    <div style={{ height: "320px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

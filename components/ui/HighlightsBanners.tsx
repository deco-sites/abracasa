import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  color?: {
    changeBackgroundColor?: boolean;
    /**
     * @format color
     **/
    backgroundColor?: string;
  };
  textCenter?: boolean;
  title: string;
  interval?: number;
  showBarSlider?: boolean;
  cards?: Array<{
    image: {
      icon: ImageWidget;
      alt?: string;
      isBorder?: boolean;
    };
    link?: string;
    description?: string;
    subDescription?: string;
    showNewTitle?: boolean;
    titleAndSubtitle?: {
      newTitle?: string;
      subTitle?: string;
      button?: {
        title?: string;
      };
    };
  }>;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass">
          <Icon
            class="text-base-100 rotate-180"
            size={24}
            id="ChevronRight"
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

export default function CategoryList({
  color,
  textCenter,
  title,
  showBarSlider,
  cards,
  interval,
}: Props) {
  const id = useId();

  return (
    <section
      style={
        color?.changeBackgroundColor
          ? { background: color.backgroundColor }
          : {}
      }
      class={`${textCenter ? "mb-[130px]" : ""} flex flex-col flex-grow w-full h-full items-center justify-center bg-white pt-8 pb-12`}
    >
      {title && (
        <div
          class={`${
            textCenter ? "text-center " : "text-left"
          } w-full container max-w-[850px] lg:max-w-[85%] mb-[14px] px-5 lg:px-0`}
        >
          <h2
            class={` ${
              textCenter ? "font-inter lg:text-3xl text-[24px] mt-[6px] mb-[24px]" : "text-2xl"
            } font-normal text-dimgray lg:leading-[49px]`}
          >
            {title}
          </h2>
        </div>
      )}

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] container lg:max-w-[85%] h-full pl-6 sm:pl-0"
      >
        {showBarSlider ? (
          <div class="overflow-x-scroll lg:overflow-hidden scrollbar-category snap-x snap-mandatory scroll-smooth col-span-full row-span-full pb-6">
            <div class="flex gap-6">
              {cards?.map((card, index) => (
                <div
                  key={index}
                  class="snap-start w-[75%] md:w-[262px] xl:w-[32%] flex-shrink-0 flex flex-col items-start justify-start"
                >
                  <div class="flex flex-col w-full h-full">
                    <a class="relative" href={card.link}>
                      <Image
                        class={`${
                          card.image.isBorder ? "rounded-full" : "rounded-none"
                        }`}
                        src={card.image.icon}
                        alt={card.image.alt}
                        width={500}
                        height={640}
                        loading="lazy"
                        decoding="async"
                        preload={false}
                      />
                      {card.showNewTitle ? (
                        <div class="absolute font-inter flex flex-col inset-0 items-start justify-end pl-[10px] pb-[10px] lg:pl-[30px] lg:pb-[30px] text-center">
                          <h1 class="font-bold text-[24px] lg:text-[32px] text-white">
                            {card.titleAndSubtitle?.newTitle}
                          </h1>
                          <h2 class="font-light text-[12px] lg:text-[16px] text-white tracking-wide mb-3">
                            {card.titleAndSubtitle?.subTitle}
                          </h2>
                          {card.titleAndSubtitle?.button ? (
                            <button class="text-white border-2 border-white font-semibold text-[12px] lg:text-[14px] py-2 px-2 bg-transparent max-w-[120px] w-full">
                              {card.titleAndSubtitle?.button.title}
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </a>

                    {card.description && (
                      <div class="flex flex-col w-full h-full mt-2 text-base leading-[22px]">
                        <h3 class="text-lg font-semibold text-start">
                          {card.description}
                        </h3>
                        <p class="text-base font-normal text-start">
                          {card.subDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 h-full">
            {cards?.map((card, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[75%] md:w-[262px] xl:w-[32%] h-full flex flex-col items-start justify-start"
              >
                <div class="flex flex-col w-full h-full">
                  <a class="relative" href={card.link}>
                    <Image
                      class={`${
                        card.image.isBorder ? "rounded-full" : "rounded-none"
                      }`}
                      src={card.image.icon}
                      alt={card.image.alt}
                      width={500}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      preload={false}
                    />
                    {card.showNewTitle ? (
                      <div class="absolute font-inter flex flex-col inset-0 items-start justify-end pl-[10px] pb-[10px] lg:pl-[30px] lg:pb-[30px] text-center">
                        <h1 class="font-bold text-[24px] lg:text-[32px] text-white">
                          {card.titleAndSubtitle?.newTitle}
                        </h1>
                        <h2 class="font-light text-[12px] lg:text-[16px] text-white tracking-wide mb-3">
                          {card.titleAndSubtitle?.subTitle}
                        </h2>
                        {card.titleAndSubtitle?.button ? (
                          <button class="text-white border-2 border-white font-semibold text-[12px] lg:text-[14px] py-2 px-2 bg-transparent max-w-[120px] w-full">
                            {card.titleAndSubtitle?.button.title}
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </a>

                  {card.description && (
                    <div class="flex flex-col w-full h-full mt-2 text-base leading-[22px]">
                      <h3 class="text-lg font-semibold text-start">
                        {card.description}
                      </h3>
                      <p class="text-base font-normal text-start">
                        {card.subDescription}
                      </p>
                    </div>
                  )}
                </div>
              </Slider.Item>
            ))}
          </Slider>
        )}

        {!showBarSlider && cards?.length && cards?.length > 3 && <Buttons />}
        {!showBarSlider && (
          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        )}
      </div>
    </section>
  );
}


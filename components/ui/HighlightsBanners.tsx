import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  title: string;
  interval?: number;
  cards?: Array<{
    image: {
      icon: ImageWidget;
      alt?: string;
      isBorder?: boolean;
    };

    link?: string;
    description: string;
    subDescription: string;
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

export default function CategoryList({ title, cards, interval }: Props) {
  const id = useId();

  return (
    <section class="flex flex-col flex-grow w-full h-full items-center justify-center bg-white pt-8 pb-12">
      <div class="flex items-center justify-center text-center mb-6">
        <h2 class="text-2xl lg:text-4xl font-normal text-dimgray lg:leading-[49px]">
          {title}
        </h2>
      </div>

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] container max-w-[850px] xl:max-w-[82%] h-full px-2 lg:px-0"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 h-full">
          {cards?.map((card, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[75%] md:w-[262px] xl:w-[32%] h-full flex flex-col items-start justify-start"
            >
              <div class="flex flex-col w-full h-full">
                <a href={card.link}>
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
                </a>

                <div class="flex flex-col w-full h-full mt-2 text-base leading-[22px]">
                  <h3 class="text-lg font-semibold text-start">
                    {card.description}
                  </h3>

                  <p class="text-base font-normal text-start">
                    {card.subDescription}
                  </p>
                </div>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <Buttons />

        {/* <Dots cards={cards} interval={interval} /> */}

        <SliderJS
          rootId={id}
          interval={interval && interval * 1e3}
          infinite
        />
      </div>
    </section>
  );
}

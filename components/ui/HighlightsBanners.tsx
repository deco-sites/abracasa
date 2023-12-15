import Image from "apps/website/components/Image.tsx";
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

function Dots({ cards, interval = 0 }: Pick<Props, "interval" | "cards">) {
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
      <ul class="flex lg:hidden carousel translate-y-7 justify-center col-span-full gap-4 z-10 row-start-4">
        {cards?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-3 h-3 rounded-full group-disabled:animate-progress bg-gradient-to-r from-dark-pink from-[length:var(--dot-progress)] to-black to-[length:var(--dot-progress)]"
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

export default function CategoryList({ title, cards, interval }: Props) {
  const id = useId();

  return (
    <section class="flex-grow w-full h-[700px] lg:h-full flex items-center justify-center bg-white">
      <div>
        <div class="flex items-center justify-center h-[49px] text-center mb-6">
          <h2 class="text-lg lg:text-4xl font-normal">{title}</h2>
        </div>
        <div
          id={id}
          class="xl:container grid grid-cols grid-cols-[48px_1fr_48px]"
        >
          <Slider class="carousel carousel-center gap-4 col-span-full row-start-2 row-end-5">
            {cards?.map((card, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[500px] h-[750px] flex flex-col items-start justify-start"
              >
                <div class="w-[500px] h-[640px]">
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
                    />
                  </a>
                </div>
                <div class="w-[500px] h-[28px] mt-2">
                  <h3 class="text-lg font-semibold text-start">
                    {card.description}
                  </h3>
                  <p class="text-base font-normal text-start">
                    {card.subDescription}
                  </p>
                </div>
              </Slider.Item>
            ))}
          </Slider>

          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </div>
      </div>
    </section>
  );
}

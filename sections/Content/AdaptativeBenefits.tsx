import { RichText } from "apps/admin/widgets.ts";
import { useDevice } from "deco/hooks/useDevice.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";
import { useId } from "deco-sites/abracasa/sdk/useId.ts";

/**
 * @title {{{title}}}
 */
export interface Benefit {
  title: string;
  content: RichText;
}

export interface Props {
  /**
   * @maxItems 04
   */
  benefits?: Benefit[];
  interval?: number;
  infinite?: boolean;
}

function MobileBenefits({ benefits, interval, infinite }: Props) {
  const id = useId();

  return (
    <div class="flex relative w-full bg-aprox-whitesmoke mx-auto font-sans">
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-2 sm:px-5"
      >
        <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-6 col-span-full row-start-2 row-end-5 pb-2 scrollbar-none">
          {benefits?.map(({ title, content }, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <div class="flex flex-col gap-1.5 items-center justify-center py-2.5 px-8 w-full">
                <span class="text-[#333232] font-semibold text-xs">
                  {title}
                </span>

                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  class="text-dimgray text-center text-xs tracking-[0%] leading-4"
                />
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="flex justify-start z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="w-7 h-7">
              <Icon
                class="text-gray-normal"
                size={24}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Slider.PrevButton>
          </div>

          <div class="flex justify-end z-10 col-start-3 row-start-3">
            <Slider.NextButton class="w-7 h-7">
              <Icon
                class="text-gray-normal rotate-180"
                size={24}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Slider.NextButton>
          </div>
        </>

        <SliderJS
          rootId={id}
          scroll="smooth"
          interval={interval && interval * 1e3}
          infinite={infinite}
        />
      </div>
    </div>
  );
}

export default function AdaptativeBenefits({ benefits = [] }: Props) {
  if (!benefits || benefits.length === 0) return null;

  const device = useDevice();
  const isDesktop = device === "desktop";

  if (!isDesktop) return <MobileBenefits benefits={benefits} />;

  return (
    <div class="flex items-center justify-center w-full bg-aprox-whitesmoke font-sans">
      <div class="xl:max-w-[85%] xl:mx-auto">
        <div class="grid grid-cols-4 divide-x divide-light-shade-gray w-full gap-x-8">
          {benefits.map(({ title, content }) => (
            <div class="flex flex-col gap-1.5 max-w-[75%] py-4 pl-10">
              <span class="text-[#333232] font-semibold text-xs">{title}</span>

              <div
                dangerouslySetInnerHTML={{ __html: content }}
                class="text-dimgray text-xs tracking-[3%] leading-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
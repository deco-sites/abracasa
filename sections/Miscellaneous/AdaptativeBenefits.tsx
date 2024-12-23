import { RichText } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
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
  return (<div id="2187588577-0" class="flex relative w-full bg-aprox-whitesmoke mx-auto font-sans">
    <div id={id} class="grid grid-cols-[48px_1fr_48px] px-2 sm:px-5">
      <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-6 col-span-full row-start-2 row-end-5 pb-2 scrollbar-none w-full justify-between">
        {benefits?.map(({ title, content }, index) => (<Slider.Item index={index} class="carousel-item w-full">
          <div class="flex flex-col gap-1.5 items-center justify-center py-2.5 px-10 w-full">
            <span class="text-[#333232] font-semibold text-xs">
              {title}
            </span>

            <div dangerouslySetInnerHTML={{ __html: content }} class="text-dimgray text-center text-xs tracking-[0%] leading-4" />
          </div>
        </Slider.Item>))}
      </Slider>

      <>
        <div class="flex justify-start z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="w-7 h-7">
            <Icon class="text-gray-normal" size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>

        <div class="flex justify-end z-10 col-start-3 row-start-3">
          <Slider.NextButton class="w-7 h-7">
            <Icon class="text-gray-normal rotate-180" size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>

      <SliderJS rootId={id} scroll="smooth" interval={interval && interval * 1e3} infinite={infinite} />
    </div>
  </div>);
}
export default function AdaptativeBenefits({ benefits = [] }: Props) {
  if (!benefits || benefits.length === 0)
    return null;
  const device = useDevice();
  const isDesktop = device === "desktop";
  if (!isDesktop)
    return <MobileBenefits benefits={benefits} />;
  return (<div id="2187588577-0" class="flex items-center justify-center w-full bg-aprox-whitesmoke font-sans">
    <div class="xl:max-w-[85%] xl:mx-auto">
      <ul class="grid grid-cols-4 divide-x divide-light-shade-gray w-full gap-x-8">
        {benefits.map(({ title, content }) => (<li class="flex flex-col gap-1.5 py-4 first:pl-4 pl-10 2xl:max-w-[85%]">
          <span class="text-[#333232] font-semibold text-xs leading-[15px] xl:leading-[18px] xl:tracking-[0.03em]">
            {title}
          </span>

          <div dangerouslySetInnerHTML={{ __html: content }} class="text-dimgray text-xs leading-4 tracking-[0.03em]" />
        </li>))}
      </ul>
    </div>
  </div>);
}

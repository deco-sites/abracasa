import { RichText } from "apps/admin/widgets.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

interface Item {
    textContent?: RichText;
}

interface Props {
    items?: Item[];
}

function CommentsSlider({ items }: Props) {
    const id = useId();

    return (
        <div class="bg-[#F3F3EF] mt-[99px] md:mt-[170px] pt-[45px] md:pt-[84px] pb-[66px] md:pb-[92px] relative px-6 md:px-0" id={id}>
            <div class="max-w-[1196px] mx-auto relative flex flex-col md:items-center md:justify-center">
                <div class="flex w-full gap-4 max-lg:mb-7 justify-end md:justify-between md:absolute left-0 top-2/4 md:translate-y-[-50%]">
                    <Slider.PrevButton class="btn btn-circle btn-outline max-lg:!w-8 max-lg:!h-8 max-lg:!min-w-8 max-lg:!min-h-8 bg-transparent">
                        <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                    </Slider.PrevButton>
                    <Slider.NextButton class="btn btn-circle btn-outline max-lg:!w-8 max-lg:!h-8 max-lg:!min-w-8 max-lg:!min-h-8 bg-transparent">
                        <Icon size={20} id="ChevronRight" strokeWidth={3} />
                    </Slider.NextButton>
                </div>
                <Slider class="sliderP carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-6 md:gap-12 col-span-full row-start-2 row-end-5 lg:mt-8 max-w-[1050px]">
                    {items?.map((item, index) => (
                        <Slider.Item
                            index={index}
                            class="carousel-item mb-4 w-full max-w-[1050px]"
                        >
                            <span class="font-inter font-light tracking-wider text-justify" dangerouslySetInnerHTML={{ __html: item.textContent ?? '' }} />
                        </Slider.Item>
                    ))}
                </Slider>
            </div>
            <ul class="carousel justify-center col-span-full gap-1.5 z-10 row-start-4 absolute bottom-0 left-2/4 translate-x-[-50%]">
                {items?.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="py-5">
                                <div class="w-2.5 h-2.5 rounded-full group-disabled:bg-[#C4C4C4] bg-[#B9B9B966]" />
                            </div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
            <SliderJS rootId={id} />
        </div>
    )
}

export default CommentsSlider

export function LoadingFallback() {
    return (
        <div style={{ height: "300px" }} class="flex justify-center items-center">
            <span class="loading loading-spinner" />
        </div>
    );
}

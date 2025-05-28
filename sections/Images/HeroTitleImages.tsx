import type { ImageWidget as LiveImage, RichText } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
    /** @description Desktop title */
    title?: RichText;
    /** @description Mobile title */
    titleMobile?: RichText;
    /** @description Turn this option true to make text fix on center justified */
    justifyCenter: boolean;
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
    }[]
}

function HeroTitleImages({ title, titleMobile, justifyCenter, image, mainImage = [] }: Props) {
    const id = useId();

    return (
        <div id={id} class="mt-[72px] lg:mt-[172px]">
            <div class="max-w-[1196px] mx-auto">
                <div class="flex flex-col font-inter">
                    <h1 class={`sliderP leading-[1] font-semibold hidden lg:block mx-6 xl:mx-0 mb-7 lg:mb-[66px] ${justifyCenter ? 'max-w-[782px] !font-light tracking-wider !mx-auto mb-[51px] lg:mb-[154px] leading-6' : ''}`} dangerouslySetInnerHTML={{ __html: title ?? '' }} />
                    <h1 class={`sliderP mx-6 leading-[1] font-semibold mb-7 lg:mb-[66px] lg:hidden ${justifyCenter ? 'max-w-[782px] !font-light tracking-wider mb-[51px] lg:mb-[154px] leading-6' : ''}`} dangerouslySetInnerHTML={{ __html: titleMobile ?? '' }} />
                    {/* Desktop view */}
                    <ul class="hidden lg:flex gap-[18px] mx-6 xl:mx-0">
                        {image?.map((img) => (
                            <li>
                                <a href={img.link}>
                                    <Image
                                        src={img.desktop ?? ''}
                                        alt={img.alt}
                                        width={img.width ?? 386}
                                        height={img.height ?? 563}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile view */}
                    <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-3 col-span-full row-start-2 row-end-5 ml-6 lg:mt-8 lg:hidden">
                        {image?.map((img, index) => (
                            <Slider.Item
                                index={index}
                                class="carousel-item w-[276px] group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
                            >
                                <a href={img.link}>
                                    <Image
                                        src={img.mobile ?? ''}
                                        alt={img.alt}
                                        width={img.widthMobile ?? 278}
                                        height={img.heightMobile ?? 403}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </a>
                            </Slider.Item>
                        ))}
                    </Slider>
                    <SliderJS rootId={id} />

                    {Array.isArray(mainImage) && mainImage.map((main) => (
                        <div class="flex flex-col justify-center items-center gap-7 lg:gap-16 mb-6 mt-7 lg:mt-[48px]">
                            <>
                                <Image
                                    src={main.desktop ?? ''}
                                    alt={main.finalText}
                                    width={1210}
                                    height={591}
                                    loading="lazy"
                                    decoding="async"
                                    class="hidden lg:block" />

                                <Image
                                    src={main.mobile ?? ''}
                                    alt={main.finalText}
                                    width={376}
                                    height={186}
                                    loading="lazy"
                                    decoding="async"
                                    class="lg:hidden w-full" />
                            </>

                            {main.finalText && <span class="text-2xl font-normal text-[#212121] text-center" dangerouslySetInnerHTML={{ __html: main.finalText }} />}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default HeroTitleImages;

export function LoadingFallback() {
    return (
        <div style={{ height: "650px" }} class="flex justify-center items-center">
            <span class="loading loading-spinner" />
        </div>
    );
}

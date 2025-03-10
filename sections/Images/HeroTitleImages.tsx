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
    }
    finalText?: string;
}

function HeroTitleImages({ title, titleMobile, image, mainImage, finalText }: Props) {
    const id = useId();

    return (
        <div id={id} class="mt-[72px] lg:mt-[172px]">
            <div class="max-w-[1210px] mx-auto">
                <div class="flex flex-col">
                    <h1 class="leading-[1] font-semibold hidden lg:block mx-6 xl:mx-0 mb-7 lg:mb-[66px]" dangerouslySetInnerHTML={{ __html: title ?? '' }} />
                    <h1 class="mx-6 leading-[1] font-semibold mb-7 lg:mb-[66px] lg:hidden" dangerouslySetInnerHTML={{ __html: titleMobile ?? '' }} />
                    {/* Desktop view */}
                    <ul class="hidden lg:flex justify-center gap-4 mx-6 xl:mx-0">
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

                    {mainImage && <div class="flex flex-col justify-center items-center gap-7 lg:gap-16 mb-[77px] lg:mb-[94px] mt-7 lg:mt-[48px]">
                        <>
                            <Image
                                src={mainImage.desktop ?? ''}
                                alt={finalText}
                                width={1210}
                                height={591}
                                loading="lazy"
                                decoding="async"
                                class="hidden lg:block" />

                            <Image
                                src={mainImage.mobile ?? ''}
                                alt={finalText}
                                width={376}
                                height={186}
                                loading="lazy"
                                decoding="async"
                                class="lg:hidden" />
                        </>

                        {finalText && <span class="text-2xl font-normal text-[#212121] text-center" dangerouslySetInnerHTML={{ __html: finalText }} />}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroTitleImages
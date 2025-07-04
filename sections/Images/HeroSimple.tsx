import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

interface Props {
    image: {
        desktopSrc?: ImageWidget;
        desktopWidth?: number;
        desktopHeight?: number;
        mobileSrc?: ImageWidget;
        mobileWidth?: number;
        mobileHeight?: number;
        alt?: string;
    }
    subTitle?: string;
    letterSpacingSubTitle?: number;
    title?: string;
    letterSpacingTitle?: number;
    textContent?: RichText;
    button?: {
        buttonText?: string;
        buttonLink?: string;
    }
}

function HeroSimple({ image, subTitle, letterSpacingSubTitle , title, letterSpacingTitle, textContent, button }: Props) {
    return (
        <div class="py-24 md:py-36">
            <div class="max-w-[1196px] mx-6 md:mx-auto">
                <div class="flex flex-col md:flex-row md:gap-[117px] items-center font-inter">
                    <Image
                        src={image.mobileSrc ?? ''}
                        alt={image.alt}
                        width={image.mobileWidth ?? 327}
                        height={image.mobileHeight ?? 432}
                        loading="lazy"
                        decoding="async"
                        class="md:hidden"
                    />
                    <Image
                        src={image.desktopSrc ?? ''}
                        alt={image.alt}
                        width={image.desktopWidth ?? 481}
                        height={image.desktopHeight ?? 634}
                        loading="lazy"
                        decoding="async"
                        class="hidden md:block"
                    />
                    <div class="flex flex-col">
                        <span class="font-extralight text-base text-[#555555] md:text-[26px] w-full mt-[46px]"
                        style={{letterSpacing: letterSpacingSubTitle || "" }}>{subTitle}</span>
                        <span class="text-[38px] text-[#555555] font-normal mb-4 md:text-[54px] w-full"
                        style={{letterSpacing: letterSpacingTitle || "" }}>{title}</span>
                        <span class="font-normal mb-[22px] md:mb-[45px] leading-[28px]" dangerouslySetInnerHTML={{ __html: textContent ?? '' }} />
                        <a class="btn bg-transparent rounded-none py-2 border-[1px] border-solid border-[#212121] text-center text-base font-semibold w-full hover:bg-[#212121] hover:text-white text-[#212121] max-w-[331px]" href={button?.buttonLink}>
                            <span>{button?.buttonText}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSimple

export function LoadingFallback() {
    return (
        <div style={{ height: "700px" }} class="flex justify-center items-center">
            <span class="loading loading-spinner" />
        </div>
    );
}
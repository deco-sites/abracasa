import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

interface Props {
    /**
     * @title Espaçamento lateral (desktop)
     * @description Espaçamento da borda lateral da página
     */
    paddingX?: boolean;
    /**
     * @title Inverter posição do conteúdo
     * @description Trocar a posição do texto e da imagem
     */
    reverse?: boolean;
    image: {
        desktopSrc?: ImageWidget;
        desktopWidth?: number;
        desktopHeight?: number;
        mobileSrc?: ImageWidget;
        mobileWidth?: number;
        mobileHeight?: number;
        alt?: string;
    };
    subTitle?: string;
    letterSpacingSubTitle?: number;
    title?: string;
    letterSpacingTitle?: number;
    textContent?: RichText;
    button?: {
        buttonText?: string;
        buttonLink?: string;
    };
}

export const getLayoutClasses = ({
    paddingX,
    reverse,
}: {
    paddingX?: boolean;
    limitedText?: boolean;
    reverse?: boolean;
}) => {
    const reversePosition = reverse
        ? "flex-col-reverse md:flex-row-reverse gap-[43px] lg:gap-[191px] justify-between"
        : "flex-col md:flex-row md:gap-[117px]";
    const container = paddingX
        ? `w-full max-w-[1440px] px-6 lg:px-[106px] md:mx-auto`
        : "max-w-[1196px] mx-6 md:mx-auto";

    const verticalSpacing = paddingX
        ? "pt-[66px] lg:pt-[146]"
        : "py-24 md:py-36";

    const title = reverse
        ? "text-[40px] md:text-[clamp(28px,4.5vw,70px)] lg:text-[clamp(28px,4.5vw,70px)] text-[#212121] font-semibold mb-[22px] md:mb-[59px] md:leading-[66px] leading-[44px] max-w-[295px] lg:max-w-[319px] w-full"
        : "text-[38px] text-[#555555] font-normal mb-4 md:text-[54px] w-full";

    const textContent = reverse
        ? "text-sm md:text-base hyphens-auto md:hyphens-none text-[#626262]"
        : "font-normal mb-[22px] md:mb-[45px] leading-[28px]";

    return {
        reverse: `${reversePosition}`,
        container: `${container}`,
        title: `${title}`,
        verticalSpacing: `${verticalSpacing}`,
        textContent: `${textContent}`,
    };
};

function HeroSimple(
    {
        paddingX,
        reverse,
        image,
        subTitle,
        letterSpacingSubTitle,
        title,
        letterSpacingTitle,
        textContent,
        button,
    }: Props,
) {
    const {
        reverse: reversePosition,
        container,
        title: titleClass,
        verticalSpacing,
        textContent: textContentClass,
    } = getLayoutClasses({
        paddingX,
        reverse,
    });

    return (
        <div class={`${verticalSpacing}`}>
            <div class={`${container}`}>
                <div
                    class={`flex ${reversePosition} items-center font-inter`}
                >
                    <Image
                        src={image.mobileSrc ?? ""}
                        alt={image.alt}
                        width={image.mobileWidth ?? 327}
                        height={image.mobileHeight ?? 432}
                        loading="lazy"
                        decoding="async"
                        class="md:hidden"
                    />
                    <Image
                        src={image.desktopSrc ?? ""}
                        alt={image.alt}
                        width={image.desktopWidth ?? 481}
                        height={image.desktopHeight ?? 634}
                        loading="lazy"
                        decoding="async"
                        class="hidden md:block"
                    />
                    <div class="flex flex-col">
                        <span
                            class="font-extralight text-base text-[#555555] md:text-[26px] w-full mt-[46px]"
                            style={{
                                letterSpacing: letterSpacingSubTitle || "",
                            }}
                        >
                            {subTitle}
                        </span>
                        <span
                            class={`${titleClass}`}
                            style={{ letterSpacing: letterSpacingTitle || "" }}
                        >
                            {title}
                        </span>
                        <span
                            class={`${textContentClass}`}
                            dangerouslySetInnerHTML={{
                                __html: textContent ?? "",
                            }}
                        />
                        {button && (
                            <a
                                class="btn bg-transparent rounded-none py-2 border-[1px] border-solid border-[#212121] text-center text-base font-semibold w-full hover:bg-[#212121] hover:text-white text-[#212121] max-w-[331px]"
                                href={button?.buttonLink}
                            >
                                <span>{button?.buttonText}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSimple;

export function LoadingFallback() {
    return (
        <div
            style={{ height: "700px" }}
            class="flex justify-center items-center"
        >
            <span class="loading loading-spinner" />
        </div>
    );
}

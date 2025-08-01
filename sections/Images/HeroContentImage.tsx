import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ImageProps {
    src: ImageWidget;
    desktopWidth?: number;
    desktopHeight?: number;
    mobileWidth?: number;
    mobileHeight?: number;
    alt?: string;
}

export interface HeroContentImageProps {
    image: ImageProps;
    logo: ImageWidget;
    text: RichText;
    button: {
        buttonText?: string;
        buttonLink?: string;
    };
}

const HeroContentImage = (
    { image, logo, text, button }: HeroContentImageProps,
) => {
    return (
        <div class="mt-[55px] lg:mt-[86px] relative w-full font-inter">
            <div class="flex justify-center">
                <div class="w-full max-w-[1440px] flex flex-col lg:flex-row lg:pl-[106px] px-0 gap-[51px] lg:gap-[143px]">
                    {/* Coluna do conteúdo */}
                    <div class="w-full lg:max-w-[371px] px-6 lg:px-0">
                        <div
                            class={"flex justify-between flex-row-reverse items-center lg:items-start lg:flex-col lg:justify-center h-full gap-[23px] lg:gap-0"}
                        >
                            <Image
                                src={logo}
                                alt="Logo"
                                width={206}
                                height={206}
                                loading="lazy"
                                decoding="async"
                                class="hidden md:block lg:max-w-[206px] lg:max-h-[206px] lg:mb-[42px]"
                            />
                            <Image
                                src={logo}
                                alt="Logo"
                                width={135}
                                height={135}
                                loading="lazy"
                                decoding="async"
                                class="block md:hidden"
                            />
                            <div class={"md:max-w-[345px]"}>
                                <span
                                    class="text-sm md:text-base font-normal leading-[20px] md:leading-[26px] text-[#626262]"
                                    dangerouslySetInnerHTML={{
                                        __html: text ?? "",
                                    }}
                                />
                            </div>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={button?.buttonLink ?? "#"}
                                class={"hidden lg:flex justify-center items-center mt-[77px] btn bg-transparent uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-[17px] font-semibold w-full text-[#555555] max-w-[371px]"}
                            >
                                <span>{button.buttonText}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        class="flex-1 xl:w-[822px] h-ful md:h-auto "
                        style={{ height: `${image.mobileHeight}px` }}
                    >
                        <Image
                            src={image.src ?? ""}
                            alt={image.alt}
                            width={image.desktopWidth ?? 822}
                            height={image.desktopHeight ?? 576}
                            loading="lazy"
                            decoding="async"
                            class="w-full h-full object-cover block"
                        />
                    </div>
                    <div
                        class={"flex lg:hidden justify-center items-center px-6 lg:px-0"}
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={button?.buttonLink ?? "#"}
                            class={"flex justify-center items-center btn bg-transparent uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-xs font-semibold w-full text-[#555555] max-w-[371px]"}
                        >
                            <span>{button.buttonText}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContentImage;

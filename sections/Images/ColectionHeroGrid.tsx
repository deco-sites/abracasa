import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

import Image from "apps/website/components/Image.tsx";
import Slider from "deco-sites/abracasa/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

/**
 * @title Adicionar nova seção
 */
export interface Props {
    /**
     *  @maxItems 2
     *  @title Adicionar imagem ou vídeo
     */
    image?: {
        /** @description desktop otimized image */
        desktop?: ImageWidget;
        width?: number;
        height?: number;
        /** @description mobile otimized image */
        mobile?: ImageWidget;
        widthMobile?: number;
        heightMobile?: number;
        alt?: string;
        link?: string;
    }[];
    /**
     *  @maxItems 2
     *  @title Adicionar texto
     */
    text?: {
        /** @description turn this option true to limit title max width */
        limitTitleText?: boolean;
        title?: RichText;
        /** @description Line Height of the text */
        lineHeightTitle?: number;
        titleMobile?: RichText;
        /** @description Line Height of the text */
        lineHeightTitleMobile?: number;
    }[];
}

function ColectionHero({ image, text }: Props) {
    const id = useId();
    return (
        <div class="mt-[82px] lg:mt-[144px]">
            <div class="max-w-[1440px] mx-auto font-inter grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[183px] px-0 md:px-6 lg:pl-[106px] lg:pr-0">
                {/* Desktop */}
                {/* Coluna Esquerda */}
                <div class="flex-col hidden md:flex gap-[43px] lg:gap-[113px] pt-[82px]">
                    {text?.[0]?.title && (
                        <div
                            class="text-left md:px-0"
                            style={{
                                lineHeight: `${
                                    text?.[0]?.lineHeightTitle ?? 26
                                }px`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: text?.[0]?.title ?? "",
                            }}
                        />
                    )}

                    {image?.[0] && (
                        <a
                            href={image[0].link}
                            class={"flex lg:w-auto w-full justify-center items-center"}
                        >
                            <Image
                                src={image[0].desktop ?? ""}
                                alt={image[0].alt}
                                width={image[0].width ?? 567}
                                height={image[0].height ?? 775}
                                loading="lazy"
                                decoding="async"
                                class={"lg:block hidden"}
                            />
                            <Image
                                src={image[0].mobile ?? ""}
                                alt={image[0].alt}
                                width={image[0].widthMobile ?? 275}
                                height={image[0].heightMobile ?? 376}
                                loading="lazy"
                                decoding="async"
                                class={"lg:hidden block"}
                            />
                        </a>
                    )}
                </div>

                {/* Coluna Direita */}
                <div class="hidden md:flex flex-col gap-[68px] lg:gap-[159px]">
                    {image?.[1] && (
                        <a
                            href={image[1].link}
                            class={"flex lg:w-auto w-full  justify-center items-center"}
                        >
                            <Image
                                src={image[1].desktop ?? ""}
                                alt={image[1].alt}
                                width={image[1].width ?? 588}
                                height={image[1].height ?? 798}
                                loading="lazy"
                                decoding="async"
                                class={"lg:block hidden"}
                            />
                            <Image
                                src={image[1].mobile ?? ""}
                                alt={image[1].alt}
                                width={image[1].widthMobile ?? 275}
                                height={image[1].heightMobile ?? 376}
                                loading="lazy"
                                decoding="async"
                                class={"lg:hidden block"}
                            />
                        </a>
                    )}

                    {text?.[1]?.title && (
                        <div
                            class="text-left md:px-0 max-w-[394px]"
                            style={{
                                lineHeight: `${
                                    text?.[1]?.lineHeightTitle ?? 26
                                }px`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: text?.[1]?.title ?? "",
                            }}
                        />
                    )}
                </div>
                {/* Fim Desktop */}
                {/* Mobile */}
                <div
                    class={"w-full md:hidden flex flex-col"}
                >
                    {text?.[0]?.title && (
                        <div
                            class="text-left md:hidden block text-sm hyphens-auto px-6 md:px-0 pb-[43px]"
                            style={{
                                lineHeight: `${
                                    text?.[0]?.lineHeightTitleMobile ?? 20
                                }px`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: text?.[0]?.titleMobile ?? "",
                            }}
                        />
                    )}
                    <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-[17px] col-span-full row-start-2 row-end-5 pl-6 ">
                        {image?.map((img, index) => (
                            <Slider.Item
                                index={index}
                                class="carousel-item w-[276px]  group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
                            >
                                <a href={img.link}>
                                    <Image
                                        src={img.mobile ?? ""}
                                        alt={img.alt}
                                        width={img.widthMobile ?? 275}
                                        height={img.heightMobile ?? 376}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </a>
                            </Slider.Item>
                        ))}
                    </Slider>
                    <SliderJS rootId={id} />
                    {text?.[1]?.title && (
                        <div
                            class="text-left text-sm hyphens-auto md:hidden block px-6 pt-[68px]"
                            style={{
                                lineHeight: `${
                                    text?.[1]?.lineHeightTitleMobile ?? 20
                                }px`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: text?.[1]?.titleMobile ?? "",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ColectionHero;

/*

TODO:
- [ ] imagem excedendo o tamanho do container 1440px


*/

import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "deco-sites/abracasa/components/ui/Button.tsx";

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
        <div class="mt-[55px] lg:mt-[86px] relative w-full">
            <div class="flex justify-center">
                <div class="w-full max-w-[1440px] flex flex-col lg:flex-row md:pl-[124px] lg:gap-[143px]">
                    {/* Coluna do conteúdo */}
                    <div class="w-full lg:max-w-[371px] justify-center flex flex-col">
                        <div>
                            <Image
                                src={logo}
                                alt="Logo"
                                width={206}
                                height={206}
                                loading="lazy"
                                decoding="async"
                                class=" lg:max-w-[206px] lg:max-h-[206px] md:mb-[42px]"
                            />
                            <div class={"md:max-w-[345px]"}>
                                <span
                                    class="font-normal leading-[28px]"
                                    dangerouslySetInnerHTML={{
                                        __html: text ?? "",
                                    }}
                                />
                            </div>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={button?.buttonLink ?? "#"}
                                class={"hidden md:flex justify-center items-center mt-[77px] btn bg-transparent uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-[17px] font-semibold w-full text-[#555555] max-w-[371px]"}
                            >
                                <span>{button.buttonText}</span>
                            </a>
                        </div>
                    </div>

                    {/* Coluna da imagem */}
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
                </div>
            </div>
        </div>
    );
};

export default HeroContentImage;

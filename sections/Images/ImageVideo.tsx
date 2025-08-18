/*

TODO:

    * - Texto, posiçção da div do texto, posição do texto.
    * - Add image and video components
    * - Ensure responsiveness
    * - Implement lazy loading for images
    * - Add alt text for images
    * - Add video support

*/

import { ImageWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";

/**
 * @title Imagem
 */
export interface ImageProps {
    /** @title Tipo */
    type?: "image";
    /** @title Imagem */
    src: ImageWidget;
    alt?: string;
    /** @title Largura */
    width?: number;
    /** @title Altura */
    height?: number;
}

/**
 * @title Vídeo
 */
export interface VideoProps {
    /** @title Tipo */
    type: "video";
    /** @title Vídeo */
    video: VideoWidget;
    /** @title Largura */
    width?: number;
    /** @title Altura */
    height?: number;
}

export interface TextProps {
    content: RichText;
    /** @title Alinhamento do texto em relação à mídia */
    position?: "left" | "right" | "center";
    /** @title  Espaçamento entre linhas (ex: 1.5 ou 24 para 24px) */
    lineHeight?: number;
}

export interface ImageVideoProps {
    /** @title Mídia (imagem ou vídeo) */
    media: ImageProps | VideoProps;
    /** @title Adicionar texto */
    text?: {
        textDesktop?: TextProps;
        textMobile?: TextProps;
    };
}

export const getLayoutClasses = ({
    media,
}: {
    media: ImageProps | VideoProps;
}) => {
    switch (media.type) {
        case "image":
            return "pt-16 md:pt-[145px]";
        case "video":
            return "pt-[60px] lg:pt-[119px]";
        default:
            return "pt-[90px] md:pt-[119px]";
    }
};

const ImageVideo = ({ media, text = {} }: ImageVideoProps) => {
    const {
        textDesktop = null,
        textMobile = null,
    } = text;

    const verticalSpacing = getLayoutClasses({ media });

    return (
        <div class={`w-full ${verticalSpacing}`}>
            <div class={"flex justify-center font-inter"}>
                <div
                    class={"w-full max-w-[1196px] px-6 xl:px-0 flex flex-col"}
                >
                    {media.type === "image" && "src" in media
                        ? (
                            <div
                                class={"w-full flex flex-col gap-[27px] md:gap-[59px]"}
                            >
                                <div
                                    style={{
                                        justifyContent: textDesktop?.position,
                                    }}
                                    class={"w-full hidden md:flex"}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: textDesktop?.content ??
                                                "",
                                        }}
                                        className={`  w-full lg:max-w-[770px] text-[#626262] `}
                                        style={{
                                            lineHeight: `${textDesktop?.lineHeight ??
                                                26
                                                }px`,
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        justifyContent: textDesktop?.position,
                                    }}
                                    class={"w-full flex md:hidden"}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: textMobile?.content ??
                                                "",
                                        }}
                                        className={` w-full text-sm text-[#626262] `}
                                        style={{
                                            lineHeight: `${textMobile?.lineHeight ??
                                                26
                                                }px`,
                                        }}
                                    />
                                </div>
                                <Image
                                    src={media.src ?? ""}
                                    alt={media.alt ?? "imagem"}
                                    width={media.width ?? 674}
                                    height={media.height ?? 798}
                                    loading="lazy"
                                    decoding="async"
                                    class="hidden lg:block"
                                />
                                <Image
                                    src={media.src ?? ""}
                                    alt={media.alt ?? "imagem"}
                                    width={media.width ?? 323}
                                    height={media.height ?? 397}
                                    loading="lazy"
                                    decoding="async"
                                    class="lg:hidden"
                                />
                            </div>
                        )
                        : media.type !== "image" && "video" in media
                            ? (
                                <div
                                    class={`flex flex-col gap-[58px] lg:gap-[129px]`}
                                >
                                    <div
                                        style={{
                                            justifyContent: textDesktop?.position,
                                        }}
                                        class={"w-full hidden md:flex "}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: textDesktop?.content ??
                                                    "",
                                            }}
                                            className={` w-full lg:max-w-[770px] text-[#626262] `}
                                            style={{
                                                lineHeight: `${textDesktop?.lineHeight ??
                                                    26
                                                    }px`,
                                            }}
                                        />
                                    </div>
                                    <Video
                                        src={media.video}
                                        width={media.width ?? 1228}
                                        height={media.height ?? 674}
                                        controls={true}
                                        class={`hidden md:block md:h-[450px] lg:h-[674px] object-fill`}
                                    />
                                    <Video
                                        src={media.video}
                                        width={media.width ?? 768}
                                        height={media.height ?? 185}
                                        controls={true}
                                        class=" md:hidden h-[185px] object-fill"
                                    />
                                    <div
                                        style={{
                                            justifyContent: textMobile?.position,
                                        }}
                                        className={`w-full flex lg:hidden`}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: textMobile?.content ??
                                                    "",
                                            }}
                                            className={`block md:hidden  w-full text-sm hyphens-auto text-[#626262] `}
                                            style={{
                                                lineHeight: `${textMobile?.lineHeight ??
                                                    20
                                                    }px`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                            : <div>Tipo de mídia não suportado</div>}
                </div>
            </div>
        </div>
    );
};

export default ImageVideo;

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

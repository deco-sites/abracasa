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
    /** @title Texto alternativo */
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
    type?: "video";
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

const ImageVideo = ({ media, text = {} }: ImageVideoProps) => {
    const {
        textDesktop = null,
        textMobile = null,
    } = text;

    return (
        <div class={"w-full mt-[60px] lg:mt-[119px]"}>
            <div class={"flex justify-center font-inter"}>
                <div
                    class={"w-full max-w-[1440px] px-6 md:px-[106px] flex flex-col"}
                >
                    {media.type === "image" && "src" in media
                        ? (
                            <>
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
                            </>
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
                                    class={"w-full flex"}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: textDesktop?.content ??
                                                "",
                                        }}
                                        className={` hidden lg:block lg:w-full lg:max-w-[770px] text-[#626262] `}
                                        style={{
                                            lineHeight: `${
                                                textDesktop?.lineHeight ??
                                                    26
                                            }px`,
                                        }}
                                    />
                                </div>
                                <Video
                                    src={media.video}
                                    width={media.width ?? 1194}
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
                                        className={`block lg:hidden  w-full md:w-[400px] text-sm text-[#626262] `}
                                        style={{
                                            lineHeight: `${
                                                textMobile?.lineHeight ??
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

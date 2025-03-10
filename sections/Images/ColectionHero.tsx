import Image from "apps/website/components/Image.tsx";
import type { ImageWidget as LiveImage, RichText } from "apps/admin/widgets.ts";

interface Props {
    title?: RichText;
    titleMobile?: RichText;
    image?: {
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
}

function ColectionHero({ title, titleMobile, image }: Props) {
    return (
        <div class="mt-[72px] lg:mt-[172px] relative">
            <div class="max-w-[1210px] mx-auto">
                <div class="flex flex-col gap-7 lg:mx-7 xl:mx-0">
                    <h2 class="font-semibold mx-6 lg:mx-0 hidden lg:block" dangerouslySetInnerHTML={{ __html: title ?? '' }} />
                    <h2 class="font-semibold mx-6 lg:mx-0 lg:hidden" dangerouslySetInnerHTML={{ __html: titleMobile ?? '' }} />
                    <ul class="flex flex-col lg:flex-row items-center gap-7">
                        {image?.map((img, index) => (
                            <li class={`${index === 1 ? 'xl:absolute xl:right-0 xl:top-0' : ''}`}>
                                <a href={img.link}>
                                    <Image
                                        src={img.desktop ?? ''}
                                        alt={img.alt}
                                        width={img.width ?? 588}
                                        height={img.height ?? 798}
                                        loading="lazy"
                                        decoding="async"
                                        class="hidden lg:block"
                                    />
                                    <Image
                                        src={img.mobile ?? ''}
                                        alt={img.alt}
                                        width={img.widthMobile ?? 323}
                                        height={img.heightMobile ?? 397}
                                        loading="lazy"
                                        decoding="async"
                                        class="lg:hidden"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ColectionHero
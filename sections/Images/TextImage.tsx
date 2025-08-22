import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  title: HTMLWidget;
  paragraphs?: { text: HTMLWidget }[] /* @maxItems 7 */;
  image: ImageWidget;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;

  titleMobile: HTMLWidget;
  paragraphsMobile?: { text: HTMLWidget }[];
  imageMobile: ImageWidget;
  imageMobileWidth?: number;
  imageMobileHeight?: number;
  altMobile?: string;

  caption: string;
}

export default function SectionTextImage({
  title,
  paragraphs = [],
  image,
  imageWidth,
  imageHeight,
  alt,

  titleMobile,
  paragraphsMobile = [],
  imageMobile,
  imageMobileWidth,
  imageMobileHeight,
  altMobile,

  caption,
}: Props) {
  const id = useId();

  return (
    <section className="w-full relative xl:h-[538px]">
      <div className="xl:mt-[121px] mt-[46px] mx-6 flex flex-col xl:flex-row-reverse items-start gap-[69px] max-w-[1210px] xl:h-full xl:mx-auto">
        <div className="hidden xl:block w-[422px] my-auto mr-[48px]">
          <h1 className="font-semibold mb-[49px] font-inter">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
          <div className="flex flex-col font-medium font-inter">
            {paragraphs.map((p, i) => (
              <div key={`${id}-p-desk-${i}`} className="flex flex-col">
                <div
                  className="flex items-center py-[11px]"
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />
                <hr className="text-gray-800" />
              </div>
            ))}
          </div>
        </div>

        <div className="block xl:hidden max-w-[422px] w-full">
          <h1 className="font-semibold mb-[30px] font-inter">
            <span dangerouslySetInnerHTML={{ __html: titleMobile }} />
          </h1>
          <div className="flex flex-col font-medium font-inter">
            {paragraphsMobile.map((p, i) => (
              <div key={`${id}-p-mob-${i}`} className="flex flex-col">
                <div
                  className="py-[11px] flex items-center"
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />
                <hr className="text-gray-800" />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex flex-col justify-center xl:absolute lg:bottom-0 lg:left-0">
          <Image
            src={image}
            width={imageWidth ?? 732}
            height={imageHeight ?? 513}
            alt={alt}
            className="w-full h-auto"
            style={{
              maxWidth: imageWidth ? `${imageWidth}px` : "732px",
              maxHeight: imageHeight ? `${imageHeight}px` : "513px",
            }}
          />

          {caption ? (
            <div className="flex w-full justify-end">
              <p className="font-inter text-[#626262] text-[8px] lg:text-[10px]">
                {caption}
              </p>
            </div>
          ) : null}
        </div>

        <div className="xl:hidden flex-col flex justify-center">
          <Image
            src={imageMobile}
            width={imageMobileWidth ?? 400}
            height={imageMobileHeight ?? 300}
            alt={altMobile}
            className="w-full h-auto"
          />
          {caption ? (
            <div className="flex w-full justify-end">
              <p className="font-inter text-[#626262] text-[8px] lg:text-[10px]">
                {caption}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

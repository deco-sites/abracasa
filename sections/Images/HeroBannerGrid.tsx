import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  title?: string;
  mainImage?: {
    src?: ImageWidget;
    width?: number;
    height?: number;
    srcMobile?: ImageWidget;
    widthMobile?: number;
    heightMobile?: number;
    alt?: string;
    href?: string;
  };
  imageItems?: {
    src?: ImageWidget;
    width?: number;
    height?: number;
    srcMobile?: ImageWidget;
    widthMobile?: number;
    heightMobile?: number;
    alt?: string;
    href?: string;
  }[];
}

function HeroBannerGrid({ title, mainImage, imageItems }: Props) {
  return (
    <div class="mb-10 lg:mx-auto lg:max-w-[85%] ">
      <span class="font-sans text-2xl text-dimgray mb-5 px-4 lg:px-0 lg:mb-[14px] block">
        {title}
      </span>
      <div class="flex flex-col lg:flex-row">
        <a href={mainImage?.href}>
          <Image
            src={mainImage?.srcMobile ?? ""}
            alt={mainImage?.alt ?? "Banner Design"}
            width={mainImage?.widthMobile ?? 376}
            height={mainImage?.heightMobile ?? 425}
            loading="lazy"
            decoding="async"
            class="w-full lg:hidden"
          />
          <Image
            src={mainImage?.src ?? ""}
            alt={mainImage?.alt ?? "Banner Design"}
            width={mainImage?.width ?? 399}
            height={mainImage?.height ?? 508}
            loading="lazy"
            decoding="async"
            class="hidden lg:block"
          />
        </a>
        <ul class="grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-[14px] lg:gap-y-3 px-5 mt-[18px] lg:mt-0">
          {imageItems?.map((img) => (
            <li class="sm:flex justify-center">
              <a href={img?.href}>
                <Image
                  src={img?.srcMobile ?? ""}
                  alt={img?.alt ?? ""}
                  width={img?.widthMobile ?? 158}
                  height={img?.heightMobile ?? 167}
                  loading="lazy"
                  decoding="async"
                  class="lg:hidden"
                />
                <Image
                  src={img?.src ?? ""}
                  alt={img?.alt ?? ""}
                  width={img?.width ?? 234}
                  height={img?.height ?? 248}
                  loading="lazy"
                  decoding="async"
                  class="hidden lg:block"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HeroBannerGrid;

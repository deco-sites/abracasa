import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  changeSpacing?: boolean;
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
    showNewTitle?: boolean;
    titleAndSubtitle?: {
      newTitle?: string;
      subTitle?: string;
      button?: {
        title?: string;
      };
    };
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

function HeroBannerGrid({
  changeSpacing,
  title,
  mainImage,
  imageItems,
}: Props) {
  return (
    <div
      class={`${
        changeSpacing
          ? "lg:mb-[130px] lg:max-w-[1300px] mb-14"
          : "mb-10 lg:max-w-[85%]"
      } lg:mx-auto `}
    >
      <span
        class={` ${
          title ? "block" : "hidden"
        } font-sans text-2xl text-dimgray mb-5 px-4 lg:px-0 lg:mb-[14px] `}
      >
        {title}
      </span>
      <div class="flex flex-col lg:flex-row">
        <a class="relative" href={mainImage?.href}>
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
            class="hidden lg:block h-full object-cover"
            style={{
              maxHeight: `${mainImage?.height ?? 508}px`,
            }}
          />
          {mainImage?.showNewTitle ? (
            <div class="absolute font-inter flex flex-col inset-0 items-start justify-end pl-[30px] pb-[30px] text-center">
              <h1 class="font-bold text-[28px] lg:text-[32px] text-white">
                {mainImage?.titleAndSubtitle?.newTitle}
              </h1>
              <h2 class="font-light text-[14px] lg:text-[16px] text-white tracking-wide mb-3">
                {mainImage?.titleAndSubtitle?.subTitle}
              </h2>
              {mainImage?.titleAndSubtitle?.button ? (
                <button class="text-black font-semibold text-[12px] lg:text-[14px] py-2 px-2 bg-white max-w-[120px] w-full">
                  {mainImage?.titleAndSubtitle?.button.title}
                </button>
              ) : null}
            </div>
          ) : null}
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
                  style={{
                    maxHeight: `${mainImage?.height ?? 248}px`,
                  }}
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


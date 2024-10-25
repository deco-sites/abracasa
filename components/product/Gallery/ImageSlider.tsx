import { asset } from "$fresh/runtime.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import MobileVideoPlay from "deco-sites/abracasa/components/ui/MobileVideoPlay.tsx";
import { FnContext } from "deco/types.ts";
import type {
  ImageObject,
  ProductDetailsPage,
  VideoObject,
} from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: ReturnType<typeof loader>) {
  const id = "files-slider";

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: {
        image: images = [],
        additionalProperty = [],
        video: videos = [],
      },
    },
    layout: { width, height },
  } = props;
  const breadcrumb = {
    ...props.page.breadcrumbList,
    itemListElement: props.page.breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: props.page.breadcrumbList.numberOfItems - 1,
  };

  const files: (ImageObject | VideoObject)[] = [...images];

  const hasVideo = videos.length > 0;

  if (hasVideo) {
    const videoModifiedUrl = new URL(videos?.[0].contentUrl ?? "").searchParams
      .get("v");

    const video: VideoObject = {
      "@type": "VideoObject",
      alternateName: videos[0].alternateName,
      name: videos[0].name,
      encodingFormat: videos[0].encodingFormat,
      contentUrl: `https://www.youtube.com/embed/${videoModifiedUrl}?rel=0`,
    };

    files.splice(1, 0, video);
  }

  console.log(additionalProperty, "adicionall")
  return (
    <>
      <div class="lg:ml-6 px-0 my-4 max-w-[98vw] sm:max-w-full">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>

      <div id={id} class="grid grid-flow-row sm:grid-flow-col lg:gap-6">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2 mx-auto">
          <ProductImageZoom files={files} width={width} height={height} />

          {additionalProperty?.some((property) =>
            property.value?.includes("Atelie Casa")
          ) && (
              <div class="absolute flex flex-col gap-1 z-10 top-2 left-1.5">
                <img
                  src={asset("/image/logo_atelie_abracasa_large.png")}
                  width={145}
                  height={145}
                  alt="Logo Ateliê Cadabra"
                  loading="lazy"
                  class="w-[90px] md:w-[145px]"
                />
              </div>
            )}
          {additionalProperty?.some((property) =>
            property.value?.includes("Madeira Natural")
          ) && (
              <div class="absolute flex flex-col gap-1 z-10 top-2 right-1.5">
                <img
                  src={asset("/image/madeira_natural.png")}
                  width={110}
                  height={110}
                  alt="Logo Madeira Natural"
                  loading="lazy"
                  class="w-[90px] md:w-[110px]"
                />
              </div>
            )}

          {hasVideo && props.device === "mobile" && <MobileVideoPlay />}

          <Slider.PrevButton
            class="block no-animation absolute left-2 top-1/2 z-10 lg:hidden rotate-180"
            disabled
          >
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99634 4.73917L17.928 16.3483L4.99634 27.9574"
                stroke="#94938F"
                stroke-width="0.587803"
                stroke-miterlimit="10"
              />
            </svg>
          </Slider.PrevButton>

          <Slider.NextButton
            class="block no-animation absolute right-2 top-1/2 z-10 lg:hidden"
            disabled={files.length < 2}
          >
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99634 4.73917L17.928 16.3483L4.99634 27.9574"
                stroke="#94938F"
                stroke-width="0.587803"
                stroke-miterlimit="10"
              />
            </svg>
          </Slider.NextButton>

          <div id="r2u" class="hidden lg:grid grid-cols-2 gap-3 max-w-[550px]">
            <div class="flex flex-col gap-2 items-center justify-center">
              <h2 id="qrCodeText" class="font-bold text-lg text-black" />
              <div id="qrCode" class="w-20 h-20" />
            </div>

            <div id="r2u-viewer" />
          </div>
        </div>

        {/* Mobile Dots */}
        {props.device === "mobile" && (
          <ul class="sm:hidden carousel carousel-center justify-center items-center gap-1 px-4 order-2">
            {files.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="py-5">
                    <div class="w-7 h-[5px] rounded group-disabled:bg-firebrick bg-[#e6e6e6]" />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Dots */}
        {props.device === "tablet" || props.device === "desktop" && (
          <div
            id="pdp-vertical-carousel"
            class="hidden sm:flex flex-col items-center gap-2 order-1 border-r sm:border-[#DFDFDF]/60 pr-6 relative"
          >
            {files.length >= 6 && (
              <Slider.PrevButton
                class="no-animation"
                disabled
              >
                <Icon size={32} id="ChevronUp" strokeWidth={1.75} />
              </Slider.PrevButton>
            )}

            <Slider
              id="pdp-vertical-carousel"
              class="carousel carousel-vertical px-0 max-h-[555px] gap-4"
            >
              {files.map((item, index) => (
                <Slider.Item
                  id="pdp-vertical-carousel"
                  index={index}
                  class="carousel-item w-[98px] relative"
                >
                  <Slider.Dot index={index}>
                    {item["@type"] === "ImageObject"
                      ? (
                        <Image
                          style={{ aspectRatio: 1 }}
                          class="group-disabled:border-base-300 border"
                          width={98}
                          height={98}
                          src={item.url!}
                          alt={item.alternateName}
                        />
                      )
                      : (
                        <div class="flex items-center justify-center w-full relative">
                          <Image
                            style={{ aspectRatio: 1 }}
                            src={images[0].url!}
                            alt={images[0].alternateName}
                            width={98}
                            height={98}
                            class="group-disabled:border-base-300 border"
                          />
                          <Icon id="VideoPlay" size={36} class="absolute" />
                        </div>
                      )}
                  </Slider.Dot>
                </Slider.Item>
              ))}
            </Slider>

            {files.length >= 6 && (
              <Slider.NextButton
                class="no-animation"
                disabled={files.length < 6}
              >
                <Icon size={32} id="ChevronDown" strokeWidth={1.75} />
              </Slider.NextButton>
            )}

            <SliderJS
              rootId="pdp-vertical-carousel"
              scroll="smooth"
              orientation="vertical"
            />
          </div>
        )}

        <SliderJS rootId={id} scroll="smooth" />
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

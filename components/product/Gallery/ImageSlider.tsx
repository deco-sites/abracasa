import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext } from "deco/types.ts";

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
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  const breadcrumb = {
    ...props.page.breadcrumbList,
    itemListElement: props.page.breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: props.page.breadcrumbList.numberOfItems - 1,
  };

  return (
    <>
      <div class="lg:ml-6 overflow-auto px-2 lg:px-0 mb-4">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>

      <div id={id} class="grid grid-flow-row sm:grid-flow-col lg:gap-6">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2">
          <Slider class="carousel carousel-center gap-6 w-[90vw] sm:w-[40vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={width}
                  height={height}
                  // Preload LCP image for better web vitals
                  preload={index === 0 ? "true" : "false"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2 md:btn md:btn-circle md:btn-outline"
            disabled
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 md:btn md:btn-circle md:btn-outline rotate-180"
            disabled={images.length < 2}
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.NextButton>

          <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * height / width)}
            />
          </div>

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
          <ul class="sm:hidden carousel carousel-center gap-1 px-4 order-2">
            {images.map((img, index) => (
              <li class="carousel-item min-w-[98px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: 1 }}
                    class="group-disabled:border-base-300 border object-cover"
                    width={98}
                    height={98}
                    src={img.url!}
                    alt={img.alternateName}
                  />
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
                {images.length >= 6 && (
                  <Slider.PrevButton
                    class="no-animation btn btn-circle btn-outline"
                    disabled
                  >
                    <Icon size={24} id="ChevronUp" strokeWidth={3} />
                  </Slider.PrevButton>
                )}

                <Slider
                  id="pdp-vertical-carousel"
                  class="carousel carousel-vertical px-0 max-h-[605px] gap-4"
                >
                  {images.map((img, index) => (
                    <Slider.Item
                      id="pdp-vertical-carousel"
                      index={index}
                      class="carousel-item w-[98px] relative"
                    >
                      <Slider.Dot index={index}>
                        <Image
                          style={{ aspectRatio: 1 }}
                          class="group-disabled:border-base-300 border"
                          width={98}
                          height={98}
                          src={img.url!}
                          alt={img.alternateName}
                        />
                      </Slider.Dot>
                    </Slider.Item>
                  ))}
                </Slider>

                {images.length >= 6 && (
                  <Slider.NextButton
                    class="no-animation btn btn-circle btn-outline"
                    disabled={images.length < 6}
                  >
                    <Icon size={24} id="ChevronDown" strokeWidth={3} />
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

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

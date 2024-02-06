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
  const breadcrumb = {
    ...props.page.breadcrumbList,
    itemListElement: props.page.breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: props.page.breadcrumbList.numberOfItems - 1,
  };

  return (
    <>
      <div class="lg:ml-6 px-4 sm:px-0 my-4 max-w-[98vw] sm:max-w-full">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>

      <div id={id} class="grid grid-flow-row sm:grid-flow-col lg:gap-6">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2 mx-auto">
          <ProductImageZoom images={images} width={width} height={height} />

          <Slider.PrevButton
            class="block no-animation absolute left-2 top-1/2 lg:hidden rotate-180"
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
            class="block no-animation absolute right-2 top-1/2 lg:hidden"
            disabled={images.length < 2}
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
            {images.map((_, index) => (
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
                {images.length >= 6 && (
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
                    class="no-animation"
                    disabled={images.length < 6}
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

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};
